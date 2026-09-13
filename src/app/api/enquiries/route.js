import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

// In-memory fallback if database is not reachable
let memoryEnquiries = [];

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

    try {
      const enquiry = await prisma.enquiry.create({
        data: newEnquiryData,
      });
      return NextResponse.json({
        success: true,
        message: 'Enquiry submitted successfully! Our admissions counselor will contact you soon.',
        enquiry,
      });
    } catch (dbErr) {
      console.warn('Database unavailable, saving to memory fallback:', dbErr.message);
      const fallbackItem = {
        id: 'mem_' + Date.now(),
        ...newEnquiryData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryEnquiries.unshift(fallbackItem);
      return NextResponse.json({
        success: true,
        message: 'Enquiry received successfully! Our admissions counselor will contact you soon.',
        enquiry: fallbackItem,
      });
    }
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

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ enquiries });
  } catch (dbErr) {
    console.warn('Database error fetching enquiries, using fallback:', dbErr.message);
    let filtered = [...memoryEnquiries];
    if (course && course !== 'ALL') filtered = filtered.filter(e => e.course === course);
    if (status && status !== 'ALL') filtered = filtered.filter(e => e.status === status);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(e => 
        (e.name && e.name.toLowerCase().includes(q)) || 
        (e.phone && e.phone.includes(q))
      );
    }
    return NextResponse.json({ enquiries: filtered });
  }
}
