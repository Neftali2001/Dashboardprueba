// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (!token && !isAuthPage) {
    // Redirigir a la página de inicio de sesión si no está autenticado
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isAuthPage) {
    // Redirigir al dashboard si ya está autenticado y accede a la página de autenticación
     return NextResponse.redirect(new URL('/dashboard/(overview)', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/(overview)', '/profile/:path*', '/auth/:path*, /login'],
};