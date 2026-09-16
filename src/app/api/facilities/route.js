import { NextResponse } from 'next/server';
import { getFacilitiesData, addFacilityItem } from '@/lib/facilities';
import { getAdminSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';
    const category = searchParams.get('category');

    let facilities = getFacilitiesData();

    // If not asking for all (admin), only show active
    if (!all) {
      facilities = facilities.filter((f) => f.isActive);
    }

    if (category && category !== 'ALL') {
      facilities = facilities.filter((f) => f.category.toLowerCase() === category.toLowerCase());
    }

    facilities.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return NextResponse.json({ facilities });
  } catch (error) {
    console.error('Failed to get facilities:', error);
    return NextResponse.json({ error: 'Failed to fetch facilities' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.titleEn) {
      return NextResponse.json({ error: 'Facility English title is required' }, { status: 400 });
    }

    const newFacility = addFacilityItem(body);
    return NextResponse.json({ success: true, facility: newFacility });
  } catch (error) {
    console.error('Failed to add facility:', error);
    return NextResponse.json({ error: 'Failed to create facility' }, { status: 500 });
  }
}
