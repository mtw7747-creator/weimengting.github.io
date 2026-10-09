CREATE TABLE IF NOT EXISTS portfolio_revisions (
  id TEXT PRIMARY KEY NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_portfolio_revisions_status_updated_at
  ON portfolio_revisions(status, updated_at);
