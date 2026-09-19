import { NextResponse } from 'next/server';
import { getEventsData, addEventItem } from '@/lib/events';

export async function GET() {
  try {
    const events = getEventsData();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error('Error getting events:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, titleMr, eventDate, eventTime, venue, venueMr, description, category, isActive } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Event title is required' },
        { status: 400 }
      );
    }

    const newEvent = addEventItem({
      title,
      titleMr,
      eventDate,
      eventTime,
      venue,
      venueMr,
      description,
      category,
      isActive,
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}