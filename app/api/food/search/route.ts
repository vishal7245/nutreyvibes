import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    const foods = await prisma.food.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { alternateName: { contains: search, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        protein: true,
        carbs: true,
        fat: true,
        fiber: true,
        calories: true,
      },
      orderBy: {
        name: 'asc',
      },
      take: 100, // Limit results for better performance
    });

    return NextResponse.json({ foods });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search foods' }, 
      { status: 500 }
    );
  }
}