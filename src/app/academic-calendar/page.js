'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function AcademicCalendarPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const [activePage, setActivePage] = useState(1);

  const termSchedule = [
    { event: isMr ? 'नवीन शैक्षणिक वर्षाची सुरुवात व प्रवेश प्रक्रिया' : 'Commencement of Academic Year 2026-27', date: '01 Aug 2026', type: 'academic' },
    { event: isMr ? 'दीपप्रज्वलन व फ्लोरेन्स नाइटिंगेल शपथविधी सोहळा' : 'Lamp Lighting & Florence Nightingale Oath Ceremony', date: '28 Aug 2026', type: 'event' },
    { event: isMr ? 'प्रथम सत्र परीक्षा (Internal Assessment - 1)' : 'First Internal Assessment Examination', date: '10–18 Oct 2026', type: 'exam' },
    { event: isMr ? 'दिवाळी सुट्टी (Diwali Vacation)' : 'Diwali Academic Vacation', date: '01–15 Nov 2026', type: 'holiday' },
    { event: isMr ? 'प्रत्यक्ष हॉस्पिटल क्लिनिकल पोस्टिंग (सत्र १)' : 'Hospital Bedside Clinical Rotation (Phase 1)', date: '20 Nov 2026 – 15 Jan 2027', type: 'clinical' },
    { event: isMr ? 'द्वितीय घटक चाचणी व पूर्व परीक्षा (Prelim Exam)' : 'Preliminary Theory & Practical Examinations', date: '15–28 Feb 2027', type: 'exam' },
    { event: isMr ? 'वार्षिक क्रीडा व स्नेहसंमेलन (SNA Sports & Cultural Week)' : 'Annual SNA Sports & Cultural Week', date: '05–10 Mar 2027', type: 'event' },
    { event: isMr ? 'जागतिक परिचारिका दिन (International Nurses Day)' : 'International Nurses Day Celebration', date: '12 May 2027', type: 'event' },
    { event: isMr ? 'MSBNPE व MSBTE वार्षिक मुख्य परीक्षा' : 'Annual Board Final Theory & Practical Exam', date: 'June–July 2027', type: 'exam' },
  ];

  const calendarImages = [
    { page: 1, src: '/images/academic-calendar/academic-calendar-page-1.png', title: isMr ? 'पृष्ठ १: शैक्षणिक वेळापत्रक व नियम' : 'Page 1: Term Schedule & Guidelines' },
    { page: 2, src: '/images/academic-calendar/academic-calendar-page-2.png', title: isMr ? 'पृष्ठ २: क्लिनिकल व परीक्षा नियोजन' : 'Page 2: Clinical & Exam Planning' },
    { page: 3, src: '/images/academic-calendar/academic-calendar-page-3.png', title: isMr ? 'पृष्ठ ३: सुट्ट्या व विशेष कार्यक्रम यादी' : 'Page 3: Holidays & Activity Calendar' },
  ];

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>{isMr ? 'शैक्षणिक दिनदर्शिका २०२६-२७' : 'Academic Calendar 2026-27'}</h1>
          <div className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> &gt;{' '}
            <Link href="/about">{isMr ? 'आमच्याविषयी' : 'About Us'}</Link> &gt;{' '}
            <span>{isMr ? 'शैक्षणिक दिनदर्शिका' : 'Academic Calendar'}</span>
          </div>
        </div>
      </div>

      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-pill-tag">
              {isMr ? '📅 वार्षिक शैक्षणिक नियोजन' : '📅 ANNUAL ACADEMIC TIMETABLE'}
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#0d3b66', fontWeight: 800 }}>
              {isMr ? 'शैक्षणिक सत्र व परीक्षा वेळापत्रक' : 'Academic Terms & Examination Schedule'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '750px', margin: '10px auto 0' }}>
              {isMr
                ? 'MSBNPE मुंबई आणि MSBTE च्या वार्षिक नियमांनुसार नियोजित शैक्षणिक, क्लिनिकल व परीक्षा कार्यक्रम.'
                : 'Formally structured curriculum schedule with clinical rotations, internal assessments, and board examinations.'}
            </p>
          </div>

          {/* Official Calendar Page Viewer */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 8px 25px rgba(13, 59, 102, 0.06)',
              marginBottom: '45px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0d3b66', margin: 0 }}>
                <i className="fas fa-file-alt" style={{ color: '#0284c7', marginRight: '8px' }}></i>
                {isMr ? 'अधिकृत दिनदर्शिका दस्तऐवज (Official Document)' : 'Official Calendar Document'}
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {calendarImages.map((cal) => (
                  <button
                    key={cal.page}
                    onClick={() => setActivePage(cal.page)}
                    style={{
                      background: activePage === cal.page ? '#0d3b66' : '#f1f5f9',
                      color: activePage === cal.page ? '#ffffff' : '#334155',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {isMr ? `पृष्ठ ${cal.page}` : `Page ${cal.page}`}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                minHeight: '600px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={calendarImages[activePage - 1].src}
                alt={calendarImages[activePage - 1].title}
                width={900}
                height={1200}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                priority
              />
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <a
                href={calendarImages[activePage - 1].src}
                download={`academic-calendar-page-${activePage}.png`}
                style={{
                  background: '#0d3b66',
                  color: '#ffffff',
                  padding: '0.75rem 1.8rem',
                  borderRadius: '30px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <i className="fas fa-download" style={{ color: '#ffd166' }}></i>
                <span>{isMr ? `पृष्ठ ${activePage} डाउनलोड करा` : `Download Page ${activePage}`}</span>
              </a>
            </div>
          </div>

          {/* Key Dates Timeline Table */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 8px 24px rgba(13, 59, 102, 0.05)',
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0d3b66', marginBottom: '20px' }}>
              <i className="fas fa-list-ol" style={{ color: '#f59e0b', marginRight: '10px' }}></i>
              {isMr ? 'महत्त्वाच्या शैक्षणिक तारखा (Key Academic Milestones)' : 'Key Academic Dates & Events'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {termSchedule.map((tItem, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    padding: '14px 18px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background:
                          tItem.type === 'exam'
                            ? '#fee2e2'
                            : tItem.type === 'clinical'
                            ? '#dbeafe'
                            : tItem.type === 'holiday'
                            ? '#fef3c7'
                            : '#dcfce7',
                        color:
                          tItem.type === 'exam'
                            ? '#dc2626'
                            : tItem.type === 'clinical'
                            ? '#0284c7'
                            : tItem.type === 'holiday'
                            ? '#d97706'
                            : '#16a34a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                      }}
                    >
                      <i
                        className={`fas ${
                          tItem.type === 'exam'
                            ? 'fa-pen-alt'
                            : tItem.type === 'clinical'
                            ? 'fa-stethoscope'
                            : tItem.type === 'holiday'
                            ? 'fa-sun'
                            : 'fa-calendar-check'
                        }`}
                      ></i>
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#0d3b66' }}>{tItem.event}</strong>
                  </div>
                  <span
                    style={{
                      background: '#0d3b66',
                      color: '#ffd166',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      letterSpacing: '0.3px',
                    }}
                  >
                    {tItem.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
