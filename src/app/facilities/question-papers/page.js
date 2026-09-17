'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import defaultPapers from '@/data/questionPapers.json';

export default function QuestionPapersPage() {
  const { language } = useLanguage();
  const isMarathi = language === 'mr';

  const [papers, setPapers] = useState(defaultPapers || []);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch latest question papers from API (syncs with admin changes)
  useEffect(() => {
    async function fetchPapers() {
      try {
        const res = await fetch('/api/question-papers');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPapers(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch updated question papers:', err);
      }
    }
    fetchPapers();
  }, []);

  const filteredPapers = papers.filter((p) => {
    const matchCourse = selectedCourse === 'all' || p.course === selectedCourse;
    const matchYear = selectedYear === 'all' || String(p.year) === String(selectedYear);

    const subject = isMarathi
      ? (p.subjectMr || p.subjectEn || p.subject || '')
      : (p.subjectEn || p.subjectMr || p.subject || '');

    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      q === '' ||
      subject.toLowerCase().includes(q) ||
      (p.subjectEn && p.subjectEn.toLowerCase().includes(q)) ||
      (p.subjectMr && p.subjectMr.toLowerCase().includes(q)) ||
      (p.paperCode && p.paperCode.toLowerCase().includes(q)) ||
      (p.session && p.session.toLowerCase().includes(q)) ||
      (p.board && p.board.toLowerCase().includes(q));

    return matchCourse && matchYear && matchQuery;
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      {/* 1. HERO HEADER */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d3b66 0%, #0369a1 100%)',
          color: '#ffffff',
          padding: '60px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 209, 102, 0.2)',
              border: '1px solid #ffd166',
              color: '#ffd166',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            <i className="fas fa-file-alt"></i> {isMarathi ? 'विद्यार्थी सुविधा केंद्र' : 'Student Study Resource'}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 12px', color: '#ffffff' }}>
            {isMarathi ? 'मागील वर्षांच्या प्रश्नपत्रिका (Old Question Papers)' : 'Previous Year Question Papers'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#e0f2fe', maxWidth: '750px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            {isMarathi
              ? 'GNM, ANM आणि ADMLT अभ्यासक्रमांच्या MSBNPE व MSBTE बोर्डाच्या मागील वर्षांच्या अधिकृत प्रश्नपत्रिका मोफत डाऊनलोड करा.'
              : 'Download official previous years board examination question papers for GNM, ANM, and ADMLT courses (MSBNPE & MSBTE).'}
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/facilities"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.92rem',
              }}
            >
              <i className="fas fa-th-large" style={{ color: '#ffd166' }}></i> {isMarathi ? 'सर्व सुविधा पहा' : 'All Facilities'}
            </Link>
            <Link
              href="/courses/syllabus"
              style={{
                background: '#ffd166',
                color: '#0d3b66',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
              }}
            >
              <i className="fas fa-book"></i> {isMarathi ? 'अभ्यासक्रम (Syllabus) पहा' : 'View Syllabus Structure'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <section style={{ maxWidth: '1100px', margin: '-28px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%' }}>
            <i
              className="fas fa-search"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
                fontSize: '1rem',
              }}
            ></i>
            <input
              type="text"
              placeholder={isMarathi ? 'विषयाचे नाव किंवा कोड शोधा (उदा. Anatomy, GNM-101, Midwifery)...' : 'Search by subject name, paper code (e.g. Anatomy, GNM-101)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 46px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border 0.2s ease',
                background: '#f8fafc',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            {/* Course Filters */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: isMarathi ? 'सर्व कोर्सेस' : 'All Courses' },
                { id: 'gnm', label: 'GNM' },
                { id: 'anm', label: 'ANM' },
                { id: 'admlt', label: 'ADMLT' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCourse(c.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    background: selectedCourse === c.id ? '#0d3b66' : '#f1f5f9',
                    color: selectedCourse === c.id ? '#ffffff' : '#475569',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Year Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>
                <i className="far fa-calendar" style={{ marginRight: '4px' }}></i> {isMarathi ? 'वर्ष:' : 'Year:'}
              </span>
              {['all', '2025', '2024', '2023'].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    background: selectedYear === yr ? '#ffd166' : '#f1f5f9',
                    color: selectedYear === yr ? '#0d3b66' : '#64748b',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {yr === 'all' ? (isMarathi ? 'सर्व' : 'All') : yr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAPERS LIST */}
      <section style={{ maxWidth: '1100px', margin: '40px auto 60px', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#0d3b66' }}>
            <i className="fas fa-folder-open" style={{ marginRight: '10px', color: '#0284c7' }}></i>
            {isMarathi ? 'उपलब्ध प्रश्नपत्रिका' : 'Available Question Papers'}
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b', marginLeft: '10px' }}>
              ({filteredPapers.length} {isMarathi ? 'प्रश्नपत्रिका आढळल्या' : 'papers found'})
            </span>
          </h2>
        </div>

        {filteredPapers.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <i className="fas fa-search" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '16px' }}></i>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#475569', margin: '0 0 8px' }}>
              {isMarathi ? 'कोणतीही प्रश्नपत्रिका सापडली नाही' : 'No Question Papers Found'}
            </h3>
            <p style={{ color: '#94a3b8', margin: '0 0 16px', fontSize: '0.9rem' }}>
              {isMarathi ? 'कृपया फिल्टर बदला किंवा इतर शब्द वापरून शोधा.' : 'Try changing your filter selection or search keywords.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCourse('all');
                setSelectedYear('all');
                setSearchQuery('');
              }}
              style={{
                background: '#0d3b66',
                color: '#ffffff',
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              {isMarathi ? 'सर्व फिल्टर्स रीसेट करा' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div>
                  {/* Card Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background:
                          paper.course === 'gnm'
                            ? '#dbeafe'
                            : paper.course === 'anm'
                            ? '#dcfce7'
                            : '#f3e8ff',
                        color:
                          paper.course === 'gnm'
                            ? '#1e40af'
                            : paper.course === 'anm'
                            ? '#166534'
                            : '#6b21a8',
                      }}
                    >
                      {paper.courseLabel}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: '#f1f5f9',
                        color: '#475569',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      {paper.board} • {paper.session}
                    </span>
                  </div>

                  {/* Subject Name */}
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#0d3b66',
                      margin: '0 0 10px',
                      lineHeight: 1.4,
                      minHeight: '2.8rem',
                    }}
                  >
                    {isMarathi
                      ? (paper.subjectMr || paper.subjectEn || paper.subject)
                      : (paper.subjectEn || paper.subjectMr || paper.subject)}
                  </h3>

                  {/* Paper Code & Size */}
                  <div style={{ display: 'flex', gap: '14px', fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>
                    <span>
                      <strong style={{ color: '#334155' }}>Code:</strong> {paper.paperCode}
                    </span>
                    <span>
                      <strong style={{ color: '#334155' }}>Size:</strong> {paper.fileSize}
                    </span>
                  </div>
                </div>

                {/* Download CTA Button */}
                <a
                  href={paper.fileUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#0d3b66',
                    color: '#ffffff',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <i className="fas fa-file-download" style={{ color: '#ffd166' }}></i>
                  {isMarathi ? 'प्रश्नपत्रिका डाउनलोड करा (PDF)' : 'Download Paper (PDF)'}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* 4. EXAM INSTRUCTIONS & NOTICE CARD */}
        <div
          style={{
            marginTop: '40px',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <i className="fas fa-info-circle" style={{ color: '#0284c7', fontSize: '1.25rem' }}></i>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0d3b66' }}>
              {isMarathi ? 'परीक्षेसाठी महत्त्वाची सूचना व मार्गदर्शन' : 'Important Examination Guidelines'}
            </h4>
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '0.92rem', lineHeight: 1.8 }}>
            <li>
              {isMarathi
                ? 'वरील सर्व प्रश्नपत्रिका MSBNPE (महाराष्ट्र नर्सिंग परिषद) व MSBTE नियमावलीनुसार आहेत.'
                : 'All question papers strictly follow the official MSBNPE and MSBTE curriculum and marking scheme.'}
            </li>
            <li>
              {isMarathi
                ? 'विद्यार्थ्यांनी मागील वर्षांचे प्रश्न सोडवून उत्तर लेखनाचा सराव करावा.'
                : 'Students are encouraged to practice previous year question solving to improve time management.'}
            </li>
            <li>
              {isMarathi
                ? 'अधिक प्रश्नपत्रिका किंवा मॉडेल उत्तरपत्रिकांसाठी कॉलेज लायब्ररी / अभ्यासिका विभागाशी संपर्क साधा.'
                : 'For model answer sheets and additional reference sets, please visit the central college library.'}
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
