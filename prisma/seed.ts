import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial services
  const services = await prisma.service.createMany({
    data: [
      {
        name: 'Regular Cleaning',
        description: 'Professional dental cleaning and examination',
        duration: 60,
        price: 120.00,
      },
      {
        name: 'Teeth Whitening',
        description: 'Professional teeth whitening treatment',
        duration: 90,
        price: 300.00,
      },
      {
        name: 'Dental Filling',
        description: 'Composite or amalgam dental fillings',
        duration: 45,
        price: 180.00,
      },
      {
        name: 'Root Canal',
        description: 'Root canal treatment',
        duration: 120,
        price: 800.00,
      },
      {
        name: 'Crown Placement',
        description: 'Dental crown installation',
        duration: 90,
        price: 1200.00,
      },
      {
        name: 'Dental Implant',
        description: 'Dental implant procedure',
        duration: 180,
        price: 2500.00,
      },
    ],
  });

  // Create sample reviews
  const reviews = await prisma.review.createMany({
    data: [
      {
        patientName: 'John Smith',
        rating: 5,
        comment: 'Excellent service! Dr. Johnson is very professional and gentle. The office is clean and modern.',
        isApproved: true,
      },
      {
        patientName: 'Sarah Davis',
        rating: 5,
        comment: 'Best dental experience I\'ve ever had. The staff is friendly and Dr. Johnson explained everything clearly.',
        isApproved: true,
      },
      {
        patientName: 'Michael Brown',
        rating: 4,
        comment: 'Great dental care. Very satisfied with my teeth cleaning. Would recommend to others.',
        isApproved: true,
      },
      {
        patientName: 'Emily Wilson',
        rating: 5,
        comment: 'Amazing results from my teeth whitening treatment. Dr. Johnson and her team are fantastic!',
        isApproved: true,
      },
    ],
  });

  console.log('Database seeded successfully!');
  console.log(`Created ${services.count} services`);
  console.log(`Created ${reviews.count} reviews`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });