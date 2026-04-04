import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const appointments = await prisma.appointment.findMany({
    include: { patient: true },
    orderBy: { preferredDate: 'asc' },
  });
  return NextResponse.json(appointments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
      notes,
    } = body as Record<string, any>;

    if (!firstName || !lastName || !email || !service || !preferredDate || !preferredTime) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Upsert patient by email (create if not exists, otherwise update basic info)
    const patient = await prisma.patient.upsert({
      where: { email },
      update: { firstName, lastName, phone },
      create: { firstName, lastName, email, phone },
    });

    // Create appointment linked to patient
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        service,
        preferredDate: new Date(preferredDate),
        preferredTime,
        notes: notes || null,
        status: 'PENDING',
      },
      include: { patient: true },
    });

    return NextResponse.json({ success: true, data: appointment }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body as { id?: string; status?: string };

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Missing id or status' }, { status: 400 });
    }

    const allowed = ['APPROVED', 'REJECTED', 'PENDING', 'COMPLETED'];
    if (!allowed.includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      // cast to any to satisfy TypeScript enum typing from Prisma
      data: { status: status as any },
      include: { patient: true },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating appointment status:', error);
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
