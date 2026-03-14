import { supabase } from "../client"
import type { Database, LeadStage } from "../types"

type LeadRow = Database["public"]["Tables"]["leads"]["Row"]
type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"]

export async function getLeads(): Promise<LeadRow[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getLeadsByStage(stage: LeadStage): Promise<LeadRow[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("stage", stage)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createLead(lead: LeadInsert): Promise<LeadRow> {
  const { data, error } = await supabase
    .from("leads")
    .insert(lead)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateLeadStage(
  id: string,
  stage: LeadStage
): Promise<LeadRow> {
  const { data, error } = await supabase
    .from("leads")
    .update({ stage })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}
