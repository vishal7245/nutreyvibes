import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

// GET single food item
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const food = await prisma.food.findUnique({
      where: { id },
    });
    if (!food) {
      return NextResponse.json({ error: 'Food not found' }, { status: 404 });
    }
    return NextResponse.json(food);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch food' }, { status: 500 });
  }
}

// PUT - Update food item
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const food = await prisma.food.update({
      where: { id },
      data,
    });
    return NextResponse.json(food);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update food' }, { status: 500 });
  }
}

// DELETE - Delete food item
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.food.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Food deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete food' }, { status: 500 });
  }
}