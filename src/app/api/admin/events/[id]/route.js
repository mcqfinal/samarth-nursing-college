import { NextResponse } from 'next/server';
import { updateEventItem, deleteEventItem } from '@/lib/events';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const updated = updateEventItem(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, event: updated });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const deleted = deleteEventItem(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}