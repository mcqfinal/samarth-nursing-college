'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function FacilitiesPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cmsData } = usePageContent('facilities');

  // 18 Campus Facilities Fallback
  const campusFacilities = [
    {
      titleEn: 'Spacious & Well-Maintained Campus',
      titleMr: 'विशाल व सुसज्ज परिसर',
      descEn: 'A clean, green, disciplined, and learner-friendly campus infrastructure providing a peaceful atmosphere for education.',
      descMr: 'निसर्गरम्य, स्वच्छ, सुरक्षित आणि शिस्तबद्ध कॅम्पस परिसर जो विद्यार्थ्यांना एकाग्रतेने शिक्षण घेण्यासाठी आदर्श वातावरण पुरवतो.',
      icon: 'fa-building',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Modern Classrooms',
      titleMr: 'आधुनिक व प्रशस्त वर्गखोल्या',
      descEn: 'Spacious, well-ventilated classrooms designed to provide a comfortable and focused learning environment.',
      descMr: 'स्वच्छ, प्रशस्त, हवेशीर आणि विद्यार्थ्यांना अभ्यासासाठी अनुकूल असे शैक्षणिक वातावरण.',
      icon: 'fa-chalkboard-teacher',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      titleEn: 'Advanced Nursing Labs',
      titleMr: 'अद्ययावत नर्सिंग प्रयोगशाळा',
      descEn: 'Well-equipped laboratories that provide students with hands-on practice in essential nursing procedures and clinical skills.',
      descMr: 'नर्सिंगच्या विविध प्रक्रियांचा प्रत्यक्ष सराव करण्यासाठी सुसज्ज प्रयोगशाळांची सुविधा.',
      icon: 'fa-flask',
      color: '#0d3b66',
      bgLight: '#e2e8f0',
    },
    {
      titleEn: 'Skill & Simulation Lab',
      titleMr: 'स्किल व सिम्युलेशन लॅब',
      descEn: 'A dedicated environment for developing nursing skills through demonstrations, practice sessions and simulation-based learning.',
      descMr: 'नर्सिंग कौशल्ये, प्रक्रिया आणि क्लिनिकल परिस्थितींचा सराव करण्यासाठी विशेष प्रशिक्षण सुविधा.',
      icon: 'fa-user-nurse',
      color: '#d97706',
      bgLight: '#fef3c7',
    },
    {
      titleEn: 'Well-Stocked Library',
      titleMr: 'सुसज्ज ग्रंथालय',
      descEn: 'Rich collection of nursing textbooks, reference manuals, medical journals, periodicals, and quiet reading study spaces.',
      descMr: 'नर्सिंग विषयाची पाठ्यपुस्तके, संदर्भ पुस्तके, जर्नल्स, मासिके आणि वाचनासाठी शांत अभ्यासिका कक्ष.',
      icon: 'fa-book-open',
      color: '#9333ea',
      bgLight: '#f3e8ff',
    },
    {
      titleEn: 'Computer & Digital Learning Facility',
      titleMr: 'संगणक व डिजिटल लर्निंग सुविधा',
      descEn: 'Modern computer workstations for digital health records, online research, assignments, and healthcare informatics.',
      descMr: 'ऑनलाइन रिसर्च, प्रोजेक्ट्स आणि हॉस्पिटल इन्फॉर्मेशन सिस्टीमचे तांत्रिक शिक्षण देण्यासाठी सुसज्ज कॉम्प्युटर लॅब.',
      icon: 'fa-laptop',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Internet / Wi-Fi Connectivity',
      titleMr: 'हाय-स्पीड इंटरनेट व वाय-फाय सुविधा',
      descEn: 'High-speed broadband Wi-Fi connectivity across campus and computer labs to facilitate continuous digital learning.',
      descMr: 'कॅम्पस आणि लॅबमध्ये अखंडित हाय-स्पीड इंटरनेट व वाय-फाय, ज्यामुळे डिजिटल शिक्षणामध्ये मदत होते.',
      icon: 'fa-wifi',
      color: '#2563eb',
      bgLight: '#dbeafe',
    },
    {
      titleEn: 'Comfortable Hostel Facility',
      titleMr: 'सुरक्षित व आरामदायी वसतिगृह सुविधा',
      descEn: 'Well-furnished living rooms, dedicated resident warden, 24/7 security, and a peaceful study atmosphere.',
      descMr: 'स्वच्छ खोल्या, अभ्यासासाठी अनुकूल वातावरण, पूर्णवेळ वॉर्डन देखरेख आणि २४ तास सुरक्षित निवास व्यवस्था.',
      icon: 'fa-hotel',
      color: '#e11d48',
      bgLight: '#ffe4e6',
    },
    {
      titleEn: 'Hygienic Dining & Food Facility',
      titleMr: 'स्वच्छ व सकस भोजन व्यवस्था / मेस',
      descEn: 'Clean, spacious dining hall providing freshly cooked, nutritious, balanced, and hygienic meals daily.',
      descMr: 'रोज ताजे, सकस आणि पौष्टिक जेवण पुरवणारी अत्यंत स्वच्छ व आरोग्यदायी मेस व भोजनालय व्यवस्था.',
      icon: 'fa-utensils',
      color: '#ea580c',
      bgLight: '#ffedd5',
    },
    {
      titleEn: 'Safe Drinking Water Facility (RO)',
      titleMr: 'शुद्ध पिण्याच्या पाण्याची सोय (RO Water)',
      descEn: 'Industrial Reverse Osmosis (RO) purified water stations with coolers installed across the campus.',
      descMr: 'विद्यार्थ्यांच्या चांगल्या आरोग्यासाठी संपूर्ण कॅम्पसमध्ये आधुनिक आरओ (RO) शुद्ध व थंड पिण्याच्या पाण्याची सोय.',
      icon: 'fa-tint',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Clean & Hygienic Washrooms',
      titleMr: 'स्वच्छ व निर्जंतुक स्वच्छतागृहे',
      descEn: 'Separately dedicated, sanitized, and regularly cleaned washroom facilities on each floor.',
      descMr: 'प्रत्येक मजल्यावर स्वतंत्र, दररोज निर्जंतुक केली जाणारी व अत्यंत स्वच्छ स्वच्छतागृहे.',
      icon: 'fa-restroom',
      color: '#059669',
      bgLight: '#d1fae5',
    },
    {
      titleEn: '24/7 Security & CCTV Surveillance',
      titleMr: '२४ तास सुरक्षा व सीसीटीव्ही देखरेख',
      descEn: 'Round-the-clock trained security guards and comprehensive high-definition CCTV camera monitoring.',
      descMr: 'प्रशिक्षित सुरक्षारक्षक, प्रवेशद्वारावर कडक नोंदणी आणि संपूर्ण कॅम्पसवर २४ तास सीसीटीव्ही कॅमेऱ्यांची नजर.',
      icon: 'fa-video',
      color: '#dc2626',
      bgLight: '#fee2e2',
    },
    {
      titleEn: 'Parking Facility',
      titleMr: 'वाहन पार्किंग व्यवस्था',
      descEn: 'Organized and spacious parking zones for two-wheelers and four-wheelers of students, staff, and visitors.',
      descMr: 'विद्यार्थी, प्राध्यापक व पाहुण्यांच्या वाहनांसाठी सुरक्षित व प्रशस्त पार्किंग व्यवस्था.',
      icon: 'fa-parking',
      color: '#475569',
      bgLight: '#f1f5f9',
    },
    {
      titleEn: 'Sports & Recreation Facilities',
      titleMr: 'क्रीडा व मैदानी खेळ सुविधा',
      descEn: 'Playground and facilities for outdoor sports along with indoor games encouraging physical fitness and team spirit.',
      descMr: 'शारीरिक तंदुरुस्ती व खेळभावना वाढवण्यासाठी मैदानी खेळ (व्हॉलीबॉल, बॅडमिंटन) व इनडोअर खेळांची सुविधा.',
      icon: 'fa-futbol',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      titleEn: 'Canteen & Refreshment Facility',
      titleMr: 'कॅन्टीन व अल्पोपहार सुविधा',
      descEn: 'On-campus clean canteen serving fresh tea, coffee, healthy snacks, and quick refreshments at student-friendly prices.',
      descMr: 'विद्यार्थ्यांसाठी चहा, कॉफी आणि स्वच्छ, ताजे अल्पोपहार माफक दरात उपलब्ध करून देणारी कॉलेज कॅन्टीन.',
      icon: 'fa-coffee',
      color: '#b45309',
      bgLight: '#fef3c7',
    },
    {
      titleEn: 'Seminar Hall & Auditorium',
      titleMr: 'ऑडिटोरियम व सेमिनार हॉल',
      descEn: 'Equipped with projection screens and sound systems for guest lectures, clinical workshops, and academic events.',
      descMr: 'तज्ज्ञ डॉक्टरांची व्याख्याने, सेमिनार, कार्यशाळा आणि सांस्कृतिक कार्यक्रमांसाठी सुसज्ज सेमिनार हॉल.',
      icon: 'fa-users',
      color: '#0d3b66',
      bgLight: '#e2e8f0',
    },
    {
      titleEn: 'Student Common Area & Lounge',
      titleMr: 'विद्यार्थी विश्रांती व चर्चा कक्ष',
      descEn: 'Dedicated spaces for students to relax, engage in group discussions, peer study, and co-curricular interactions.',
      descMr: 'अभ्यासाच्या फावल्या वेळेत विश्रांती, गटचर्चा आणि सहशालेय उपक्रमांच्या नियोजनासाठी स्वतंत्र विद्यार्थी कक्ष.',
      icon: 'fa-couch',
      color: '#7c3aed',
      bgLight: '#ede9fe',
    },
    {
      titleEn: 'First Aid & Health Care Facility',
      titleMr: 'आरोग्य केंद्र व प्रथमोपचार सुविधा',
      descEn: 'Dedicated on-campus medical care room with first aid support, emergency response, and routine student health checkups.',
      descMr: 'विद्यार्थी व कर्मचाऱ्यांच्या आरोग्यासाठी सुसज्ज प्रथमोपचार कक्ष, तातडीची वैद्यकीय मदत व नियमित आरोग्य तपासणी.',
      icon: 'fa-briefcase-medical',
      color: '#ef4444',
      bgLight: '#fee2e2',
    },
  ];

  const [facilitiesList, setFacilitiesList] = useState(campusFacilities);

  useEffect(() => {
    fetch('/api/facilities')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.facilities && data.facilities.length > 0) {
          setFacilitiesList(data.facilities);
        }
      })
      .catch(() => {});
  }, []);

  const renderModernAmp = (text, ampColor = '#ffd166') => {
    if (!text || typeof text !== 'string') return text;
    if (!text.includes('&')) return text;
    const parts = text.split('&');
    return (
      <>
        {parts[0]}
        <span style={{ color: ampColor, fontFamily: 'system-ui, -apple-system, sans-serif', padding: '0 2px' }}>&</span>
        {parts.slice(1).join('&')}
      </>
    );
  };

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #071e3d 0%, #0d3b66 50%, #1e3a8a 100%)',
        position: 'relative',
        overflow: 'hidden',
        color: '#ffffff',
        padding: 'clamp(50px, 6vw, 70px) 20px',
        textAlign: 'center',
      }}>
        {/* Ambient Decorative Glows */}
        <div style={{
          position: 'absolute', top: -50, right: -50, width: 220, height: 220,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,183,3,0.14) 0%, rgba(255,183,3,0) 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,209,102,0.15)', border: '1px solid rgba(255,209,102,0.4)',
            color: '#ffd166', padding: '6px 18px', borderRadius: '999px',
            fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '14px',
          }}>
            <i className="fas fa-hospital"></i> {isMr ? (cmsData?.hero?.badgeMr || 'कॅम्पस सुविधा') : (cmsData?.hero?.badgeEn || 'CAMPUS AMENITIES')}
          </div>
          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3rem)',
            fontWeight: 800,
            margin: '0 0 12px',
            color: '#ffffff',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            {isMr ? (
              (cmsData?.hero?.titleMr || 'महाविद्यालयीन सुविधा व पायाभूत सुविधा')
            ) : (
              <>Campus Facilities <span style={{ color: '#ffd166', fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> Infrastructure</>
            )}
          </h1>
          <p style={{
            color: '#cbd5e1',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {isMr ? (cmsData?.hero?.descMr || 'वसतिगृह, अद्ययावत नर्सिंग लॅब्ज, डिजिटल वर्गखोल्या, समृद्ध ग्रंथालय आणि हॉस्पिटल ट्रेनिंग.') : (cmsData?.hero?.descEn || 'Hostels, Advanced Nursing Labs, Digital Classrooms, Library, and Modern Hospital Training.')}
          </p>
        </div>
      </section>

      {/* 2. Main Facilities Hub Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          
          {/* Intro Header */}
          <div className="intro-text text-center" style={{ maxWidth: '880px', margin: '0 auto 50px' }}>
            <span className="section-pill-tag" style={{ marginBottom: '14px', display: 'inline-block' }}>
              {isMr ? (cmsData?.intro?.badgeMr || '🌟 महाविद्यालयीन सुविधा') : (cmsData?.intro?.badgeEn || `🌟 ${facilitiesList.length} KEY AMENITIES`)}
            </span>
            <h2 className="section-title" style={{ fontSize: '2.3rem', color: '#0d3b66', margin: '0 0 14px' }}>
              {isMr
                ? (cmsData?.intro?.headingMr || 'उत्तम शिक्षणासाठी आधुनिक आणि विद्यार्थी-केंद्रित सुविधा')
                : (cmsData?.intro?.headingEn || 'A Modern Campus for Better Nursing Education')}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.8', margin: '0 auto 24px' }}>
              {isMr
                ? (cmsData?.intro?.descMr || 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे विद्यार्थ्यांना दर्जेदार शैक्षणिक शिक्षणासोबतच प्रात्यक्षिक प्रशिक्षण, क्लिनिकल अनुभव, कौशल्य विकास आणि सर्वांगीण व्यक्तिमत्त्व विकासासाठी आवश्यक सुविधा उपलब्ध करून देण्यावर भर दिला जातो.')
                : (cmsData?.intro?.descEn || 'Samarth College of Nursing, Sangamner provides a supportive academic environment where students receive quality classroom education, practical skill training, clinical exposure, and opportunities for overall development.')}
            </p>

            {/* Quick Navigation Segmented Bar */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              backgroundColor: '#ffffff',
              padding: '6px 8px',
              borderRadius: '999px',
              boxShadow: '0 4px 20px rgba(13, 59, 102, 0.07)',
              border: '1px solid #e2e8f0',
              maxWidth: '100%',
              margin: '0 auto',
            }}>
              <a
                href="#campus-grid"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)',
                  color: '#ffffff',
                  padding: '9px 20px',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(13, 59, 102, 0.25)',
                }}
              >
                <i className="fas fa-th-large" style={{ color: '#ffd166' }}></i>
                <span>{isMr ? `${facilitiesList.length} कॅम्पस सुविधा` : `${facilitiesList.length} Campus Amenities`}</span>
              </a>

              <Link
                href="/facilities/hostel"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f8fafc',
                  color: '#1e293b',
                  border: '1px solid #e2e8f0',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: '#e0f2fe', color: '#0284c7',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem',
                }}>
                  <i className="fas fa-hotel"></i>
                </span>
                <span>{isMr ? 'वसतिगृह व मेस' : <>Hostel <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> Mess</>}</span>
              </Link>

              <Link
                href="/facilities/clinical-training"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f8fafc',
                  color: '#1e293b',
                  border: '1px solid #e2e8f0',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: '#fee2e2', color: '#dc2626',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem',
                }}>
                  <i className="fas fa-hospital-alt"></i>
                </span>
                <span>{isMr ? 'क्लिनिकल ट्रेनिंग' : 'Clinical Training'}</span>
              </Link>

              <Link
                href="/facilities/question-papers"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f8fafc',
                  color: '#1e293b',
                  border: '1px solid #e2e8f0',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: '#f3e8ff', color: '#7c3aed',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem',
                }}>
                  <i className="fas fa-file-alt"></i>
                </span>
                <span>{isMr ? 'जुने प्रश्नसंच' : 'Question Papers'}</span>
              </Link>
            </div>
          </div>

          {/* ========================================================
              1. 18 CAMPUS FACILITIES GRID
              ======================================================== */}
          <div id="campus-grid" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ color: '#0d3b66', fontSize: '1.7rem', margin: 0, fontWeight: 800 }}>
                  <i className="fas fa-university" style={{ color: '#ffb703', marginRight: '10px' }}></i>
                  {isMr ? 'आमच्या कॅम्पस सुविधा' : 'Our Campus Facilities'}
                </h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.95rem' }}>
                  {isMr ? `आरोग्य शिक्षणासाठी आवश्यक असणाऱ्या ${facilitiesList.length} प्रमुख पायाभूत सुविधा` : `Comprehensive ${facilitiesList.length}-point amenities built for world-class nursing education`}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ backgroundColor: '#eef8f6', color: '#1a9988', padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.88rem', border: '1px solid #c8e6e1' }}>
                  {facilitiesList.length} {isMr ? 'आधुनिक सुविधा' : 'Key Amenities'}
                </span>
                <Link
                  href="/admin/facilities"
                  style={{
                    backgroundColor: '#0d3b66',
                    color: '#ffb703',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontWeight: '600',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fas fa-edit"></i> Edit in Admin
                </Link>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {facilitiesList.map((facility, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: facility.bgLight || '#e2e8f0',
                        color: facility.color || '#0d3b66',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        flexShrink: 0,
                      }}
                    >
                      <i className={`fas ${facility.icon || 'fa-building'}`}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>
                        #{idx + 1}
                      </span>
                      <h4 style={{
                        color: '#0d3b66',
                        fontSize: '1.08rem',
                        margin: 0,
                        lineHeight: '1.35',
                        fontFamily: "'Inter', -apple-system, sans-serif",
                        fontWeight: 700,
                        letterSpacing: '-0.2px',
                      }}>
                        {isMr ? facility.titleMr : renderModernAmp(facility.titleEn, facility.color || '#0284c7')}
                      </h4>
                    </div>
                  </div>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.92rem',
                    lineHeight: '1.6',
                    margin: 0,
                    flexGrow: 1,
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {isMr ? facility.descMr : facility.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              2. FOUR DEDICATED FACILITY HUBS (SEPARATE PAGES SHOWCASE)
              ======================================================== */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <span className="section-pill-tag" style={{ marginBottom: '10px', display: 'inline-block' }}>
                {isMr ? 'विशेष स्वतंत्र विभाग' : 'DEDICATED FACILITY PAGES'}
              </span>
              <h3 style={{ color: '#0d3b66', fontSize: '2rem', fontWeight: 800, margin: '6px 0 10px' }}>
                {isMr ? 'आमचे प्रमुख शैक्षणिक व कल्याणकारी विभाग' : 'Explore Dedicated Facility Centers'}
              </h3>
              <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
                {isMr
                  ? 'प्रत्येक विभागाची सविस्तर माहिती, नियम, मार्गदर्शक तत्त्वे आणि सुविधा स्वतंत्र पृष्ठांवर उपलब्ध आहेत.'
                  : 'Detailed information, guidelines, photo galleries, and procedures are organized into specialized subpages.'}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {/* Card 1: Hostel */}
              <div
                id="hostel"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '30px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  scrollMarginTop: '100px',
                }}
              >
                <div>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '16px' }}>
                    <i className="fas fa-hotel"></i>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {isMr ? 'निवास व्यवस्था' : <>RESIDENCE <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> MESS</>}
                  </span>
                  <h4 style={{ color: '#0d3b66', fontSize: '1.3rem', fontWeight: 800, margin: '8px 0 10px' }}>
                    {isMr ? 'वसतिगृह सुविधा (Hostel)' : 'Hostel Facility'}
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {isMr
                      ? 'विद्यार्थिनींसाठी सुरक्षित, स्वच्छ व शिस्तबद्ध निवास, पौष्टिक शाकाहारी भोजन, २४ तास सुरक्षा, शुद्ध RO पाणी व निवासी वॉर्डन देखरेख.'
                      : 'Safe campus residence with furnished rooms, nutritious dining hall, 24/7 security, resident female warden, and quiet study areas.'}
                  </p>
                </div>
                <Link
                  href="/facilities/hostel"
                  style={{
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                  }}
                >
                  {isMr ? 'वसतिगृह संपूर्ण माहिती पहा' : 'View Hostel Page'} <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              {/* Card 2: Clinical Training */}
              <div
                id="clinical"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '30px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  scrollMarginTop: '100px',
                }}
              >
                <div>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '16px' }}>
                    <i className="fas fa-hospital-alt"></i>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {isMr ? 'हॉस्पिटल पोस्टिंग' : 'HOSPITAL EXPOSURE'}
                  </span>
                  <h4 style={{ color: '#0d3b66', fontSize: '1.3rem', fontWeight: 800, margin: '8px 0 10px' }}>
                    {isMr ? 'क्लिनिकल ट्रेनिंग (Clinical)' : 'Clinical Training'}
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {isMr
                      ? '२० विविध विशेष क्लिनिकल क्षेत्रांतील थेट रुग्णसेवा अनुभव, ६-स्तरीय क्लिनिकल लर्निंग मंत्र, अद्ययावत सिम्युलेशन लॅब्स व नामांकित हॉस्पिटल संलग्नता.'
                      : 'Rotational clinical exposure across 20 specialties, bedside nursing, 6-stage clinical learning mantra, and multi-specialty hospital postings.'}
                  </p>
                </div>
                <Link
                  href="/facilities/clinical-training"
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                  }}
                >
                  {isMr ? 'क्लिनिकल रोटेशन्स पहा' : 'View Clinical Rotations'} <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              {/* Card 3: Question Papers */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '30px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '16px' }}>
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {isMr ? 'अभ्यास साहित्य' : 'EXAM ARCHIVE'}
                  </span>
                  <h4 style={{ color: '#0d3b66', fontSize: '1.3rem', fontWeight: 800, margin: '8px 0 10px' }}>
                    {isMr ? 'जुने प्रश्नसंच (Question Papers)' : 'Old Question Papers'}
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {isMr
                      ? 'GNM, ANM आणि ADMLT अभ्यासक्रमांच्या MSBNPE व MSBTE बोर्डाच्या मागील वर्षांच्या अधिकृत प्रश्नपत्रिका मोफत डाऊनलोड करा.'
                      : 'Download official previous year MSBNPE & MSBTE board examination question papers with course and year filtering.'}
                  </p>
                </div>
                <Link
                  href="/facilities/question-papers"
                  style={{
                    backgroundColor: '#7c3aed',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                  }}
                >
                  {isMr ? 'प्रश्नसंच डाऊनलोड करा' : 'Browse Question Papers'} <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================
              3. CAMPUS TOUR & CONTACT CTA
              ======================================================== */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '40px',
              border: '1.5px solid #e2e8f0',
              textAlign: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.03)',
            }}
          >
            <h3 style={{ color: '#0d3b66', fontSize: '1.65rem', marginBottom: '12px', fontWeight: 800 }}>
              {isMr ? 'प्रत्यक्ष कॅम्पस भेट व सुविधांची पाहणी' : <>Schedule a Campus Visit <span style={{ color: '#ffb703', fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> Tour</>}
            </h3>
            <p style={{ color: '#64748b', fontSize: '1.02rem', maxWidth: '750px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {isMr
                ? 'आमच्या अद्ययावत प्रयोगशाळा, सुसज्ज वर्गखोल्या, वसतिगृह आणि कॅम्पस परिसराची प्रत्यक्ष पाहणी करण्यासाठी पालकांसह महाविद्यालयास सदिच्छा भेट द्या.'
                : 'Experience our world-class nursing labs, digital classrooms, peaceful hostel, and green campus in person. Parents and students are always welcome.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">
                <i className="fas fa-phone-alt" style={{ marginRight: '8px' }}></i>
                {isMr ? 'अधिक माहितीसाठी संपर्क करा' : 'Inquire About Facilities'}
              </Link>
              <Link href="/gallery" className="btn btn-secondary">
                <i className="fas fa-images" style={{ marginRight: '8px' }}></i>
                {isMr ? 'कॅम्पस गॅलरी पहा' : 'View Campus Gallery'}
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
