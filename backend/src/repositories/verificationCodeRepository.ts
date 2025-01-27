import type { D1Database } from "@cloudflare/workers-types";
import { addMinutes } from "../utils/time";
import { getCurrentTime } from "../utils/time";

const CODE_EXPIRATION_MINUTES = 10;
const MAX_ATTEMPTS = 3;

export const createVerificationCode = async (
  db: D1Database,
  email: string,
  codeHash: string
) => {
  await db
    .prepare(
      `INSERT INTO verification_codes 
     (id, email, code_hash, expires_at, attempts) 
     VALUES (?, ?, ?, ?, ?)`
    )
    .bind(
      crypto.randomUUID(),
      email,
      codeHash,
      addMinutes(CODE_EXPIRATION_MINUTES),
      0
    )
    .run();
};

export const getValidVerificationCode = async (
  db: D1Database,
  email: string
) => {
  return await db
    .prepare(
      `SELECT * FROM verification_codes 
     WHERE email = ? 
     AND expires_at > ? 
     AND attempts < ? 
     ORDER BY created_at DESC`
    )
    .bind(email, getCurrentTime(), MAX_ATTEMPTS)
    .first();
};
