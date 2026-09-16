import { NextResponse } from 'next/server';
import { getQuestionPapersData, addQuestionPaperItem } from '@/lib/questionPapers';

export async function GET() {
  try {
    const papers = getQuestionPapersData();
    return NextResponse.json({ success: true, papers });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to load question papers' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.subjectEn && !body.subjectMr) {
      return NextResponse.json({ success: false, error: 'Subject is required' }, { status: 400 });
    }
    const newItem = addQuestionPaperItem(body);
    return NextResponse.json({ success: true, paper: newItem }, { status: 201 });
  } catch (err) {
    console.error('Error creating question paper:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to create question paper' }, { status: 500 });
  }
}
