import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { updateEnquiryItem, deleteEnquiryItem } from '@/lib/enquiries';

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

    let updated = null;

    if (process.env.DATABASE_URL) {
      try {
        updated = await prisma.enquiry.update({
          where: { id },
          data,
        });
      } catch (dbErr) {
        console.warn('Database update failed, updating JSON storage:', dbErr.message);
      }
    }

    if (!updated) {
      updated = updateEnquiryItem(id, data);
    }

    if (!updated) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

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
    if (process.env.DATABASE_URL) {
      try {
        await prisma.enquiry.delete({
          where: { id },
        });
      } catch (dbErr) {
        console.warn('Database delete failed, deleting from JSON storage:', dbErr.message);
      }
    }

    deleteEnquiryItem(id);
    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
