import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
    const isDashboard = pathname.startsWith('/dashboard');
  const authToken = request.cookies.get('auth_token');

  if (isDashboard && !authToken) {
     return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
