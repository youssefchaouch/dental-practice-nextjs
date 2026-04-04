import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const appointments = await prisma.appointment.findMany({
    include: { patient: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(appointments);
}
