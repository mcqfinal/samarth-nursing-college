'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function FeeStructurePage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const feeData = [
    {
      srNo: 1,
      courseEn: 'A.N.M. (Auxiliary Nurse Midwifery)',
      courseMr: 'ए.एन.एम. (Auxiliary Nurse Midwifery)',
      durationEn: '2 Years',
      durationMr: '२ वर्षे',
      affiliation: 'MSBNPE, Mumbai',
      tutionFee: '₹ 45,455/-',
      devFee: '₹ 4,545/-',
      totalFee: '₹ 50,000/-',
      badgeColor: '#16a34a',
      badgeBg: '#dcfce7',
    },
    {
      srNo: 2,
      courseEn: 'G.N.M. (General Nursing and Midwifery)',
      courseMr: 'जी.एन.एम. (General Nursing and Midwifery)',
      durationEn: '3 Years',
      durationMr: '३ वर्षे',
      affiliation: 'MSBNPE, Mumbai',
      tutionFee: '₹ 49,775/-',
      devFee: '₹ 5,225/-',
      totalFee: '₹ 55,000/-',
      badgeColor: '#0284c7',
      badgeBg: '#e0f2fe',
    },
  ];

  const features = [
    {
      icon: 'fa-graduation-cap',
      titleMr: 'उत्तम शिक्षण',
      titleEn: 'Quality Education',
      descMr: 'अनुभवी व तज्ज्ञ प्राध्यापकांचे मार्गदर्शन',
      descEn: 'Guidance by experienced & expert faculty',
      color: '#0d3b66',
      bg: '#e0f2fe',
    },
    {
      icon: 'fa-user-nurse',
      titleMr: 'कौशल्यपूर्ण शिक्षण',
      titleEn: 'Skill-Based Training',
      descMr: 'अद्ययावत लॅब व आधुनिक प्रात्यक्षिक सुविधा',
      descEn: 'Advanced clinical labs & practical exposure',
      color: '#16a34a',
      bg: '#dcfce7',
    },
    {
      icon: 'fa-heartbeat',
      titleMr: 'आरोग्यदायी सेवा',
      titleEn: 'Healthcare Service',
      descMr: 'रुग्णालयीन प्रत्यक्ष क्लिनिकल अनुभव',
      descEn: 'Hands-on hospital clinical training',
      color: '#dc2626',
      bg: '#fee2e2',
    },
    {
      icon: 'fa-users',
      titleMr: 'उज्ज्वल भविष्य',
      titleEn: 'Bright Future',
      descMr: '१००% करिअर व रोजगार मार्गदर्शन',
      descEn: '100% placement & career guidance',
      color: '#d97706',
      bg: '#fef3c7',
    },
  ];

  const installments = [
    {
      title: isMr ? '१ला हप्ता (प्रवेशाच्या वेळी)' : '1st Installment (At Admission)',
      share: '40%',
      desc: isMr ? 'प्रवेश निश्चिती व शैक्षणिक नोंदणी' : 'Seat confirmation & academic registration',
    },
    {
      title: isMr ? '२रा हप्ता (सत्र १ परीक्षा पूर्व)' : '2nd Installment (Pre-Term 1 Exam)',
      share: '30%',
      desc: isMr ? 'क्लिनिकल पोस्टिंग व लॅब प्रशिक्षण' : 'Clinical postings & laboratory training',
    },
    {
      title: isMr ? '३रा हप्ता (वार्षिक परीक्षा पूर्व)' : '3rd Installment (Pre-Final Exam)',
      share: '30%',
      desc: isMr ? 'मंडळ परीक्षा फॉर्म व अंतिम मूल्यमापन' : 'Board examination form & final assessment',
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)', color: '#ffffff', padding: '55px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '5px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.06em' }}>
            <i className="fas fa-receipt"></i> {isMr ? 'अधिकृत शुल्क संरचना' : 'OFFICIAL FEE STRUCTURE'}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'शुल्क संरचना – शैक्षणिक वर्ष' : 'Fee Structure – Academic Year'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: '0 0 16px' }}>
            {isMr ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर | अहिल्यानगर' : 'Samarth College of Nursing, Sangamner | Ahilyanagar'}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <Link href="/admission" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'प्रवेश' : 'Admission'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'शुल्क संरचना' : 'Fee Structure'}</span>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f8fafc', padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-pill-tag" style={{ display: 'inline-block', background: '#fef3c7', color: '#d97706', padding: '5px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px' }}>
              {isMr ? '💰 अधिकृत व पारदर्शक शुल्क' : '💰 OFFICIAL & TRANSPARENT FEES'}
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#0d3b66', fontWeight: 800, margin: '0 0 12px' }}>
              {isMr ? 'अभ्यासक्रमनिहाय वार्षिक फी तपशील' : 'Course-wise Annual Fee Breakdown'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto 16px' }}>
              <em>&ldquo;{isMr ? 'नर्सिंग क्षेत्रात करिअर घडवा... सेवा हीच खरी साधना !' : 'Build a Career in Nursing... Service is True Devotion!'}&rdquo;</em>
            </p>
            {/* Government Rules For All Castes Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                border: '1.5px solid #86efac',
                borderRadius: '12px',
                padding: '12px 20px',
                maxWidth: '820px',
                margin: '0 auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                color: '#166534',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.08)',
              }}
            >
              <i className="fas fa-landmark" style={{ color: '#16a34a', fontSize: '1.15rem' }}></i>
              <span>
                {isMr
                  ? '🏛️ सर्व जाती/प्रवर्गांसाठी शासकीय नियमांनुसार फी सवलत (As Per Government Rules For All Castes)'
                  : '🏛️ Fee Concessions Applicable As Per Government Rules For All Castes'}
              </span>
            </div>
          </div>

          {/* Official Fee Structure Table Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 8px 25px rgba(13, 59, 102, 0.06)',
              marginBottom: '35px',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '22px', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isMr ? 'महाराष्ट्र शासन व MSBNPE मान्यताप्राप्त' : 'Govt. of Maharashtra & MSBNPE Approved'}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0d3b66', margin: '4px 0 0' }}>
                  {isMr ? 'शुल्क संरचना (Fee Structure)' : 'Official Fee Schedule'}
                </h3>
              </div>
              <div style={{ background: '#fef3c7', color: '#b45309', padding: '6px 14px', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700 }}>
                <i className="fas fa-certificate" style={{ marginRight: '6px' }}></i>
                {isMr ? 'NDCSS नियमांनुसार' : 'As per NDCSS Norms'}
              </div>
            </div>

            {/* Responsive Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)', color: '#ffffff' }}>
                    <th style={{ padding: '14px 16px', fontSize: '0.88rem', fontWeight: 700, borderRadius: '10px 0 0 0', width: '70px', textAlign: 'center' }}>
                      {isMr ? 'अ. क्र.' : 'Sr.'}
                    </th>
                    <th style={{ padding: '14px 16px', fontSize: '0.88rem', fontWeight: 700 }}>
                      <i className="fas fa-book-reader" style={{ marginRight: '8px', color: '#ffd166' }}></i>
                      {isMr ? 'अभ्यासक्रम (Course)' : 'Course'}
                    </th>
                    <th style={{ padding: '14px 16px', fontSize: '0.88rem', fontWeight: 700, textAlign: 'right' }}>
                      <i className="fas fa-coins" style={{ marginRight: '8px', color: '#ffd166' }}></i>
                      {isMr ? 'शिक्षण शुल्क (ट्यूशन फी)' : 'Tuition Fee'}
                    </th>
                    <th style={{ padding: '14px 16px', fontSize: '0.88rem', fontWeight: 700, textAlign: 'right' }}>
                      <i className="fas fa-tools" style={{ marginRight: '8px', color: '#ffd166' }}></i>
                      {isMr ? 'विकास शुल्क (डेव्हलपमेंट फी)' : 'Development Fee'}
                    </th>
                    <th style={{ padding: '14px 18px', fontSize: '0.88rem', fontWeight: 700, borderRadius: '0 10px 0 0', textAlign: 'right', background: '#b45309' }}>
                      <i className="fas fa-rupee-sign" style={{ marginRight: '6px' }}></i>
                      {isMr ? 'एकूण शुल्क (Total)' : 'Total Fee'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeData.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                        transition: 'background 0.2s',
                      }}
                    >
                      <td style={{ padding: '18px 16px', fontWeight: 800, textAlign: 'center', color: '#0d3b66', fontSize: '1rem' }}>
                        <span style={{ display: 'inline-flex', width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }}>
                          {item.srNo}
                        </span>
                      </td>
                      <td style={{ padding: '18px 16px' }}>
                        <div style={{ fontWeight: 800, color: '#0d3b66', fontSize: '1.05rem', marginBottom: '4px' }}>
                          {isMr ? item.courseMr : item.courseEn}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: item.badgeBg, color: item.badgeColor }}>
                            {isMr ? item.durationMr : item.durationEn}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {item.affiliation}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '18px 16px', textAlign: 'right', fontWeight: 700, color: '#334155', fontSize: '1.05rem' }}>
                        {item.tutionFee}
                      </td>
                      <td style={{ padding: '18px 16px', textAlign: 'right', fontWeight: 700, color: '#334155', fontSize: '1.05rem' }}>
                        {item.devFee}
                      </td>
                      <td style={{ padding: '18px 18px', textAlign: 'right', fontWeight: 800, color: '#b45309', fontSize: '1.3rem', background: 'rgba(254, 243, 199, 0.4)' }}>
                        {item.totalFee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Important Notes Box */}
            <div
              style={{
                marginTop: '25px',
                background: '#fffbeb',
                border: '1.5px solid #fde68a',
                borderRadius: '14px',
                padding: '18px 22px',
              }}
            >
              <h4 style={{ color: '#92400e', fontSize: '0.98rem', fontWeight: 800, margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-exclamation-triangle" style={{ color: '#d97706' }}></i>
                {isMr ? 'महत्त्वाची नोंद :' : 'Important Notes :'}
              </h4>
              <ol style={{ margin: 0, paddingLeft: '22px', color: '#78350f', fontSize: '0.92rem', lineHeight: '1.7', fontWeight: 600 }}>
                <li>{isMr ? 'NDCSS च्या नियमाप्रमाणे फी आकारण्यात येईल.' : 'Fees will be charged as per NDCSS regulations and regulatory directives.'}</li>
                <li>{isMr ? 'काही बदल झाल्यास शासनाच्या / संबंधित अधिकाऱ्यांच्या आदेशानुसार आपल्याला कळविण्यात येईल.' : 'Any regulatory changes or revisions will be notified as per Government and Competent Authority orders.'}</li>
              </ol>
            </div>

            {/* Authorized Signatures Row */}
            <div
              style={{
                marginTop: '25px',
                paddingTop: '20px',
                borderTop: '1px dashed #cbd5e1',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
                fontSize: '0.88rem',
                color: '#475569',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-user-check" style={{ color: '#0d3b66', fontSize: '1.2rem' }}></i>
                <div>
                  <strong>{isMr ? 'प्राचार्य (Principal)' : 'Principal'}</strong>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Samarth College of Nursing, Sangamner</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-file-signature" style={{ color: '#0d3b66', fontSize: '1.2rem' }}></i>
                <div>
                  <strong>{isMr ? 'लेखा विभाग (Accountant)' : 'Accounts Department'}</strong>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{isMr ? 'स्वाक्षरी व अधिकृत शिक्का' : 'Signed & Officially Stamped'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Official Document Preview Leaflet Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 8px 24px rgba(13, 59, 102, 0.05)',
              marginBottom: '35px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0d3b66', margin: 0 }}>
                <i className="fas fa-file-alt" style={{ color: '#0284c7', marginRight: '8px' }}></i>
                {isMr ? 'अधिकृत स्वाक्षरी केलेले शुल्क पत्रक (Official Document Leaflet)' : 'Official Stamped Fee Document'}
              </h3>
              <a
                href="/admissions/official-fee-structure.jpg"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#f1f5f9',
                  color: '#0d3b66',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #cbd5e1',
                }}
              >
                <i className="fas fa-expand"></i> {isMr ? 'मोठ्या आकारात पहा' : 'View Full Image'}
              </a>
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                display: 'flex',
                justifyContent: 'center',
                padding: '10px',
              }}
            >
              <Image
                src="/admissions/official-fee-structure.jpg"
                alt="Samarth College of Nursing Official Fee Structure"
                width={1024}
                height={716}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}
                priority
              />
            </div>
          </div>

          {/* 4 Pillars / Features */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {features.map((feat, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '22px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: feat.bg,
                    color: feat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    margin: '0 auto 14px',
                  }}
                >
                  <i className={`fas ${feat.icon}`}></i>
                </div>
                <h4 style={{ color: '#0d3b66', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px' }}>
                  {isMr ? feat.titleMr : feat.titleEn}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                  {isMr ? feat.descMr : feat.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Installment Plan & As Per Government Rules */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '2rem',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(13, 59, 102, 0.05)',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0d3b66', marginBottom: '15px' }}>
                <i className="fas fa-calendar-check" style={{ color: '#f59e0b', marginRight: '8px' }}></i>
                {isMr ? 'सुलभ हप्ता सुविधा (Installment Facility)' : 'Flexible Installment Scheme'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {installments.map((inst, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
                    <span style={{ background: '#0d3b66', color: '#fff', fontSize: '0.85rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px' }}>
                      {inst.share}
                    </span>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#0d3b66', display: 'block' }}>{inst.title}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{inst.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '2.5rem 2rem',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(13, 59, 102, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '16px',
                }}
              >
                <i className="fas fa-landmark"></i>
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0d3b66', marginBottom: '10px' }}>
                {isMr ? 'शासकीय नियमांनुसार' : 'As Per Government Rules'}
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 18px', maxWidth: '420px' }}>
                {isMr
                  ? 'सर्व प्रवर्गांतील विद्यार्थ्यांसाठी फी आकारणी व शासकीय सवलती महाराष्ट्र शासनाच्या नियमांनुसार लागू राहतील.'
                  : 'Fee structure and concessions for all categories are applicable as per Government rules and regulations.'}
              </p>
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1.5px solid #86efac',
                  color: '#166534',
                  padding: '10px 24px',
                  borderRadius: '30px',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(22, 163, 74, 0.1)',
                }}
              >
                <i className="fas fa-check-circle" style={{ color: '#16a34a' }}></i>
                <span>{isMr ? 'शासकीय नियमांनुसार (As Per Government Rules)' : 'As Per Government Rules'}</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
