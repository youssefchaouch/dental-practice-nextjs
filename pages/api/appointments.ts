import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, dateOfBirth, address, service, preferredDate, preferredTime, notes } = req.body;
    try {
      const appointment = await prisma.appointment.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          address,
          service,
          preferredDate,
          preferredTime,
          notes,
          status: 'pending', // You can adjust status logic as needed
        },
      });
      res.status(201).json(appointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  } else {
    res.status(405).end();
  }
}
