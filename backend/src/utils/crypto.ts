import { sha256 } from "hono/utils/crypto";

export const generateSessionId = () => crypto.randomUUID();
export const generateCode = (length = 6) => {
  const code = Math.floor(
    10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1)
  );
  return code.toString();
};

export const hashCode = async (code: string) => {
  return await sha256(code);
};
