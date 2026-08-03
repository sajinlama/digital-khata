// lib/otp/verifyPending.ts
import redis from '../redis/redis';
import type { RegisterInput } from '../validator/register';

const MAX_ATTEMPTS = 5;
const OTP_TTL_SECONDS = 4 * 60;

interface PendingOtp {
  code: string;
  attempts: number;
  registrationData: RegisterInput;
}

function otpKey(phone: string): string {
  return `otp:register:${phone}`;
}

type VerifyResult =
  | { ok: true; registrationData: RegisterInput }
  | { ok: false; reason: 'not_found' | 'too_many_attempts' | 'invalid_code' };

export async function verifyPendingOtp(phone: string, code: string): Promise<VerifyResult> {
  const key = otpKey(phone);
  const payload = await redis.get<PendingOtp>(key); // typed, already an object

  if (!payload) return { ok: false, reason: 'not_found' };

  if (payload.attempts >= MAX_ATTEMPTS) {
    await redis.del(key);
    return { ok: false, reason: 'too_many_attempts' };
  }

  if (payload.code !== code) {
    payload.attempts += 1;
    const ttl = await redis.ttl(key);
    await redis.set(key, payload, { ex: ttl > 0 ? ttl : OTP_TTL_SECONDS });
    return { ok: false, reason: 'invalid_code' };
  }

  await redis.del(key);
  return { ok: true, registrationData: payload.registrationData };
}