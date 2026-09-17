'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function CoursesPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cms } = usePageContent('courses');

  const coursesData = [
    {
      titleEn: cms?.gnm?.titleEn || 'General Nursing & Midwifery (GNM)',
      titleMr: cms?.gnm?.titleMr || 'जनरल नर्सिंग अँड मिडवायफ्री (GNM)',
      badgeEn: cms?.gnm?.badgeEn || '3 Years Diploma',
      badgeMr: cms?.gnm?.badgeMr || '३ वर्षे पदविका',
      sinceEn: cms?.gnm?.sinceEn || 'Since 2024',
      sinceMr: cms?.gnm?.sinceMr || 'सुरुवात: २०२४',
      affiliationEn: cms?.gnm?.affiliationEn || 'Affiliated to State Govt. & MSBNPE',
      affiliationMr: cms?.gnm?.affiliationMr || 'महाराष्ट्र शासन व MSBNPE मान्यताप्राप्त',
      descEn: cms?.gnm?.descEn || 'A comprehensive diploma program preparing students to provide effective bedside nursing care, emergency procedures, surgical assistance, and midwifery services in leading hospitals and community health centers.',
      descMr: cms?.gnm?.descMr || 'रुग्णालय, आयसीयू आणि शस्त्रक्रिया विभागातील सर्वसमावेशक रुग्णसेवा, आपत्कालीन दक्षता आणि प्रसूती कौशल्यांचे परिपूर्ण क्लिनिकल प्रशिक्षण देणारा अधिकृत डिप्लोमा अभ्यासक्रम.',
      eligibilityEn: cms?.gnm?.eligibilityEn || '12th Pass (Science / Any Stream with 40%+)',
      eligibilityMr: cms?.gnm?.eligibilityMr || '१२ वी उत्तीर्ण (विज्ञान किंवा इतर शाखा)',
      featuresEn: ['Hospital Clinical Training', 'ICU & OT Exposure', 'Midwifery Skills', 'MSBNPE Recognized'],
      featuresMr: ['रुग्णालय क्लिनिकल प्रशिक्षण', 'ICU व OT अनुभव', 'प्रसूती कौशल्य', 'MSBNPE मान्यताप्राप्त'],
      slug: '/courses/gnm',
      color: '#0284c7',
      gradient: 'linear-gradient(135deg, #0284c7, #0369a1)',
      bgLight: '#e0f2fe',
      icon: 'fa-hospital-user',
      seats: cms?.gnm?.seats || '40',
      seatsLabelEn: 'Seats',
      seatsLabelMr: 'जागा',
    },
    {
      titleEn: cms?.anm?.titleEn || 'Auxiliary Nursing & Midwifery (ANM)',
      titleMr: cms?.anm?.titleMr || 'ऑक्सिलरी नर्सिंग अँड मिडवायफ्री (ANM)',
      badgeEn: cms?.anm?.badgeEn || '2 Years Diploma',
      badgeMr: cms?.anm?.badgeMr || '२ वर्षे पदविका',
      sinceEn: cms?.anm?.sinceEn || 'Since 2024',
      sinceMr: cms?.anm?.sinceMr || 'सुरुवात: २०२४',
      affiliationEn: cms?.anm?.affiliationEn || 'Affiliated to State Govt. & MSBNPE',
      affiliationMr: cms?.anm?.affiliationMr || 'महाराष्ट्र शासन व MSBNPE मान्यताप्राप्त',
      descEn: cms?.anm?.descEn || 'A fundamental nursing program focusing on maternal and child health, neonatal care, community immunization programs, family welfare, and primary healthcare delivery in rural and urban sectors.',
      descMr: cms?.anm?.descMr || 'माता व बाल संगोपन, प्राथमिक आरोग्य केंद्र (PHC), कुटुंब कल्याण आणि लसीकरण या क्षेत्रातील परिपूर्ण प्रशिक्षणासह थेट आरोग्यसेवेत रोजगाराची संधी देणारा अभ्यासक्रम.',
      eligibilityEn: cms?.anm?.eligibilityEn || '12th Pass in any stream (Arts / Commerce / Science)',
      eligibilityMr: cms?.anm?.eligibilityMr || '१२ वी उत्तीर्ण (कोणतीही शाखा)',
      featuresEn: ['Maternal & Child Health', 'PHC Community Training', 'Immunization Programs', 'MSBNPE Recognized'],
      featuresMr: ['माता व बाल आरोग्य', 'PHC समुदाय प्रशिक्षण', 'लसीकरण कार्यक्रम', 'MSBNPE मान्यताप्राप्त'],
      slug: '/courses/anm',
      color: '#16a34a',
      gradient: 'linear-gradient(135deg, #16a34a, #15803d)',
      bgLight: '#dcfce7',
      icon: 'fa-baby',
      seats: cms?.anm?.seats || '40',
      seatsLabelEn: 'Seats',
      seatsLabelMr: 'जागा',
    },
    {
      titleEn: cms?.admlt?.titleEn || 'Adv. Diploma in Medical Laboratory Technician (ADMLT)',
      titleMr: cms?.admlt?.titleMr || 'अ‍ॅडव्हान्स डिप्लोमा इन मेडिकल लॅबोरेटरी टेक्निशियन (ADMLT)',
      badgeEn: cms?.admlt?.badgeEn || '1.5 Years Advanced Diploma',
      badgeMr: cms?.admlt?.badgeMr || '१.५ वर्षे प्रगत पदविका',
      sinceEn: cms?.admlt?.sinceEn || 'Since 2021',
      sinceMr: cms?.admlt?.sinceMr || 'सुरुवात: २०२१',
      affiliationEn: cms?.admlt?.affiliationEn || 'Affiliated to State Govt. & MSBTE Mumbai',
      affiliationMr: cms?.admlt?.affiliationMr || 'महाराष्ट्र शासन व MSBTE मुंबई मान्यताप्राप्त',
      descEn: cms?.admlt?.descEn || 'Advanced clinical laboratory training covering pathology, microbiology, hematology, immunology, and biochemistry using automated analyzers for modern diagnostic pathology centers and hospitals.',
      descMr: cms?.admlt?.descMr || 'पॅथॉलॉजी, मायक्रोबायॉलॉजी, बायोकेमिस्ट्री आणि अत्याधुनिक लॅब उपकरणांद्वारे अचूक रोगनिदान तंत्रज्ञानाचे सखोल क्लिनिकल व प्रयोगशाळा प्रशिक्षण.',
      eligibilityEn: cms?.admlt?.eligibilityEn || 'B.Sc. (Science Graduate) / 12th Science',
      eligibilityMr: cms?.admlt?.eligibilityMr || 'पदवीधर (विज्ञान शाखा) किंवा १२ वी विज्ञान',
      featuresEn: ['Pathology & Microbiology', 'Automated Lab Analyzers', 'Hematology Training', 'MSBTE Recognized'],
      featuresMr: ['पॅथॉलॉजी व मायक्रोबायॉलॉजी', 'ऑटोमेटेड लॅब', 'हिमॅटोलॉजी प्रशिक्षण', 'MSBTE मान्यताप्राप्त'],
      slug: '/courses/admlt',
      color: '#d97706',
      gradient: 'linear-gradient(135deg, #d97706, #b45309)',
      bgLight: '#fef3c7',
      icon: 'fa-flask',
      seats: cms?.admlt?.seats || '20',
      seatsLabelEn: 'Seats',
      seatsLabelMr: 'जागा',
    },
  ];

  const stats = [
    { icon: 'fa-user-graduate', valueEn: '3', labelEn: 'Programs Offered', labelMr: 'अभ्यासक्रम' },
    { icon: 'fa-calendar-check', valueEn: '3+', labelEn: 'Years of Excellence', labelMr: 'वर्षांचा अनुभव' },
    { icon: 'fa-hospital', valueEn: '10+', labelEn: 'Hospital Tie-Ups', labelMr: 'रुग्णालय भागीदारी' },
    { icon: 'fa-award', valueEn: '100%', labelEn: 'Govt. Recognized', labelMr: 'शासन मान्यताप्राप्त' },
  ];

  return (
    <main style={{ background: '#f1f5f9', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 60%, #0d3b66 100%)',
        color: '#ffffff',
        padding: '70px 20px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '6px 18px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '18px', letterSpacing: '0.07em' }}>
            <i className="fas fa-graduation-cap" />
            {isMr ? 'अधिकृत शासनमान्य अभ्यासक्रम' : 'RECOGNIZED ACADEMIC PROGRAMS'}
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, margin: '0 0 14px', color: '#ffffff', fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>
            {isMr ? 'आपल्या उज्ज्वल भविष्यासाठी योग्य करिअर मार्ग निवडा' : 'Choose Your Pathway in Healthcare'}
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: '0 0 24px', lineHeight: 1.7, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            {isMr
              ? 'GNM • ANM • ADMLT – महाराष्ट्र शासन, MSBNPE व MSBTE मान्यताप्राप्त अभ्यासक्रम'
              : 'GNM • ANM • ADMLT — Government recognized programs affiliated to MSBNPE & MSBTE Mumbai'}
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/admission" style={{ background: '#ffd166', color: '#0d3b66', padding: '11px 28px', borderRadius: '50px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-file-alt" /> {isMr ? 'प्रवेश अर्ज करा' : 'Apply for Admission'}
            </Link>
            <Link href="/contact" style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.4)', padding: '11px 28px', borderRadius: '50px', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-phone-alt" /> {isMr ? 'चौकशी करा' : 'Enquire Now'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: '#0d3b66', padding: '0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '20px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <i className={`fas ${s.icon}`} style={{ fontSize: '1.3rem', color: '#ffd166', marginBottom: 6, display: 'block' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{s.valueEn}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>{isMr ? s.labelMr : s.labelEn}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COURSES GRID ── */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#0d3b66', margin: '0 0 10px', fontFamily: "'Playfair Display', serif" }}>
              {isMr ? 'आमचे अभ्यासक्रम' : 'Our Courses'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 540, margin: '0 auto' }}>
              {isMr ? 'दर्जेदार शिक्षण आणि क्लिनिकल ट्रेनिंगसह व्यावसायिक भविष्य घडवा.' : 'Build a professional healthcare career with quality education and hands-on clinical training.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {coursesData.map((course, idx) => (
              <div key={idx} style={{ background: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.13)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'; }}
              >
                {/* Card Header */}
                <div style={{ background: course.gradient, padding: '28px 26px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ position: 'absolute', bottom: -30, right: 20, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
                    <span style={{ background: 'rgba(255,255,255,0.22)', color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, padding: '4px 14px', borderRadius: '20px', letterSpacing: '0.04em' }}>
                      {isMr ? course.badgeMr : course.badgeEn}
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem', fontWeight: 600, padding: '4px 12px', borderRadius: '20px' }}>
                      {isMr ? course.sinceMr : course.sinceEn}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 2 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fas ${course.icon}`} style={{ fontSize: '1.4rem', color: '#ffffff' }} />
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '1.18rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                      {isMr ? course.titleMr : course.titleEn}
                    </h3>
                  </div>

                  {/* Seats badge */}
                  <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700, padding: '5px 14px', borderRadius: '20px', position: 'relative', zIndex: 2 }}>
                    <i className="fas fa-chair" style={{ fontSize: '0.75rem' }} />
                    {course.seats} {isMr ? course.seatsLabelMr : course.seatsLabelEn}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.7, margin: '0 0 20px' }}>
                    {isMr ? course.descMr : course.descEn}
                  </p>

                  {/* Features */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                    {(isMr ? course.featuresMr : course.featuresEn).map((f, fi) => (
                      <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.82rem', color: '#334155', fontWeight: 500 }}>
                        <i className="fas fa-check-circle" style={{ color: course.color, fontSize: '0.78rem', flexShrink: 0 }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Affiliation */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: course.bgLight, padding: '10px 14px', borderRadius: '10px', marginBottom: '20px' }}>
                    <i className="fas fa-university" style={{ color: course.color, fontSize: '0.85rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.83rem', color: '#0d3b66', fontWeight: 600 }}>{isMr ? course.affiliationMr : course.affiliationEn}</span>
                  </div>

                  {/* Eligibility */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px', marginBottom: '22px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                      {isMr ? 'पात्रता निकष' : 'Eligibility'}
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0d3b66', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <i className="fas fa-user-check" style={{ color: course.color, fontSize: '0.8rem' }} />
                      {isMr ? course.eligibilityMr : course.eligibilityEn}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <Link href={course.slug} style={{ flex: 1, background: course.gradient, color: '#ffffff', padding: '11px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      {isMr ? 'सविस्तर माहिती' : 'Course Details'}
                      <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} />
                    </Link>
                    <Link href="/contact" style={{ background: '#f1f5f9', color: '#0d3b66', border: '1.5px solid #e2e8f0', padding: '11px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} title={isMr ? 'प्रवेश चौकशी' : 'Apply Now'}>
                      <i className="fas fa-paper-plane" style={{ fontSize: '0.85rem' }} />
                      {isMr ? 'अर्ज करा' : 'Apply'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BAND ── */}
      <section style={{ background: 'linear-gradient(135deg, #0d3b66, #1e3a8a)', padding: '52px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,209,102,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <i className="fas fa-phone-alt" style={{ color: '#ffd166', fontSize: '1.3rem' }} />
          </div>
          <h2 style={{ color: '#ffffff', fontSize: '1.7rem', fontWeight: 800, margin: '0 0 10px', fontFamily: "'Playfair Display', serif" }}>
            {isMr ? 'प्रवेशाबद्दल अधिक माहिती हवी आहे?' : 'Have questions about admissions?'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', margin: '0 0 28px' }}>
            {isMr ? 'आमच्या समुपदेशकाशी बोला – आम्ही मदतीसाठी सदैव तत्पर आहोत.' : 'Talk to our counselor — we\'re here to help you find the right program.'}
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+919689486570" style={{ background: '#ffd166', color: '#0d3b66', padding: '12px 30px', borderRadius: '50px', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-phone" /> +91 96894 86570
            </a>
            <Link href="/admission" style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.35)', padding: '12px 30px', borderRadius: '50px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-edit" /> {isMr ? 'ऑनलाइन अर्ज करा' : 'Apply Online'}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
