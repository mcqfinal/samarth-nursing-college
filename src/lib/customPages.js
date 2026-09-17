import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'customPages.json');

export function getCustomPages() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomPages(pages) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(pages, null, 2), 'utf8');
}

export function addCustomPage(pageData) {
  const pages = getCustomPages();
  const newPage = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'published',
    ...pageData,
  };
  pages.push(newPage);
  saveCustomPages(pages);
  return newPage;
}

export function updateCustomPage(id, pageData) {
  const pages = getCustomPages();
  const idx = pages.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  pages[idx] = { ...pages[idx], ...pageData, id, updatedAt: new Date().toISOString() };
  saveCustomPages(pages);
  return pages[idx];
}

export function deleteCustomPage(id) {
  const pages = getCustomPages();
  const filtered = pages.filter((p) => p.id !== id);
  saveCustomPages(filtered);
  return filtered.length < pages.length;
}

export function getCustomPageBySlug(slug) {
  const pages = getCustomPages();
  return pages.find((p) => p.slug === slug) || null;
}
