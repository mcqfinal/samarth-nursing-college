import fs from 'fs';
import path from 'path';

const facilitiesFilePath = path.join(process.cwd(), 'src', 'data', 'facilities.json');

export function getFacilitiesData() {
  try {
    if (!fs.existsSync(facilitiesFilePath)) {
      return [];
    }
    const data = fs.readFileSync(facilitiesFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading facilities data:', err);
    return [];
  }
}

export function saveFacilitiesData(facilities) {
  try {
    const dir = path.dirname(facilitiesFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(facilitiesFilePath, JSON.stringify(facilities, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing facilities data:', err);
    return false;
  }
}

export function addFacilityItem(item) {
  const facilities = getFacilitiesData();
  const newItem = {
    id: `fac-${Date.now()}`,
    titleEn: item.titleEn || 'New Campus Facility',
    titleMr: item.titleMr || item.titleEn || 'नवीन सुविधा',
    descEn: item.descEn || '',
    descMr: item.descMr || '',
    category: item.category || 'Campus',
    icon: item.icon || 'fa-building',
    color: item.color || '#0d3b66',
    bgLight: item.bgLight || '#e2e8f0',
    isActive: item.isActive !== undefined ? item.isActive : true,
    displayOrder: item.displayOrder || facilities.length + 1,
  };
  facilities.push(newItem);
  saveFacilitiesData(facilities);
  return newItem;
}

export function updateFacilityItem(id, updates) {
  const facilities = getFacilitiesData();
  const index = facilities.findIndex((f) => f.id === id);
  if (index === -1) return null;

  facilities[index] = {
    ...facilities[index],
    ...updates,
  };
  saveFacilitiesData(facilities);
  return facilities[index];
}

export function deleteFacilityItem(id) {
  const facilities = getFacilitiesData();
  const filtered = facilities.filter((f) => f.id !== id);
  if (filtered.length === facilities.length) return false;
  saveFacilitiesData(filtered);
  return true;
}
