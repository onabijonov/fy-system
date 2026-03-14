import { supabase } from "@/lib/supabase/client"

const AMO_CLIENT_ID = import.meta.env.VITE_AMO_CLIENT_ID as string
const AMO_CLIENT_SECRET = import.meta.env.VITE_AMO_CLIENT_SECRET as string
const AMO_SUBDOMAIN = import.meta.env.VITE_AMO_SUBDOMAIN as string

interface TokenRow {
  id: number
  access_token: string
  refresh_token: string | null
  expires_at: string
  updated_at: string
}

interface RefreshResponse {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

const REFRESH_BUFFER_MS = 5 * 60 * 1000 // 5 daqiqa oldin refresh qilish

let cachedToken: string | null = null

/** Keshni tozalash — 401 xatosida chaqiriladi */
export function invalidateTokenCache(): void {
  cachedToken = null
}

export async function getValidToken(forceRefresh = false): Promise<string> {
  // 1. Keshda bo'lsa va majburiy refresh emas — qaytaradi
  if (!forceRefresh && cachedToken) {
    return cachedToken
  }

  // 2. Supabase dan tokenni o'qi
  const { data } = await supabase
    .from("amocrm_tokens")
    .select("*")
    .eq("id", 1)
    .single()

  if (data) {
    const row = data as unknown as TokenRow
    const expiresAt = new Date(row.expires_at).getTime()

    // Refresh token mavjud va token muddati tugayotgan bo'lsa — refresh qil
    if (row.refresh_token && (forceRefresh || Date.now() >= expiresAt - REFRESH_BUFFER_MS)) {
      console.log("[AmoCRM] Token refresh qilinmoqda...", forceRefresh ? "(majburiy)" : "(muddati tugayapti)")
      return await refreshAndSave(row.refresh_token)
    }

    // forceRefresh=true lekin refresh_token yo'q — env var dan yangi token ol va Supabase ni yangila
    if (forceRefresh && !row.refresh_token) {
      console.warn("[AmoCRM] forceRefresh lekin refresh_token yo'q, env var dan yangilanmoqda...")
      const envToken = import.meta.env.VITE_AMO_ACCESS_TOKEN as string | undefined
      if (envToken && envToken !== row.access_token) {
        const farFuture = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        await supabase
          .from("amocrm_tokens")
          .update({ access_token: envToken, expires_at: farFuture })
          .eq("id", 1)
        cachedToken = envToken
        console.log("[AmoCRM] Supabase token env var dan yangilandi")
        return envToken
      }
    }

    // Token hali yaroqli (yoki long-lived token — refresh_token yo'q)
    cachedToken = row.access_token
    return row.access_token
  }

  // 3. FALLBACK: Supabase bo'sh — env var dan ol va Supabase ga saqla
  console.warn("[AmoCRM] Supabase da token topilmadi, env var dan olinmoqda...")
  const envToken = import.meta.env.VITE_AMO_ACCESS_TOKEN as string | undefined
  if (!envToken) {
    throw new Error(
      "[AmoCRM] Token topilmadi: Supabase bo'sh va VITE_AMO_ACCESS_TOKEN env var yo'q"
    )
  }

  // Long-lived token — muddati yo'q, lekin Supabase ga saqlaymiz
  const farFuture = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  const { error: upsertError } = await supabase
    .from("amocrm_tokens")
    .upsert(
      {
        id: 1,
        access_token: envToken,
        refresh_token: null,
        expires_at: farFuture,
      },
      { onConflict: "id" }
    )

  if (upsertError) {
    console.error("[AmoCRM] Env token Supabase ga saqlanmadi:", upsertError.message)
  } else {
    console.log("[AmoCRM] Long-lived token Supabase ga saqlandi")
  }

  cachedToken = envToken
  return envToken
}

async function refreshAndSave(
  refreshToken: string
): Promise<string> {
  const res = await fetch(
    `https://${AMO_SUBDOMAIN}.amocrm.ru/oauth2/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: AMO_CLIENT_ID,
        client_secret: AMO_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        redirect_uri: `https://${AMO_SUBDOMAIN}.amocrm.ru`,
      }),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`[AmoCRM] Token refresh xatolik: ${res.status} ${text}`)
  }

  const body = (await res.json()) as RefreshResponse
  const newExpiresAt = new Date(
    Date.now() + body.expires_in * 1000
  ).toISOString()

  // Supabase ga yangi tokenni yoz
  const { error } = await supabase
    .from("amocrm_tokens")
    .update({
      access_token: body.access_token,
      refresh_token: body.refresh_token,
      expires_at: newExpiresAt,
    })
    .eq("id", 1)

  if (error) {
    console.error("[AmoCRM] Token saqlashda xatolik:", error.message)
  }

  cachedToken = body.access_token
  console.log("[AmoCRM] Token muvaffaqiyatli yangilandi")
  return body.access_token
}
