import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Reviews fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { patientName, rating, comment } = await request.json()

    if (!patientName || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        patientName,
        rating: parseInt(rating),
        comment,
        isApproved: false
      }
    })
    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Review creation error:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}