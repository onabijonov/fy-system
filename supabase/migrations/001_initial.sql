-- =============================================
-- Enums
-- =============================================

CREATE TYPE lead_stage AS ENUM (
  'yangi_lid',
  'boglanildi',
  'taklif_yuborildi',
  'muzokara',
  'yutildi',
  'yutqazildi'
);

CREATE TYPE lead_source AS ENUM (
  'amocrm',
  'manual',
  'telegram'
);

CREATE TYPE call_type AS ENUM (
  'answered',
  'missed',
  'none'
);

-- =============================================
-- updated_at trigger function
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- leads table
-- =============================================

CREATE TABLE leads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text        NOT NULL,
  company         text,
  stage           lead_stage  NOT NULL DEFAULT 'yangi_lid',
  responsible_name     text   NOT NULL,
  responsible_initials text   NOT NULL,
  responsible_color    text   NOT NULL DEFAULT '#6366F1',
  amount          numeric     NOT NULL DEFAULT 0,
  last_call_time  text,
  last_call_type  call_type   NOT NULL DEFAULT 'none',
  source          lead_source NOT NULL DEFAULT 'manual',
  amo_id          text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (auth policies come later)
CREATE POLICY "Allow all on leads" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- =============================================
-- clients table
-- =============================================

CREATE TABLE clients (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       text        NOT NULL,
  phone           text,
  email           text,
  company         text,
  activity        text,
  industry        text,
  status          text        NOT NULL DEFAULT 'Faol',
  image           text,
  total_spent     numeric     NOT NULL DEFAULT 0,
  events_count    integer     NOT NULL DEFAULT 0,
  join_date       text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (auth policies come later)
CREATE POLICY "Allow all on clients" ON clients
  FOR ALL
  USING (true)
  WITH CHECK (true);
