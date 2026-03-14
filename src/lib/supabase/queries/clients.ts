import { supabase } from "../client"
import type { Database } from "../types"

type ClientRow = Database["public"]["Tables"]["clients"]["Row"]
type ClientInsert = Database["public"]["Tables"]["clients"]["Insert"]
type ClientUpdate = Database["public"]["Tables"]["clients"]["Update"]

export async function getClients(): Promise<ClientRow[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createClient(client: ClientInsert): Promise<ClientRow> {
  const { data, error } = await supabase
    .from("clients")
    .insert(client)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateClient(
  id: string,
  updates: ClientUpdate
): Promise<ClientRow> {
  const { data, error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase.from("clients").delete().eq("id", id)
  if (error) throw error
}

export async function deleteClients(ids: string[]): Promise<void> {
  const { error } = await supabase.from("clients").delete().in("id", ids)
  if (error) throw error
}
