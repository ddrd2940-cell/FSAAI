import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
export async function middleware(request: NextRequest) {
  const token=request.cookies.get('fsaai_session')?.value;
  if(!token) return NextResponse.redirect(new URL('/login',request.url));
  try {
    const key=process.env.AUTH_SECRET;
    if(!key) throw new Error('Missing secret');
    await jwtVerify(token,new TextEncoder().encode(key));
    return NextResponse.next();
  } catch { return NextResponse.redirect(new URL('/login',request.url)); }
}
export const config={matcher:['/','/api/generate']};
