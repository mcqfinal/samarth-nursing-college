import { NextResponse } from 'next/server';
import { updateQuestionPaperItem, deleteQuestionPaperItem } from '@/lib/questionPapers';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updated = updateQuestionPaperItem(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Question paper not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, paper: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update question paper' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = deleteQuestionPaperItem(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Question paper not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Question paper deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to delete question paper' }, { status: 500 });
  }
}
