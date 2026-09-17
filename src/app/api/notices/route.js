import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

const fallbackNotices = [
  {
    id: 'n1',
    title: 'Admissions Open for Academic Year 2026-27 (GNM, ANM & ADMLT)',
    content: 'Applications are invited for GNM (3 Years), ANM (2 Years) and ADMLT (1.5 Years) programs. Contact administration for prospectus and document verification.',
    category: 'Admission',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'n2',
    title: 'Hostel & Scholarship Guidance Desk Active',
    content: 'Students eligible for state government scholarships can contact the scholarship guidance desk for free assistance with online portal registration.',
    category: 'Scholarship',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ notices: fallbackNotices });
  }

  try {
    const notices = await prisma.notice.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ notices: notices.length ? notices : fallbackNotices });
  } catch (error) {
    return NextResponse.json({ notices: fallbackNotices });
  }
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, content, category } = await request.json();
    if (!title) {
      return NextResponse.json({ error: 'Notice title is required' }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        content: content ? content.trim() : null,
        category: category || 'Admission',
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, notice });
  } catch (error) {
    console.error('Create notice error:', error);
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}
