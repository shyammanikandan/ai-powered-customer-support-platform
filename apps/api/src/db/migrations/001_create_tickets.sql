CREATE TABLE   tickets(
   id TEXT PRIMARY KEY,
   subject TEXT NOT NULL,
   description TEXT NOT NULL,
   status TEXT NOT NULL CHECK(status IN('open','in_progress','resolved')),
   priority TEXT NOT NULL
   CHECK(priority in('low','medium','high')),
   created_at TIMESTAMPTZ NOT NULL
)