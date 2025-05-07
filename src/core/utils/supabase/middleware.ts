import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './server.supabase';

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  console.log("Middleware running...")
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const publicPaths = ['/auth/login'];

  if (user && publicPaths.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/chat';

    return NextResponse.redirect(url);
  }

  if (!user && !publicPaths.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse
}