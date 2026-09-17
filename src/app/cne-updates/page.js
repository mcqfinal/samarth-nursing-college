'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function CneUpdatesPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cmsData } = usePageContent('cne-updates');

  const heroBadge = isMr
    ? (cmsData?.hero?.badgeMr || '✨ आगामी सी.एन.ई. कार्यक्रम ✨')
    : (cmsData?.hero?.badgeEn || '✨ UPCOMING CNE PROGRAMME ✨');

  const heroTitle = isMr
    ? (cmsData?.hero?.titleMr || 'सी.एन.ई. वेळापत्रक')
    : (cmsData?.hero?.titleEn || 'CNE SCHEDULE');

  const heroDesc = isMr
    ? (cmsData?.hero?.descMr || 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर आयोजित निरंतर नर्सिंग शिक्षण (CNE) कार्यशाळा आणि व्यावसायिक विकास कार्यक्रम.')
    : (cmsData?.hero?.descEn || 'Continuing Nursing Education (CNE) Workshops & Professional Development Programmes organized by Samarth College of Nursing, Sangamner.');

  const organizerText = isMr
    ? (cmsData?.cneDetails?.organizerMr || 'स्वामी समर्थ + ॐ गगनगिरी फाउंडेशन, संगमनेर द्वारा आयोजित')
    : (cmsData?.cneDetails?.organizerEn || 'Organized by Swami Samarth + Om Gagangiri Foundation Sangamner');

  const statusTitle = isMr
    ? (cmsData?.cneDetails?.statusTitleMr || 'COMING SOON...')
    : (cmsData?.cneDetails?.statusTitleEn || 'COMING SOON...');

  const statusSubtitle = isMr
    ? (cmsData?.cneDetails?.statusSubtitleMr || '*अधिक माहितीसाठी आमच्याशी जोडलेले रहा!*')
    : (cmsData?.cneDetails?.statusSubtitleEn || '*Stay Tuned for Updates!*');

  const statusDesc = isMr
    ? (cmsData?.cneDetails?.statusDescMr || 'कार्यक्रमाच्या अधिकृत तारखा, कार्यशाळेचे विषय, प्रतिनिधी नोंदणी शुल्क आणि एम.एन.सी. (MNC) क्रेडिट पॉईंट्सची सविस्तर माहिती लवकरच येथे जाहीर केली जाईल.')
    : (cmsData?.cneDetails?.statusDescEn || 'Official dates, thematic workshop topics, delegate registration fees, and MNC credit points allocation will be announced here shortly.');

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. HERO BANNER (Navy Gradient - Matching Website Design System) */}
      <section style={{
        background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '55px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decorative watermark */}
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '14rem',
          color: 'rgba(255, 255, 255, 0.03)',
          pointerEvents: 'none',
        }}>
          <i className="fas fa-stethoscope"></i>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Top Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 209, 102, 0.2)',
            border: '1px solid #ffd166',
            color: '#ffd166',
            padding: '6px 18px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontWeight: 700,
            marginBottom: '14px',
            letterSpacing: '0.06em',
          }}>
            <i className="fas fa-sparkles"></i> {heroBadge}
          </div>

          {/* Main Hero Title */}
          <h1 style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            margin: '0 0 12px',
            color: '#ffffff',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '0.5px',
          }}>
            {heroTitle}
          </h1>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTION */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Main Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(13, 59, 102, 0.07)',
            padding: '44px 36px',
            textAlign: 'center',
            marginBottom: '40px',
          }}>
            {/* Top Pill / Badge inside Card */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fef3c7',
              border: '1px solid #fde68a',
              color: '#d97706',
              padding: '6px 18px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              marginBottom: '16px',
            }}>
              {heroBadge}
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#0d3b66',
              margin: '0 0 14px',
              fontFamily: "'Playfair Display', serif",
            }}>
              {heroTitle}
            </h2>


            {/* Organizer Banner */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              padding: '10px 24px',
              borderRadius: '12px',
              fontSize: '0.98rem',
              fontWeight: 700,
              marginBottom: '36px',
              maxWidth: '720px',
            }}>
              <i className="fas fa-university" style={{ color: '#059669', fontSize: '1.1rem' }}></i>
              <span>{organizerText}</span>
            </div>

            {/* Inner Announcement Box (Dashed Golden Border) */}
            <div style={{
              backgroundColor: '#fffdf5',
              borderRadius: '16px',
              border: '2px dashed #f59e0b',
              padding: '40px 24px',
              margin: '0 auto 34px',
              maxWidth: '720px',
            }}>
              {/* Bell Icon Circle */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#fef3c7',
                border: '1.5px solid #fde68a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '1.75rem',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)',
              }}>
                🔔
              </div>

              <h3 style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                color: '#0d3b66',
                margin: '0 0 8px',
                letterSpacing: '0.5px',
                fontFamily: "'Playfair Display', serif",
              }}>
                🔔 {statusTitle}
              </h3>

              <div style={{
                color: '#d97706',
                fontSize: '1.15rem',
                fontWeight: 700,
                fontStyle: 'italic',
                marginBottom: '14px',
              }}>
                {statusSubtitle}
              </div>

              <p style={{
                color: '#64748b',
                fontSize: '1.02rem',
                lineHeight: '1.7',
                maxWidth: '600px',
                margin: '0 auto',
              }}>
                {statusDesc}
              </p>
            </div>

            {/* Highlights Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              margin: '0 auto 34px',
              maxWidth: '720px',
              textAlign: 'left',
            }}>
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '18px',
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  marginBottom: '10px',
                }}>
                  <i className="fas fa-award"></i>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d3b66', marginBottom: '4px' }}>
                  {isMr ? 'एम.एन.सी. क्रेडिट पॉईंट्स' : 'MNC Credit Points'}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                  {isMr ? 'नोंदणीकृत परिचारिकांसाठी आवश्यक क्रेडिट पॉईंट्स.' : 'Accredited credit hours for registered nurses.'}
                </div>
              </div>

              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '18px',
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  marginBottom: '10px',
                }}>
                  <i className="fas fa-user-md"></i>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d3b66', marginBottom: '4px' }}>
                  {isMr ? 'तज्ज्ञ मार्गदर्शक' : 'Expert Speakers'}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                  {isMr ? 'नामांकित डॉक्टर्स आणि वरिष्ठ नर्सिंग अधिकारी.' : 'Senior clinical specialists & medical faculty.'}
                </div>
              </div>

              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '18px',
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  marginBottom: '10px',
                }}>
                  <i className="fas fa-certificate"></i>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d3b66', marginBottom: '4px' }}>
                  {isMr ? 'सहभाग प्रमाणपत्र' : 'Certificate of Participation'}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                  {isMr ? 'सर्व सहभागी प्रतिनिधींना अधिकृत प्रमाणपत्र.' : 'Official certified delegation credential.'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              <a
                href="https://wa.me/919689486570?text=Hello%2C%20I%20want%20to%20enquire%20about%20the%20Upcoming%20CNE%20Programme%20organized%20by%20Swami%20Samarth%20V%20Om%20Gagangiri%20Foundation."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.28)',
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.15rem' }}></i>
                {isMr ? 'व्हॉट्सअॅपवर माहिती मिळवा' : 'Enquire on WhatsApp'}
              </a>

              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#0d3b66',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(13, 59, 102, 0.2)',
                }}
              >
                <i className="fas fa-phone-alt" style={{ color: '#ffb703' }}></i>
                {isMr ? 'कॉलेजशी संपर्क साधा' : 'Contact College'}
              </Link>
            </div>
          </div>

          {/* What is CNE Explanatory Box (Consistent with College Style) */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            flexWrap: 'wrap',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              flexShrink: 0,
            }}>
              <i className="fas fa-info-circle"></i>
            </div>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.1rem', color: '#0d3b66', fontWeight: 700 }}>
                {isMr ? 'सी.एन.ई. (CNE) म्हणजे काय?' : 'What is Continuing Nursing Education (CNE)?'}
              </h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {isMr
                  ? 'सी.एन.ई. हे महाराष्ट्र नर्सिंग कौन्सिल (MNC) मान्यताप्राप्त व्यावसायिक प्रशिक्षण आहे, ज्याद्वारे परिचारिकांना आधुनिक वैद्यकीय तंत्रज्ञान, रुग्णसुरक्षा आणि क्लिनिकल कौशल्य अद्ययावत ठेवण्यासाठी आवश्यक क्रेडिट पॉईंट्स प्राप्त होतात.'
                  : 'CNE provides accredited professional development for nurses to update clinical competencies, evidence-based patient safety protocols, and earn mandatory credit hours recognized by the Maharashtra Nursing Council (MNC).'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
