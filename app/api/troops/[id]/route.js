import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const troop = await prisma.troops.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!troop) {
      return NextResponse.json(
        { error: 'Troop not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(troop);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch troop' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { nama, kekuatan, desc } = await request.json();
    
    const updatedTroop = await prisma.troops.update({
      where: { id: parseInt(params.id) },
      data: {
        nama,
        kekuatan: parseInt(kekuatan),
        desc
      }
    });
    
    return NextResponse.json(updatedTroop);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update troop' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.troops.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({ message: 'Troop deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete troop' },
      { status: 500 }
    );
  }
}