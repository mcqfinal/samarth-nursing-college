import fs from 'fs';
import path from 'path';

const noticesFilePath = path.join(process.cwd(), 'src', 'data', 'notices.json');

const defaultNotices = [
  {
    id: 'n1',
    title: 'Admissions Open for Academic Year 2026-27 (GNM, ANM & ADMLT)',
    content: 'Applications are invited for GNM (3 Years), ANM (2 Years) and ADMLT (1.5 Years) programs. Contact administration for prospectus and document verification.',
    category: 'Admission',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'n2',
    title: 'Hostel & Scholarship Guidance Desk Active',
    content: 'Students eligible for state government scholarships can contact the scholarship guidance desk for free assistance with online portal registration.',
    category: 'Scholarship',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getNoticesData() {
  try {
    if (!fs.existsSync(noticesFilePath)) {
      saveNoticesData(defaultNotices);
      return defaultNotices;
    }
    const data = fs.readFileSync(noticesFilePath, 'utf8');
    const parsed = JSON.parse(data || '[]');
    return parsed.length > 0 ? parsed : defaultNotices;
  } catch (err) {
    console.error('Error reading notices data:', err);
    return defaultNotices;
  }
}

export function saveNoticesData(notices) {
  try {
    const dir = path.dirname(noticesFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(noticesFilePath, JSON.stringify(notices, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing notices data:', err);
    return false;
  }
}

export function addNoticeItem(item) {
  const notices = getNoticesData();
  const newNotice = {
    id: `not_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: (item.title || '').trim(),
    content: item.content ? item.content.trim() : null,
    category: item.category || 'Admission',
    isActive: item.isActive !== undefined ? item.isActive : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notices.unshift(newNotice);
  saveNoticesData(notices);
  return newNotice;
}

export function updateNoticeItem(id, updates) {
  const notices = getNoticesData();
  const index = notices.findIndex((n) => n.id === id);
  if (index === -1) return null;

  notices[index] = {
    ...notices[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveNoticesData(notices);
  return notices[index];
}

export function deleteNoticeItem(id) {
  const notices = getNoticesData();
  const filtered = notices.filter((n) => n.id !== id);
  if (filtered.length === notices.length) return false;
  saveNoticesData(filtered);
  return true;
}
