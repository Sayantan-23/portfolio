CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY CHECK (id ~ '^[a-zA-Z0-9-]{1,80}$'),
  content jsonb NOT NULL,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  revision integer NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS admin_login_limit (
  id integer PRIMARY KEY CHECK (id=1),
  attempts integer NOT NULL DEFAULT 0,
  window_start timestamptz NOT NULL DEFAULT now()
);
