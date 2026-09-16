import fs from 'fs';
import path from 'path';

const pagesFilePath = path.join(process.cwd(), 'src', 'data', 'pagesContent.json');

export function getAllPagesContent() {
  try {
    if (!fs.existsSync(pagesFilePath)) {
      return {};
    }
    const raw = fs.readFileSync(pagesFilePath, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (err) {
    console.error('Error reading pagesContent.json:', err);
    return {};
  }
}

export function getPageContent(pageKey) {
  const all = getAllPagesContent();
  return all[pageKey] || null;
}

export function saveAllPagesContent(data) {
  try {
    const dir = path.dirname(pagesFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(pagesFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving pagesContent.json:', err);
    return false;
  }
}

export function updatePageContent(pageKey, updates) {
  const all = getAllPagesContent();
  if (!all[pageKey]) {
    all[pageKey] = {
      title: pageKey,
      category: 'Custom',
      path: `/${pageKey}`,
      ...updates,
    };
  } else {
    all[pageKey] = {
      ...all[pageKey],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
  }
  saveAllPagesContent(all);
  return all[pageKey];
}

export function resetPageContent(pageKey) {
  // Re-read or return updated
  return getPageContent(pageKey);
}
