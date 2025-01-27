import type { D1Database } from "@cloudflare/workers-types";

export type Bindings = {
  DB: D1Database;
};

export type User = {
  id: string;
  email: string;
  created_at: number;
};

export type VerificationCode = {
  id: string;
  email: string;
  code_hash: string;
  expires_at: number;
  attempts: number;
};
