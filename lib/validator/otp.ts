// lib/validator/otp.ts
import { z } from 'zod';
import { phoneSchema } from './register'; // reuse the same phone validation you already have

export const otpSchema = z.object({
  phoneNumber: phoneSchema,
  otp: z
    .string({ message: 'OTP is required' })
    .trim()
    .length(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d{6}$/, { message: 'OTP must contain only digits' }),
});

export type OtpInput = z.infer<typeof otpSchema>;