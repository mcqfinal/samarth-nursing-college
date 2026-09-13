'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ManagementPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>{isMr ? 'व्यवस्थापनाचा संदेश' : 'Management Message'}</h1>
          <div className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> &gt;{' '}
            <Link href="/about">{isMr ? 'आमच्याविषयी' : 'About Us'}</Link> &gt;{' '}
            <span>{isMr ? 'व्यवस्थापनाचा संदेश' : 'Management Message'}</span>
          </div>
        </div>
      </div>

      <section className="section content-page" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="content-layout" style={{ maxWidth: '920px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-pill-tag" style={{ marginBottom: '14px', display: 'inline-block' }}>
                {isMr ? 'संस्था व्यवस्थापन' : 'LEADERSHIP & VISION'}
              </span>
              <h2
                style={{
                  color: '#0d3b66',
                  fontSize: '2.2rem',
                  lineHeight: '1.3',
                  margin: '0 0 16px',
                }}
              >
                {isMr
                  ? '“आजच्या विद्यार्थ्यांमध्ये उद्याच्या आरोग्यसेवेची ताकद घडविणे, हेच आमचे ध्येय.”'
                  : '“Shaping Future Healthcare Professionals with Knowledge, Skill and Compassion.”'}
              </h2>
              <p style={{ color: '#1a9988', fontWeight: '600', fontSize: '1.15rem' }}>
                {isMr
                  ? 'स्वामी समर्थ व ॐ गगनगिरी फाउंडेशन संचालित — समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर'
                  : 'Run by Swami Samarth V Om Gagangiri Foundation — Samarth College of Nursing'}
              </p>
            </div>

            {isMr ? (
              <div style={{ fontSize: '1.1rem', lineHeight: '1.85', color: '#334155' }}>
                <p style={{ fontWeight: '600', color: '#0d3b66', fontSize: '1.15rem' }}>
                  प्रिय विद्यार्थी, पालक आणि हितचिंतक,
                </p>
                <p style={{ fontStyle: 'italic', color: '#0d3b66', fontWeight: '600' }}>
                  SAMARTH College of Nursing, Sangamner मध्ये आपले मनःपूर्वक स्वागत!
                </p>

                <p>
                  नर्सिंग हे केवळ एक शिक्षणक्षेत्र किंवा व्यवसाय नाही, तर <strong>मानवसेवेचे एक पवित्र माध्यम</strong> आहे. रुग्णाच्या वेदनेत त्याला आधार देणे, संकटाच्या काळात आत्मविश्वास देणे आणि प्रत्येक रुग्णाची काळजी संवेदनशीलतेने घेणे ही एक मोठी जबाबदारी आहे. याच सेवाभावाला ज्ञान, कौशल्य आणि आधुनिक तंत्रज्ञानाची जोड देऊन सक्षम नर्सिंग व्यावसायिक घडविण्याचा आमचा प्रयत्न आहे.
                </p>

                <p>
                  आजच्या आधुनिक आरोग्य व्यवस्थेत केवळ पदवीधारक नव्हे, तर <strong>कुशल, आत्मविश्वासपूर्ण, जबाबदार, संवेदनशील आणि नैतिक मूल्ये जपणारे Nursing Professionals</strong> आवश्यक आहेत. म्हणूनच विद्यार्थ्यांच्या शैक्षणिक विकासासोबतच त्यांच्या व्यक्तिमत्त्व विकासाला, व्यावहारिक कौशल्यांना, संवादकौशल्याला आणि नेतृत्वगुणांना आम्ही विशेष महत्त्व देतो.
                </p>

                {/* Core Formula Box */}
                <div
                  style={{
                    backgroundColor: '#eef8f6',
                    padding: '28px',
                    borderRadius: '16px',
                    margin: '35px 0',
                    textAlign: 'center',
                    border: '2px dashed #1a9988',
                    boxShadow: '0 4px 15px rgba(26,153,136,0.08)',
                  }}
                >
                  <p
                    style={{
                      fontWeight: '700',
                      fontSize: '1.35rem',
                      margin: '0 0 10px 0',
                      color: '#0d3b66',
                      lineHeight: '1.5',
                    }}
                  >
                    उत्तम शिक्षण + उत्कृष्ट प्रशिक्षण + योग्य संस्कार + सेवाभाव = सक्षम आरोग्यसेवक.
                  </p>
                  <span style={{ fontSize: '0.95rem', color: '#1a9988', fontWeight: '600' }}>
                    — समर्थ शैक्षणिक त्रिसूत्री
                  </span>
                </div>

                <p>
                  विद्यार्थ्यांना गुणवत्तापूर्ण शिक्षण, अनुभवी मार्गदर्शन, आधुनिक शिक्षणपद्धती आणि प्रत्यक्ष अनुभवाच्या माध्यमातून त्यांच्या क्षमतांना योग्य दिशा देणे, हे आमचे सातत्यपूर्ण उद्दिष्ट आहे.
                </p>

                <p>
                  प्रत्येक विद्यार्थ्याच्या स्वप्नांना बळ देत त्यांना <strong>“Learn – Serve – Lead”</strong> या विचारातून उज्ज्वल आणि यशस्वी करिअरकडे घेऊन जाण्यासाठी SAMARTH परिवार सदैव प्रयत्नशील राहील.
                </p>

                {/* Commitment Banner */}
                <div
                  style={{
                    backgroundColor: '#0d3b66',
                    color: '#ffffff',
                    padding: '28px',
                    borderRadius: '14px',
                    margin: '35px 0',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '1.2rem', lineHeight: '1.7', margin: '0 0 12px', fontWeight: '600' }}>
                    आपल्या विश्वासाला आमची गुणवत्ता,<br />
                    आपल्या स्वप्नांना आमचे मार्गदर्शन,<br />
                    आणि आपल्या भविष्यासाठी आमची कटिबद्धता!
                  </p>
                  <p style={{ color: '#ffb703', fontWeight: '700', fontSize: '1.1rem', margin: 0 }}>
                    “शिक्षणातून कौशल्य, कौशल्यातून सेवा आणि सेवेतून समाजनिर्मिती.”
                  </p>
                </div>

                <p style={{ marginTop: '20px' }}>
                  आपल्या उज्ज्वल भविष्यासाठी मनःपूर्वक शुभेच्छा!
                </p>

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '1.2rem', color: '#0d3b66' }}>– व्यवस्थापन मंडळ</strong>
                  <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                    स्वामी समर्थ व ॐ गगनगिरी फाउंडेशन / समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '1.1rem', lineHeight: '1.85', color: '#334155' }}>
                <p style={{ fontWeight: '600', color: '#0d3b66', fontSize: '1.15rem' }}>
                  Dear Students, Parents and Well-Wishers,
                </p>
                <p style={{ fontStyle: 'italic', color: '#0d3b66', fontWeight: '600' }}>
                  It gives us immense pleasure to welcome you to Samarth College of Nursing, Ahilyanagar.
                </p>

                <p>
                  Nursing is not merely a profession; it is a <strong>noble commitment to care, compassion, responsibility and humanity</strong>. At SAMARTH, our vision is to transform young aspiring students into confident, competent, compassionate and responsible healthcare professionals who can make a meaningful difference in the lives of individuals and society.
                </p>

                <p>
                  We believe that quality nursing education goes far beyond classrooms and textbooks. Therefore, we emphasize developing comprehensive professional knowledge, clinical hospital skills, ethical values, patient communication abilities, and resilient leadership qualities in every student.
                </p>

                {/* Core Formula Box */}
                <div
                  style={{
                    backgroundColor: '#eef8f6',
                    padding: '28px',
                    borderRadius: '16px',
                    margin: '35px 0',
                    textAlign: 'center',
                    border: '2px dashed #1a9988',
                    boxShadow: '0 4px 15px rgba(26,153,136,0.08)',
                  }}
                >
                  <p
                    style={{
                      fontWeight: '700',
                      fontSize: '1.35rem',
                      margin: '0 0 10px 0',
                      color: '#0d3b66',
                      lineHeight: '1.5',
                    }}
                  >
                    Excellent Education + Outstanding Training + Right Values + Service Dedication = Competent Healthcare Professional.
                  </p>
                  <span style={{ fontSize: '0.95rem', color: '#1a9988', fontWeight: '600' }}>
                    — The Samarth Educational Creed
                  </span>
                </div>

                <p>
                  Our persistent goal is to channel students’ innate talents through expert faculty mentorship, modern medical infrastructure, and extensive hands-on clinical rotations at multi-speciality healthcare facilities.
                </p>

                <p>
                  By fostering the guiding motto <strong>“Learn – Serve – Lead”</strong>, the entire SAMARTH family remains unconditionally dedicated to guiding you toward a distinguished, meaningful, and globally impactful healthcare career.
                </p>

                {/* Commitment Banner */}
                <div
                  style={{
                    backgroundColor: '#0d3b66',
                    color: '#ffffff',
                    padding: '28px',
                    borderRadius: '14px',
                    margin: '35px 0',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '1.2rem', lineHeight: '1.7', margin: '0 0 12px', fontWeight: '600' }}>
                    Our quality for your trust,<br />
                    Our guidance for your dreams,<br />
                    And our dedication for your bright future!
                  </p>
                  <p style={{ color: '#ffb703', fontWeight: '700', fontSize: '1.1rem', margin: 0 }}>
                    “Knowledge into Skill, Skill into Service, and Service into Nation Building.”
                  </p>
                </div>

                <p style={{ marginTop: '20px' }}>
                  We extend our warmest best wishes for your academic journey and professional success!
                </p>

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '1.2rem', color: '#0d3b66' }}>– Board of Management</strong>
                  <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                    Swami Samarth V Om Gagangiri Foundation / Samarth College of Nursing, Sangamner
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
