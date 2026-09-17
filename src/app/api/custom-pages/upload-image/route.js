import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';


export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, WEBP, GIF images are allowed.' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Image must be under 10MB.' }, { status: 400 });
    }

    const ext = file.name.split('.').pop().toLowerCase();
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `page_img_${Date.now()}_${safeName}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'custom-pages');
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({
      imageUrl: `/uploads/custom-pages/${filename}`,
      filename,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed', detail: err.message }, { status: 500 });
  }
}
