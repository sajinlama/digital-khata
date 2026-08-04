// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { withErrorHandler } from '@/lib/error/api-wrapper';
import { loginSchema } from '@/lib/validator/login';
import { jwtTokenGeneration } from '@/lib/auth/jwt';
import prisma from '@/lib/db';

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; 

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();

  const validationResult = loginSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { phone, password } = validationResult.data;

  const owner = await prisma.shopOwner.findUnique({
    where: { phone },
    include: { shop: true },
  });

  if (!owner) {
    return NextResponse.json(
      { success: false, message: 'Phone number not found' },
      { status: 404 }
    );
  }

  const passwordMatches = await bcrypt.compare(password, owner.passwordHash);

  if (!passwordMatches) {
    return NextResponse.json(
      { success: false, message: 'Invalid phone number or password' },
      { status: 401 }
    );
  }

  const token = await jwtTokenGeneration({
    sub: owner.id,
    role: 'OWNER',
    shopId: owner.shop!.id,
  });

  const response = NextResponse.json(
    {
      success: true,
      message: 'Login successful',
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