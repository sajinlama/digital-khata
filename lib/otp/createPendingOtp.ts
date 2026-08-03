import redis from '../redis/redis';
import type { RegisterInput } from '../validator/register';
import { generateOtpCode } from './generateOtp';

const OTP_TTL_SECONDS = 4 * 60; // 4 minutes

interface PendingOtp {
  code: string;
  attempts: number;
  registrationData: RegisterInput;
}

function otpKey(phone: string): string {
  return `otp:register:${phone}`;
}

export async function createPendingOtp(
  phone: string,
  registrationData: RegisterInput
): Promise<string> {
  const code = generateOtpCode();

  const payload: PendingOtp = {
    code,
    attempts: 0,
    registrationData,
  };

  await redis.set(otpKey(phone), payload, { ex: OTP_TTL_SECONDS });

  return code;
}