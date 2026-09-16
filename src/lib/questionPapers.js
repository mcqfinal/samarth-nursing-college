import fs from 'fs';
import path from 'path';

const papersFilePath = path.join(process.cwd(), 'src', 'data', 'questionPapers.json');

export function getQuestionPapersData() {
  try {
    if (!fs.existsSync(papersFilePath)) {
      return [];
    }
    const data = fs.readFileSync(papersFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading question papers data:', err);
    return [];
  }
}

export function saveQuestionPapersData(papers) {
  try {
    const dir = path.dirname(papersFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(papersFilePath, JSON.stringify(papers, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing question papers data:', err);
    return false;
  }
}

export function addQuestionPaperItem(item) {
  const papers = getQuestionPapersData();
  const nextId = papers.length > 0 ? Math.max(...papers.map((p) => Number(p.id) || 0)) + 1 : 1;
  const newItem = {
    id: nextId,
    course: (item.course || 'gnm').toLowerCase(),
    courseLabel: item.courseLabel || 'GNM',
    year: String(item.year || new Date().getFullYear()),
    session: item.session || 'Winter 2025',
    subjectEn: item.subjectEn || '',
    subjectMr: item.subjectMr || item.subjectEn || '',
    board: item.board || 'MSBNPE',
    paperCode: item.paperCode || `QP-${nextId}`,
    fileSize: item.fileSize || '1.5 MB',
    fileUrl: item.fileUrl || '/admissions/fee-structure.pdf',
    createdAt: new Date().toISOString(),
  };
  papers.unshift(newItem);
  saveQuestionPapersData(papers);
  return newItem;
}

export function updateQuestionPaperItem(id, updates) {
  const papers = getQuestionPapersData();
  const index = papers.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;

  papers[index] = {
    ...papers[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveQuestionPapersData(papers);
  return papers[index];
}

export function deleteQuestionPaperItem(id) {
  const papers = getQuestionPapersData();
  const filtered = papers.filter((p) => String(p.id) !== String(id));
  if (filtered.length === papers.length) return false;
  saveQuestionPapersData(filtered);
  return true;
}
