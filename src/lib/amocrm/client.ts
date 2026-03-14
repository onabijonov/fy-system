import { getValidToken, invalidateTokenCache } from "./token-manager"

const BASE_URL = "/api/amo"

interface AmoResponse<T> {
  _embedded: T
  _page: number
  _links: { self: { href: string } }
}

export type { AmoResponse }

export async function fetchFromAmo<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`
  const token = await getValidToken()

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (res.status === 401) {
    console.error("[AmoCRM] 401 — token yaroqsiz, qayta urinish...")
    // Keshni tozala va majburiy refresh qil
    invalidateTokenCache()
    const freshToken = await getValidToken(true)
    const retryRes = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${freshToken}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })
    if (!retryRes.ok) {
      throw new Error(`[AmoCRM] Retry failed: ${retryRes.status}`)
    }
    if (retryRes.status === 204) {
      return {} as T
    }
    return retryRes.json() as Promise<T>
  }

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`[AmoCRM] ${res.status}: ${text}`)
  }

  // 204 No Content — no body to parse
  if (res.status === 204) {
    return {} as T
  }

  return res.json() as Promise<T>
}
