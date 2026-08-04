// app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/error/api-wrapper';
import { otpSchema } from '@/lib/validator/otp';
import { verifyPendingOtp } from '@/lib/otp/verifyPending';
import { jwtTokenGeneration } from '@/lib/auth/jwt';
import prisma from '@/lib/db';

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

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

  const { registrationData } = result;

  const owner = await prisma.shopOwner.create({
    data: {
      phone: registrationData.phoneNumber,
      name: registrationData.fullName,
      passwordHash: registrationData.password,
      shop: {
        create: { name: registrationData.shopName },
      },
    },
    include: { shop: true },
  });

  const token = await jwtTokenGeneration({
    sub: owner.id,
    role: 'OWNER',
    shopId: owner.shop!.id,
  });

  const response = NextResponse.json(
    {
      success: true,
      message: 'Phone number verified successfully',
      data: { phone: owner.phone, shopName: owner.shop!.name },
    },
    { status: 200 }
  );

  response.cookies.set('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_TTL_SECONDS,
  });

  return response;
});