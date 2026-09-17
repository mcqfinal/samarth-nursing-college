import { NextResponse } from 'next/server';
import { getCustomPages, addCustomPage } from '@/lib/customPages';

export async function GET() {
  try {
    const pages = getCustomPages();
    return NextResponse.json({ pages });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load pages', detail: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { titleEn, titleMr, slug, descriptionEn, descriptionMr, imageUrl, status } = body;

    if (!titleEn || !slug) {
      return NextResponse.json({ error: 'Title (English) and Slug are required.' }, { status: 400 });
    }

    // Ensure slug is URL-safe
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    // Check duplicate slug
    const existing = getCustomPages();
    if (existing.some((p) => p.slug === safeSlug)) {
      return NextResponse.json({ error: 'A page with this slug already exists.' }, { status: 409 });
    }

    const newPage = addCustomPage({
      titleEn: titleEn.trim(),
      titleMr: titleMr?.trim() || titleEn.trim(),
      slug: safeSlug,
      descriptionEn: descriptionEn?.trim() || '',
      descriptionMr: descriptionMr?.trim() || descriptionEn?.trim() || '',
      imageUrl: imageUrl || '',
      status: status || 'published',
    });

    return NextResponse.json({ page: newPage }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create page', detail: err.message }, { status: 500 });
  }
}
