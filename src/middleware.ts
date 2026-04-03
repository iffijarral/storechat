import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SKIP_AUTH === 'true') {
    return NextResponse.next();
  }
  const token = request.cookies.get('token') // Or check headers

  // If trying to access dashboard without a token, send to login
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}