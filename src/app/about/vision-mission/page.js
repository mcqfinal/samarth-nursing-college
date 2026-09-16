'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function VisionMissionPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cmsData } = usePageContent('vision-mission');

  const missionPointsEn = [
    'To provide quality, affordable and value-based education in nursing and paramedical sciences.',
    'To develop students with professional competence, practical skills, ethical values and compassion.',
    'To promote innovative teaching, clinical learning, research and continuous professional development.',
    'To encourage discipline, leadership, teamwork and lifelong learning among students.',
    'To contribute to society through community health awareness and responsible healthcare services.',
    'To create a safe, inclusive and student-centered learning environment that supports overall development.',
  ];

  const missionPointsMr = [
    'नर्सिंग व पॅरामेडिकल क्षेत्रात गुणवत्तापूर्ण, परवडणारे व मूल्याधिष्ठित शिक्षण उपलब्ध करून देणे.',
    'विद्यार्थ्यांमध्ये व्यावसायिक कौशल्य, व्यावहारिक ज्ञान, नैतिक मूल्ये आणि सेवाभाव विकसित करणे.',
    'आधुनिक अध्यापन पद्धती, क्लिनिकल प्रशिक्षण, संशोधन आणि सतत व्यावसायिक विकासाला प्रोत्साहन देणे.',
    'विद्यार्थ्यांमध्ये शिस्त, नेतृत्वगुण, संघभावना आणि आजीवन शिक्षणाची वृत्ती निर्माण करणे.',
    'आरोग्यविषयक जनजागृती व समाजोपयोगी उपक्रमांद्वारे समाजाच्या आरोग्यविकासात योगदान देणे.',
    'विद्यार्थ्यांच्या सर्वांगीण विकासासाठी सुरक्षित, समावेशक आणि विद्यार्थी-केंद्रित शैक्षणिक वातावरण निर्माण करणे.',
  ];

  const missionList = isMr ? missionPointsMr : missionPointsEn;

  return (
    <>
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '50px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,209,102,0.2)', border: '1px solid #ffd166',
            color: '#ffd166', padding: '5px 14px', borderRadius: '999px',
            fontSize: '0.82rem', fontWeight: 700, marginBottom: '14px',
          }}>
            <i className="fas fa-eye"></i> {isMr ? 'मार्गदर्शक तत्त्वे' : 'GUIDING PRINCIPLES'}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'ध्येय व उद्दिष्टे (Vision & Mission)' : 'Vision & Mission'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: '0 0 16px' }}>
            {isMr ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर' : 'Samarth College of Nursing, Sangamner'}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <Link href="/about" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'आमच्याविषयी' : 'About'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'ध्येय व दृष्टी' : 'Vision & Mission'}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: '#f8fafc', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>

            {/* Section intro */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div style={{ display: 'inline-block', background: '#fef3c7', color: '#d97706', padding: '4px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px' }}>
                {isMr ? 'मार्गदर्शक तत्त्वे' : 'GUIDING PRINCIPLES'}
              </div>
              <h2 style={{ color: '#0d3b66', fontSize: '2.2rem', margin: '0 0 16px' }}>
                {isMr ? 'आमची दृष्टी, ध्येय आणि मूल्ये' : 'Our Vision, Mission & Values'}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto' }}>
                {isMr
                  ? 'आरोग्यसेवेच्या उज्ज्वल भविष्यासाठी समर्पित व्यावसायिक आणि संवेदनशील आरोग्यसेवक घडविण्याचा आमचा संकल्प.'
                  : 'Empowering future nursing and healthcare leaders through quality education, clinical excellence, and compassionate care.'}
              </p>
            </div>

            {/* Vision Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '36px 40px',
              border: '1px solid #e2e8f0',
              borderTop: '6px solid #0d3b66',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '54px', height: '54px', borderRadius: '12px',
                  backgroundColor: '#e0f2fe', color: '#0284c7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                }}>
                  <i className="fas fa-eye"></i>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0284c7', textTransform: 'uppercase' }}>
                    {isMr ? 'दीर्घकालीन दृष्टी' : 'LONG-TERM PERSPECTIVE'}
                  </span>
                  <h3 style={{ color: '#0d3b66', fontSize: '1.75rem', margin: 0 }}>
                    {isMr ? 'आमची दृष्टी (Vision)' : 'Our Vision'}
                  </h3>
                </div>
              </div>
              <p style={{
                fontSize: '1.2rem', lineHeight: '1.8', color: '#1e293b', fontStyle: 'italic',
                backgroundColor: '#f8fafc', padding: '24px', borderRadius: '10px',
                borderLeft: '4px solid #ffb703', margin: 0,
              }}>
                {isMr
                  ? (cmsData?.vision?.textMr || '"नर्सिंग, पॅरामेडिकल शिक्षण, कौशल्य विकास आणि समाजाभिमुख आरोग्यसेवेमध्ये उत्कृष्टता साधणारी, विश्वासार्ह आणि अग्रगण्य संस्था म्हणून विकसित होणे आणि सक्षम, संवेदनशील व जबाबदार आरोग्यसेवा व्यावसायिक घडवून निरोगी समाजाच्या निर्मितीस हातभार लावणे."')
                  : (cmsData?.vision?.textEn || '"To emerge as a leading and trusted educational institution dedicated to excellence in nursing, paramedical education, skill development and community healthcare, creating competent, compassionate and responsible healthcare professionals for a healthier society."')}
              </p>
            </div>

            {/* Mission Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '36px 40px',
              border: '1px solid #e2e8f0',
              borderTop: '6px solid #1a9988',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '54px', height: '54px', borderRadius: '12px',
                  backgroundColor: '#e6f7f4', color: '#1a9988',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                }}>
                  <i className="fas fa-bullseye"></i>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1a9988', textTransform: 'uppercase' }}>
                    {isMr ? 'ध्येय व कृती आराखडा' : 'GOALS & COMMITMENT'}
                  </span>
                  <h3 style={{ color: '#0d3b66', fontSize: '1.75rem', margin: 0 }}>
                    {isMr ? 'आमचे ध्येय (Mission)' : 'Our Mission'}
                  </h3>
                </div>
              </div>
              {((isMr && cmsData?.mission?.textMr) || (!isMr && cmsData?.mission?.textEn)) && (
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#1e293b', marginBottom: '20px', fontWeight: '500' }}>
                  {isMr ? cmsData.mission.textMr : cmsData.mission.textEn}
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {missionList.map((point, index) => (
                  <div key={index} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '16px',
                    padding: '14px 18px', backgroundColor: '#f8fafc',
                    borderRadius: '10px', border: '1px solid #e2e8f0',
                  }}>
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      backgroundColor: '#1a9988', color: '#ffffff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.85rem', fontWeight: '700', flexShrink: 0, marginTop: '2px',
                    }}>
                      {index + 1}
                    </span>
                    <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.6', color: '#334155' }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div style={{
              background: 'linear-gradient(135deg, #0d3b66, #1e3a8a)',
              borderRadius: '16px',
              padding: '36px 40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '54px', height: '54px', borderRadius: '12px',
                  backgroundColor: 'rgba(255,183,3,0.15)', color: '#ffb703',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                }}>
                  <i className="fas fa-gem"></i>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffb703', textTransform: 'uppercase' }}>
                    {isMr ? 'संस्कार व मूल्ये' : 'CORE PRINCIPLES'}
                  </span>
                  <h3 style={{ color: '#ffffff', fontSize: '1.75rem', margin: 0 }}>
                    {isMr ? 'आमची आधारभूत मूल्ये (Core Values)' : 'Our Core Values'}
                  </h3>
                </div>
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px', marginTop: '24px',
              }}>
                {(isMr
                  ? [
                      { title: 'गुणवत्ता', icon: 'fa-certificate', desc: 'उच्च दर्जाचे शिक्षण' },
                      { title: 'प्रामाणिकपणा', icon: 'fa-shield-alt', desc: 'नैतिक आचारसंहिता' },
                      { title: 'शिस्त', icon: 'fa-user-check', desc: 'सकारात्मक वातावरण' },
                      { title: 'सेवाभाव', icon: 'fa-hand-holding-heart', desc: 'रुग्णसेवेस समर्पण' },
                      { title: 'उत्कृष्टता', icon: 'fa-star', desc: 'सातत्यपूर्ण प्रगती' },
                      { title: 'संवेदनशीलता', icon: 'fa-heart', desc: 'सहानुभूती व दयाभाव' },
                      { title: 'सामाजिक बांधिलकी', icon: 'fa-globe-asia', desc: 'समाजाचे आरोग्यहित' },
                      { title: 'जबाबदारी', icon: 'fa-award', desc: 'कर्तव्यदक्ष आचरण' },
                    ]
                  : [
                      { title: 'Quality', icon: 'fa-certificate', desc: 'Academic excellence' },
                      { title: 'Integrity', icon: 'fa-shield-alt', desc: 'Moral & professional truth' },
                      { title: 'Discipline', icon: 'fa-user-check', desc: 'Focused mindset' },
                      { title: 'Compassion', icon: 'fa-hand-holding-heart', desc: 'Empathetic patient care' },
                      { title: 'Excellence', icon: 'fa-star', desc: 'Continuous advancement' },
                      { title: 'Service Spirit', icon: 'fa-heart', desc: 'Selfless healing dedication' },
                      { title: 'Social Responsibility', icon: 'fa-globe-asia', desc: 'Community wellbeing' },
                      { title: 'Accountability', icon: 'fa-award', desc: 'Ethical stewardship' },
                    ]
                ).map((val, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px',
                    padding: '16px', border: '1px solid rgba(255,255,255,0.12)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <i className={`fas ${val.icon}`} style={{ color: '#ffb703', fontSize: '1.1rem' }}></i>
                      <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>{val.title}</strong>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{val.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
