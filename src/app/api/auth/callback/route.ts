import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  console.log('GET request received with URL:', req.url);
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  console.log('Code from URL search params:', code);

  if (code) {
    console.log('Code is present, exchanging code for session');
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  } else {
    console.log('No code found in URL search params');
  }

  console.log('Redirecting to dashboard');
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}