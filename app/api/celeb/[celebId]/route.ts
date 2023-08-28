import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { celebId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { image, name, description, instructions, seed, categoryId } = body;

    if (!params.celebId) {
      return new NextResponse('Celeb ID is required', { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
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

    const celeb = await prismadb.celeb.update({
      where: {
        id: params.celebId,
      },
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
    console.log('[CELEB_PATCH]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { celebId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const celeb = await prismadb.celeb.delete({
      where: {
        userId,
        id: params.celebId,
      },
    });

    return NextResponse.json(celeb);
  } catch (error: any) {
    console.log('[DELETE CELEB]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
