export type LeadStage =
  | "yangi_lid"
  | "boglanildi"
  | "taklif_yuborildi"
  | "muzokara"
  | "yutildi"
  | "yutqazildi"

export type LeadSource = "amocrm" | "manual" | "telegram"
export type CallType = "answered" | "missed" | "none"
export type ClientStatus = "Faol" | "Nofaol"

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          company: string | null
          stage: LeadStage
          responsible_name: string
          responsible_initials: string
          responsible_color: string
          amount: number
          last_call_time: string | null
          last_call_type: CallType
          source: LeadSource
          amo_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          company?: string | null
          stage: LeadStage
          responsible_name: string
          responsible_initials: string
          responsible_color: string
          amount: number
          last_call_time?: string | null
          last_call_type?: CallType
          source: LeadSource
          amo_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          company?: string | null
          stage?: LeadStage
          responsible_name?: string
          responsible_initials?: string
          responsible_color?: string
          amount?: number
          last_call_time?: string | null
          last_call_type?: CallType
          source?: LeadSource
          amo_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          id: string
          full_name: string
          phone: string | null
          email: string | null
          company: string | null
          activity: string | null
          industry: string | null
          status: string
          image: string | null
          total_spent: number
          events_count: number
          join_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          phone?: string | null
          email?: string | null
          company?: string | null
          activity?: string | null
          industry?: string | null
          status?: string
          image?: string | null
          total_spent?: number
          events_count?: number
          join_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone?: string | null
          email?: string | null
          company?: string | null
          activity?: string | null
          industry?: string | null
          status?: string
          image?: string | null
          total_spent?: number
          events_count?: number
          join_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
      amocrm_tokens: {
        Row: {
          id: number
          access_token: string
          refresh_token: string | null
          expires_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          access_token: string
          refresh_token?: string | null
          expires_at: string
          updated_at?: string
        }
        Update: {
          id?: number
          access_token?: string
          refresh_token?: string | null
          expires_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      lead_stage: LeadStage
      lead_source: LeadSource
      call_type: CallType
    }
    CompositeTypes: Record<string, never>
  }
}
