import jwt, { type SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

export type AdminPayload = {
  id: number;
  email: string;
  role: string;
};

const JWT_SECRET = process.env.JWT_SECRET || "heavenly-events-fallback-secret-key-change-in-production";
const JWT_EXPIRY = process.env.JWT_EXPIRES_IN || process.env.JWT_EXPIRY || "24h";

export function signJWT(payload: AdminPayload): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRY as SignOptions["expiresIn"],
  };
  return jwt.sign(payload as object, JWT_SECRET, options);
}

export function verifyJWT(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
