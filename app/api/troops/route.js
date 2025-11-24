import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const troops = await prisma.troops.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(troops);
  } catch (error) {
    console.error('Error fetching troops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch troops' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nama, kekuatan, desc } = await request.json();
    
    const newTroop = await prisma.troops.create({
      data: {
        nama,
        kekuatan: parseInt(kekuatan),
        desc
      }
    });
    
    return NextResponse.json(newTroop, { status: 201 });
  } catch (error) {
    console.error('Error creating troop:', error);
    return NextResponse.json(
      { error: 'Failed to create troop' },
      { status: 500 }
    );
  }
}