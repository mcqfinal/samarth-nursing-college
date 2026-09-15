'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function CommitteesPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState(0);

  const committees = [
    {
      id: 'anti-ragging',
      title: isMr ? 'अँटी-रॅगिंग समिती (Anti-Ragging Committee)' : 'Anti-Ragging Committee',
      icon: 'fa-shield-alt',
      color: '#dc2626',
      bgLight: '#fee2e2',
      objective: isMr
        ? 'महाविद्यालयाच्या आवारात व वसतिगृहात १००% रॅगिंगमुक्त, सुरक्षित व शिस्तबद्ध वातावरण राखणे.'
        : 'To ensure a 100% ragging-free, secure, and disciplined learning environment across campus and hostels.',
      members: [
        { name: 'Dr. Rameshwar Shinde', role: isMr ? 'अध्यक्ष / प्राचार्य' : 'Chairperson / Principal', phone: '+91 96894 86570' },
        { name: 'Mrs. Sayyed Firdosh Gulab', role: isMr ? 'सदस्य सचिव (Principal GNM)' : 'Member Secretary (Principal GNM)', phone: '+91 96894 86570' },
        { name: 'Mrs. Raghatate Pooja Tarachand', role: isMr ? 'सदस्य (Principal ANM)' : 'Member (Principal ANM)', phone: '+91 96894 86570' },
        { name: 'Police Inspector (Sangamner Rural)', role: isMr ? 'पोलीस प्रतिनिधी' : 'Police Administration Rep.', phone: '02425-225333' },
        { name: 'Mr. Deepak Thorat', role: isMr ? 'स्थानिक मीडिया प्रतिनिधी' : 'Local Media Representative', phone: '+91 98220 00000' },
        { name: 'Adv. Priya Deshmukh', role: isMr ? 'एनजीओ व कायदेविषयक सल्लागार' : 'NGO / Legal Advisor', phone: '+91 94220 00000' },
        { name: 'Mr. Sunil Tambe', role: isMr ? 'पालक प्रतिनिधी' : 'Parent Representative', phone: '+91 98500 00000' },
        { name: 'Miss. Sneha Gaikwad', role: isMr ? 'विद्यार्थी प्रतिनिधी (GNM 3rd Year)' : 'Student Representative (GNM)', phone: 'Campus Office' },
      ],
      helpline: '1800-180-5522 (National Anti-Ragging Toll Free)',
    },
    {
      id: 'icc-women',
      title: isMr ? 'महिला तक्रार निवारण व विशाखा समिती (ICC / Women Cell)' : 'Internal Complaints & Women Grievance Cell',
      icon: 'fa-female',
      color: '#ec4899',
      bgLight: '#fce7f3',
      objective: isMr
        ? 'विद्यार्थिनी व महिला कर्मचाऱ्यांच्या सन्मान, सुरक्षितता व समान संधींचे रक्षण करणे.'
        : 'To uphold dignity, gender equity, safety, and speedy redressal of women grievances on campus.',
      members: [
        { name: 'Mrs. Sayyed Firdosh Gulab', role: isMr ? 'अध्यक्षा' : 'Presiding Officer', phone: '+91 96894 86570' },
        { name: 'Mrs. Raghatate Pooja Tarachand', role: isMr ? 'सदस्य' : 'Faculty Member', phone: '+91 96894 86570' },
        { name: 'Mrs. Sunita Kadam', role: isMr ? 'शिक्षकेतर महिला प्रतिनिधी' : 'Non-Teaching Staff Rep.', phone: 'Campus Office' },
        { name: 'Adv. Manisha Pawar', role: isMr ? 'बाह्य तज्ज्ञ / कायदेतज्ज्ञ' : 'External NGO / Legal Expert', phone: '+91 98230 00000' },
        { name: 'Miss. Pooja Navale', role: isMr ? 'विद्यार्थिनी प्रतिनिधी' : 'Girl Student Representative', phone: 'Campus Office' },
      ],
      helpline: 'samarthnursing41@gmail.com (Confidential Cell)',
    },
    {
      id: 'grievance',
      title: isMr ? 'विद्यार्थी तक्रार निवारण समिती (Student Grievance Cell)' : 'Student Grievance Redressal Cell',
      icon: 'fa-hands-helping',
      color: '#2563eb',
      bgLight: '#dbeafe',
      objective: isMr
        ? 'विद्यार्थ्यांच्या शैक्षणिक, वसतिगृह किंवा प्रशासकीय अडीअडचणींचे तत्परतेने निरसन करणे.'
        : 'To address and resolve academic, hostel, or administrative concerns of students with total fairness.',
      members: [
        { name: 'Principal (Academic Head)', role: isMr ? 'अध्यक्ष' : 'Chairman', phone: '+91 96894 86570' },
        { name: 'Senior Faculty (Clinical Head)', role: isMr ? 'सदस्य' : 'Member', phone: '+91 96894 86570' },
        { name: 'Hostel Warden (Girls & Boys)', role: isMr ? 'वसतिगृह प्रमुख' : 'Hostel Wardens', phone: '+91 96894 86570' },
        { name: 'Student General Secretary', role: isMr ? 'विद्यार्थी प्रतिनिधी' : 'Student Representative', phone: 'Campus Office' },
      ],
      helpline: '+91 96894 86570',
    },
    {
      id: 'sc-st',
      title: isMr ? 'मागासवर्गीय कल्याण कक्ष (SC/ST/OBC Welfare Cell)' : 'SC / ST / OBC Welfare Cell',
      icon: 'fa-balance-scale',
      color: '#059669',
      bgLight: '#d1fae5',
      objective: isMr
        ? 'मागासवर्गीय विद्यार्थ्यांच्या शिष्यवृत्ती, सवलती व शैक्षणिक हक्कांची प्रभावी अंमलबजावणी करणे.'
        : 'To oversee scholarship disbursement, fee concessions, and equal opportunity for marginalized categories.',
      members: [
        { name: 'Principal / Management Rep', role: isMr ? 'अध्यक्ष' : 'Chairman', phone: '+91 96894 86570' },
        { name: 'Nodal Officer (MahaDBT Scholarship)', role: isMr ? 'नोडल अधिकारी' : 'MahaDBT Nodal Officer', phone: '+91 96894 86570' },
        { name: 'Senior Faculty Member', role: isMr ? 'सदस्य' : 'Faculty Member', phone: '+91 96894 86570' },
        { name: 'Student Representative (Reserved Category)', role: isMr ? 'विद्यार्थी प्रतिनिधी' : 'Student Representative', phone: 'Campus Office' },
      ],
      helpline: 'MahaDBT Desk, Samarth Campus',
    },
    {
      id: 'iqac',
      title: isMr ? 'अंतर्गत गुणवत्ता नियंत्रण कक्ष (IQAC / Academic Monitoring)' : 'Internal Quality Assurance Cell (IQAC)',
      icon: 'fa-award',
      color: '#7c3aed',
      bgLight: '#ede9fe',
      objective: isMr
        ? 'नर्सिंग शिक्षणाचा दर्जा, क्लिनिकल मानके व प्रयोगशाळांचे नियमित परीक्षण करणे.'
        : 'Continuous enhancement of academic standards, simulation lab protocols, and faculty development.',
      members: [
        { name: 'Head of Institution', role: isMr ? 'संचालक / अध्यक्ष' : 'Director / Chairperson', phone: '+91 96894 86570' },
        { name: 'IQAC Coordinator', role: isMr ? 'समन्वयक' : 'IQAC Coordinator', phone: '+91 96894 86570' },
        { name: 'Hospital Clinical In-charge', role: isMr ? 'रुग्णालय प्रतिनिधी' : 'Civil Hospital Clinical Rep', phone: '+91 96894 86570' },
        { name: 'Alumni Representative', role: isMr ? 'माजी विद्यार्थी प्रतिनिधी' : 'Alumni Representative', phone: '+91 96894 86570' },
      ],
      helpline: 'Academic Office, Samarth College',
    },
  ];

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)', color: '#ffffff', padding: '55px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '5px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.06em' }}>
            <i className="fas fa-sitemap"></i> {isMr ? 'समित्या व कक्ष' : 'COMMITTEES & CELLS'}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'महाविद्यालयीन वैधानिक व नियामक समित्या' : 'Statutory & College Committees'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: '0 0 16px' }}>
            {isMr ? 'शिस्त, गुणवत्ता व विद्यार्थी सुरक्षितता' : 'Discipline, Quality & Student Safety'}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <Link href="/about" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'आमच्याविषयी' : 'About'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'समित्या' : 'Committees'}</span>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f8fafc', padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-pill-tag">
              {isMr ? '🏛️ शिस्त, गुणवत्ता व सुरक्षितता' : '🏛️ DISCIPLINE, QUALITY & SAFETY'}
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#0d3b66', fontWeight: 800 }}>
              {isMr ? 'संस्थेतील विविध नियामक समित्या' : 'Institutional Regulatory Committees'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '750px', margin: '10px auto 0' }}>
              {isMr
                ? 'महाराष्ट्र शासन, MSBNPE, MSBTE व UGC च्या मार्गदर्शक तत्त्वांनुसार गठित केलेल्या समित्या.'
                : 'Formed in compliance with Maharashtra Government, MSBNPE, MSBTE & regulatory statutory mandates.'}
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '35px' }}>
            {committees.map((comm, idx) => (
              <button
                key={comm.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  background: activeTab === idx ? '#0d3b66' : '#ffffff',
                  color: activeTab === idx ? '#ffffff' : '#334155',
                  border: activeTab === idx ? '1.5px solid #0d3b66' : '1.5px solid #e2e8f0',
                  padding: '10px 18px',
                  borderRadius: '30px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: activeTab === idx ? '0 6px 18px rgba(13, 59, 102, 0.2)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <i className={`fas ${comm.icon}`} style={{ color: activeTab === idx ? '#ffd166' : comm.color }}></i>
                <span>{comm.title.split('(')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Active Committee Display */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(13, 59, 102, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: committees[activeTab].bgLight,
                  color: committees[activeTab].color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0,
                }}
              >
                <i className={`fas ${committees[activeTab].icon}`}></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0d3b66', margin: 0 }}>
                  {committees[activeTab].title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '4px 0 0' }}>
                  {committees[activeTab].objective}
                </p>
              </div>
            </div>

            {/* Member Table */}
            <div style={{ overflowX: 'auto', marginTop: '25px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 800, color: '#0d3b66' }}>#</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 800, color: '#0d3b66' }}>{isMr ? 'नाव' : 'Name'}</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 800, color: '#0d3b66' }}>{isMr ? 'पद / जबाबदारी' : 'Designation / Role'}</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 800, color: '#0d3b66' }}>{isMr ? 'संपर्क' : 'Contact'}</th>
                  </tr>
                </thead>
                <tbody>
                  {committees[activeTab].members.map((m, mIdx) => (
                    <tr key={mIdx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontSize: '0.88rem', color: '#64748b', fontWeight: 700 }}>{mIdx + 1}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.92rem', color: '#0d3b66', fontWeight: 700 }}>{m.name}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.88rem', color: '#334155' }}>
                        <span style={{ background: '#f1f5f9', padding: '3px 10px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
                          {m.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '0.88rem', color: '#0284c7', fontWeight: 600 }}>{m.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Helpline Banner */}
            <div
              style={{
                marginTop: '25px',
                padding: '14px 20px',
                background: '#fffdf5',
                border: '1px solid #fef3c7',
                borderLeft: '4px solid #f59e0b',
                borderRadius: '0 12px 12px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div style={{ fontSize: '0.9rem', color: '#92400e', fontWeight: 600 }}>
                <i className="fas fa-phone-alt" style={{ marginRight: '8px', color: '#f59e0b' }}></i>
                <strong>{isMr ? 'तक्रार व सहाय्य कक्ष:' : 'Grievance / Helpline:'}</strong> {committees[activeTab].helpline}
              </div>
              <Link
                href="/contact"
                style={{
                  background: '#0d3b66',
                  color: '#ffffff',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {isMr ? 'तक्रार नोंदवा' : 'Submit Grievance'} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
