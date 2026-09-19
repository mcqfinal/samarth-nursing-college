import fs from 'fs';
import path from 'path';

const enquiriesFilePath = path.join(process.cwd(), 'src', 'data', 'enquiries.json');

export function getEnquiriesData() {
  try {
    if (!fs.existsSync(enquiriesFilePath)) {
      return [];
    }
    const data = fs.readFileSync(enquiriesFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading enquiries data:', err);
    return [];
  }
}

export function saveEnquiriesData(enquiries) {
  try {
    const dir = path.dirname(enquiriesFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(enquiriesFilePath, JSON.stringify(enquiries, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing enquiries data:', err);
    return false;
  }
}

export function addEnquiryItem(item) {
  const enquiries = getEnquiriesData();
  const newItem = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: (item.name || '').trim(),
    phone: (item.phone || '').trim(),
    email: item.email ? item.email.trim() : null,
    course: item.course || 'GNM',
    message: item.message ? item.message.trim() : '',
    status: item.status || 'NEW',
    notes: item.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  enquiries.unshift(newItem);
  saveEnquiriesData(enquiries);
  return newItem;
}

export function updateEnquiryItem(id, updates) {
  const enquiries = getEnquiriesData();
  const index = enquiries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  enquiries[index] = {
    ...enquiries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveEnquiriesData(enquiries);
  return enquiries[index];
}

export function deleteEnquiryItem(id) {
  const enquiries = getEnquiriesData();
  const filtered = enquiries.filter((e) => e.id !== id);
  if (filtered.length === enquiries.length) return false;
  saveEnquiriesData(filtered);
  return true;
}
