import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { randomBytes, createHash } from 'crypto';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_ISSUER = 'khata-app';
const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; 
export type TokenRole = 'OWNER' | 'STAFF';

export interface AppTokenPayload extends JWTPayload {
  sub: string;     
  role: TokenRole;
  shopId: string;
}

export async function generateAccessToken(payload: AppTokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify<AppTokenPayload>(token, JWT_SECRET, {
    issuer: JWT_ISSUER,
  });
  return payload;
}


export function generateRefreshToken() {
  return randomBytes(40).toString('hex');
}

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}