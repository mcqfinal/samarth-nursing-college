'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function VisionMissionPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cmsData } = usePageContent('vision-mission');

  const missionPoints = [
    {
      icon: 'fa-graduation-cap',
      en: 'To provide quality, affordable and value-based education in nursing and paramedical sciences.',
      mr: 'नर्सिंग व पॅरामेडिकल क्षेत्रात गुणवत्तापूर्ण, परवडणारे व मूल्याधिष्ठित शिक्षण उपलब्ध करून देणे.',
    },
    {
      icon: 'fa-user-nurse',
      en: 'To develop students with professional competence, practical skills, ethical values and compassion.',
      mr: 'विद्यार्थ्यांमध्ये व्यावसायिक कौशल्य, व्यावहारिक ज्ञान, नैतिक मूल्ये आणि सेवाभाव विकसित करणे.',
    },
    {
      icon: 'fa-stethoscope',
      en: 'To promote innovative teaching, clinical learning, research and continuous professional development.',
      mr: 'आधुनिक अध्यापन पद्धती, क्लिनिकल प्रशिक्षण, संशोधन आणि सतत व्यावसायिक विकासाला प्रोत्साहन देणे.',
    },
    {
      icon: 'fa-award',
      en: 'To encourage discipline, leadership, teamwork and lifelong learning among students.',
      mr: 'विद्यार्थ्यांमध्ये शिस्त, नेतृत्वगुण, संघभावना आणि आजीवन शिक्षणाची वृत्ती निर्माण करणे.',
    },
    {
      icon: 'fa-hands-helping',
      en: 'To contribute to society through community health awareness and responsible healthcare services.',
      mr: 'आरोग्यविषयक जनजागृती व समाजोपयोगी उपक्रमांद्वारे समाजाच्या आरोग्यविकासात योगदान देणे.',
    },
    {
      icon: 'fa-shield-heart',
      en: 'To create a safe, inclusive and student-centered learning environment that supports overall development.',
      mr: 'विद्यार्थ्यांच्या सर्वांगीण विकासासाठी सुरक्षित, समावेशक आणि विद्यार्थी-केंद्रित शैक्षणिक वातावरण निर्माण करणे.',
    },
  ];

  const coreValues = isMr
    ? [
        { title: 'गुणवत्ता', icon: 'fa-certificate', desc: 'उच्च दर्जाचे दर्जेदार शिक्षण' },
        { title: 'प्रामाणिकपणा', icon: 'fa-shield-alt', desc: 'नैतिक आचारसंहिता व पारदर्शकता' },
        { title: 'शिस्त', icon: 'fa-user-check', desc: 'सकारात्मक व शिस्तबद्ध वातावरण' },
        { title: 'सेवाभाव', icon: 'fa-hand-holding-heart', desc: 'रुग्णसेवेस निरपेक्ष समर्पण' },
        { title: 'उत्कृष्टता', icon: 'fa-star', desc: 'सातत्यपूर्ण प्रगती व व्यावसायिक कौशल्य' },
        { title: 'संवेदनशीलता', icon: 'fa-heart', desc: 'सहानुभूती, दयाभाव व आपुलकी' },
        { title: 'सामाजिक बांधिलकी', icon: 'fa-globe-asia', desc: 'समाजाचे आरोग्यहित व जनजागृती' },
        { title: 'जबाबदारी', icon: 'fa-award', desc: 'कर्तव्यदक्ष व जबाबदार आचरण' },
      ]
    : [
        { title: 'Quality', icon: 'fa-certificate', desc: 'Academic excellence and clinical precision' },
        { title: 'Integrity', icon: 'fa-shield-alt', desc: 'Ethical stewardship and moral truth' },
        { title: 'Discipline', icon: 'fa-user-check', desc: 'Focused mindset and professional conduct' },
        { title: 'Compassion', icon: 'fa-hand-holding-heart', desc: 'Empathetic and patient-first care' },
        { title: 'Excellence', icon: 'fa-star', desc: 'Continuous advancement and lifelong learning' },
        { title: 'Service Spirit', icon: 'fa-heart', desc: 'Selfless dedication to human healing' },
        { title: 'Social Impact', icon: 'fa-globe-asia', desc: 'Active community wellbeing & awareness' },
        { title: 'Accountability', icon: 'fa-award', desc: 'Responsible professional duty & care' },
      ];

  const highlights = isMr
    ? ['क्लिनिकल प्राविण्य', 'नैतिक आचारसंहिता', 'संवेदनशील रुग्णसेवा', 'आरोग्य क्षेत्रातील नेतृत्व']
    : ['Clinical Excellence', 'Ethical Practice', 'Compassionate Care', 'Healthcare Leadership'];

  return (
    <>
      {/* Hero Banner without breadcrumb, with modern sans-serif ampersand */}
      <section style={{
        background: 'linear-gradient(135deg, #071e3d 0%, #0d3b66 50%, #1e3a8a 100%)',
        position: 'relative',
        overflow: 'hidden',
        color: '#ffffff',
        padding: 'clamp(45px, 6vw, 65px) 20px',
        textAlign: 'center',
      }}>
        {/* Ambient Decorative Glows */}
        <div style={{
          position: 'absolute', top: -50, right: -50, width: 220, height: 220,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,183,3,0.14) 0%, rgba(255,183,3,0) 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,209,102,0.15)', border: '1px solid rgba(255,209,102,0.4)',
            color: '#ffd166', padding: '6px 18px', borderRadius: '999px',
            fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '14px',
          }}>
            <i className="fas fa-eye"></i> {isMr ? 'मार्गदर्शक तत्त्वे' : 'GUIDING PRINCIPLES'}
          </div>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3rem)',
            fontWeight: 800,
            margin: '0 0 12px',
            color: '#ffffff',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            {isMr ? 'ध्येय व उद्दिष्टे (Vision & Mission)' : (
              <>Vision <span style={{ color: '#ffd166', fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> Mission</>
            )}
          </h1>

          <p style={{
            color: '#cbd5e1',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {isMr
              ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर — सेवा, ज्ञान व संस्कारांचा सुवर्ण संगम'
              : 'Samarth College of Nursing, Sangamner — Dedicated to Excellence in Healthcare Education'}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ background: '#f8fafc', padding: 'clamp(40px, 6vw, 70px) 0' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 20px' }}>

          {/* Section Introduction */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e0f2fe', color: '#0369a1',
              padding: '5px 16px', borderRadius: '999px',
              fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px',
            }}>
              <i className="fas fa-compass"></i> {isMr ? 'आमचे तत्त्वज्ञान' : 'INSTITUTIONAL PHILOSOPHY'}
            </div>
            <h2 style={{
              color: '#0d3b66',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)',
              fontWeight: 800,
              margin: '0 0 14px',
              letterSpacing: '-0.01em',
            }}>
              {isMr ? (
                'आमची दृष्टी, ध्येय आणि मूल्ये'
              ) : (
                <>Our Vision, Mission <span style={{ color: '#0284c7', fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> Values</>
              )}
            </h2>
            <p style={{
              color: '#64748b',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
              lineHeight: '1.7',
              maxWidth: '720px',
              margin: '0 auto',
            }}>
              {isMr
                ? 'आरोग्यसेवेच्या उज्ज्वल भविष्यासाठी समर्पित व्यावसायिक आणि संवेदनशील आरोग्यसेवक घडविण्याचा आमचा संकल्प.'
                : 'Empowering future nursing and healthcare leaders through quality education, clinical excellence, and compassionate patient care.'}
            </p>
          </div>

          {/* Vision Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 40px)',
            border: '1px solid #e2e8f0',
            borderTop: '5px solid #0284c7',
            boxShadow: '0 10px 30px -5px rgba(13, 59, 102, 0.06)',
            marginBottom: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '22px' }}>
              <div style={{
                width: '54px', height: '54px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                color: '#0284c7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.45rem', flexShrink: 0,
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.15)',
              }}>
                <i className="fas fa-eye"></i>
              </div>
              <div>
                <span style={{
                  fontSize: '0.8rem', fontWeight: '800', color: '#0284c7',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {isMr ? 'दीर्घकालीन दृष्टी' : 'LONG-TERM PERSPECTIVE'}
                </span>
                <h3 style={{
                  color: '#0d3b66',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                  fontWeight: 800,
                  margin: '4px 0 0',
                }}>
                  {isMr ? 'आमची दृष्टी (Vision)' : 'Our Vision'}
                </h3>
              </div>
            </div>

            {/* Vision Statement Quote */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f7ff 0%, #f8fafc 100%)',
              padding: 'clamp(20px, 3vw, 30px)',
              borderRadius: '14px',
              border: '1px solid #e0e7ff',
              borderLeft: '5px solid #0284c7',
              position: 'relative',
            }}>
              <i className="fas fa-quote-left" style={{
                fontSize: '1.8rem',
                color: '#0284c7',
                opacity: 0.25,
                display: 'block',
                marginBottom: '8px',
              }}></i>
              <p style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.22rem)',
                lineHeight: '1.85',
                color: '#1e293b',
                fontWeight: 500,
                margin: '0 0 18px',
              }}>
                {isMr
                  ? (cmsData?.vision?.textMr || 'नर्सिंग, पॅरामेडिकल शिक्षण, कौशल्य विकास आणि समाजाभिमुख आरोग्यसेवेमध्ये उत्कृष्टता साधणारी, विश्वासार्ह आणि अग्रगण्य संस्था म्हणून विकसित होणे आणि सक्षम, संवेदनशील व जबाबदार आरोग्यसेवा व्यावसायिक घडवून निरोगी समाजाच्या निर्मितीस हातभार लावणे.')
                  : (cmsData?.vision?.textEn || 'To emerge as a premier centre of nursing excellence recognized nationally for fostering compassionate patient care, ethical clinical research, and leadership in healthcare services.')}
              </p>

              {/* Highlight chips */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px dashed #cbd5e1',
              }}>
                {highlights.map((tag, idx) => (
                  <span key={idx} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#0d3b66',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}>
                    <i className="fas fa-check-circle" style={{ color: '#0284c7', fontSize: '0.75rem' }}></i>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 40px)',
            border: '1px solid #e2e8f0',
            borderTop: '5px solid #1a9988',
            boxShadow: '0 10px 30px -5px rgba(26, 153, 136, 0.06)',
            marginBottom: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '54px', height: '54px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #e6f7f4 0%, #cbf0ea 100%)',
                color: '#1a9988',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.45rem', flexShrink: 0,
                boxShadow: '0 4px 12px rgba(26, 153, 136, 0.15)',
              }}>
                <i className="fas fa-bullseye"></i>
              </div>
              <div>
                <span style={{
                  fontSize: '0.8rem', fontWeight: '800', color: '#1a9988',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {isMr ? 'ध्येय व कृती आराखडा' : 'GOALS & COMMITMENT'}
                </span>
                <h3 style={{
                  color: '#0d3b66',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                  fontWeight: 800,
                  margin: '4px 0 0',
                }}>
                  {isMr ? 'आमचे ध्येय (Mission)' : 'Our Mission'}
                </h3>
              </div>
            </div>

            {((isMr && cmsData?.mission?.textMr) || (!isMr && cmsData?.mission?.textEn)) && (
              <p style={{
                fontSize: '1.1rem', lineHeight: '1.7', color: '#1e293b',
                marginBottom: '24px', fontWeight: '500',
                padding: '16px 20px', background: '#f8fafc',
                borderRadius: '10px', borderLeft: '4px solid #1a9988',
              }}>
                {isMr ? cmsData.mission.textMr : cmsData.mission.textEn}
              </p>
            )}

            {/* Mission Points Responsive Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '16px',
            }}>
              {missionPoints.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px 18px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    backgroundColor: '#1a9988', color: '#ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.95rem', flexShrink: 0, marginTop: '2px',
                    boxShadow: '0 2px 6px rgba(26, 153, 136, 0.25)',
                  }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.75rem', fontWeight: 800,
                      color: '#1a9988', textTransform: 'uppercase',
                      marginBottom: '2px', letterSpacing: '0.04em',
                    }}>
                      {isMr ? `उद्दिष्ट ०${index + 1}` : `OBJECTIVE 0${index + 1}`}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.6', color: '#334155', fontWeight: 500 }}>
                      {isMr ? item.mr : item.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values Section */}
          <div style={{
            background: 'linear-gradient(135deg, #071e3d 0%, #0d3b66 50%, #1e3a8a 100%)',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 40px)',
            boxShadow: '0 12px 36px -8px rgba(13, 59, 102, 0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Ambient Corner Glow */}
            <div style={{
              position: 'absolute', top: -30, right: -30, width: 180, height: 180,
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,183,3,0.15) 0%, rgba(255,183,3,0) 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
              <div style={{
                width: '54px', height: '54px', borderRadius: '14px',
                backgroundColor: 'rgba(255,183,3,0.18)', color: '#ffb703',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.45rem', flexShrink: 0,
                border: '1px solid rgba(255,183,3,0.3)',
              }}>
                <i className="fas fa-gem"></i>
              </div>
              <div>
                <span style={{
                  fontSize: '0.8rem', fontWeight: '800', color: '#ffb703',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {isMr ? 'संस्कार व मूल्ये' : 'CORE PRINCIPLES'}
                </span>
                <h3 style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                  fontWeight: 800,
                  margin: '4px 0 0',
                }}>
                  {isMr ? 'आमची आधारभूत मूल्ये (Core Values)' : 'Our Core Values'}
                </h3>
              </div>
            </div>

            {/* Grid of 8 Core Values */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
              gap: '16px',
              position: 'relative',
              zIndex: 2,
            }}>
              {coreValues.map((val, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  transition: 'all 0.2s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      backgroundColor: 'rgba(255, 183, 3, 0.2)',
                      color: '#ffd166',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem', flexShrink: 0,
                    }}>
                      <i className={`fas ${val.icon}`}></i>
                    </div>
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 700 }}>
                      {val.title}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5', display: 'block' }}>
                    {val.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
