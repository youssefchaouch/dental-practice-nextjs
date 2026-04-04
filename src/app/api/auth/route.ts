import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (
    email === process.env.DENTIST_EMAIL &&
    password === process.env.DENTIST_PASSWORD
  ) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
