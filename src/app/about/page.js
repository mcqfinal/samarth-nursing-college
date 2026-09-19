'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function AboutPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cmsData } = usePageContent('about');

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
            <i className="fas fa-landmark"></i> {isMr ? (cmsData?.hero?.badgeMr || 'संस्थेविषयी') : (cmsData?.hero?.badgeEn || 'ABOUT US')}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? (cmsData?.hero?.titleMr || 'आमच्याविषयी') : (cmsData?.hero?.titleEn || 'About Us')}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: 0 }}>
            {isMr
              ? (cmsData?.hero?.descMr || 'गुणवत्तापूर्ण नर्सिंग शिक्षण, आरोग्यसेवा जनजागृती आणि कुशल मनुष्यबळ विकासासाठी समर्पित.')
              : (cmsData?.hero?.descEn || 'Committed to quality nursing education, healthcare awareness and skilled human resource development.')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: '#f8fafc', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>

            {/* About Foundation Card */}
            <div style={{
              background: '#ffffff', borderRadius: '16px', padding: '32px',
              border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              marginBottom: '24px',
            }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'inline-block', background: '#fef3c7', color: '#d97706', padding: '4px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px' }}>
                  {isMr ? 'संस्थेविषयी माहिती' : 'ABOUT FOUNDATION'}
                </div>
                <h2 style={{ color: '#0d3b66', fontSize: '2.2rem', marginBottom: '20px', lineHeight: '1.3' }}>
                  {isMr ? 'स्वामी समर्थ फाउंडेशन' : 'About Swami Samarth Foundation'}
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155' }}>
                  {isMr ? (
                    <>
                      <strong>स्वामी समर्थ फाउंडेशन</strong> ही गुणवत्तापूर्ण शिक्षण, आरोग्यविषयक जनजागृती आणि कुशल मनुष्यबळाच्या विकासासाठी सामाजिक बांधिलकीने कार्य करणारी संस्था आहे. नर्सिंग, पॅरामेडिकल शिक्षण, कौशल्यविकास आणि सामुदायिक आरोग्यसेवा या क्षेत्रांवर विशेष भर देत, विद्यार्थ्यांना व्यावसायिक ज्ञान, व्यावहारिक कौशल्ये, नैतिक मूल्ये आणि समाजाप्रती जबाबदारीची जाणीव विकसित करण्यासाठी सक्षम शैक्षणिक वातावरण निर्माण करणे हे संस्थेचे प्रमुख उद्दिष्ट आहे.
                    </>
                  ) : (
                    <>
                      <strong>Swami Samarth Foundation</strong> is committed to contributing to the development of quality education, healthcare awareness and skilled human resources through meaningful and socially responsible initiatives. With a strong focus on Nursing, Paramedical Education, Skill Development and Community Healthcare, the Trust aims to create an educational environment where students can develop professional competence, practical skills, ethical values and a strong sense of responsibility towards society.
                    </>
                  )}
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', marginTop: '16px' }}>
                  {isMr
                    ? 'आमच्या कार्यपद्धतीचा केंद्रबिंदू गुणवत्तापूर्ण शिक्षण, व्यावहारिक प्रशिक्षण, शिस्त, नवकल्पना आणि विद्यार्थ्यांचा सर्वांगीण विकास हा आहे. आमच्या मते, शिक्षण म्हणजे केवळ शैक्षणिक ज्ञान मिळवणे नसून विद्यार्थ्यांमध्ये आत्मविश्वास, संवेदनशीलता, नेतृत्वगुण, सेवाभाव आणि व्यावसायिक प्रामाणिकता विकसित करणे होय.'
                    : 'Our approach is centred on quality education, practical learning, discipline, innovation and holistic development. We believe that education is not only about academic knowledge but also about developing confidence, compassion, leadership and professional integrity.'}
                </p>
              </div>

              {/* Trust Identity Card */}
              <div style={{
                backgroundColor: '#f8fafc', borderLeft: '5px solid #0d3b66',
                borderRadius: '12px', padding: '24px 28px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
              }}>
                <h3 style={{ color: '#0d3b66', margin: '0 0 8px 0', fontSize: '1.2rem' }}>
                  <i className="fas fa-landmark" style={{ color: '#ffb703', marginRight: '10px' }}></i>
                  {isMr ? 'संस्थेचे अधिकृत नाव' : 'Official Trust Name'}
                </h3>
                <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>
                  {isMr ? 'स्वामी समर्थ फाउंडेशन' : 'Swami Samarth Foundation'}
                </p>
              </div>
            </div>

            {/* Commitment Section Card */}
            <div style={{
              background: '#ffffff', borderRadius: '16px', padding: '32px',
              border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              marginBottom: '24px',
            }}>
              <h3 style={{ color: '#0d3b66', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-hand-holding-heart" style={{ color: '#1a9988' }}></i>
                {isMr ? 'आमची बांधिलकी' : 'Our Commitment'}
              </h3>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px',
              }}>
                {(isMr ? [
                  'गुणवत्तापूर्ण आणि मूल्याधिष्ठित शिक्षण उपलब्ध करून देणे.',
                  'व्यावहारिक आणि कौशल्याधारित शिक्षणाला प्रोत्साहन देणे.',
                  'सक्षम, कुशल आणि संवेदनशील आरोग्यसेवा व्यावसायिक घडविणे.',
                  'विद्यार्थ्यांमध्ये शिस्त, नेतृत्वगुण आणि व्यावसायिक नैतिकता विकसित करणे.',
                  'सातत्यपूर्ण शिक्षण, नवकल्पना आणि प्रगतीला प्रोत्साहन देणे.',
                  'आरोग्य व समाजकल्याणाबाबत जनजागृती निर्माण करणे.',
                  'सुरक्षित, सर्वसमावेशक आणि विद्यार्थी-केंद्रित शैक्षणिक वातावरण निर्माण करणे.',
                ] : [
                  'Providing quality, affordable and value-based healthcare education.',
                  'Promoting practical, hands-on and skill-based clinical learning.',
                  'Nurturing competent, compassionate and confident healthcare professionals.',
                  'Developing discipline, leadership and professional ethics among students.',
                  'Encouraging continuous learning, research and modern innovation.',
                  'Creating extensive awareness regarding community health and social welfare.',
                  'Building a safe, supportive and student-centered educational campus.',
                ]).map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    padding: '14px 18px', backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0', borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  }}>
                    <i className="fas fa-check-circle" style={{ color: '#1a9988', marginTop: '4px', flexShrink: 0 }}></i>
                    <span style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Values Card */}
            <div style={{
              background: '#ffffff', borderRadius: '16px', padding: '32px',
              border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              marginBottom: '24px',
            }}>
              <div style={{
                backgroundColor: '#eef8f6', border: '1px solid #c8e6e1',
                borderRadius: '12px', padding: '28px',
              }}>
                <h3 style={{ color: '#0d3b66', fontSize: '1.35rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fas fa-award" style={{ color: '#1a9988' }}></i>
                  {isMr ? 'आमची मूल्ये (Values)' : 'Our Core Values'}
                </h3>
                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0d3b66', margin: 0, lineHeight: '1.8' }}>
                  {isMr
                    ? 'गुणवत्ता • प्रामाणिकपणा • शिस्त • सेवाभाव • उत्कृष्टता • नवकल्पना • सामाजिक बांधिलकी • जबाबदारी'
                    : 'Quality • Integrity • Discipline • Compassion • Excellence • Innovation • Social Responsibility • Accountability'}
                </p>
              </div>
            </div>

            {/* Branches List Card */}
            <div style={{
              background: '#ffffff', borderRadius: '16px', padding: '32px',
              border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              marginBottom: '24px',
            }}>
              <h3 style={{ color: '#0d3b66', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-sitemap" style={{ color: '#ffb703' }}></i>
                {isMr ? 'महाविद्यालये व शाखा' : (
                  <>Colleges <span style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", fontWeight: 600, fontStyle: 'normal', padding: '0 2px' }}>&</span> Branches</>
                )}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{
                  padding: '20px', backgroundColor: '#f8fafc', borderRadius: '10px',
                  border: '1px solid #e2e8f0', borderTop: '4px solid #0d3b66',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0284c7', textTransform: 'uppercase' }}>
                    {isMr ? 'नर्सिंग अभ्यासक्रम' : 'NURSING COURSE'}
                  </span>
                  <h4 style={{ margin: '8px 0 6px', color: '#0d3b66', fontSize: '1.15rem' }}>
                    {isMr ? 'समर्थ कॉलेज ऑफ नर्सिंग, अहिल्यानगर' : 'Samarth College of Nursing, Ahilyanagar'}
                  </h4>
                  <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '0.9rem' }}>
                    <strong>GNM</strong> — {isMr ? 'जनरल नर्सिंग अँड मिडवायफ्री (३ वर्षे)' : 'General Nursing & Midwifery (3 Years)'}
                  </p>
                  <span style={{ display: 'inline-block', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '0.78rem', fontWeight: '600', padding: '3px 8px', borderRadius: '4px' }}>
                    {isMr ? 'महाराष्ट्र शासन व MSBNPE मंडळ' : 'Affiliated to State Govt & MSBNPE'}
                  </span>
                </div>

                <div style={{
                  padding: '20px', backgroundColor: '#f8fafc', borderRadius: '10px',
                  border: '1px solid #e2e8f0', borderTop: '4px solid #16a34a',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase' }}>
                    {isMr ? 'नर्सिंग अभ्यासक्रम' : 'NURSING COURSE'}
                  </span>
                  <h4 style={{ margin: '8px 0 6px', color: '#0d3b66', fontSize: '1.15rem' }}>
                    {isMr ? 'समर्थ कॉलेज ऑफ नर्सिंग, अहिल्यानगर' : 'Samarth College of Nursing, Ahilyanagar'}
                  </h4>
                  <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '0.9rem' }}>
                    <strong>ANM</strong> — {isMr ? 'ऑक्सिलरी नर्सिंग अँड मिडवायफ्री (२ वर्षे)' : 'Auxiliary Nursing & Midwifery (2 Years)'}
                  </p>
                  <span style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: '#15803d', fontSize: '0.78rem', fontWeight: '600', padding: '3px 8px', borderRadius: '4px' }}>
                    {isMr ? 'महाराष्ट्र शासन व MSBNPE मंडळ' : 'Affiliated to State Govt & MSBNPE'}
                  </span>
                </div>

                <div style={{
                  padding: '20px', backgroundColor: '#f8fafc', borderRadius: '10px',
                  border: '1px solid #e2e8f0', borderTop: '4px solid #ffb703',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#d97706', textTransform: 'uppercase' }}>
                    {isMr ? 'पॅरामेडिकल अभ्यासक्रम' : 'PARAMEDICAL COURSE'}
                  </span>
                  <h4 style={{ margin: '8px 0 6px', color: '#0d3b66', fontSize: '1.15rem' }}>
                    {isMr ? 'समर्थ इन्स्टिट्यूट ऑफ पॅरामेडिकल सायन्स, संगमनेर' : 'Samarth Institute of Paramedical Science, Sangamner'}
                  </h4>
                  <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '0.9rem' }}>
                    <strong>ADMLT / PGDMLT</strong> — {isMr ? 'मेडिकल लॅब टेक्निशियन (१.५ वर्षे)' : 'Medical Lab Technician (1.5 Years)'}
                  </p>
                  <span style={{ display: 'inline-block', backgroundColor: '#fef3c7', color: '#b45309', fontSize: '0.78rem', fontWeight: '600', padding: '3px 8px', borderRadius: '4px' }}>
                    {isMr ? 'महाराष्ट्र शासन व MSBTE मुंबई' : 'Affiliated to State Govt & MSBTE Mumbai'}
                  </span>
                </div>
              </div>
            </div>

            {/* Why Choose Samarth - 13 Points Section */}
            <div style={{
              background: '#ffffff', borderRadius: '16px', padding: '32px',
              border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              marginBottom: '24px',
            }}>
              <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 30px' }}>
                <div style={{ display: 'inline-block', background: '#fef3c7', color: '#d97706', padding: '4px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px' }}>
                  {isMr ? '🌟 समर्थ कॉलेजच का?' : '🌟 WHY CHOOSE SAMARTH?'}
                </div>
                <h3 style={{ color: '#0d3b66', fontSize: '1.8rem', margin: '0 0 12px' }}>
                  {isMr ? 'आमची १३ ठळक वैशिष्ट्ये' : '13 Pillars of Educational Excellence'}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.98rem', margin: 0, lineHeight: '1.7' }}>
                  {isMr
                    ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे विद्यार्थ्यांना गुणवत्तापूर्ण नर्सिंग शिक्षणासोबत ज्ञान, कौशल्य, शिस्त, आत्मविश्वास आणि सेवाभाव विकसित करण्यासाठी विद्यार्थी-केंद्रित शैक्षणिक वातावरण उपलब्ध करून देण्याचा प्रयत्न केला जातो.'
                    : 'At Samarth College of Nursing, Sangamner, we are dedicated to providing student-centred healthcare education, fostering knowledge, clinical excellence, discipline, confidence, and compassionate service.'}
                </p>
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px',
              }}>
                {[
                  { icon: 'fa-graduation-cap', en: 'Quality-Oriented Nursing Education', mr: 'गुणवत्तापूर्ण व मूल्याधिष्ठित नर्सिंग शिक्षण' },
                  { icon: 'fa-user-nurse', en: 'Student-Centred Teaching & Learning', mr: 'विद्यार्थी-केंद्रित अध्यापन व मार्गदर्शन' },
                  { icon: 'fa-hospital-alt', en: 'Clinical & Practical Learning Exposure', mr: 'रुग्णालयांमध्ये प्रत्यक्ष क्लिनिकल अनुभव' },
                  { icon: 'fa-flask', en: 'Well-Equipped Nursing Laboratories', mr: 'सुसज्ज व अद्ययावत नर्सिंग प्रयोगशाळा' },
                  { icon: 'fa-book-reader', en: 'Library & Digital Learning Resources', mr: 'समृद्ध ग्रंथालय व डिजिटल शिक्षण संसाधने' },
                  { icon: 'fa-chalkboard-teacher', en: 'Smart & Technology-Enabled Learning', mr: 'स्मार्ट व तंत्रज्ञानाधारित डिजिटल शिक्षण' },
                  { icon: 'fa-wifi', en: 'Wi-Fi & Internet Connectivity', mr: 'हाय-स्पीड इंटरनेट व वाय-फाय सुविधा' },
                  { icon: 'fa-hotel', en: 'Hostel & Student Support Facilities', mr: 'सुरक्षित वसतिगृह व विद्यार्थी सहाय्य व्यवस्था' },
                  { icon: 'fa-shield-alt', en: 'Safe & Secure Campus Environment', mr: 'सुरक्षित व शिस्तबद्ध परिसर आणि सीसीटीव्ही सुरक्षा' },
                  { icon: 'fa-brain', en: 'Academic Guidance & Mentorship', mr: 'वैयक्तिक शैक्षणिक मार्गदर्शन व मेन्टॉरशिप' },
                  { icon: 'fa-stethoscope', en: 'Skill Development & Clinical Competency', mr: 'कौशल्य विकास व व्यावसायिक सक्षमता' },
                  { icon: 'fa-hand-holding-heart', en: 'Community Health & Social Responsibility', mr: 'सामाजिक आरोग्य सेवा व समाजसेवेची बांधिलकी' },
                  { icon: 'fa-trophy', en: 'Co-Curricular & Personality Development Activities', mr: 'सहशालेय उपक्रम व सर्वांगीण व्यक्तिमत्त्व विकास' },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', backgroundColor: '#f8fafc',
                    borderRadius: '10px', border: '1px solid #e2e8f0',
                  }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      backgroundColor: '#e0f2fe', color: '#0284c7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.9rem', flexShrink: 0,
                    }}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <span style={{ fontSize: '0.92rem', color: '#1e293b', fontWeight: '600' }}>
                      {isMr ? item.mr : item.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trustees Section Card */}
            <div style={{
              background: '#ffffff', borderRadius: '16px', padding: '32px',
              border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}>
              <h3 style={{ color: '#0d3b66', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-users-cog" style={{ color: '#0d3b66' }}></i>
                {isMr ? 'संस्था विश्वस्त मंडळ (Trustees)' : 'Board of Trustees'}
              </h3>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px',
              }}>
                {[
                  { name: isMr ? 'बोरहाडे सुखदेव टी.' : 'Borhade Sukhadeo T.', role: isMr ? 'विश्वस्त (Trustee)' : 'Trustee' },
                  { name: isMr ? 'जोशी लक्ष्मण जे.' : 'Joshi Laxman J.', role: isMr ? 'विश्वस्त (Trustee)' : 'Trustee' },
                  { name: isMr ? 'बिरे कोंडाजी बी.' : 'Bire Kondaji B.', role: isMr ? 'विश्वस्त (Trustee)' : 'Trustee' },
                ].map((trustee, idx) => (
                  <div key={idx} style={{
                    padding: '24px 20px', backgroundColor: '#f8fafc',
                    borderRadius: '12px', border: '1px solid #e2e8f0',
                    borderLeft: '5px solid #1a9988', textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}>
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '50%',
                      backgroundColor: '#e0f2fe', color: '#0d3b66',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.3rem', margin: '0 auto 14px',
                    }}>
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <h4 style={{ margin: '0 0 6px 0', color: '#0d3b66', fontSize: '1.15rem' }}>{trustee.name}</h4>
                    <p style={{ margin: 0, fontWeight: '600', color: '#1a9988', fontSize: '0.9rem' }}>{trustee.role}</p>
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
