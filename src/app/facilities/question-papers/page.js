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
          const list = Array.isArray(data) ? data : (data.papers || []);
          if (Array.isArray(list) && list.length > 0) {
            setPapers(list);
          }
        }
      } catch (err) {
        console.error('Failed to fetch updated question papers:', err);
      }
    }
    fetchPapers();
  }, []);

  // Standardized metadata mapping for crisp, clean presentation
  const paperMetadataMap = {
    '1026': {
      paperNum: 'Paper I',
      titleEn: 'Bio-Sciences',
      titleMr: 'बायो-सायन्सेस (Paper I)',
      subtitleEn: 'Anatomy, Physiology & Microbiology',
      subtitleMr: 'शरीररचनाशास्त्र, शरीरक्रियाशास्त्र व सूक्ष्मजीवशास्त्र',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    '1027': {
      paperNum: 'Paper II',
      titleEn: 'Behavioural Sciences',
      titleMr: 'बिहेवियरल सायन्सेस (Paper II)',
      subtitleEn: 'Psychology & Sociology',
      subtitleMr: 'मानसशास्त्र व समाजशास्त्र',
      color: '#0d3b66',
      bgLight: '#e2e8f0',
    },
    '1028': {
      paperNum: 'Paper III',
      titleEn: 'Nursing Foundation',
      titleMr: 'नर्सिंग फाउंडेशन (Paper III)',
      subtitleEn: 'Fundamentals of Nursing & First Aid',
      subtitleMr: 'फंडामेंटल्स ऑफ नर्सिंग व प्रथमोपचार',
      color: '#0369a1',
      bgLight: '#e0f2fe',
    },
    '1029': {
      paperNum: 'Paper IV',
      titleEn: 'Community Health Nursing',
      titleMr: 'कम्युनिटी हेल्थ नर्सिंग (Paper IV)',
      subtitleEn: 'Community Health I, Environmental Hygiene & Nutrition',
      subtitleMr: 'पर्यावरण स्वच्छता, आरोग्य शिक्षण व आहारशास्त्र',
      color: '#0891b2',
      bgLight: '#cffafe',
    },
  };

  // Upcoming courses definition (GNM 2nd Year & ANM in process)
  const upcomingCourses = [
    {
      id: 'upcoming-gnm-2',
      code: 'GNM-II',
      paperNum: 'Year II',
      courseKey: 'gnm-2',
      courseLabel: isMarathi ? 'GNM २ रे वर्ष' : 'GNM 2nd Year',
      titleEn: 'Medical-Surgical & Mental Health Nursing',
      titleMr: 'वैद्यकीय-शस्त्रक्रिया व मानसिक आरोग्य परिचर्या',
      subtitleEn: 'Medical Surgical I & II, Mental Health & Child Health',
      subtitleMr: 'मेडिकल सर्जिकल १ व २, मेंटल हेल्थ व बाल आरोग्य परिचर्या',
      board: 'MSBNPE',
      paperCount: isMarathi ? '४ विषय' : '4 Subjects',
      statusEn: 'Gnm 2nd year coming soon.. update in process',
      statusMr: 'GNM २ रे वर्ष लवकरच उपलब्ध.. प्रक्रिया सुरू आहे',
      color: '#7c3aed',
      bgLight: '#f3e8ff',
    },
    {
      id: 'upcoming-anm',
      code: 'ANM-ALL',
      paperNum: '1st & 2nd Yr',
      courseKey: 'anm',
      courseLabel: isMarathi ? 'ANM नर्सिंग' : 'ANM Nursing',
      titleEn: 'Primary Healthcare & Midwifery',
      titleMr: 'प्राथमिक आरोग्य परिचर्या व प्रसूतीशास्त्र',
      subtitleEn: 'Community Health, Health Promotion, Child Health & Midwifery',
      subtitleMr: 'कम्युनिटी हेल्थ, आरोग्य संवर्धन, प्राथमिक आरोग्य व प्रसूतीशास्त्र',
      board: 'MSBNPE',
      paperCount: isMarathi ? '४ विषय' : '4 Subjects',
      statusEn: 'Anm coming soon.. update in process',
      statusMr: 'ANM प्रश्नपत्रिका लवकरच उपलब्ध.. प्रक्रिया सुरू आहे',
      color: '#166534',
      bgLight: '#dcfce7',
    },
  ];

  const filteredUpcoming = upcomingCourses.filter((item) => {
    const matchCourse =
      selectedCourse === 'all' ||
      (selectedCourse === 'gnm' && item.courseKey === 'gnm-2') ||
      selectedCourse === item.courseKey;

    const matchYear = selectedYear === 'all';

    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      q === '' ||
      item.titleEn.toLowerCase().includes(q) ||
      item.titleMr.toLowerCase().includes(q) ||
      item.subtitleEn.toLowerCase().includes(q) ||
      item.subtitleMr.toLowerCase().includes(q) ||
      item.courseLabel.toLowerCase().includes(q) ||
      'gnm'.includes(q) ||
      'anm'.includes(q) ||
      'coming soon'.includes(q) ||
      'update in process'.includes(q);

    return matchCourse && matchYear && matchQuery;
  });

  const filteredPapers = papers.filter((p) => {
    let matchCourse = true;
    if (selectedCourse === 'gnm-1') {
      matchCourse = p.course === 'gnm' && (!p.courseLabel || p.courseLabel.toLowerCase().includes('1st') || !p.courseLabel.toLowerCase().includes('2nd'));
    } else if (selectedCourse === 'gnm-2') {
      matchCourse = p.course === 'gnm' && p.courseLabel?.toLowerCase().includes('2nd');
    } else if (selectedCourse === 'gnm') {
      matchCourse = p.course === 'gnm';
    } else if (selectedCourse !== 'all') {
      matchCourse = p.course === selectedCourse;
    }

    const matchYear = selectedYear === 'all' || String(p.year) === String(selectedYear);

    const meta = paperMetadataMap[p.paperCode];
    const subject = isMarathi
      ? (meta?.titleMr || p.subjectMr || p.subjectEn || '')
      : (meta?.titleEn || p.subjectEn || p.subjectMr || '');
    const subtitle = meta ? (isMarathi ? meta.subtitleMr : meta.subtitleEn) : '';

    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      q === '' ||
      subject.toLowerCase().includes(q) ||
      subtitle.toLowerCase().includes(q) ||
      (p.subjectEn && p.subjectEn.toLowerCase().includes(q)) ||
      (p.subjectMr && p.subjectMr.toLowerCase().includes(q)) ||
      (p.paperCode && p.paperCode.toLowerCase().includes(q)) ||
      (p.session && p.session.toLowerCase().includes(q)) ||
      (p.board && p.board.toLowerCase().includes(q));

    return matchCourse && matchYear && matchQuery;
  });

  const availableYears = ['all', ...Array.from(new Set(papers.map((p) => String(p.year)).filter(Boolean))).sort((a, b) => b.localeCompare(a))];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      {/* 1. HERO HEADER SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #071f38 0%, #0d3b66 55%, #0284c7 100%)',
          color: '#ffffff',
          padding: 'clamp(70px, 8vw, 95px) 20px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative background circles */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '-40px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,209,102,0.12) 0%, rgba(255,209,102,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Top Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 209, 102, 0.15)',
              border: '1px solid rgba(255, 209, 102, 0.4)',
              color: '#ffd166',
              padding: '6px 18px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <i className="fas fa-graduation-cap"></i>
            {isMarathi ? 'अधिकृत परीक्षा प्रश्नसंच पोर्टल' : 'Official Examination Question Bank'}
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              margin: '0 0 14px',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
            }}
          >
            {isMarathi ? 'मागील वर्षांच्या प्रश्नपत्रिका' : 'Previous Year Question Papers'}
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#e0f2fe',
              maxWidth: '720px',
              margin: '0 auto 24px',
              lineHeight: 1.6,
              opacity: 0.95,
            }}
          >
            {isMarathi
              ? 'महाराष्ट्र राज्य नर्सिंग व पॅरामेडिकल शिक्षण मंडळ (MSBNPE) अंतर्गत GNM आणि ANM अभ्यासक्रमांच्या अधिकृत प्रश्नपत्रिका मोफत डाऊनलोड करा.'
              : 'Download official MSBNPE board examination question papers with subject-wise categorization for GNM and ANM nursing students.'}
          </p>

          {/* Quick Value Metrics */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '26px',
            }}
          >
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fas fa-file-pdf" style={{ color: '#ffd166' }}></i> 4 Official Papers (Jan 2020)
            </span>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fas fa-check-circle" style={{ color: '#38bdf8' }}></i> MSBNPE Board Verified
            </span>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fas fa-download" style={{ color: '#4ade80' }}></i> Free PDF Download
            </span>
          </div>

          {/* Quick CTA Links */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/facilities"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.28)',
                color: '#ffffff',
                padding: '9px 18px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fas fa-th-large" style={{ color: '#ffd166' }}></i>
              {isMarathi ? 'सर्व सुविधा पहा' : 'All Facilities'}
            </Link>
            <Link
              href="/courses/syllabus"
              style={{
                background: '#ffd166',
                color: '#0d3b66',
                padding: '9px 20px',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                boxShadow: '0 4px 14px rgba(255, 209, 102, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fas fa-book-reader"></i>
              {isMarathi ? 'अभ्यासक्रम (Syllabus) पहा' : 'View Syllabus Structure'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROL CONSOLE */}
      <section style={{ maxWidth: '1120px', margin: '-40px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            padding: '20px 24px',
            boxShadow: '0 15px 35px -5px rgba(13, 59, 102, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04)',
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
                color: '#0284c7',
                fontSize: '1rem',
              }}
            ></i>
            <input
              type="text"
              placeholder={
                isMarathi
                  ? 'विषयाचे नाव, पेपर कोड किंवा घटक शोधा (उदा. Bio-Sciences, 1026, Nursing Foundation)...'
                  : 'Search by subject name, paper code or keyword (e.g. Bio-Sciences, 1026, Nursing Foundation)...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 18px 13px 46px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.94rem',
                outline: 'none',
                background: '#f8fafc',
                color: '#0f172a',
                transition: 'all 0.2s ease',
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
                  background: '#e2e8f0',
                  border: 'none',
                  color: '#475569',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          {/* Filter Pills Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '4px',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            {/* Course Filters */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {isMarathi ? 'कोर्स:' : 'Course:'}
              </span>

              {[
                { id: 'all', label: isMarathi ? 'सर्व कोर्सेस' : 'All Courses' },
                { id: 'gnm-1', label: isMarathi ? 'GNM १ ले वर्ष' : 'GNM 1st Year', count: '4' },
                { id: 'gnm-2', label: isMarathi ? 'GNM २ रे वर्ष' : 'GNM 2nd Year', isSoon: true },
                { id: 'anm', label: 'ANM Nursing', isSoon: true },
                { id: 'admlt', label: 'ADMLT' },
              ].map((c) => {
                const isActive = selectedCourse === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCourse(c.id)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: isActive ? '1.5px solid #0d3b66' : '1px solid #e2e8f0',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      background: isActive ? '#0d3b66' : '#ffffff',
                      color: isActive ? '#ffffff' : '#334155',
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isActive ? '0 3px 8px rgba(13, 59, 102, 0.2)' : 'none',
                    }}
                  >
                    {c.label}
                    {c.count && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          background: isActive ? '#ffd166' : '#f1f5f9',
                          color: isActive ? '#0d3b66' : '#475569',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          fontWeight: 800,
                        }}
                      >
                        {c.count}
                      </span>
                    )}
                    {c.isSoon && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          background: isActive ? '#ffd166' : '#fef3c7',
                          color: isActive ? '#0d3b66' : '#92400e',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {isMarathi ? 'लवकरच' : 'Soon'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Year Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <i className="far fa-calendar-alt" style={{ marginRight: '4px', color: '#0284c7' }}></i>
                {isMarathi ? 'वर्ष:' : 'Year:'}
              </span>
              {availableYears.map((yr) => {
                const isActive = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: isActive ? '1px solid #d97706' : '1px solid #e2e8f0',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      background: isActive ? '#ffd166' : '#ffffff',
                      color: isActive ? '#0d3b66' : '#64748b',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {yr === 'all' ? (isMarathi ? 'सर्व वर्षे' : 'All Years') : yr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAPERS LIST & ARCHIVE */}
      <section style={{ maxWidth: '1120px', margin: '40px auto 60px', padding: '0 20px' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '22px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 4px', color: '#0d3b66', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#e0f2fe',
                  color: '#0284c7',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.95rem',
                }}
              >
                <i className="fas fa-folder-open"></i>
              </span>
              {isMarathi ? 'उपलब्ध प्रश्नपत्रिका संग्रह' : 'Question Papers Archive'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#64748b' }}>
              {isMarathi
                ? 'खालील सर्व प्रश्नपत्रिका MSBNPE बोर्ड परीक्षेच्या अधिकृत प्रती आहेत.'
                : 'Showing verified official MSBNPE board examination question papers.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#0d3b66',
                background: '#e0f2fe',
                padding: '5px 12px',
                borderRadius: '20px',
                border: '1px solid #bae6fd',
              }}
            >
              <i className="fas fa-file-check" style={{ color: '#0284c7', marginRight: '5px' }}></i>
              {filteredPapers.length} {isMarathi ? 'उपलब्ध' : 'Available'}
            </span>
            {filteredUpcoming.length > 0 && (
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#92400e',
                  background: '#fef3c7',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  border: '1px solid #fde68a',
                }}
              >
                <i className="fas fa-clock" style={{ color: '#d97706', marginRight: '5px' }}></i>
                {filteredUpcoming.length} {isMarathi ? 'प्रक्रियेत' : 'In Process'}
              </span>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && filteredUpcoming.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#f1f5f9',
                color: '#94a3b8',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                marginBottom: '16px',
              }}
            >
              <i className="fas fa-search"></i>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#334155', margin: '0 0 8px' }}>
              {isMarathi ? 'कोणतीही प्रश्नपत्रिका सापडली नाही' : 'No Question Papers Found'}
            </h3>
            <p style={{ color: '#94a3b8', margin: '0 auto 20px', fontSize: '0.9rem', maxWidth: '450px' }}>
              {isMarathi
                ? 'कृपया निवडलेले फिल्टर्स बदला किंवा दुसरा शब्द वापरून शोधा.'
                : 'Try adjusting your search query or reset your course and year filters.'}
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
                padding: '9px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fas fa-redo-alt" style={{ fontSize: '0.8rem', color: '#ffd166' }}></i>
              {isMarathi ? 'सर्व फिल्टर्स रीसेट करा' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
              gap: '20px',
            }}
          >
            {/* 3.1. AVAILABLE DOWNLOADABLE QUESTION PAPERS */}
            {filteredPapers.map((paper) => {
              const meta = paperMetadataMap[paper.paperCode] || {
                paperNum: `Code ${paper.paperCode}`,
                titleEn: paper.subjectEn,
                titleMr: paper.subjectMr || paper.subjectEn,
                subtitleEn: 'MSBNPE Nursing Syllabus',
                subtitleMr: 'MSBNPE नर्सिंग अभ्यासक्रम',
                color: '#0d3b66',
                bgLight: '#e0f2fe',
              };

              return (
                <div
                  key={paper.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '22px',
                    boxShadow: '0 4px 12px rgba(13, 59, 102, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '320px',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(13, 59, 102, 0.1)';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 59, 102, 0.04)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div>
                    {/* Top Row: Course + Code & Session Badges */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: meta.bgLight,
                            color: meta.color,
                          }}
                        >
                          {paper.courseLabel}
                        </span>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            padding: '3px 7px',
                            borderRadius: '6px',
                            background: '#0d3b66',
                            color: '#ffd166',
                            fontFamily: 'monospace',
                          }}
                        >
                          CON {paper.paperCode}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          background: '#f8fafc',
                          color: '#64748b',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        {paper.board} • {paper.session}
                      </span>
                    </div>

                    {/* Paper Title & Number */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px' }}>
                        {meta.paperNum}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.18rem',
                          fontWeight: 800,
                          color: '#0d3b66',
                          margin: 0,
                          lineHeight: 1.35,
                        }}
                      >
                        {isMarathi ? meta.titleMr : meta.titleEn}
                      </h3>
                    </div>

                    {/* Subtitle / Included Subjects */}
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: '#475569',
                        lineHeight: 1.5,
                        margin: '0 0 16px',
                        minHeight: '2.5rem',
                      }}
                    >
                      {isMarathi ? meta.subtitleMr : meta.subtitleEn}
                    </p>

                    {/* Spec Summary Pill */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        fontSize: '0.78rem',
                        color: '#64748b',
                        marginBottom: '18px',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <i className="fas fa-file-pdf" style={{ color: '#dc2626' }}></i>
                        <span>{paper.fileSize}</span>
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <i className="far fa-clock" style={{ color: '#0284c7' }}></i>
                        <span>3 Hours • 75 Marks</span>
                      </span>
                    </div>
                  </div>

                  {/* Clean Dual Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px', gap: '8px' }}>
                    <a
                      href={paper.fileUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: '#0d3b66',
                        color: '#ffffff',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.86rem',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#0284c7')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#0d3b66')}
                    >
                      <i className="fas fa-download" style={{ color: '#ffd166', fontSize: '0.85rem' }}></i>
                      {isMarathi ? 'प्रश्नपत्रिका डाऊनलोड (PDF)' : 'Download Paper (PDF)'}
                    </a>

                    <a
                      href={paper.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      title={isMarathi ? 'PDF पहा' : 'Preview PDF'}
                      style={{
                        background: '#f8fafc',
                        color: '#0d3b66',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        border: '1px solid #e2e8f0',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#e0f2fe';
                        e.currentTarget.style.color = '#0284c7';
                        e.currentTarget.style.borderColor = '#bae6fd';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.color = '#0d3b66';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </a>
                  </div>
                </div>
              );
            })}

            {/* 3.2. UPCOMING / IN-PROCESS COURSES CARDS */}
            {filteredUpcoming.map((item) => (
              <div
                key={item.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1.5px dashed #cbd5e1',
                  padding: '22px',
                  boxShadow: '0 4px 12px rgba(13, 59, 102, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '320px',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(13, 59, 102, 0.08)';
                  e.currentTarget.style.borderColor = item.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 59, 102, 0.03)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
              >
                <div>
                  {/* Top Row: Course + Code & In Process Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: item.bgLight,
                          color: item.color,
                        }}
                      >
                        {item.courseLabel}
                      </span>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          padding: '3px 7px',
                          borderRadius: '6px',
                          background: '#f1f5f9',
                          color: '#475569',
                          fontFamily: 'monospace',
                        }}
                      >
                        {item.code}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: '#fef3c7',
                        color: '#92400e',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid #fde68a',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                      }}
                    >
                      <i className="fas fa-clock fa-spin" style={{ fontSize: '0.68rem', color: '#d97706' }}></i>
                      {isMarathi ? 'अपडेट सुरू' : 'In Process'}
                    </span>
                  </div>

                  {/* Paper Title & Number */}
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: item.color, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px' }}>
                      {item.paperNum} • {item.paperCount}
                    </div>
                    <h3
                      style={{
                        fontSize: '1.18rem',
                        fontWeight: 800,
                        color: '#0d3b66',
                        margin: 0,
                        lineHeight: 1.35,
                      }}
                    >
                      {isMarathi ? item.titleMr : item.titleEn}
                    </h3>
                  </div>

                  {/* Subtitle / Included Subjects */}
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#475569',
                      lineHeight: 1.5,
                      margin: '0 0 16px',
                      minHeight: '2.5rem',
                    }}
                  >
                    {isMarathi ? item.subtitleMr : item.subtitleEn}
                  </p>

                  {/* Spec Summary Pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: '#f8fafc',
                      border: '1px solid #f1f5f9',
                      fontSize: '0.78rem',
                      color: '#64748b',
                      marginBottom: '18px',
                    }}
                  >
                    <span>
                      <strong style={{ color: '#334155' }}>Board:</strong> {item.board}
                    </span>
                    <span style={{ fontWeight: 600, color: '#b45309' }}>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '5px' }}></i>
                      {isMarathi ? 'डिजिटायझेशन सुरू' : 'Digitization in Progress'}
                    </span>
                  </div>
                </div>

                {/* Coming Soon Clean Button */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1.5px dashed #cbd5e1',
                    color: '#475569',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    userSelect: 'none',
                  }}
                >
                  <i className="fas fa-hourglass-half" style={{ color: '#d97706' }}></i>
                  {isMarathi ? item.statusMr : item.statusEn}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. EXAMINATION INSTRUCTIONS & STUDY GUIDELINES */}
        <div
          style={{
            marginTop: '50px',
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            padding: '28px 30px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
              }}
            >
              <i className="fas fa-lightbulb"></i>
            </span>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 800, color: '#0d3b66' }}>
                {isMarathi ? 'परीक्षेसाठी महत्त्वाची सूचना व अभ्यास मार्गदर्शन' : 'Examination Guidelines & Preparation Tips'}
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '0.84rem', color: '#64748b' }}>
                {isMarathi
                  ? 'MSBNPE बोर्ड परीक्षेच्या यशस्वी तयारीसाठी मार्गदर्शक सूचना'
                  : 'Key recommendations to maximize performance in MSBNPE board examinations.'}
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Guide Card 1 */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#0369a1', fontWeight: 700, fontSize: '0.92rem' }}>
                <i className="fas fa-clipboard-check"></i>
                {isMarathi ? 'अधिकृत MSBNPE पॅटर्न' : 'Official MSBNPE Pattern'}
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                {isMarathi
                  ? 'सर्व प्रश्नपत्रिका ७५ गुणांच्या असून ३ तासांचा वेळ दिला जातो. वस्तुनिष्ठ प्रश्न, टिपा लिहा व सविस्तर प्रश्नांचा समावेश असतो.'
                  : 'All question papers strictly follow the official 75-mark, 3-hour pattern comprising MCQs, short notes, and detailed clinical answers.'}
              </p>
            </div>

            {/* Guide Card 2 */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#0369a1', fontWeight: 700, fontSize: '0.92rem' }}>
                <i className="fas fa-stopwatch"></i>
                {isMarathi ? 'वेळ नियोजन व सराव' : 'Time Management Strategy'}
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                {isMarathi
                  ? 'विद्यार्थ्यांनी मागील वर्षांचे प्रश्न सोडवून ३ तासांच्या मर्यादेत उत्तर लेखनाचा सराव करावा आणि आकृत्या सुबक काढाव्यात.'
                  : 'Practice solving past year sets under a 3-hour timer. Focus on labeled anatomical/nursing diagrams and structured point-wise answers.'}
              </p>
            </div>

            {/* Guide Card 3 */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#0369a1', fontWeight: 700, fontSize: '0.92rem' }}>
                <i className="fas fa-landmark"></i>
                {isMarathi ? 'कॉलेज लायब्ररी मदत' : 'College Library Support'}
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                {isMarathi
                  ? 'छापील प्रश्नपत्रिका, मागील ५ वर्षांचे संच व मॉडेल उत्तरपत्रिकांसाठी कॉलेजच्या सेंट्रल लायब्ररी विभागाशी संपर्क साधा.'
                  : 'Printed question sets, past 5-year archives, and faculty-curated model answer sheets are accessible at the central college library.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
