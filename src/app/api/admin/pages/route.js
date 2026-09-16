import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getAllPagesContent, getPageContent, updatePageContent } from '@/lib/pagesContent';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get('page');

    if (pageKey) {
      const pageData = getPageContent(pageKey);
      if (!pageData) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, pageKey, data: pageData });
    }

    const allPages = getAllPagesContent();
    return NextResponse.json({ success: true, pages: allPages });
  } catch (error) {
    console.error('GET /api/admin/pages error:', error);
    return NextResponse.json({ error: 'Failed to fetch pages content' }, { status: 500 });
  }
}

export async function PATCH(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { pageKey, data, updates } = body;

    if (!pageKey) {
      return NextResponse.json({ error: 'Page key is required' }, { status: 400 });
    }

    const contentUpdates = data || updates;
    if (!contentUpdates || typeof contentUpdates !== 'object') {
      return NextResponse.json({ error: 'Valid content data is required' }, { status: 400 });
    }

    const updatedPage = updatePageContent(pageKey, contentUpdates);
    return NextResponse.json({ success: true, pageKey, data: updatedPage });
  } catch (error) {
    console.error('PATCH /api/admin/pages error:', error);
    return NextResponse.json({ error: 'Failed to update page content' }, { status: 500 });
  }
}

export async function POST(request) {
  // Alias to PATCH for flexibility
  return PATCH(request);
}
