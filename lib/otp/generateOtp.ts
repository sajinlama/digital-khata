
import crypto from 'crypto';

/**
 * Generates a cryptographically secure numeric OTP code.
 * @param length - number of digits (default 6)
 */
export function generateOtpCode(length: number = 6): string {
  const digits = '0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    code += digits[randomIndex];
  }

  return code;
}