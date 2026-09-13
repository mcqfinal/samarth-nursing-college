'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function GNMPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  return (
    <main className="page-main">
      <section className="page-banner">
        <div className="container">
          <h1 className="banner-title">
            {isMr ? 'जी.एन.एम. – जनरल नर्सिंग अँड मिडवायफ्री' : 'GNM – General Nursing & Midwifery'}
          </h1>
          <nav className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> /{' '}
            <Link href="/courses">{isMr ? 'अभ्यासक्रम' : 'Courses'}</Link> / <span>GNM</span>
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
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  padding: '5px 14px',
                  borderRadius: '20px',
                }}
              >
                {isMr ? '३ वर्षांचा अधिकृत डिप्लोमा' : '3-YEAR DIPLOMA PROGRAM'}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>
                {isMr ? 'शैक्षणिक वर्ष २०२४ पासून' : 'Since 2024'}
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
                  {isMr ? 'जनरल नर्सिंग अँड मिडवायफ्री (GNM)' : 'General Nursing and Midwifery (GNM)'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                  {isMr ? 'कालावधी' : 'DURATION'}
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: '700', color: '#0d3b66' }}>
                  {isMr ? '३ वर्षे (पूर्णवेळ)' : '3 Years (Full-Time)'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                  {isMr ? 'संलग्नता व मान्यता' : 'AFFILIATION'}
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: '700', color: '#0d3b66' }}>
                  {isMr ? 'महाराष्ट्र शासन व MSBTE मुंबई' : 'State Government & MSBTE Mumbai'}
                </p>
              </div>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155' }}>
              {isMr
                ? 'जनरल नर्सिंग अँड मिडवायफ्री (GNM) हा ३ वर्षांचा व्यावसायिक अभ्यासक्रम विद्यार्थ्यांना रुग्णालये आणि समुदाय आरोग्य केंद्रांमध्ये निष्णात व जबाबदार परिचारक म्हणून कार्य करण्यासाठी सक्षम बनवतो. या अभ्यासक्रमात सखोल सैद्धांतिक ज्ञान, रुग्णालय प्रत्यक्ष प्रात्यक्षिक, आयसीयू व आपत्कालीन कक्ष अनुभव आणि प्रसूती कौशल्यांचे परिपूर्ण प्रशिक्षण दिले जाते.'
                : 'The General Nursing and Midwifery (GNM) program is designed to prepare general nurses who will function as integral members of the healthcare team, beginning with competencies for frontline clinical positions in multi-specialty hospitals and community settings. The program develops high-level clinical judgment, compassionate bedside care, and holistic patient management.'}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px 36px',
              border: '1px solid #e2e8f0',
              borderLeft: '6px solid #0284c7',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
              marginBottom: '35px',
            }}
          >
            <h3 style={{ color: '#0d3b66', fontSize: '1.5rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-user-graduate" style={{ color: '#0284c7' }}></i>
              {isMr ? 'प्रवेश पात्रता निकष' : 'Eligibility Criteria'}
            </h3>

            <ul style={{ paddingLeft: '20px', fontSize: '1.02rem', lineHeight: '1.8', color: '#334155', margin: 0 }}>
              {(isMr
                ? [
                    '१०+२ (बारावी) उत्तीर्ण (विज्ञान शाखेला प्राधान्य, इतर शाखांचे विद्यार्थीही शासकीय नियमांनुसार पात्र).',
                    'प्रवेश वर्षाच्या ३१ डिसेंबर रोजी किमान वय १७ वर्षे पूर्ण असावे.',
                    'नर्सिंग सेवेतील क्लिनिकल प्रशिक्षणासाठी शारीरिक व मानसिक दृष्ट्या सक्षम असावे.',
                  ]
                : [
                    '10+2 passed from a recognized board (Science stream preferred; arts/commerce also eligible as per regulatory norms).',
                    'Minimum age of 17 years completed as on 31st December of the admission year.',
                    'Medically and physically fit to undertake clinical hospital training.',
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
              {isMr ? 'करिअरच्या संधी व रोजगार व्याप्ती' : 'Career Opportunities & Scope'}
            </h3>
            <p style={{ fontSize: '1.02rem', color: '#64748b', marginBottom: '20px' }}>
              {isMr
                ? 'GNM पदविकाधारक विद्यार्थ्यांना देश-विदेशातील नामांकित आरोग्य संस्थांमध्ये सन्माननीय रोजगाराच्या संधी उपलब्ध आहेत:'
                : 'Graduates of the GNM program command high demand across healthcare sectors locally and internationally:'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {(isMr
                ? [
                    'शासकीय व निमशासकीय जिल्हा व उपजिल्हा रुग्णालये',
                    'कॉर्पोरेट व खाजगी मल्टी-स्पेशालिटी रुग्णालये (ICU, OT, CCU)',
                    'प्राथमिक आरोग्य केंद्रे (PHC) व ग्रामीण आरोग्य केंद्रे',
                    'मातृ व बाल संगोपन केंद्र व नर्सिंग होम्स',
                    'रेल्वे, सैन्यदल व संरक्षण दलातील आरोग्य सेवा',
                    'विदेशातील नर्सिंग करिअर (UK, Gulf, Canada, Australia)',
                  ]
                : [
                    'Government and District Multi-specialty Hospitals',
                    'Corporate Private Hospitals & Super-specialty ICU/OT Units',
                    'Primary & Community Health Centers (PHCs / CHCs)',
                    'Maternity Homes & Neonatal Critical Care Units',
                    'Defense, Railway, and Public Sector Health Services',
                    'Overseas Nursing Careers (UK, Middle East, Canada, Australia)',
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
              <i className="fas fa-book-open" style={{ color: '#ffb703' }}></i>
              {isMr ? 'प्रमुख अभ्यासक्रम विषय' : 'Key Curriculum Subjects'}
            </h3>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: '#334155' }}>
              {isMr
                ? 'अ‍ॅनाटॉमी व फिजिओलॉजी, मायक्रोबायॉलॉजी, फंडामेंटल्स ऑफ नर्सिंग, प्रथमोपचार व आपत्कालीन व्यवस्थापन, कम्युनिटी हेल्थ नर्सिंग, मेडिकल-सर्जिकल नर्सिंग, मनोरुग्ण नर्सिंग (Mental Health), बालरोग नर्सिंग (Pediatrics), आणि प्रसूतीशास्त्र व स्त्रीरोग नर्सिंग (Midwifery & Gynecology).'
                : 'Anatomy & Physiology, Microbiology, Fundamentals of Nursing & First Aid, Community Health Nursing, Medical-Surgical Nursing (Adult & Geriatric), Mental Health & Psychiatric Nursing, Child Health Nursing (Pediatrics), and Midwifery & Gynecological Nursing.'}
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
              {isMr ? 'जी.एन.एम. अभ्यासक्रमासाठी प्रवेश सुरू!' : 'Admissions Open for GNM Course!'}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: '0 0 24px' }}>
              {isMr
                ? 'मर्यादित जागा उपलब्ध. आजच कॉलेजला भेट द्या किंवा ऑनलाईन प्रवेश अर्ज भरा.'
                : 'Limited seats available. Visit our Sangamner campus today or submit your online enquiry.'}
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
