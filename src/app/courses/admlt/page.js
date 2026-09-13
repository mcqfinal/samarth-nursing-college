'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ADMLTPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  return (
    <main className="page-main">
      <section className="page-banner">
        <div className="container">
          <h1 className="banner-title">
            {isMr
              ? 'अ‍ॅडव्हान्स डिप्लोमा इन मेडिकल लॅबोरेटरी टेक्निशियन (ADMLT)'
              : 'Advanced Diploma in Medical Laboratory Technician (ADMLT)'}
          </h1>
          <nav className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> /{' '}
            <Link href="/courses">{isMr ? 'अभ्यासक्रम' : 'Courses'}</Link> / <span>ADMLT</span>
          </nav>
        </div>
      </section>

      <section className="page-content container section-padding" style={{ padding: '60px 0' }}>
        <div className="course-details" style={{ maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Overview Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px 36px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
              marginBottom: '35px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span
                style={{
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  padding: '5px 14px',
                  borderRadius: '20px',
                }}
              >
                {isMr ? '१.५ वर्षे प्रगत पदविका' : '1.5-YEAR ADVANCED DIPLOMA'}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>
                {isMr ? 'शैक्षणिक वर्ष २०२१ पासून कार्यरत' : 'Since 2021'}
              </span>
            </div>

            <h2 style={{ color: '#0d3b66', fontSize: '2rem', margin: '0 0 20px' }}>
              {isMr ? 'अभ्यासक्रम तपशील (Course Overview)' : 'Course Overview'}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '24px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                  {isMr ? 'पूर्ण नाव' : 'FULL NAME'}
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: '700', color: '#0d3b66' }}>
                  {isMr
                    ? 'अ‍ॅडव्हान्स डिप्लोमा इन मेडिकल लॅबोरेटरी टेक्नॉलॉजी (ADMLT / PGDMLT)'
                    : 'Advanced Diploma in Medical Laboratory Technician (ADMLT/PGDMLT)'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                  {isMr ? 'कालावधी' : 'DURATION'}
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: '700', color: '#0d3b66' }}>
                  {isMr ? '१ वर्ष ६ महिने (१८ महिने)' : '1 Year 6 Months (18 Months)'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                  {isMr ? 'संलग्नता व मान्यता' : 'AFFILIATION'}
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: '700', color: '#0d3b66' }}>
                  {isMr ? 'महाराष्ट्र शासन व MSBTE मुंबई' : 'State Government & MSBTE Mumbai'}
                </p>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  {isMr ? '(म.रा. तंत्र शिक्षण मंडळ, मुंबई)' : '(Maharashtra State Board of Technical Education, Mumbai)'}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155' }}>
              {isMr
                ? 'ADMLT / PGDMLT हा प्रगत पॅरामेडिकल अभ्यासक्रम विद्यार्थ्यांना आधुनिक क्लिनिकल लॅबोरेटरी चाचण्यांचे संपूर्ण तांत्रिक ज्ञान देतो. रक्त, लघवी, उती (tissues) आणि इतर जैविक नमुन्यांचे अत्याधुनिक ऑटोमेटेड अ‍ॅनालायझर्सच्या मदतीने विश्लेषण करून डॉक्टरांना अचूक रोगनिदान करण्यात मदत करणे हे मेडिकल लॅब टेक्निशियनचे मुख्य काम असते.'
                : 'The ADMLT program delivers comprehensive specialized training in clinical pathology, medical biochemistry, hematology, and diagnostic microbiology. Students gain mastery in collecting, handling, testing, and interpreting patient specimens using cutting-edge computerized diagnostic instrumentation crucial for early disease detection.'}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px 36px',
              border: '1px solid #e2e8f0',
              borderLeft: '6px solid #d97706',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
              marginBottom: '35px',
            }}
          >
            <h3 style={{ color: '#0d3b66', fontSize: '1.5rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-microscope" style={{ color: '#d97706' }}></i>
              {isMr ? 'प्रवेश पात्रता निकष' : 'Eligibility Criteria'}
            </h3>

            <ul style={{ paddingLeft: '20px', fontSize: '1.02rem', lineHeight: '1.8', color: '#334155', margin: 0 }}>
              {(isMr
                ? [
                    'बी.एस्सी. (विज्ञान पदवीधर - Chemistry, Botany, Zoology, Microbiology, Biotech किंवा Life Sciences).',
                    'किंवा शासकीय नियमांनुसार १२ वी विज्ञान (Physics, Chemistry, Biology) उत्तीर्ण विद्यार्थी.',
                    'प्रयोगशाळा कार्य आणि अचूक विश्लेषणाची आवड असणारे उमेदवार.',
                  ]
                : [
                    'B.Sc. graduate in Science (Chemistry, Microbiology, Zoology, Botany, Biotechnology, Life Sciences).',
                    'Or 10+2 passed in Science stream with PCB/PCM as per applicable MSBTE norms.',
                    'Aptitude for analytical diagnostic equipment, precision testing, and quality control.',
                  ]
              ).map((item, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Career Scope */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px 36px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
              marginBottom: '35px',
            }}
          >
            <h3 style={{ color: '#0d3b66', fontSize: '1.5rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-briefcase" style={{ color: '#1a9988' }}></i>
              {isMr ? 'करिअरच्या संधी व स्वतःची लॅब सुरू करण्याची संधी' : 'Career Opportunities & Entrepreneurship'}
            </h3>
            <p style={{ fontSize: '1.02rem', color: '#64748b', marginBottom: '20px' }}>
              {isMr
                ? 'ADMLT पूर्ण केल्यानंतर विद्यार्थ्यांना रुग्णालये व पॅथॉलॉजी लॅबमध्ये थेट नोकरी मिळते किंवा शासकीय नियमांनुसार स्वतःचे पॅथॉलॉजी सेंटर सुरू करता येते:'
                : 'Medical laboratory scientists and technicians are indispensable to modern diagnostic healthcare across public and private institutions:'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {(isMr
                ? [
                    'स्वतःचे पॅथॉलॉजी कलेक्शन सेंटर किंवा डायग्नोस्टिक लॅब',
                    'मल्टी-स्पेशालिटी रुग्णालये व वैद्यकीय महाविद्यालयांमधील केंद्रीय लॅब',
                    'शासकीय व खाजगी रक्तपेढ्या (Blood Banks) मधील तांत्रिक अधिकारी',
                    'प्रसिद्ध डायग्नोस्टिक चेन्स (उदा. Metropolis, Dr. Lal Path, SRL)',
                    'वैद्यकीय संशोधन केंद्रे व फार्मास्युटिकल कंपन्या (Quality Control)',
                    'फॉरेन्सिक सायन्स लॅब्स व पब्लिक हेल्थ युनिट्स',
                  ]
                : [
                    'Independent Diagnostic Laboratory / Pathology Collection Centers',
                    'Central Clinical Laboratories in Multi-specialty Hospitals',
                    'Licensed Government & Private Blood Banks (Technical Officer)',
                    'Leading National Diagnostic Chains (Metropolis, SRL, Lal PathLabs)',
                    'Medical Research Laboratories & Pharmaceutical QC Departments',
                    'Forensic Science & Public Health Surveillance Units',
                  ]
              ).map((scope, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <i className="fas fa-check-circle" style={{ color: '#16a34a', flexShrink: 0 }}></i>
                  <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '500' }}>{scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Subjects */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px 36px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
              marginBottom: '35px',
            }}
          >
            <h3 style={{ color: '#0d3b66', fontSize: '1.5rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-vial" style={{ color: '#0284c7' }}></i>
              {isMr ? 'प्रमुख अभ्यासक्रम विषय' : 'Key Curriculum Subjects'}
            </h3>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: '#334155' }}>
              {isMr
                ? 'क्लिनिकल पॅथॉलॉजी, हेमॅटॉलॉजी (रक्त तपासणी व घटक पृथक्करण), क्लिनिकल बायोकेमिस्ट्री, मेडिकल मायक्रोबायॉलॉजी व बॅक्टेरियोलॉजी, हिस्टोपॅथॉलॉजी व सायटॉलॉजी, ब्लड बँकिंग तंत्रज्ञान, इम्युनॉलॉजी व सीरॉलॉजी, आणि लॅब सुरक्षा व गुणवत्ता नियंत्रण (Quality Assurance).'
                : 'Clinical Pathology, Hematology & Coagulation Studies, Clinical Biochemistry & Enzymology, Medical Microbiology & Parasitology, Histopathology & Cytology, Blood Banking Technology & Transfusion Safety, Immunology & Serology, and Laboratory Quality Control Management.'}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              backgroundColor: '#0d3b66',
              borderRadius: '16px',
              padding: '32px 36px',
              textAlign: 'center',
              color: '#ffffff',
            }}
          >
            <h3 style={{ color: '#ffffff', fontSize: '1.8rem', margin: '0 0 12px' }}>
              {isMr ? 'ADMLT / PGDMLT अभ्यासक्रमासाठी प्रवेश सुरू!' : 'Admissions Open for ADMLT Course!'}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: '0 0 24px' }}>
              {isMr
                ? 'समर्थ इन्स्टिट्यूट ऑफ पॅरामेडिकल सायन्स, संगमनेर. प्रत्यक्ष लॅब भेट व मार्गदर्शनासाठी आजच संपर्क करा.'
                : 'Samarth Institute of Paramedical Science, Sangamner. Connect with our counselors today.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary" style={{ minWidth: '180px', justifyContent: 'center' }}>
                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
                {isMr ? 'प्रवेश अर्ज करा' : 'Apply Now'}
              </Link>
              <a
                href="https://wa.me/919689486570"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ minWidth: '180px', justifyContent: 'center' }}
              >
                <i className="fab fa-whatsapp" style={{ marginRight: '8px' }}></i>
                {isMr ? 'व्हॉट्सअ‍ॅपवर संपर्क' : 'WhatsApp Us'}
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
