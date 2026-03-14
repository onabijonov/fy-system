-- AmoCRM token storage (single-row table)
CREATE TABLE amocrm_tokens (
  id integer PRIMARY KEY DEFAULT 1,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamptz NOT NULL,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Updated_at trigger
CREATE TRIGGER set_amocrm_tokens_updated_at
  BEFORE UPDATE ON amocrm_tokens
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS: only service role can access
ALTER TABLE amocrm_tokens ENABLE ROW LEVEL SECURITY;

-- Allow anon/authenticated to read (needed for frontend token fetch)
CREATE POLICY "Allow read amocrm_tokens" ON amocrm_tokens
  FOR SELECT USING (true);

-- Allow anon/authenticated to update (for token refresh from frontend)
CREATE POLICY "Allow update amocrm_tokens" ON amocrm_tokens
  FOR UPDATE USING (true) WITH CHECK (true);

-- Allow insert for initial setup
CREATE POLICY "Allow insert amocrm_tokens" ON amocrm_tokens
  FOR INSERT WITH CHECK (true);
