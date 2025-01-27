import type { D1Database } from "@cloudflare/workers-types";
import { generateCode, hashCode } from "../utils/crypto";
import { sendVerificationEmail } from "./emailService";
import * as userRepo from "../repositories/userRepository";
import * as codeRepo from "../repositories/verificationCodeRepository";

export const initiateEmailVerification = async (
  db: D1Database,
  email: string
) => {
  await userRepo.createUser(db, email);
  const code = generateCode();
  const codeHash = await hashCode(code);
  await codeRepo.createVerificationCode(db, email, codeHash);
  await sendVerificationEmail(email, code);
};

export const verifyCodeAndCreateSession = async (
  db: D1Database,
  email: string,
  code: string
) => {
  const verificationCode = await codeRepo.getValidVerificationCode(db, email);
  // ... rest of verification logic
};
