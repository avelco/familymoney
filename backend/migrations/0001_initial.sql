-- First drop tables with foreign key dependencies
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS verification_codes;

-- Then create tables
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    seed TEXT NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE verification_codes (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    code_hash TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
    expires_at INTEGER NOT NULL,
    attempts INTEGER DEFAULT 0 NOT NULL
);

CREATE INDEX idx_email ON users (email);
CREATE INDEX idx_session ON sessions (id);
CREATE INDEX idx_verification_codes ON verification_codes (email, expires_at);