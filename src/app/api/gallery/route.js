import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

const fallbackGallery = Array.from({ length: 11 }, (_, i) => ({
  id: `g${i + 1}`,
  title: `Clinical & Campus Activity ${i + 1}`,
  imageUrl: `/gallery/gallery-${i + 1}.jpg`,
  category: 'Campus',
  displayOrder: i + 1,
}));

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json({ items: items.length ? items : fallbackGallery });
  } catch (error) {
    return NextResponse.json({ items: fallbackGallery });
  }
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, imageUrl, category, displayOrder } = await request.json();
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title: title || 'Campus Photo',
        imageUrl,
        category: category || 'Campus',
        displayOrder: parseInt(displayOrder) || 0,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Create gallery item error:', error);
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
