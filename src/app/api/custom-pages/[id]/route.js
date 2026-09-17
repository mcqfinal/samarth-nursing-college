import { NextResponse } from 'next/server';
import { updateCustomPage, deleteCustomPage, getCustomPages } from '@/lib/customPages';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { titleEn, titleMr, headTitle, slug, descriptionEn, descriptionMr, imageUrl, status } = body;

    if (!titleEn || !slug) {
      return NextResponse.json({ error: 'Title (English) and Slug are required.' }, { status: 400 });
    }

    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    // Check duplicate slug (excluding current)
    const existing = getCustomPages();
    if (existing.some((p) => p.slug === safeSlug && p.id !== id)) {
      return NextResponse.json({ error: 'A page with this slug already exists.' }, { status: 409 });
    }

    const updated = updateCustomPage(id, {
      titleEn: titleEn.trim(),
      titleMr: titleMr?.trim() || titleEn.trim(),
      headTitle: headTitle?.trim() || titleEn.trim(),
      slug: safeSlug,
      descriptionEn: descriptionEn?.trim() || '',
      descriptionMr: descriptionMr?.trim() || '',
      imageUrl: imageUrl || '',
      status: status || 'published',
    });

    if (!updated) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }

    return NextResponse.json({ page: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update page', detail: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = deleteCustomPage(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete page', detail: err.message }, { status: 500 });
  }
}
