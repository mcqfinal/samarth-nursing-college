'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import committeesData from '@/data/committeesData.json';

export default function CommitteesPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Set first committee open by default, or track set of open committee IDs
  const [openCommittees, setOpenCommittees] = useState(new Set(['arc-01']));

  const committees = committeesData.committees || [];
  const commonResponsibilities = committeesData.commonResponsibilities || [];

  const CATEGORIES = [
    { id: 'all', icon: 'fa-layer-group', labelEn: 'All', labelMr: 'सर्व', count: 30 },
    { id: 'discipline', icon: 'fa-shield-halved', labelEn: 'Anti-Ragging & Discipline', labelMr: 'रॅगिंग व शिस्त', count: 6, ids: [1, 2, 3, 5, 6, 24] },
    { id: 'academic', icon: 'fa-graduation-cap', labelEn: 'Academics & Exams', labelMr: 'शैक्षणिक व परीक्षा', count: 5, ids: [7, 8, 9, 12, 28] },
    { id: 'welfare', icon: 'fa-heart', labelEn: 'Student Welfare', labelMr: 'विद्यार्थी कल्याण', count: 9, ids: [4, 10, 11, 14, 15, 21, 22, 23, 29] },
    { id: 'clinical', icon: 'fa-user-nurse', labelEn: 'Clinical & Safety', labelMr: 'क्लिनिकल व सुरक्षा', count: 6, ids: [13, 16, 17, 25, 26, 27] },
    { id: 'quality', icon: 'fa-award', labelEn: 'Quality & Media', labelMr: 'गुणवत्ता व मीडिया', count: 4, ids: [18, 19, 20, 30] },
  ];

  // Filter committees based on category and search query
  const filteredCommittees = useMemo(() => {
    let list = committees;
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find((c) => c.id === selectedCategory);
      if (cat && cat.ids) {
        list = list.filter((c) => cat.ids.includes(c.srNo));
      }
    }
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter((c) => {
      const nameMatch = c.name.toLowerCase().includes(q);
      const orderMatch = c.orderNo.toLowerCase().includes(q);
      const chairMatch = c.chairperson.toLowerCase().includes(q);
      const coordMatch = c.coordinator.toLowerCase().includes(q);
      const memberMatch = c.members.some(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.designation.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q)
      );
      return nameMatch || orderMatch || chairMatch || coordMatch || memberMatch;
    });
  }, [committees, searchQuery, selectedCategory]);

  const toggleCommittee = (id) => {
    setOpenCommittees((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const allIds = new Set(filteredCommittees.map((c) => c.id));
    setOpenCommittees(allIds);
  };

  const handleCollapseAll = () => {
    setOpenCommittees(new Set());
  };

  const handlePrint = () => {
    // Expand all before printing so complete document prints
    const allIds = new Set(committees.map((c) => c.id));
    setOpenCommittees(allIds);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.print();
      }
    }, 150);
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          header, footer, .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 10.5pt !important;
          }
          .print-full-width {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .accordion-body-print {
            display: block !important;
          }
          .committee-print-break {
            page-break-inside: avoid;
            margin-bottom: 24px !important;
            border: 1px solid #cbd5e1 !important;
          }
          .print-only-title {
            display: block !important;
            text-align: center;
            margin-bottom: 20px;
          }
        }
        @media screen {
          .print-only-title {
            display: none;
          }
        }
      `}</style>

      <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
        {/* 1. HERO BANNER */}
        <section
          className="no-print"
          style={{
            background: 'linear-gradient(135deg, #071e3d 0%, #0d3b66 50%, #1e3a8a 100%)',
            color: '#ffffff',
            padding: 'clamp(42px, 5.5vw, 60px) 20px 38px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 6px 24px rgba(10, 37, 64, 0.18)',
          }}
        >
          {/* Subtle Ambient Decorative Glows */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,183,3,0.15) 0%, rgba(255,183,3,0) 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 240,
              height: 240,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            {/* Top Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 209, 102, 0.45)',
                color: '#ffd166',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                marginBottom: '16px',
                backdropFilter: 'blur(6px)',
              }}
            >
              <i className="fas fa-university" style={{ color: '#ffd166' }}></i>
              <span>
                {isMr
                  ? 'वैधानिक प्रशासन • शैक्षणिक वर्ष २०२४–२०२५'
                  : 'STATUTORY GOVERNANCE • AY 2024–2025'}
              </span>
              <span
                style={{
                  background: 'rgba(255, 209, 102, 0.25)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontWeight: 800,
                }}
              >
                30 COMMITTEES
              </span>
            </div>

            {/* Main Heading with Golden "and" */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.1rem, 4.2vw, 3rem)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 14px 0',
                lineHeight: 1.22,
                letterSpacing: '-0.01em',
              }}
            >
              {isMr ? (
                <>
                  महाविद्यालयीन समित्या{' '}
                  <span style={{ color: '#ffd166', fontWeight: 600 }}>व</span>{' '}
                  जबाबदाऱ्या
                </>
              ) : (
                <>
                  Committee Formation{' '}
                  <span
                    style={{
                      color: '#ffd166',
                      fontWeight: 600,
                      fontStyle: 'normal',
                      padding: '0 4px',
                    }}
                  >
                    and
                  </span>{' '}
                  Responsibilities
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: '#e2e8f0',
                fontSize: 'clamp(0.96rem, 1.8vw, 1.06rem)',
                maxWidth: '780px',
                margin: '0 auto 20px',
                lineHeight: 1.65,
              }}
            >
              {isMr
                ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर — संस्थात्मक शिस्त, शैक्षणिक गुणवत्ता, पारदर्शकता आणि विद्यार्थी सुरक्षिततेसाठी नियामक मंडळाच्या (INC / MNC / MUHS / NAAC) निकषांनुसार गठित ३० अधिकृत समित्या.'
                : 'Samarth College of Nursing, Sangamner — Formed in strict compliance with statutory mandates for institutional governance, regulatory inspection (INC / MNC / MUHS / NAAC), and student safety.'}
            </p>

            {/* Print & Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={handleExpandAll}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backdropFilter: 'blur(6px)',
                  transition: 'all 0.2s',
                }}
              >
                <i className="fas fa-folder-open" style={{ color: '#ffd166' }}></i>
                <span>{isMr ? 'सर्व उघडा' : 'Expand All'}</span>
              </button>

              <button
                onClick={handleCollapseAll}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backdropFilter: 'blur(6px)',
                  transition: 'all 0.2s',
                }}
              >
                <i className="fas fa-folder" style={{ color: '#cbd5e1' }}></i>
                <span>{isMr ? 'सर्व बंद करा' : 'Collapse All'}</span>
              </button>

              <button
                onClick={handlePrint}
                style={{
                  background: 'linear-gradient(135deg, #ffd166 0%, #ffb703 100%)',
                  border: '1.5px solid #ffd166',
                  color: '#071e3d',
                  padding: '8px 20px',
                  borderRadius: '24px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(255, 183, 3, 0.35)',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className="fas fa-print"></i>
                <span>{isMr ? 'अधिकृत प्रत प्रिंट करा' : 'Print / Export Official PDF'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Print Only Official Document Title */}
        <div className="print-only-title" style={{ padding: '20px', borderBottom: '2px solid #000' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.6rem', fontWeight: 800 }}>
            SAMARTH COLLEGE OF NURSING, SANGAMNER
          </h2>
          <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: 700 }}>
            COMMITTEE FORMATION & RESPONSIBILITIES
          </h3>
          <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
            Academic Year 2024–2025 | Regulatory Inspection & Statutory Compliance Record
          </p>
        </div>

        {/* 2. SEARCH & INTERACTIVE CATEGORY FILTER BAR */}
        <section className="no-print" style={{ padding: '24px 20px 0' }}>
          <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #e2e8f0',
                padding: '16px 20px',
                boxShadow: '0 6px 20px rgba(13, 59, 102, 0.05)',
              }}
            >
              {/* Row 1: Full-width Search Input with inline count pill */}
              <div style={{ position: 'relative', marginBottom: '14px' }}>
                <i
                  className="fas fa-search"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#0d3b66',
                    fontSize: '0.95rem',
                  }}
                ></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isMr
                      ? 'समितीचे नाव, प्राध्यापक / सदस्याचे नाव किंवा आदेश क्रमांक शोधा...'
                      : 'Search committee name, faculty member, or order number...'
                  }
                  style={{
                    width: '100%',
                    padding: '12px 140px 12px 46px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0d3b66';
                    e.target.style.background = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(13, 59, 102, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#cbd5e1';
                    e.target.style.background = '#f8fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                />

                {/* Right Badge inside search bar: Showing count or Clear button */}
                <div
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        background: '#e2e8f0',
                        border: 'none',
                        color: '#475569',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                      }}
                      title="Clear search"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                  <span
                    style={{
                      fontSize: '0.78rem',
                      background: '#e0f2fe',
                      color: '#0369a1',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {filteredCommittees.length} of 30
                  </span>
                </div>
              </div>

              {/* Row 2: Horizontal Category Bar (fits cleanly in one row, scrollable on small mobile) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  overflowX: 'auto',
                  paddingBottom: '2px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        background: isActive ? '#0d3b66' : '#ffffff',
                        color: isActive ? '#ffffff' : '#475569',
                        border: isActive ? '1.5px solid #0d3b66' : '1px solid #e2e8f0',
                        padding: '7px 14px',
                        borderRadius: '24px',
                        fontSize: '0.8rem',
                        fontWeight: isActive ? 700 : 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        whiteSpace: 'nowrap',
                        boxShadow: isActive ? '0 2px 8px rgba(13, 59, 102, 0.2)' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = '#0d3b66';
                          e.currentTarget.style.color = '#0d3b66';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.color = '#475569';
                        }
                      }}
                    >
                      <i className={`fas ${cat.icon}`} style={{ color: isActive ? '#ffd166' : '#94a3b8', fontSize: '0.78rem' }}></i>
                      <span>{isMr ? cat.labelMr : cat.labelEn}</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          background: isActive ? 'rgba(255,255,255,0.22)' : '#f1f5f9',
                          color: isActive ? '#ffffff' : '#64748b',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          fontWeight: 700,
                        }}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. ACCORDION COMMITTEES LIST */}
        <section style={{ padding: '24px 20px 60px' }}>
          <div className="print-full-width" style={{ maxWidth: '1040px', margin: '0 auto' }}>
            {filteredCommittees.length === 0 ? (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '50px 20px',
                  textAlign: 'center',
                  border: '1.5px solid #e2e8f0',
                }}
              >
                <i className="fas fa-search" style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '16px' }}></i>
                <h3 style={{ margin: '0 0 8px', color: '#334155', fontWeight: 700 }}>
                  {isMr ? 'कोणतीही समिती आढळली नाही' : 'No Committees Found'}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 18px' }}>
                  {isMr
                    ? `"${searchQuery}" साठी कोणताही निकाल आढळला नाही.`
                    : `No matches found for "${searchQuery}". Try clearing the search.`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  style={{
                    background: '#0d3b66',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {filteredCommittees.map((c) => {
                  const isOpen = openCommittees.has(c.id);

                  return (
                    <div
                      key={c.id}
                      className="committee-print-break"
                      style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: isOpen ? '1.5px solid #0d3b66' : '1px solid #e2e8f0',
                        boxShadow: isOpen
                          ? '0 8px 24px rgba(13, 59, 102, 0.08)'
                          : '0 2px 8px rgba(0, 0, 0, 0.02)',
                        overflow: 'hidden',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {/* Accordion Header (Clickable) */}
                      <button
                        onClick={() => toggleCommittee(c.id)}
                        style={{
                          width: '100%',
                          background: isOpen
                            ? 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)'
                            : '#ffffff',
                          border: 'none',
                          borderBottom: isOpen ? '1px solid #e2e8f0' : 'none',
                          padding: '16px 20px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '14px',
                          transition: 'background 0.2s',
                        }}
                      >
                        {/* Left Info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
                          <span
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              background: isOpen ? '#0d3b66' : '#f1f5f9',
                              color: isOpen ? '#ffffff' : '#475569',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '0.88rem',
                              flexShrink: 0,
                            }}
                          >
                            {c.srNo}
                          </span>

                          <div>
                            <div
                              style={{
                                fontSize: '1.02rem',
                                fontWeight: 800,
                                color: '#0d3b66',
                                letterSpacing: '0.01em',
                              }}
                            >
                              {c.name}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                flexWrap: 'wrap',
                                marginTop: '3px',
                                fontSize: '0.78rem',
                                color: '#64748b',
                              }}
                            >
                              <span style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px', color: '#1e293b' }}>
                                {c.orderNo}
                              </span>
                              <span>•</span>
                              <span>{c.date}</span>
                              <span className="hide-mobile">•</span>
                              <span className="hide-mobile" style={{ color: '#0f172a', fontWeight: 600 }}>
                                Chairperson: {c.chairperson}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Role Tag & Chevron */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                          <span
                            style={{
                              fontSize: '0.74rem',
                              background: isOpen ? '#e0f2fe' : '#f8fafc',
                              color: isOpen ? '#0369a1' : '#64748b',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontWeight: 700,
                              border: '1px solid #e2e8f0',
                            }}
                            className="hide-mobile"
                          >
                            {c.members.length} Members
                          </span>

                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: isOpen ? '#0d3b66' : '#f1f5f9',
                              color: isOpen ? '#ffffff' : '#64748b',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.8rem',
                              transition: 'transform 0.25s ease',
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                          >
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </div>
                      </button>

                      {/* Accordion Content Body (Visible when open, or always when printing) */}
                      <div
                        className={isOpen ? '' : 'accordion-body-print'}
                        style={{
                          display: isOpen ? 'block' : 'none',
                          padding: '20px 22px 24px',
                          background: '#ffffff',
                        }}
                      >
                        {/* Key Roles Row */}
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap',
                            marginBottom: '16px',
                            paddingBottom: '12px',
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.78rem',
                              background: '#fef3c7',
                              color: '#92400e',
                              border: '1px solid #fde68a',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontWeight: 700,
                            }}
                          >
                            <i className="fas fa-user-tie" style={{ marginRight: '5px' }}></i>
                            Chairperson: {c.chairperson}
                          </span>
                          <span
                            style={{
                              fontSize: '0.78rem',
                              background: '#e0f2fe',
                              color: '#0369a1',
                              border: '1px solid #bae6fd',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontWeight: 700,
                            }}
                          >
                            <i className="fas fa-user-cog" style={{ marginRight: '5px' }}></i>
                            Coordinator: {c.coordinator}
                          </span>
                        </div>

                        {/* Aim, Objectives & Duties */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '12px',
                            marginBottom: '18px',
                          }}
                        >
                          <div
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '10px',
                              padding: '12px 14px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '0.72rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                fontWeight: 800,
                                color: '#0d3b66',
                                marginBottom: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <i className="fas fa-bullseye" style={{ color: '#d97706' }}></i> Aim
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.45 }}>
                              {c.aim}
                            </div>
                          </div>

                          <div
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '10px',
                              padding: '12px 14px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '0.72rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                fontWeight: 800,
                                color: '#0d3b66',
                                marginBottom: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <i className="fas fa-tasks" style={{ color: '#0284c7' }}></i> Objectives
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.45 }}>
                              {c.objectives}
                            </div>
                          </div>

                          <div
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '10px',
                              padding: '12px 14px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '0.72rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                fontWeight: 800,
                                color: '#0d3b66',
                                marginBottom: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <i className="fas fa-clipboard-check" style={{ color: '#16a34a' }}></i> Duties & Responsibilities
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.45 }}>
                              {c.duties}
                            </div>
                          </div>
                        </div>

                        {/* Member Table */}
                        <div
                          style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            overflow: 'hidden',
                          }}
                        >
                          <table
                            style={{
                              width: '100%',
                              borderCollapse: 'collapse',
                              fontSize: '0.84rem',
                              textAlign: 'left',
                            }}
                          >
                            <thead>
                              <tr
                                style={{
                                  background: '#f1f5f9',
                                  color: '#334155',
                                  fontWeight: 700,
                                  fontSize: '0.78rem',
                                  borderBottom: '1px solid #e2e8f0',
                                }}
                              >
                                <th style={{ padding: '9px 12px', width: '50px', textAlign: 'center' }}>
                                  Sr. No.
                                </th>
                                <th style={{ padding: '9px 12px' }}>Member Name</th>
                                <th style={{ padding: '9px 12px' }}>Designation</th>
                                <th style={{ padding: '9px 12px', width: '130px' }}>Role in Committee</th>
                              </tr>
                            </thead>
                            <tbody>
                              {c.members.map((m, mIdx) => {
                                const isChair = m.role === 'Chairperson';
                                const isCoord = m.role === 'Coordinator';
                                return (
                                  <tr
                                    key={m.srNo}
                                    style={{
                                      borderBottom:
                                        mIdx < c.members.length - 1 ? '1px solid #f1f5f9' : 'none',
                                      background: isChair
                                        ? '#fffdfa'
                                        : isCoord
                                        ? '#fafcff'
                                        : mIdx % 2 === 0
                                        ? '#ffffff'
                                        : '#fafbfc',
                                    }}
                                  >
                                    <td
                                      style={{
                                        padding: '9px 12px',
                                        textAlign: 'center',
                                        fontWeight: 600,
                                        color: '#64748b',
                                      }}
                                    >
                                      {m.srNo}
                                    </td>
                                    <td style={{ padding: '9px 12px', fontWeight: 600, color: '#0f172a' }}>
                                      {m.name}
                                    </td>
                                    <td style={{ padding: '9px 12px', color: '#475569' }}>
                                      {m.designation}
                                    </td>
                                    <td style={{ padding: '9px 12px' }}>
                                      <span
                                        style={{
                                          fontSize: '0.74rem',
                                          fontWeight: 700,
                                          padding: '2px 8px',
                                          borderRadius: '12px',
                                          display: 'inline-block',
                                          background: isChair
                                            ? '#fef3c7'
                                            : isCoord
                                            ? '#e0f2fe'
                                            : '#f1f5f9',
                                          color: isChair
                                            ? '#b45309'
                                            : isCoord
                                            ? '#0369a1'
                                            : '#475569',
                                        }}
                                      >
                                        {m.role}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4. COMMON RESPONSIBILITIES SECTION */}
            <div
              className="committee-print-break"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #e2e8f0',
                padding: '28px 24px',
                boxShadow: '0 4px 16px rgba(13, 59, 102, 0.04)',
                marginTop: '35px',
                marginBottom: '28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <i className="fas fa-file-contract" style={{ color: '#0d3b66', fontSize: '1.25rem' }}></i>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#0d3b66',
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {isMr
                    ? 'सर्व ३० समित्यांसाठी सामायिक जबाबदाऱ्या व कार्यपद्धती'
                    : 'COMMON RESPONSIBILITIES OF ALL COMMITTEES'}
                </h3>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 16px', lineHeight: 1.5 }}>
                {isMr
                  ? 'सर्व ३० समित्यांनी खालील १० मार्गदर्शक तत्त्वे व कार्यपद्धतीचे पालन करणे बंधनकारक आहे:'
                  : 'All committee chairpersons, coordinators, and designated members are bound by the following mandatory operational mandates:'}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '10px',
                }}
              >
                {commonResponsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      background: '#f8fafc',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#0d3b66',
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                      {resp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. OFFICIAL AUTHENTICATION & COLLEGE SEAL SECTION */}
            <div
              className="committee-print-break"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #e2e8f0',
                padding: '26px 24px',
                boxShadow: '0 4px 16px rgba(13, 59, 102, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexWrap: 'wrap',
                  gap: '24px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: '#0d3b66',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    Statutory Institutional Authentication
                  </div>
                  <h4 style={{ margin: '0 0 3px', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    SAMARTH COLLEGE OF NURSING, SANGAMNER
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                    Academic Year 2024–2025 | Institutional Governance Record
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '26px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* College Seal Box */}
                  <div
                    style={{
                      width: '120px',
                      height: '80px',
                      border: '2px dashed #94a3b8',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#64748b',
                      fontSize: '0.72rem',
                      textAlign: 'center',
                      padding: '4px',
                      background: '#f8fafc',
                    }}
                  >
                    <i className="fas fa-stamp" style={{ fontSize: '1.1rem', marginBottom: '3px', color: '#cbd5e1' }}></i>
                    <span>[ College Seal ]</span>
                  </div>

                  {/* Principal Signature Line */}
                  <div style={{ textAlign: 'center', minWidth: '170px' }}>
                    <div
                      style={{
                        borderBottom: '1.5px solid #0f172a',
                        height: '36px',
                        marginBottom: '6px',
                      }}
                    ></div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
                      Principal
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      Samarth College of Nursing
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
