import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { getNoticesData, addNoticeItem } from '@/lib/notices';

export async function GET() {
  if (process.env.DATABASE_URL) {
    try {
      const dbNotices = await prisma.notice.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      });
      if (dbNotices && dbNotices.length > 0) {
        return NextResponse.json({ notices: dbNotices });
      }
    } catch (error) {
      console.warn('Database error fetching notices, falling back to JSON storage:', error.message);
    }
  }

  const notices = getNoticesData();
  return NextResponse.json({ notices });
}

export async function POST(request) {
  try {
    const { title, content, category } = await request.json();
    if (!title) {
      return NextResponse.json({ error: 'Notice title is required' }, { status: 400 });
    }

    // 1. Always save to persistent JSON storage
    const newNotice = addNoticeItem({
      title: title.trim(),
      content: content ? content.trim() : null,
      category: category || 'Admission',
      isActive: true,
    });

    // 2. Also try database if configured
    if (process.env.DATABASE_URL) {
      try {
        await prisma.notice.create({
          data: {
            title: title.trim(),
            content: content ? content.trim() : null,
            category: category || 'Admission',
            isActive: true,
          },
        });
      } catch (dbErr) {
        console.warn('Database insert failed, persisted to JSON storage:', dbErr.message);
      }
    }

    return NextResponse.json({ success: true, notice: newNotice });
  } catch (error) {
    console.error('Create notice error:', error);
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}
