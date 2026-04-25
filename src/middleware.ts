import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude login page from protection
    if (pathname === '/admin/login') {
      // If already logged in, redirect to dashboard
      if (session) {
        try {
          await decrypt(session);
          return NextResponse.redirect(new URL('/admin', request.url));
        } catch (e) {
          // session invalid, continue to login
        }
      }
      return NextResponse.next();
    }

    // Require session for other admin pages
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (e) {
      // session invalid, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
