import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const originalName = file.name || 'document.pdf';
    const isPdf =
      originalName.toLowerCase().endsWith('.pdf') ||
      file.type === 'application/pdf';

    if (!isPdf) {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are allowed (.pdf)' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Target directory: public/uploads/question-papers
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'question-papers');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Format clean safe filename
    const cleanBase = path
      .basename(originalName, path.extname(originalName))
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_');
    const timestamp = Date.now();
    const uniqueFileName = `${cleanBase}_${timestamp}.pdf`;
    const targetFilePath = path.join(uploadDir, uniqueFileName);

    // Write file to disk
    fs.writeFileSync(targetFilePath, buffer);

    // Compute friendly file size
    const sizeBytes = buffer.length;
    let fileSizeFormatted = '1.0 MB';
    if (sizeBytes < 1024 * 1024) {
      fileSizeFormatted = `${Math.round(sizeBytes / 1024)} KB`;
    } else {
      fileSizeFormatted = `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    const fileUrl = `/uploads/question-papers/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName: originalName,
      fileSize: fileSizeFormatted,
      storedName: uniqueFileName,
    });
  } catch (err) {
    console.error('Error uploading PDF:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to upload PDF file' },
      { status: 500 }
    );
  }
}
