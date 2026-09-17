'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function PrincipalANMPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)', color: '#ffffff', padding: '55px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '5px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.06em' }}>
            <i className="fas fa-user-tie"></i> {isMr ? 'प्राचार्यांचे मनोगत' : "PRINCIPAL'S DESK (ANM)"}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'प्राचार्यांचे मनोगत – ए.एन.एम.' : "Principal's Desk – ANM"}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: 0 }}>
            {isMr ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर' : 'Samarth College of Nursing, Sangamner'}
          </p>
        </div>
      </section>

      <section style={{ background: '#f8fafc', padding: '60px 0' }}>
        <div className="container">
          <div
            className="principal-section"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'start',
              maxWidth: '1050px',
              margin: '0 auto',
            }}
          >
            {/* Principal Profile Card */}
            <div
              className="principal-profile"
              style={{
                textAlign: 'center',
                backgroundColor: '#f8fafc',
                padding: '2.5rem 1.8rem',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0',
              }}
            >
              <div
                style={{
                  width: '190px',
                  height: '190px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '5px solid #16a34a',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  position: 'relative',
                }}
              >
                <Image
                  src="/images/leadership/principal-anm.jpg"
                  alt={isMr ? 'राघटाटे पूजा ताराचंद' : 'Raghatate Pooja Tarachand'}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              <h2 style={{ fontSize: '1.45rem', margin: '0 0 0.4rem', color: '#0d3b66' }}>
                {isMr ? 'राघटाटे पूजा ताराचंद' : 'Raghatate Pooja Tarachand'}
              </h2>

              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  margin: '0 0 1.5rem',
                  letterSpacing: '0.5px',
                }}
              >
                {isMr ? 'प्राचार्य (ए.एन.एम. नर्सिंग)' : 'Principal (ANM Course)'}
              </div>

              <div
                style={{
                  textAlign: 'left',
                  backgroundColor: 'white',
                  padding: '1.25rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <p
                  style={{
                    margin: '0 0 0.8rem',
                    borderBottom: '1px solid #f1f5f9',
                    paddingBottom: '0.8rem',
                    fontSize: '0.95rem',
                    color: '#334155',
                  }}
                >
                  <strong style={{ color: '#0d3b66' }}>{isMr ? 'क्लिनिकल अनुभव:' : 'Clinical Experience:'}</strong>{' '}
                  {isMr ? '०३ वर्षे प्रत्यक्ष रुग्णसेवा' : '03 Years'}
                </p>
                <p style={{ margin: '0', fontSize: '0.95rem', color: '#334155' }}>
                  <strong style={{ color: '#0d3b66' }}>{isMr ? 'अध्यापन अनुभव:' : 'Teaching Experience:'}</strong>{' '}
                  {isMr ? '१२ वर्षे नर्सिंग अध्यापन' : '12 Years'}
                </p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', backgroundColor: '#16a34a', borderColor: '#16a34a' }}
                >
                  <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
                  {isMr ? 'संपर्क साधा' : 'Contact Principal'}
                </Link>
              </div>
            </div>

            {/* Principal Message Content */}
            <div className="principal-message" style={{ gridColumn: 'auto / span 2' }}>
              <span className="section-pill-tag" style={{ marginBottom: '12px', display: 'inline-block' }}>
                {isMr ? 'प्राचार्यांचे मनोगत' : 'LEADERSHIP MESSAGE'}
              </span>

              <h3
                style={{
                  borderBottom: '3px solid #16a34a',
                  paddingBottom: '0.6rem',
                  marginBottom: '1.5rem',
                  color: '#0d3b66',
                  fontSize: '1.8rem',
                }}
              >
                {isMr
                  ? 'मातृ-बाल आरोग्य आणि तळागाळातील आरोग्यसेवेची सक्षम जडणघडण'
                  : 'Empowering Healthcare at the Grassroots Level with Dedication'}
              </h3>

              {isMr ? (
                <div style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#334155' }}>
                  <p style={{ fontWeight: '600', color: '#0d3b66', fontSize: '1.15rem' }}>
                    प्रिय विद्यार्थी आणि पालक बंधू-भगिनींनो,
                  </p>
                  <p style={{ fontStyle: 'italic', color: '#16a34a', fontWeight: '600', fontSize: '1.1rem' }}>
                    समर्थ कॉलेज ऑफ नर्सिंग, ए.एन.एम. अभ्यासक्रमाच्या वतीने आपले सहर्ष स्वागत!
                  </p>
                  <p>
                    <strong>ऑक्सिलरी नर्स मिडवाइफरी (ANM)</strong> ही आरोग्यसेवा क्षेत्रातील एक अत्यंत महत्त्वाची आणि पवित्र पायाभूत पायरी आहे. ग्रामीण आणि दुर्गम भागातील माता, बालके आणि वंचित घटकांना प्राथमिक आरोग्य सेवा, सुरक्षित प्रसूती मार्गदर्शन आणि लसीकरण पुरविण्यात ए.एन.एम. परिचारिकांची भूमिका अतुलनीय असते.
                  </p>
                  <p>
                    समर्थ नर्सिंग कॉलेजमध्ये आम्ही केवळ पुस्तकी ज्ञान न देता, विद्यार्थिनींना प्रत्यक्ष रुग्णालय अनुभव, प्राथमिक आरोग्य केंद्र (PHC) आणि उपकेंद्रातील कामकाजाचे सखोल प्रात्यक्षिक देण्यावर भर देतो.
                  </p>
                  <div
                    style={{
                      backgroundColor: '#f0fdf4',
                      borderLeft: '4px solid #16a34a',
                      padding: '18px 24px',
                      borderRadius: '0 10px 10px 0',
                      margin: '24px 0',
                    }}
                  >
                    <p style={{ margin: 0, fontStyle: 'italic', fontWeight: '600', color: '#14532d' }}>
                      “विद्यार्थिनींना दर्जेदार प्रशिक्षण देऊन ग्रामीण व शहरी भागातील मातृ व बाल आरोग्यसेवा तसेच प्रतिबंधात्मक आरोग्य क्षेत्रात समर्पण भावाने कार्य करणारे सक्षम आरोग्यसेवक घडविणे ही आमची बांधिलकी आहे.”
                    </p>
                  </div>
                  <p>
                    आमचे अनुभवी प्राध्यापक, सुरक्षित व शिस्तबद्ध वसतिगृह आणि पोषक शैक्षणिक वातावरण विद्यार्थिनींना एक आत्मनिर्भर, स्वाभिमानी आणि यशस्वी आरोग्य व्यावसायिक बनण्यास प्रेरित करते.
                  </p>
                  <p style={{ marginTop: '20px' }}>
                    या उदात्त सेवाभावी क्षेत्रात पदार्पण करणाऱ्या सर्व विद्यार्थिनींना माझ्याकडून मनःपूर्वक शुभेच्छा व आशीर्वाद!
                  </p>
                  <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0d3b66', fontSize: '1.1rem' }}>राघटाटे पूजा ताराचंद</strong>
                    <div style={{ color: '#64748b' }}>प्राचार्य (ANM), समर्थ कॉलेज ऑफ नर्सिंग</div>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#334155' }}>
                  <p style={{ fontWeight: '600', color: '#0d3b66', fontSize: '1.15rem' }}>
                    Dear Students and Parents,
                  </p>
                  <p style={{ fontStyle: 'italic', color: '#16a34a', fontWeight: '600', fontSize: '1.1rem' }}>
                    Welcome to Samarth College of Nursing, ANM Department.
                  </p>
                  <p>
                    <strong>Auxiliary Nurse Midwifery (ANM)</strong> is a foundational pillar of community and maternal health. At the grassroots level in rural and urban health systems, ANM professionals are the compassionate frontline guardians of maternal welfare, neonatal care, nutrition, and vital immunization programs.
                  </p>
                  <p>
                    Our core mission is to mold empathetic, competent, and socially committed healthcare workers. We combine classroom instruction with rigorous practical field exposure at Primary Health Centres (PHCs), sub-centres, and multi-speciality maternity wards.
                  </p>
                  <div
                    style={{
                      backgroundColor: '#f0fdf4',
                      borderLeft: '4px solid #16a34a',
                      padding: '18px 24px',
                      borderRadius: '0 10px 10px 0',
                      margin: '24px 0',
                    }}
                  >
                    <p style={{ margin: 0, fontStyle: 'italic', fontWeight: '600', color: '#14532d' }}>
                      “Preparing empathetic, skilled healthcare professionals who serve rural and urban communities with dedication, maternal care, and preventive health expertise.”
                    </p>
                  </div>
                  <p>
                    With 12 years of dedicated teaching experience and 3 years of clinical practice, I take personal pride in mentoring young women towards financial independence, self-confidence, and exceptional professionalism in health sciences.
                  </p>
                  <p style={{ marginTop: '20px' }}>
                    I warmly invite you to join our family at Samarth and embark on a noble journey of healing, care, and service to humanity.
                  </p>
                  <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0d3b66', fontSize: '1.1rem' }}>Raghatate Pooja Tarachand</strong>
                    <div style={{ color: '#64748b' }}>Principal (ANM), Samarth College of Nursing</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
