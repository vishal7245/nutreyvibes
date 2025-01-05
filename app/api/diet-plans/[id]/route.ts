import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

// PUT - Update diet plan
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const dietPlan = await prisma.dietPlan.update({
      where: { id },
      data: {
        name: data.name,
        meals: {
          deleteMany: {},
          create: data.meals.map((meal: any) => ({
            name: meal.name,
            time: meal.time,
            comment: meal.comment,
            items: {
              create: meal.items.map((item: any) => ({
                quantity: item.quantity,
                unit: item.unit,
                foodId: item.foodId,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(dietPlan);
  } catch (error) {
    console.error('Failed to update diet plan:', error);
    return NextResponse.json({ error: 'Failed to update diet plan' }, { status: 500 });
  }
}

// DELETE - Delete diet plan
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.dietPlan.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Diet plan deleted successfully' });
  } catch (error) {
    console.error('Failed to delete diet plan:', error);
    return NextResponse.json({ error: 'Failed to delete diet plan' }, { status: 500 });
  }
}