import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Utility functions for common database operations
export class DatabaseService {
  static async createOrUpdatePatient(patientData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth?: Date;
    address?: string;
  }) {
    return await prisma.patient.upsert({
      where: { email: patientData.email },
      update: {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        phone: patientData.phone,
        dateOfBirth: patientData.dateOfBirth,
        address: patientData.address,
      },
      create: patientData,
    });
  }

  static async createAppointment(appointmentData: {
    patientId: string;
    service: string;
    preferredDate: Date;
    preferredTime: string;
    notes?: string;
  }) {
    return await prisma.appointment.create({
      data: appointmentData,
      include: {
        patient: true,
      },
    });
  }

  static async getAppointmentsByStatus(status?: string) {
    const whereClause = status ? { status: status as any } : {};
    
    return await prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async updateAppointmentStatus(
    appointmentId: string,
    status: string,
    actualDate?: Date,
    actualTime?: string,
    googleEventId?: string
  ) {
    return await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: status as any,
        actualDate,
        actualTime,
        googleEventId,
      },
      include: {
        patient: true,
      },
    });
  }

  static async getAppointmentById(appointmentId: string) {
    return await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: true,
      },
    });
  }

  static async getServices() {
    return await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  static async getApprovedReviews() {
    return await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createReview(reviewData: {
    patientName: string;
    rating: number;
    comment: string;
  }) {
    return await prisma.review.create({
      data: reviewData,
    });
  }
}