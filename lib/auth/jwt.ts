// lib/auth/jwt.ts
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import type { RegisterInput } from '../validator/register';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_ISSUER = 'khata-app';
const TOKEN_EXPIRY = '7d';

export interface RegisterTokenPayload extends JWTPayload {
  fullName: string;
  phoneNumber: string;
  shopName: string;
}

export async function jwtTokenGeneration(validatedData: RegisterInput): Promise<string> {
  const { fullName, phoneNumber, shopName } = validatedData;

  const token = await new SignJWT({ fullName, phoneNumber, shopName } satisfies RegisterTokenPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify<RegisterTokenPayload>(token, JWT_SECRET, {
    issuer: JWT_ISSUER,
  });
  return payload;
}