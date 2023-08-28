import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { image, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    if (
      !image ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required field/s', { status: 400 });
    }

    //CHECK SUBSCRIPTION

    const celeb = await prismadb.celeb.create({
      data: {
        userId: user.id,
        username: user.firstName,
        name,
        image,
        description,
        instructions,
        seed,
        categoryId,
      },
    });

    return NextResponse.json(celeb);
  } catch (error) {
    console.log('[CELEB_POST]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

