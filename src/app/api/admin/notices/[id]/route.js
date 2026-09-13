import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const { title, content, category, isActive } = await request.json();
    const data = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;
    if (category !== undefined) data.category = category;
    if (isActive !== undefined) data.isActive = isActive;

    const notice = await prisma.notice.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, notice });
  } catch (error) {
    console.error('Update notice error:', error);
    return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    await prisma.notice.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    console.error('Delete notice error:', error);
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}
