-- AmoCRM leads cache table
CREATE TABLE IF NOT EXISTS amocrm_leads (
  id bigint PRIMARY KEY,
  pipeline_id bigint,
  status_id bigint,
  name text,
  price bigint DEFAULT 0,
  responsible_user_id bigint,
  created_at bigint,
  updated_at bigint,
  contact_name text,
  contact_phone text,
  company_name text,
  tags jsonb DEFAULT '[]',
  custom_fields jsonb DEFAULT '[]',
  raw jsonb,
  synced_at timestamptz DEFAULT now()
);

-- AmoCRM pipelines cache table
CREATE TABLE IF NOT EXISTS amocrm_pipelines (
  id bigint PRIMARY KEY,
  name text,
  statuses jsonb DEFAULT '[]',
  synced_at timestamptz DEFAULT now()
);

-- Sync log
CREATE TABLE IF NOT EXISTS amocrm_sync_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  synced_at timestamptz DEFAULT now(),
  leads_count int,
  pipelines_count int,
  error text
);

-- Enable Realtime on leads and pipelines
ALTER PUBLICATION supabase_realtime ADD TABLE amocrm_leads;
ALTER PUBLICATION supabase_realtime ADD TABLE amocrm_pipelines;

-- RLS
ALTER TABLE amocrm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE amocrm_pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE amocrm_sync_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON amocrm_leads FOR ALL USING (true);
CREATE POLICY "Allow all" ON amocrm_pipelines FOR ALL USING (true);
CREATE POLICY "Allow all" ON amocrm_sync_log FOR ALL USING (true);
