import { NextResponse } from 'next/server';

// Static list of dental services offered by the practice
const services = [
  {
    id: '1',
    name: 'General Checkup',
    description: 'Comprehensive dental examination including oral health assessment and professional cleaning.',
    duration: 45,
    price: 80,
  },
  {
    id: '2',
    name: 'Teeth Whitening',
    description: 'Professional teeth whitening treatment for a brighter, more radiant smile.',
    duration: 60,
    price: 250,
  },
  {
    id: '3',
    name: 'Dental Implants',
    description: 'Permanent tooth replacement solution with natural-looking results.',
    duration: 90,
    price: 2500,
  },
  {
    id: '4',
    name: 'Orthodontics',
    description: 'Teeth alignment solutions including clear aligners and traditional braces.',
    duration: 60,
    price: 150,
  },
  {
    id: '5',
    name: 'Root Canal Treatment',
    description: 'Pain-free root canal therapy to save damaged or infected teeth.',
    duration: 90,
    price: 800,
  },
  {
    id: '6',
    name: 'Dental Crowns',
    description: 'Custom-crafted crowns to restore damaged teeth to their natural appearance.',
    duration: 60,
    price: 600,
  },
];

export async function GET() {
  return NextResponse.json(services);
}
