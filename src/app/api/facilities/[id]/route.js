import { NextResponse } from 'next/server';
import { updateFacilityItem, deleteFacilityItem } from '@/lib/facilities';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const updates = await request.json();
    const updated = updateFacilityItem(id, updates);

    if (!updated) {
      return NextResponse.json({ error: 'Facility not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, facility: updated });
  } catch (error) {
    console.error('Failed to update facility:', error);
    return NextResponse.json({ error: 'Failed to update facility' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const success = deleteFacilityItem(id);
    if (!success) {
      return NextResponse.json({ error: 'Facility not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Facility deleted' });
  } catch (error) {
    console.error('Failed to delete facility:', error);
    return NextResponse.json({ error: 'Failed to delete facility' }, { status: 500 });
  }
}
