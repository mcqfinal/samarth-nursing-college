'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function CoursesPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const coursesData = [
    {
      titleEn: 'General Nursing & Midwifery (GNM)',
      titleMr: 'जनरल नर्सिंग अँड मिडवायफ्री (GNM)',
      badgeEn: '3 Years Diploma',
      badgeMr: '३ वर्षे पदविका',
      sinceEn: 'Started: 2024',
      sinceMr: 'सुरुवात: २०२४',
      affiliationEn: 'Affiliated to State Government & MSBNPE',
      affiliationMr: 'महाराष्ट्र शासन व MSBNPE मंडळ मान्यताप्राप्त',
      descEn:
        'A comprehensive diploma program preparing students to provide effective bedside nursing care, emergency procedures, surgical assistance, and midwifery services in leading hospitals and community health centers.',
      descMr:
        'रुग्णालय, आयसीयू आणि शस्त्रक्रिया विभागातील सर्वसमावेशक रुग्णसेवा, औषधोपचार, आपत्कालीन दक्षता आणि प्रसूती कौशल्यांचे परिपूर्ण क्लिनिकल प्रशिक्षण देणारा अधिकृत डिप्लोमा अभ्यासक्रम.',
      eligibilityEn: '12th Pass (Science / Any Stream with 40%+)',
      eligibilityMr: '१२ वी उत्तीर्ण (विज्ञान किंवा इतर शाखा)',
      slug: '/courses/gnm',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Auxiliary Nursing & Midwifery (ANM)',
      titleMr: 'ऑक्सिलरी नर्सिंग अँड मिडवायफ्री (ANM)',
      badgeEn: '2 Years Diploma',
      badgeMr: '२ वर्षे पदविका',
      sinceEn: 'Started: 2024',
      sinceMr: 'सुरुवात: २०२४',
      affiliationEn: 'Affiliated to State Government & MSBNPE',
      affiliationMr: 'महाराष्ट्र शासन व MSBNPE मंडळ मान्यताप्राप्त',
      descEn:
        'A fundamental nursing program focusing on maternal and child health, neonatal care, community immunization programs, family welfare, and primary healthcare delivery in rural and urban sectors.',
      descMr:
        'माता व बाल संगोपन, प्राथमिक आरोग्य केंद्र (PHC), कुटुंब कल्याण आणि लसीकरण या क्षेत्रातील परिपूर्ण प्रशिक्षणासह थेट आरोग्यसेवेत रोजगाराची हमखास संधी देणारा अभ्यासक्रम.',
      eligibilityEn: '12th Pass in any stream (Arts / Commerce / Science)',
      eligibilityMr: '१२ वी उत्तीर्ण (कोणतीही शाखा)',
      slug: '/courses/anm',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      titleEn: 'Adv. Diploma in Medical Laboratory Technician (ADMLT)',
      titleMr: 'अ‍ॅडव्हान्स डिप्लोमा इन मेडिकल लॅबोरेटरी टेक्निशियन (ADMLT)',
      badgeEn: '1.5 Years Advanced Diploma',
      badgeMr: '१.५ वर्षे प्रगत पदविका',
      sinceEn: 'Started: 2021',
      sinceMr: 'सुरुवात: २०२१',
      affiliationEn: 'Affiliated to State Government & MSBTE Mumbai',
      affiliationMr: 'महाराष्ट्र शासन व MSBTE मुंबई मान्यताप्राप्त',
      descEn:
        'Advanced clinical laboratory training covering pathology, microbiology, hematology, immunology, and biochemistry using automated analyzers for modern diagnostic pathology centers and hospitals.',
      descMr:
        'पॅथॉलॉजी, मायक्रोबायॉलॉजी, बायोकेमिस्ट्री, रक्तपेढी आणि अत्याधुनिक इलेक्ट्रॉनिक लॅब उपकरणांद्वारे अचूक रोगनिदान तंत्रज्ञानाचे सखोल क्लिनिकल व प्रयोगशाळा प्रशिक्षण.',
      eligibilityEn: 'B.Sc. (Science Graduate) / 12th Science',
      eligibilityMr: 'पदवीधर (विज्ञान शाखा) किंवा १२ वी विज्ञान',
      slug: '/courses/admlt',
      color: '#d97706',
      bgLight: '#fef3c7',
    },
  ];

  return (
    <main className="page-main">
      <section className="page-banner">
        <div className="container">
          <h1 className="banner-title">{isMr ? 'आमचे अभ्यासक्रम' : 'Our Courses'}</h1>
          <nav className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> /{' '}
            <span>{isMr ? 'अभ्यासक्रम' : 'Courses'}</span>
          </nav>
        </div>
      </section>

      <section className="page-content container section-padding" style={{ padding: '60px 0' }}>
        <div className="intro-text text-center" style={{ maxWidth: '820px', margin: '0 auto 50px' }}>
          <span className="section-pill-tag" style={{ marginBottom: '14px', display: 'inline-block' }}>
            {isMr ? 'अधिकृत शासनमान्य कोर्सेस' : 'RECOGNIZED ACADEMIC PROGRAMS'}
          </span>
          <h2 className="section-title" style={{ fontSize: '2.2rem', color: '#0d3b66', margin: '0 0 16px' }}>
            {isMr ? 'आपल्या उज्ज्वल भविष्यासाठी परिपूर्ण करिअर मार्ग' : 'Choose Your Pathway in Healthcare'}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7' }}>
            {isMr
              ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर (अहिल्यानगर) मध्ये दर्जेदार शिक्षण, अद्ययावत लॅब आणि नामांकित रुग्णालयांमध्ये प्रत्यक्ष क्लिनिकल ट्रेनिंग देऊन विद्यार्थ्यांचे भविष्य घडवले जाते.'
              : 'Samarth College of Nursing offers excellent government, MSBNPE and MSBTE recognized healthcare programs designed to build professional excellence, practical clinical competence, and rewarding careers.'}
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#eef8f6',
              padding: '10px 22px',
              borderRadius: '30px',
              border: '1px solid #c8e6e1',
              color: '#0d3b66',
              fontWeight: '600',
              fontSize: '0.92rem',
              marginTop: '12px',
            }}
          >
            <i className="fas fa-check-circle" style={{ color: '#1a9988' }}></i>
            <span>{isMr ? 'महाराष्ट्र शासन, MSBNPE व MSBTE मुंबई मान्यताप्राप्त' : 'Affiliated to State Government, MSBNPE & MSBTE Mumbai'}</span>
          </div>
        </div>

        <div
          className="courses-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {coursesData.map((course, idx) => (
            <div
              key={idx}
              className="course-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div
                style={{
                  padding: '28px 24px 20px',
                  borderTop: `6px solid ${course.color}`,
                  backgroundColor: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span
                    style={{
                      backgroundColor: course.bgLight,
                      color: course.color,
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    {isMr ? course.badgeMr : course.badgeEn}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
                    {isMr ? course.sinceMr : course.sinceEn}
                  </span>
                </div>

                <h3 style={{ color: '#0d3b66', fontSize: '1.35rem', margin: '0 0 10px', lineHeight: '1.35' }}>
                  {isMr ? course.titleMr : course.titleEn}
                </h3>
              </div>

              <div
                style={{
                  padding: '0 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: '1.65', margin: '0 0 20px' }}>
                    {isMr ? course.descMr : course.descEn}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.85rem',
                      color: '#0d3b66',
                      fontWeight: '600',
                      marginBottom: '14px',
                      backgroundColor: course.bgLight,
                      padding: '8px 12px',
                      borderRadius: '6px',
                    }}
                  >
                    <i className="fas fa-university" style={{ color: course.color }}></i>
                    <span>{isMr ? course.affiliationMr : course.affiliationEn}</span>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#f8fafc',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      marginBottom: '24px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      {isMr ? 'पात्रता निकष' : 'ELIGIBILITY'}
                    </span>
                    <strong style={{ fontSize: '0.9rem', color: '#0d3b66' }}>
                      {isMr ? course.eligibilityMr : course.eligibilityEn}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    href={course.slug}
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.95rem' }}
                  >
                    {isMr ? 'सविस्तर माहिती वाचा' : 'Course Details'}
                    <i className="fas fa-arrow-right" style={{ marginLeft: '8px', fontSize: '0.85rem' }}></i>
                  </Link>
                  <Link
                    href="/contact"
                    className="btn btn-secondary"
                    style={{ justifyContent: 'center', padding: '0 16px' }}
                    title={isMr ? 'प्रवेश चौकशी' : 'Apply Now'}
                  >
                    <i className="fas fa-file-signature"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
