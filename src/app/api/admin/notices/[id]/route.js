import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { updateNoticeItem, deleteNoticeItem } from '@/lib/notices';

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

    let updated = null;

    if (process.env.DATABASE_URL) {
      try {
        updated = await prisma.notice.update({
          where: { id },
          data,
        });
      } catch (dbErr) {
        console.warn('Database update failed, updating JSON storage:', dbErr.message);
      }
    }

    if (!updated) {
      updated = updateNoticeItem(id, data);
    }

    if (!updated) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, notice: updated });
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
    if (process.env.DATABASE_URL) {
      try {
        await prisma.notice.delete({
          where: { id },
        });
      } catch (dbErr) {
        console.warn('Database delete failed, deleting from JSON storage:', dbErr.message);
      }
    }

    deleteNoticeItem(id);
    return NextResponse.json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    console.error('Delete notice error:', error);
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}
