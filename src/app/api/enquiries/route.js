import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { getEnquiriesData, addEnquiryItem } from '@/lib/enquiries';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, course, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required' },
        { status: 400 }
      );
    }

    const newEnquiryData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      course: course || 'GNM',
      message: message ? message.trim() : '',
      status: 'NEW',
    };

    // 1. Always save to persistent JSON file
    const savedEnquiry = addEnquiryItem(newEnquiryData);

    // 2. Also try saving to Database if configured
    if (process.env.DATABASE_URL) {
      try {
        await prisma.enquiry.create({
          data: newEnquiryData,
        });
      } catch (dbErr) {
        console.warn('Database error, persisted to JSON storage:', dbErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully! Our admissions counselor will contact you soon.',
      enquiry: savedEnquiry,
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry. Please call us directly at 9689486570.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const course = searchParams.get('course');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  if (process.env.DATABASE_URL) {
    try {
      const where = {};
      if (course && course !== 'ALL') {
        where.course = course;
      }
      if (status && status !== 'ALL') {
        where.status = status;
      }
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ];
      }

      const dbEnquiries = await prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      if (dbEnquiries && dbEnquiries.length > 0) {
        return NextResponse.json({ enquiries: dbEnquiries });
      }
    } catch (dbErr) {
      console.warn('Database query failed, using JSON storage:', dbErr.message);
    }
  }

  let filtered = getEnquiriesData();
  if (course && course !== 'ALL') filtered = filtered.filter(e => e.course === course);
  if (status && status !== 'ALL') filtered = filtered.filter(e => e.status === status);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(e => 
      (e.name && e.name.toLowerCase().includes(q)) || 
      (e.phone && e.phone.includes(q)) ||
      (e.email && e.email.toLowerCase().includes(q))
    );
  }
  return NextResponse.json({ enquiries: filtered });
}
