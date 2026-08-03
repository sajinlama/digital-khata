// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { registerSchema } from '@/lib/validator/register';
import { withErrorHandler } from '@/lib/error/api-wrapper';
import { createPendingOtp } from '@/lib/otp/createPendingOtp';

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();
  const validatedData = registerSchema.parse(body);

  const existingOwner = await prisma.shopOwner.findUnique({
    where: { phone: validatedData.phoneNumber },
  });

  if (existingOwner) {
    return NextResponse.json(
      { success: false, message: 'An account with this phone number already exists' },
      { status: 409 }
    );
  }

  const code = await createPendingOtp(validatedData.phoneNumber, validatedData);

  


  return NextResponse.json(
    { success: true, message: `OTP sent ${code}`, data: { phone: validatedData.phoneNumber } },
    { status: 200 }
  );
});
