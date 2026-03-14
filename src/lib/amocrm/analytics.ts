import { fetchFromAmo, type AmoResponse } from "./client"

const TASHKENT_OFFSET = 5 * 60 * 60 * 1000

const UZ_MONTHS = [
  "Yan", "Fev", "Mar", "Apr", "May", "Iyn",
  "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek",
]

function getTashkentDayRange(daysAgo: number): { from: number; to: number } {
  const now = new Date()
  const tashkentNow = new Date(now.getTime() + TASHKENT_OFFSET)
  const day = new Date(Date.UTC(
    tashkentNow.getUTCFullYear(),
    tashkentNow.getUTCMonth(),
    tashkentNow.getUTCDate() - daysAgo
  ))
  const from = (day.getTime() - TASHKENT_OFFSET) / 1000
  const to = from + 86399
  return { from, to }
}

interface MinimalLead {
  id: number
  status_id: number
  created_at: number
  updated_at: number
}

/** Barcha lidlarni minimal ma'lumot bilan olish (paginatsiya bilan) */
async function fetchAllLeadsMini(): Promise<MinimalLead[]> {
  const leads: MinimalLead[] = []
  let page = 1

  while (true) {
    try {
      const data = await fetchFromAmo<AmoResponse<{ leads: MinimalLead[] }>>(
        `/leads?limit=250&page=${page}`
      )

      const batch = data?._embedded?.leads
      if (!batch?.length) break

      leads.push(...batch)
      if (batch.length < 250) break
      page++
    } catch {
      if (page === 1) return []
      break
    }
  }

  console.log(`[Analytics] Jami ${leads.length} ta lid olindi`)
  return leads
}

// ── Won / Lost status IDs (AmoCRM universal) ──
const STATUS_WON = 142
const STATUS_LOST = 143

export interface DashboardAnalytics {
  leadsToday: number
  leadsYesterday: number
  activeLeads: number
  conversionRate: number
  processedYesterday: number
  monthlyLeads: { month: string; count: number }[]
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
  const leads = await fetchAllLeadsMini()

  const todayRange = getTashkentDayRange(0)
  const yesterdayRange = getTashkentDayRange(1)

  let leadsToday = 0
  let leadsYesterday = 0
  let activeLeads = 0
  let wonLeads = 0
  let processedYesterday = 0

  // Oylik guruhlash uchun
  const monthCounts = new Map<string, number>()

  for (const lead of leads) {
    // Bugun yaratilgan
    if (lead.created_at >= todayRange.from && lead.created_at <= todayRange.to) {
      leadsToday++
    }
    // Kecha yaratilgan
    if (lead.created_at >= yesterdayRange.from && lead.created_at <= yesterdayRange.to) {
      leadsYesterday++
    }
    // Aktiv (yopilmagan)
    if (lead.status_id !== STATUS_WON && lead.status_id !== STATUS_LOST) {
      activeLeads++
    }
    // Yutilgan
    if (lead.status_id === STATUS_WON) {
      wonLeads++
    }
    // Kecha obrabotka bo'lgan (updated_at kecha)
    if (lead.updated_at >= yesterdayRange.from && lead.updated_at <= yesterdayRange.to) {
      processedYesterday++
    }
    // Oylik guruhlash
    const createdDate = new Date(lead.created_at * 1000 + TASHKENT_OFFSET)
    const monthKey = `${createdDate.getUTCFullYear()}-${String(createdDate.getUTCMonth()).padStart(2, "0")}`
    monthCounts.set(monthKey, (monthCounts.get(monthKey) ?? 0) + 1)
  }

  // Oxirgi 7 oy uchun chart data
  const now = new Date()
  const tashkentNow = new Date(now.getTime() + TASHKENT_OFFSET)
  const monthlyLeads: { month: string; count: number }[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.UTC(
      tashkentNow.getUTCFullYear(),
      tashkentNow.getUTCMonth() - i,
      1
    ))
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth()).padStart(2, "0")}`
    monthlyLeads.push({
      month: UZ_MONTHS[d.getUTCMonth()],
      count: monthCounts.get(key) ?? 0,
    })
  }

  const total = leads.length
  const conversionRate = total > 0 ? (wonLeads / total) * 100 : 0

  return {
    leadsToday,
    leadsYesterday,
    activeLeads,
    conversionRate,
    processedYesterday,
    monthlyLeads,
  }
}
