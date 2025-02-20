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
    console.log('Updating plan with data:', data); // Debug log

    const dietPlan = await prisma.dietPlan.update({
      where: { id },
      data: {
        name: data.name,
        meals: {
          deleteMany: {},
          create: data.meals.map((meal: any) => ({
            name: meal.name,
            time: meal.time,
            comment: meal.comment || null,
            customFoods: meal.customFoods || null, // Make sure this is properly handled
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
      include: {
        meals: {
          include: {
            items: {
              include: {
                food: true
              }
            }
          }
        }
      }
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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dietPlan = await prisma.dietPlan.findUnique({
      where: { id },
      include: {
        meals: {
          select: {
            id: true,
            name: true,
            time: true,
            comment: true,
            customFoods: true,
            items: {
              include: {
                food: true
              }
            }
          }
        }
      }
    });

    if (!dietPlan) {
      return NextResponse.json({ error: 'Diet plan not found' }, { status: 404 });
    }

    return NextResponse.json(dietPlan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch diet plan' }, { status: 500 });
  }
}