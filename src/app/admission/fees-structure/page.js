'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FeeStructurePage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const feeData = [
    {
      course: isMr ? 'जी.एन.एम. (जनरल नर्सिंग व मिडवायफ्री)' : 'GNM (General Nursing & Midwifery)',
      duration: isMr ? '३ वर्षे' : '3 Years',
      affiliation: 'MSBNPE, Mumbai',
      tutionFee: '₹ 55,000',
      devFee: '₹ 8,000',
      otherFee: '₹ 7,000',
      totalFee: '₹ 70,000',
      scholarship: isMr ? 'SC/ST: १००% सूट, OBC/EBC: ५०% सूट (MahaDBT नुसार)' : 'SC/ST: 100% Waiver, OBC/EBC: 50% Concession via MahaDBT',
    },
    {
      course: isMr ? 'ए.एन.एम. (ऑक्सिलरी नर्सिंग व मिडवायफ्री)' : 'ANM (Auxiliary Nursing & Midwifery)',
      duration: isMr ? '२ वर्षे' : '2 Years',
      affiliation: 'MSBNPE, Mumbai',
      tutionFee: '₹ 45,000',
      devFee: '₹ 6,000',
      otherFee: '₹ 5,000',
      totalFee: '₹ 56,000',
      scholarship: isMr ? 'SC/ST: १००% सूट, VJNT/SBC/OBC: शासकीय नियमांनुसार' : 'SC/ST: 100% Waiver, VJNT/SBC/OBC: As per Govt. Norms',
    },
    {
      course: isMr ? 'ए.डी.एम.एल.टी. (अॅडव्हान्स्ड मेडिकल लॅब टेक्निशियन)' : 'ADMLT (Advanced Diploma in Medical Lab Tech)',
      duration: isMr ? '१.५ वर्षे' : '1.5 Years',
      affiliation: 'MSBTE, Mumbai',
      tutionFee: '₹ 40,000',
      devFee: '₹ 5,000',
      otherFee: '₹ 5,000',
      totalFee: '₹ 50,000',
      scholarship: isMr ? 'शासकीय महाडीबीटी शिष्यवृत्ती योजना लागू' : 'MahaDBT Government Scholarship Scheme Applicable',
    },
  ];

  const installments = [
    {
      title: isMr ? '१ला हप्ता (प्रवेशाच्या वेळी)' : '1st Installment (At Admission)',
      share: '40%',
      desc: isMr ? 'प्रवेश निश्चिती, नोंदणी व शैक्षणिक साहित्य' : 'Seat confirmation, registration & academic kit',
    },
    {
      title: isMr ? '२रा हप्ता (सत्र १ परीक्षा पूर्व)' : '2nd Installment (Pre-Term 1 Exam)',
      share: '30%',
      desc: isMr ? 'क्लिनिकल पोस्टिंग व लॅब शुल्क' : 'Clinical postings & laboratory training fee',
    },
    {
      title: isMr ? '३रा हप्ता (वार्षिक परीक्षा पूर्व)' : '3rd Installment (Pre-Final Exam)',
      share: '30%',
      desc: isMr ? 'मंडळ परीक्षा फॉर्म व अंतिम मूल्यमापन' : 'Board examination form & final assessment',
    },
  ];

  return (
    <>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>{isMr ? 'फी रचना शैक्षणिक वर्ष २०२६-२७' : 'Fees Structure 2026-27'}</h1>
          <div className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> &gt;{' '}
            <Link href="/admission">{isMr ? 'प्रवेश प्रक्रिया' : 'Admission'}</Link> &gt;{' '}
            <span>{isMr ? 'फी रचना' : 'Fees Structure'}</span>
          </div>
        </div>
      </div>

      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-pill-tag">
              {isMr ? '💰 पारदर्शक व परवडणारे शुल्क' : '💰 TRANSPARENT & AFFORDABLE FEES'}
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#0d3b66', fontWeight: 800 }}>
              {isMr ? 'अभ्यासक्रमनिहाय वार्षिक फी तपशील' : 'Course-wise Annual Fee Breakdown'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '720px', margin: '10px auto 0' }}>
              {isMr
                ? 'महाराष्ट्र शासन व नियामक मंडळाच्या मानकांनुसार वाजवी व पारदर्शक फी रचना. शासनाच्या सर्व शिष्यवृत्ती योजना उपलब्ध.'
                : 'Approved by State Government Regulatory Bodies. Subsidies and full scholarships available for eligible category students.'}
            </p>
          </div>

          {/* Fee Cards Table */}
          <div style={{ display: 'grid', gap: '25px', marginBottom: '50px' }}>
            {feeData.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '2rem',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(13, 59, 102, 0.06)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      background: '#e0f2fe',
                      color: '#0284c7',
                      marginBottom: '8px',
                    }}
                  >
                    {item.affiliation} • {item.duration}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0d3b66', margin: '0 0 6px' }}>
                    {item.course}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#16a34a', fontWeight: 600, margin: 0 }}>
                    <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i>
                    {item.scholarship}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <div style={{ background: '#f8fafc', padding: '10px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>{isMr ? 'शिक्षण शुल्क' : 'Tuition Fee'}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0d3b66' }}>{item.tutionFee}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>{isMr ? 'विकास व इतर' : 'Dev & Other'}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0d3b66' }}>{item.devFee}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{isMr ? 'एकूण वार्षिक फी' : 'Total Annual Fee'}</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#b45309', lineHeight: 1.1 }}>{item.totalFee}</div>
                  </div>
                  <Link
                    href="/pay"
                    style={{
                      background: '#0d3b66',
                      color: '#ffffff',
                      padding: '0.6rem 1.4rem',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <i className="fas fa-credit-card"></i> {isMr ? 'ऑनलाईन फी भरा' : 'Pay Online'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Installment Plan & Govt Scholarship Guidance */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '40px' }}>
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
                padding: '2rem',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(13, 59, 102, 0.05)',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0d3b66', marginBottom: '15px' }}>
                <i className="fas fa-hand-holding-usd" style={{ color: '#16a34a', marginRight: '8px' }}></i>
                {isMr ? 'महाडीबीटी शासकीय शिष्यवृत्ती' : 'MahaDBT Government Scholarships'}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-check-circle" style={{ color: '#16a34a' }}></i>
                  <span><strong>SC / ST:</strong> १००% शासकीय शिष्यवृत्ती व निर्वाह भत्ता</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-check-circle" style={{ color: '#16a34a' }}></i>
                  <span><strong>VJNT / SBC / OBC:</strong> ५०% ते १००% फी सवलत (उत्पन्न मर्यादेनुसार)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-check-circle" style={{ color: '#16a34a' }}></i>
                  <span><strong>EBC / SEBC / EWS:</strong> ५०% शिक्षण शुल्क प्रतिपूर्ती</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-check-circle" style={{ color: '#16a34a' }}></i>
                  <span><strong>अल्पसंख्याक योजना:</strong> केंद्र व राज्य शासनाचे विशेष अनुदान</span>
                </li>
              </ul>
            </div>
          </div>

          {/* PDF Download Button */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <a
              href="/admissions/fee-structure.pdf"
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(135deg, #0d3b66 0%, #08223d 100%)',
                color: '#ffffff',
                padding: '0.9rem 2.2rem',
                borderRadius: '50px',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 24px rgba(13, 59, 102, 0.25)',
              }}
            >
              <i className="fas fa-file-pdf" style={{ color: '#ffd166' }}></i>
              <span>{isMr ? 'अधिकृत फी रचना PDF डाउनलोड करा' : 'Download Official Fee Structure PDF'}</span>
              <i className="fas fa-arrow-down"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
