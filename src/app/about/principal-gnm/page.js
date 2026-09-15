'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function PrincipalGNMPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)', color: '#ffffff', padding: '55px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '5px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.06em' }}>
            <i className="fas fa-user-tie"></i> {isMr ? 'प्राचार्यांचे मनोगत' : "PRINCIPAL'S DESK (GNM)"}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'प्राचार्यांचे मनोगत – जी.एन.एम.' : "Principal's Desk – GNM"}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: '0 0 16px' }}>
            {isMr ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर' : 'Samarth College of Nursing, Sangamner'}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <Link href="/about" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'आमच्याविषयी' : 'About'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'प्राचार्य (GNM)' : "Principal's Desk (GNM)"}</span>
          </div>
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
                  border: '5px solid #ffb703',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  position: 'relative',
                }}
              >
                <Image
                  src="/images/leadership/principal-gnm.jpg"
                  alt={isMr ? 'सौ. सय्यद फिरदौश गुलाब' : 'Mrs. Sayyed Firdosh Gulab'}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              <h2 style={{ fontSize: '1.45rem', margin: '0 0 0.4rem', color: '#0d3b66' }}>
                {isMr ? 'सौ. सय्यद फिरदौश गुलाब' : 'Mrs. Sayyed Firdosh Gulab'}
              </h2>

              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  margin: '0 0 1.5rem',
                  letterSpacing: '0.5px',
                }}
              >
                {isMr ? 'प्राचार्य (जी.एन.एम. नर्सिंग)' : 'Principal (GNM Course)'}
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
                  <strong style={{ color: '#0d3b66' }}>{isMr ? 'शैक्षणिक पात्रता:' : 'Education:'}</strong>{' '}
                  PB BSc Nursing
                </p>
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
                  {isMr ? '१२ वर्षे रुग्णालय अनुभव' : '12 Years'}
                </p>
                <p style={{ margin: '0', fontSize: '0.95rem', color: '#334155' }}>
                  <strong style={{ color: '#0d3b66' }}>{isMr ? 'अध्यापन अनुभव:' : 'Teaching Experience:'}</strong>{' '}
                  {isMr ? '१० वर्षे नर्सिंग अध्यापन' : '10 Years'}
                </p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem' }}
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
                  borderBottom: '3px solid #ffb703',
                  paddingBottom: '0.6rem',
                  marginBottom: '1.5rem',
                  color: '#0d3b66',
                  fontSize: '1.8rem',
                }}
              >
                {isMr
                  ? 'आरोग्यसेवेची गुणवत्ता आणि संवेदनशीलता घडविणारे शिक्षण'
                  : 'Nurturing Competence, Compassion and Excellence in Nursing'}
              </h3>

              {isMr ? (
                <div style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#334155' }}>
                  <p style={{ fontWeight: '600', color: '#0d3b66', fontSize: '1.15rem' }}>
                    प्रिय विद्यार्थी, पालक आणि हितचिंतक,
                  </p>
                  <p style={{ fontStyle: 'italic', color: '#1a9988', fontWeight: '600', fontSize: '1.1rem' }}>
                    Samarth College of Nursing, Ahilyanagar च्या वतीने आपले हार्दिक स्वागत!
                  </p>
                  <p>
                    नर्सिंग शिक्षण म्हणजे केवळ पाठ्यक्रम आणि परीक्षा नव्हे, तर <strong>ज्ञान, कौशल्य, शिस्त, संवेदनशीलता आणि मानवसेवा</strong> यांचा सुंदर संगम आहे. आरोग्यसेवा क्षेत्रात सक्षम, आत्मविश्वासू आणि जबाबदार व्यावसायिक घडविणे हे आमच्या संस्थेचे प्रमुख ध्येय आहे.
                  </p>
                  <p>
                    <strong>SAMARTH</strong> मध्ये विद्यार्थ्यांना गुणवत्तापूर्ण शैक्षणिक मार्गदर्शनासोबत प्रात्यक्षिक शिक्षण, क्लिनिकल अनुभव आणि व्यावसायिक कौशल्ये विकसित करण्यासाठी सकारात्मक व शिस्तबद्ध वातावरण देण्याचा आमचा प्रयत्न असतो.
                  </p>
                  <div
                    style={{
                      backgroundColor: '#eef8f6',
                      borderLeft: '4px solid #1a9988',
                      padding: '18px 24px',
                      borderRadius: '0 10px 10px 0',
                      margin: '24px 0',
                    }}
                  >
                    <p style={{ margin: 0, fontStyle: 'italic', fontWeight: '600', color: '#0d3b66' }}>
                      “प्रत्येक विद्यार्थ्यामध्ये असलेल्या क्षमतेला योग्य दिशा देऊन त्यांना उत्तम नर्सिंग व्यावसायिक तसेच संवेदनशील आणि जबाबदार नागरिक बनविणे, ही आमची सामूहिक जबाबदारी आहे.”
                    </p>
                  </div>
                  <p>
                    आमच्या आधुनिक प्रयोगशाळा, अनुभवी प्राध्यापक वर्ग आणि संलग्न मल्टी-स्पेशालिटी रुग्णालयांच्या माध्यमातून विद्यार्थ्यांना जागतिक दर्जाचा प्रत्यक्ष अनुभव मिळतो. आम्ही विद्यार्थ्यांना केवळ परीक्षा उत्तीर्ण होण्यासाठी नव्हे, तर रुग्णाच्या चेहऱ्यावर हसू फुलवणारे निष्णात परिचारक बनवण्यासाठी घडवतो.
                  </p>
                  <p style={{ marginTop: '20px' }}>
                    आपल्या सर्वांच्या उज्ज्वल आणि यशस्वी शैक्षणिक प्रवासासाठी माझ्याकडून मनःपूर्वक शुभेच्छा!
                  </p>
                  <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0d3b66', fontSize: '1.1rem' }}>सौ. सय्यद फिरदौश गुलाब</strong>
                    <div style={{ color: '#64748b' }}>प्राचार्य (GNM), समर्थ कॉलेज ऑफ नर्सिंग</div>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#334155' }}>
                  <p style={{ fontWeight: '600', color: '#0d3b66', fontSize: '1.15rem' }}>
                    Dear Students, Parents and Well-Wishers,
                  </p>
                  <p style={{ fontStyle: 'italic', color: '#1a9988', fontWeight: '600', fontSize: '1.1rem' }}>
                    A warm and heartfelt welcome to SAMARTH College of Nursing, Sangamner.
                  </p>
                  <p>
                    Nursing education is not merely about completing a curriculum; it is a meaningful combination of <strong>knowledge, skills, discipline, compassion and service to humanity</strong>. Our primary objective is to nurture competent, confident and responsible nursing professionals who are prepared to meet the evolving needs of the healthcare sector.
                  </p>
                  <p>
                    At <strong>SAMARTH</strong>, we are committed to providing our students with quality academic guidance, practical learning, clinical exposure and opportunities to develop professional skills in a positive and disciplined learning environment.
                  </p>
                  <div
                    style={{
                      backgroundColor: '#eef8f6',
                      borderLeft: '4px solid #1a9988',
                      padding: '18px 24px',
                      borderRadius: '0 10px 10px 0',
                      margin: '24px 0',
                    }}
                  >
                    <p style={{ margin: 0, fontStyle: 'italic', fontWeight: '600', color: '#0d3b66' }}>
                      “We believe that every student has the potential to make a meaningful difference in healthcare. With proper mentorship and dedicated training, that potential blossoms into excellence.”
                    </p>
                  </div>
                  <p>
                    Through our state-of-the-art simulation laboratories, comprehensive clinical rotations at reputed affiliated hospitals, and personalized student support, we empower our graduates to lead with integrity, clinical precision, and profound empathy wherever they serve across the globe.
                  </p>
                  <p style={{ marginTop: '20px' }}>
                    I wish all our prospective and current students great success, intellectual growth, and a deeply fulfilling journey in the noble calling of nursing.
                  </p>
                  <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0d3b66', fontSize: '1.1rem' }}>Mrs. Sayyed Firdosh Gulab</strong>
                    <div style={{ color: '#64748b' }}>Principal (GNM), Samarth College of Nursing</div>
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
