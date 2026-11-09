import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';
import { getBlogArticleById } from '@/utils/blog';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const blogIdMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogIdMatch) {
    const article = getBlogArticleById(blogIdMatch[1]);
    if (article) {
      const url = request.nextUrl.clone();
      url.pathname = `/blog/${article.slug}`;
      return NextResponse.redirect(url, 308);
    }
  }

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
  matcher: ['/admin/:path*', '/blog/:slug'],
};
