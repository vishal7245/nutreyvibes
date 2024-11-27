import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();


// GET - List all food items
export async function GET() {
  try {
    const foods = await prisma.food.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(foods);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch foods' }, { status: 500 });
  }
}

// POST - Create new food item
export async function POST(req: Request) {
    try {
      const session = await getServerSession();
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const data = await req.json();
      
      // Fetch the admin based on the session user's email
      const admin = await prisma.admin.findUnique({
        where: { email: session.user.email ?? '' }
      });
  
      if (!admin) {
        return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
      }
  
      const foodData = {
        name: data.name,
        alternateName: data.alternateName || null,
        protein: Number(data.protein) || 0,
        carbs: Number(data.carbs) || 0,
        fat: Number(data.fat) || 0,
        fiber: Number(data.fiber) || 0,
        calories: Number(data.calories) || 0,
        adminId: admin.id,
      };
  
      if (!foodData.name) {
        return NextResponse.json({ error: 'Food name is required' }, { status: 400 });
      }
  
      const food = await prisma.food.create({
        data: foodData,
      });
  
      return NextResponse.json(food);
    } catch (error) {
      console.error('Failed to create food:', error);
      return NextResponse.json({ error: 'Failed to create food' }, { status: 500 });
    }
  }