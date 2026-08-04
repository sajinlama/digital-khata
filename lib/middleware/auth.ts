// middleware.ts (project root)
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

const PROTECTED_PATHS = ['/dashboard', '/customers', '/staff']; 

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await verifyToken(token); 
    return NextResponse.next();
  } catch {
    // Token expired or tampered — clear the stale cookie and redirect
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('accessToken');
    return response;
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/customers/:path*', '/staff/:path*'],
};