import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch only approved reviews
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(reviews);
  } else if (req.method === 'POST') {
    // Create a new review (not approved by default)
    const { patientName, rating, comment } = req.body;
    const newReview = await prisma.review.create({
      data: {
        patientName,
        rating,
        comment,
        isApproved: false // You can change this logic as needed
      }
    });
    res.status(201).json(newReview);
  } else {
    res.status(405).end();
  }
}