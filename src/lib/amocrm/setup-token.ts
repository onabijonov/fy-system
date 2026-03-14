import { supabase } from "@/lib/supabase/client"

/**
 * Dastlabki AmoCRM tokenni Supabase ga yozish.
 * Bu funksiya faqat bir marta chaqiriladi — birinchi sozlash vaqtida.
 */
export async function setupInitialToken(
  accessToken: string,
  refreshToken: string,
  expiresIn: number
): Promise<void> {
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()

  const { error } = await supabase.from("amocrm_tokens").upsert(
    {
      id: 1,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    },
    { onConflict: "id" }
  )

  if (error) {
    throw new Error(`[AmoCRM] Token saqlashda xatolik: ${error.message}`)
  }

  console.log("[AmoCRM] Dastlabki token muvaffaqiyatli saqlandi")
}
