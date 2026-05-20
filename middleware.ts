import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const auth = req.headers.get('authorization');
    if (!auth || !auth.startsWith('Basic ')) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' }
      });
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ['/admin/:path*'] };
