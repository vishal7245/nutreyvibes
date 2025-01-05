import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();



// GET - List all diet plans
export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the admin based on the session user's email
    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email ?? '' }
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    const dietPlans = await prisma.dietPlan.findMany({
      where: { adminId: admin.id },
      orderBy: { createdAt: 'desc' },
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

    return NextResponse.json(dietPlans);
  } catch (error) {
    console.error('Failed to fetch diet plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch diet plans' }, 
      { status: 500 }
    );
  }
}

// POST - Create new diet plan
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email ?? '' },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    const dietPlan = await prisma.dietPlan.create({
      data: {
        name: data.name,
        adminId: admin.id,
        meals: {
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
    console.error('Failed to create diet plan:', error);
    return NextResponse.json({ error: 'Failed to create diet plan' }, { status: 500 });
  }
}