import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const { status, notes } = await request.json();

    const data = {};
    if (status) data.status = status;
    if (notes !== undefined) data.notes = notes;

    const updated = await prisma.enquiry.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error('Update enquiry error:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    await prisma.enquiry.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
