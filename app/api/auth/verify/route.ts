// app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/error/api-wrapper';
import { otpSchema } from '@/lib/validator/otp';
import { verifyPendingOtp } from '@/lib/otp/verifyPending';

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();
  const { phoneNumber, otp } = otpSchema.parse(body);

  const result = await verifyPendingOtp(phoneNumber, otp);

  if (!result.ok) {
    const responses: Record<typeof result.reason, { status: number; message: string }> = {
      not_found: { status: 410, message: 'OTP expired or not found. Please request a new code.' },
      too_many_attempts: { status: 429, message: 'Too many failed attempts. Please request a new code.' },
      invalid_code: { status: 400, message: 'Invalid OTP code.' },
    };
    const { status, message } = responses[result.reason];
    return NextResponse.json({ success: false, message }, { status });
  }

  return NextResponse.json(
    {
      success: true,
      message: 'Phone number verified successfully',
      data: { registrationData: result.registrationData },
    },
    { status: 200 }
  );
});