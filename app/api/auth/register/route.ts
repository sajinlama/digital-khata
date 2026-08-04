// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { registerSchema } from '@/lib/validator/register';
import { withErrorHandler } from '@/lib/error/api-wrapper';
import { createPendingOtp } from '@/lib/otp/createPendingOtp';

const SALT_ROUNDS = 12;

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();
  const { password, ...rest } = registerSchema.parse(body);

  const existingOwner = await prisma.shopOwner.findUnique({
    where: { phone: rest.phoneNumber },
  });

  if (existingOwner) {
    return NextResponse.json(
      { success: false, message: 'An account with this phone number already exists' },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const code = await createPendingOtp(rest.phoneNumber, { ...rest, passwordHash });

  // TODO: send `code` via SMS provider — never return it in the response
  // await sendSms(rest.phoneNumber, `Your Digital Khata code is ${code}`);

  return NextResponse.json(
    { success: true, message: 'OTP sent', data: { phone: rest.phoneNumber ,code } },
    { status: 200 }
  );
});