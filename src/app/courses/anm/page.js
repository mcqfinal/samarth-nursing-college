'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ANMPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  return (
    <main style={{ background: '#f8fafc' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #0d3b66 60%, #1e3a8a 100%)',
          color: '#ffffff',
          padding: '60px 20px 52px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(10, 37, 64, 0.15)',
        }}
      >
        {/* Subtle decorative glow circles */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,183,3,0.12) 0%, rgba(255,183,3,0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 209, 102, 0.15)',
              border: '1px solid rgba(255, 209, 102, 0.5)',
              color: '#ffd166',
              padding: '6px 18px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            }}
          >
            <i className="fas fa-hand-holding-medical"></i> <span>{isMr ? 'अभ्यासक्रम' : 'ANM COURSE'}</span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 12px 0',
              lineHeight: 1.25,
            }}
          >
            {isMr ? (
              'ए.एन.एम. – ऑक्सिलरी नर्सिंग अँड मिडवायफ्री'
            ) : (
              <>
                ANM – Auxiliary Nursing <span style={{ color: '#ffd166', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, padding: '0 4px', fontStyle: 'normal' }}>&</span> Midwifery
              </>
            )}
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            {isMr ? (
              '२ वर्षांचा व्यावसायिक डिप्लोमा | MSBNPE व INC मान्यताप्राप्त'
            ) : (
              <>
                2-Year Professional Diploma | Recognized by MSBNPE <span style={{ color: '#ffd166', fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> INC
              </>
            )}
          </p>
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
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  padding: '5px 14px',
                  borderRadius: '20px',
                }}
              >
                {isMr ? '२ वर्षांचा अधिकृत डिप्लोमा' : '2-YEAR DIPLOMA PROGRAM'}
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
                  {isMr ? 'ऑक्सिलरी नर्सिंग अँड मिडवायफ्री (ANM)' : 'Auxiliary Nursing and Midwifery (ANM)'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                  {isMr ? 'कालावधी' : 'DURATION'}
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: '700', color: '#0d3b66' }}>
                  {isMr ? '२ वर्षे (पूर्णवेळ)' : '2 Years (Full-Time)'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                  {isMr ? 'संलग्नता व मान्यता' : 'AFFILIATION'}
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: '700', color: '#0d3b66' }}>
                  {isMr ? 'महाराष्ट्र शासन व MSBNPE मंडळ' : 'State Government & MSBNPE'}
                </p>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  {isMr ? '(म.रा. शुश्रूषा व परावैद्यकीय शिक्षण मंडळ)' : '(Maharashtra State Board of Nursing & Paramedical Education)'}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155' }}>
              {isMr
                ? 'ऑक्सिलरी नर्सिंग अँड मिडवायफ्री (ANM) हा २ वर्षांचा डिप्लोमा अभ्यासक्रम ग्रामीण व शहरी भागातील प्राथमिक आरोग्य यंत्रणेचा कणा मानला जातो. माता व बाल संगोपन, कुटुंब कल्याण, पोषण आहार आणि लसीकरण या क्षेत्रांमध्ये सक्षम व प्रशिक्षित महिला आरोग्य कर्मचारी (Health Workers) तयार करणे हे या अभ्यासक्रमाचे मूळ उद्दिष्ट आहे.'
                : 'The Auxiliary Nursing and Midwifery (ANM) program focuses on vital frontline healthcare delivery for communities at the grassroots level. It is expertly structured to train dedicated professionals to become an integral force in maternal and child healthcare, family welfare, and primary community disease prevention.'}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px 36px',
              border: '1px solid #e2e8f0',
              borderLeft: '6px solid #16a34a',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
              marginBottom: '35px',
            }}
          >
            <h3 style={{ color: '#0d3b66', fontSize: '1.5rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-user-graduate" style={{ color: '#16a34a' }}></i>
              {isMr ? 'प्रवेश पात्रता निकष' : 'Eligibility Criteria'}
            </h3>

            <ul style={{ paddingLeft: '20px', fontSize: '1.02rem', lineHeight: '1.8', color: '#334155', margin: 0 }}>
              {(isMr
                ? [
                    '१०+२ (बारावी) परीक्षा कोणत्याही शाखेतून (कला, वाणिज्य, विज्ञान) मान्यताप्राप्त मंडळातून उत्तीर्ण.',
                    'किमान वय १७ वर्षे पूर्ण असावे.',
                    'विद्यार्थिनी आरोग्यसेवेच्या क्षेत्रीय प्रशिक्षणासाठी शारीरिक व मानसिक दृष्ट्या सक्षम असावी.',
                  ]
                : [
                    '10+2 pass in any stream (Arts, Commerce, or Science) from a recognized state or national board.',
                    'Minimum age of 17 years completed as on 31st December of the admission year.',
                    'Medically fit to carry out field visits, maternal care, and community healthcare duties.',
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
              {isMr ? 'करिअरच्या संधी व शासकीय नोकरी व्याप्ती' : 'Career Opportunities & Government Scope'}
            </h3>
            <p style={{ fontSize: '1.02rem', color: '#64748b', marginBottom: '20px' }}>
              {isMr
                ? 'ANM पूर्ण केलेल्या विद्यार्थिनींना जिल्हा परिषद, महानगरपालिका आणि शासकीय आरोग्य केंद्रांमध्ये थेट नोकरीच्या विपुल संधी मिळतात:'
                : 'ANM graduates serve as primary frontline healthcare staff with extensive career openings across public and private health bodies:'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {(isMr
                ? [
                    'प्राथमिक आरोग्य केंद्र (PHC) व आरोग्य उपकेंद्र (Sub-Centers)',
                    'जिल्हा परिषद व महानगरपालिका आरोग्य विभाग (ARO / Health Worker)',
                    'राष्ट्रीय आरोग्य अभियान (National Health Mission - NHM)',
                    'खाजगी प्रसूती गृह (Maternity Homes) व बालरोग रुग्णालये',
                    'सामुदायिक लसीकरण व कुटुंब नियोजन केंद्रे',
                    'अंगणवाडी व आशा सेविका मार्गदर्शक समन्वयक',
                  ]
                : [
                    'Primary Health Centers (PHCs) & Sub-Centers',
                    'Zilla Parishad & Municipal Health Departments',
                    'National Health Mission (NHM) Rural Healthcare Programs',
                    'Private Maternity Hospitals & Child Clinics',
                    'Community Immunization & Maternal Welfare Centers',
                    'Grassroots Community Health Coordinator Roles',
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
                ? 'कम्युनिटी हेल्थ नर्सिंग, हेल्थ प्रमोशन व पोषण, प्राथमिक आरोग्य सेवा नर्सिंग (Primary Healthcare), बाल आरोग्य नर्सिंग (Child Health), प्रसूतीशास्त्र व सुरक्षित मातृत्व (Midwifery), आणि आरोग्य केंद्र व्यवस्थापन.'
                : 'Community Health Nursing, Health Promotion & Nutrition, Primary Healthcare Nursing, Child Health Nursing, Midwifery & Safe Motherhood Practices, and Healthcare Centre Administration.'}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              backgroundColor: '#16a34a',
              borderRadius: '16px',
              padding: '32px 36px',
              textAlign: 'center',
              color: '#ffffff',
            }}
          >
            <h3 style={{ color: '#ffffff', fontSize: '1.8rem', margin: '0 0 12px' }}>
              {isMr ? 'ए.एन.एम. अभ्यासक्रमासाठी प्रवेश सुरू!' : 'Admissions Open for ANM Course!'}
            </h3>
            <p style={{ color: '#dcfce7', fontSize: '1.05rem', margin: '0 0 24px' }}>
              {isMr
                ? 'महिला विद्यार्थिनींसाठी सुरक्षित वसतिगृह व शासकीय शिष्यवृत्ती मार्गदर्शन उपलब्ध. आजच संपर्क करा.'
                : 'Safe hostel facility and full government scholarship guidance available. Connect with us today.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn" style={{ backgroundColor: '#ffffff', color: '#16a34a', minWidth: '180px', justifyContent: 'center', fontWeight: '700' }}>
                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
                {isMr ? 'प्रवेश अर्ज करा' : 'Apply Now'}
              </Link>
              <a
                href="https://wa.me/919689486570"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', minWidth: '180px', justifyContent: 'center', border: '1px solid #ffffff' }}
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
