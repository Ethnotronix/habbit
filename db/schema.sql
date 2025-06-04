-- SQL setup for the habits table
-- Drop any outdated unique constraint
ALTER TABLE IF EXISTS habits DROP CONSTRAINT IF EXISTS habits_user_id_key;

-- Recreate table if it does not exist
CREATE TABLE IF NOT EXISTS habits (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  color text NOT NULL,
  target integer NOT NULL,
  frequency text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  lastreset bigint NOT NULL,
  CONSTRAINT habits_user_id_id_key UNIQUE (user_id, id)
);
