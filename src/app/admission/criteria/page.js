'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AdmissionCriteriaPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const courses = [
    {
      name: isMr ? 'जी.एन.एम. (जनरल नर्सिंग व मिडवायफ्री)' : 'GNM (General Nursing & Midwifery)',
      code: 'GNM',
      duration: isMr ? '३ वर्षे' : '3 Years',
      affiliation: 'MSBNPE, Mumbai',
      minAge: isMr ? 'किमान १७ वर्षे (३१ डिसेंबर २०२६ पर्यंत)' : 'Min 17 Years (as on 31 Dec 2026)',
      maxAge: isMr ? 'कमाल ३५ वर्षे' : 'Max 35 Years',
      qualification: isMr ? '१२वी उत्तीर्ण (कोणतीही शाखा - Science / Arts / Commerce / MCVC)' : '12th (HSC) Passed in any stream (Science / Arts / Commerce / MCVC)',
      minMarks: isMr ? 'किमान ४०% गुण (राखीव वर्ग: ३५% गुण). इंग्रजी विषय अनिवार्य.' : 'Min 40% aggregate (Reserved: 35%). English is compulsory.',
      intake: '40 Seats',
      badgeColor: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      name: isMr ? 'ए.एन.एम. (ऑक्सिलरी नर्सिंग व मिडवायफ्री)' : 'ANM (Auxiliary Nursing & Midwifery)',
      code: 'ANM',
      duration: isMr ? '२ वर्षे' : '2 Years',
      affiliation: 'MSBNPE, Mumbai',
      minAge: isMr ? 'किमान १७ वर्षे पूर्ण' : 'Min 17 Years of age',
      maxAge: isMr ? 'कमाल ३५ वर्षे' : 'Max 35 Years',
      qualification: isMr ? '१२वी उत्तीर्ण (HSC - कला / वाणिज्य / विज्ञान)' : '12th (HSC) Passed in any recognized discipline',
      minMarks: isMr ? 'किमान ४०% गुण (राखीव वर्ग: ३५%). फक्त विद्यार्थिनींसाठी.' : 'Min 40% marks (Reserved: 35%). Female candidates only.',
      intake: '40 Seats',
      badgeColor: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      name: isMr ? 'ए.डी.एम.एल.टी. (अॅडव्हान्स्ड मेडिकल लॅब टेक्निशियन)' : 'ADMLT (Medical Lab Technician)',
      code: 'ADMLT',
      duration: isMr ? '१.५ वर्षे' : '1.5 Years',
      affiliation: 'MSBTE, Mumbai',
      minAge: isMr ? 'किमान १७ वर्षे' : 'Min 17 Years',
      maxAge: isMr ? 'वयोमर्यादा नाही' : 'No upper age limit',
      qualification: isMr ? 'B.Sc (Chemistry / Botany / Zoology / Micro) किंवा १२वी सायन्स' : 'B.Sc (Life Sciences / Chemistry) or 12th Science (PCB/PCM)',
      minMarks: isMr ? 'किमान ४५% गुण (राखीव वर्ग: ४०%)' : 'Min 45% marks (Reserved: 40%)',
      intake: '30 Seats',
      badgeColor: '#d97706',
      bgLight: '#fef3c7',
    },
  ];

  const documents = [
    { title: isMr ? '१०वी (SSC) गुणपत्रिका व बोर्ड प्रमाणपत्र' : '10th (SSC) Marksheet & Passing Certificate', req: isMr ? 'मूळ प्रत + ३ झेरॉक्स' : 'Original + 3 Copies' },
    { title: isMr ? '१२वी (HSC) गुणपत्रिका व बोर्ड प्रमाणपत्र' : '12th (HSC) Marksheet & Passing Certificate', req: isMr ? 'मूळ प्रत + ३ झेरॉक्स' : 'Original + 3 Copies' },
    { title: isMr ? 'शाळा / कॉलेज सोडल्याचा दाखला (TC / LC)' : 'Leaving Certificate / Transfer Certificate (TC / LC)', req: isMr ? 'मूळ प्रत' : 'Original' },
    { title: isMr ? 'अधिवास व राष्ट्रीयत्व प्रमाणपत्र (Domicile & Nationality)' : 'Domicile & Nationality Certificate', req: isMr ? 'मूळ प्रत + २ झेरॉक्स' : 'Original + 2 Copies' },
    { title: isMr ? 'जातीचा दाखला व जात वैधता (Caste & Validity - लागू असल्यास)' : 'Caste Certificate & Caste Validity (If Applicable)', req: isMr ? 'मूळ प्रत + २ झेरॉक्स' : 'Original + 2 Copies' },
    { title: isMr ? 'नॉन-क्रिमिलेअर प्रमाणपत्र (Non-Creamy Layer - चालू आर्थिक वर्ष)' : 'Non-Creamy Layer Certificate (Current Financial Year)', req: isMr ? 'मूळ प्रत' : 'Original' },
    { title: isMr ? 'उत्पन्नाचा दाखला (तहसीलदार / सक्षम प्राधिकारी)' : 'Income Certificate (Competent Authority / Tahsildar)', req: isMr ? 'मूळ प्रत + २ झेरॉक्स' : 'Original + 2 Copies' },
    { title: isMr ? 'आधार कार्ड व राष्ट्रीयकृत बँक पासबुक झेरॉक्स' : 'Aadhar Card & Nationalized Bank Passbook Copy', req: isMr ? '३ झेरॉक्स प्रती' : '3 Xerox Copies' },
    { title: isMr ? 'पासपोर्ट साईज रंगीत फोटो (अलीकडील)' : 'Recent Passport Size Color Photographs', req: isMr ? '६ प्रती' : '6 Copies' },
    { title: isMr ? 'वैद्यकीय तंदुरुस्ती प्रमाणपत्र (Medical Fitness by MBBS Doctor)' : 'Medical Fitness Certificate by Registered Practitioner', req: isMr ? 'मूळ प्रत' : 'Original' },
  ];

  const steps = [
    { step: '01', title: isMr ? 'पात्रता तपासणी व माहिती' : 'Eligibility Check & Counseling', desc: isMr ? 'आपल्या शैक्षणिक गुणांनुसार योग्य नर्सिंग अभ्यासक्रमाची निवड करा.' : 'Verify 12th marks and choose the best nursing or lab program.' },
    { step: '02', title: isMr ? 'अर्ज सादर करणे' : 'Submit Admission Application', desc: isMr ? 'ऑनलाइन किंवा प्रत्यक्ष कॉलेज कार्यालयात प्रवेश अर्ज दाखल करा.' : 'Fill out online application form or visit campus admission desk.' },
    { step: '03', title: isMr ? 'कागदपत्र पडताळणी' : 'Document Verification', desc: isMr ? 'सर्व मूळ शैक्षणिक व जात प्रमाणपत्रांची तपासणी व मान्यता.' : 'Physical verification of original academic and reservation certificates.' },
    { step: '04', title: isMr ? 'शुल्क भरणा व प्रवेश निश्चिती' : 'Fee Payment & Seat Allotment', desc: isMr ? 'प्रवेश शुल्क भरून आपली जागा व प्रवेश निश्चित करा.' : 'Pay initial tuition installment and receive official admission receipt.' },
  ];

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>{isMr ? 'प्रवेश निकष व पात्रता अटी' : 'Admission Criteria & Eligibility'}</h1>
          <div className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> &gt;{' '}
            <Link href="/admission">{isMr ? 'प्रवेश प्रक्रिया' : 'Admission'}</Link> &gt;{' '}
            <span>{isMr ? 'प्रवेश निकष' : 'Admission Criteria'}</span>
          </div>
        </div>
      </div>

      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-pill-tag">
              {isMr ? '📋 अधिकृत पात्रता निकष' : '📋 OFFICIAL ELIGIBILITY CRITERIA'}
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#0d3b66', fontWeight: 800 }}>
              {isMr ? 'अभ्यासक्रमनिहाय प्रवेश पात्रता' : 'Course-wise Admission Eligibility'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '750px', margin: '10px auto 0' }}>
              {isMr
                ? 'महाराष्ट्र राज्य नर्सिंग व पॅरामेडिकल शिक्षण मंडळ (MSBNPE & MSBTE) मानकांनुसार.'
                : 'Adhering strictly to Indian Nursing Council (INC), MSBNPE Mumbai and MSBTE admission norms.'}
            </p>
          </div>

          {/* 3 Course Criteria Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '50px' }}>
            {courses.map((c, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 8px 25px rgba(13, 59, 102, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span
                    style={{
                      background: c.bgLight,
                      color: c.badgeColor,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    {c.code} • {c.duration}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{c.intake}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0d3b66', marginBottom: '15px' }}>
                  {c.name}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: '#334155', flexGrow: 1 }}>
                  <div>
                    <strong style={{ color: '#0d3b66' }}>{isMr ? 'शैक्षणिक पात्रता:' : 'Qualification:'}</strong>
                    <div style={{ color: '#64748b', marginTop: '2px' }}>{c.qualification}</div>
                  </div>
                  <div>
                    <strong style={{ color: '#0d3b66' }}>{isMr ? 'किमान टक्केवारी:' : 'Minimum Percentage:'}</strong>
                    <div style={{ color: '#64748b', marginTop: '2px' }}>{c.minMarks}</div>
                  </div>
                  <div>
                    <strong style={{ color: '#0d3b66' }}>{isMr ? 'वयोमर्यादा:' : 'Age Limit:'}</strong>
                    <div style={{ color: '#64748b', marginTop: '2px' }}>{c.minAge} — {c.maxAge}</div>
                  </div>
                  <div>
                    <strong style={{ color: '#0d3b66' }}>{isMr ? 'संलग्नता:' : 'Affiliation:'}</strong>
                    <div style={{ color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>{c.affiliation}</div>
                  </div>
                </div>

                <Link
                  href="/admission"
                  style={{
                    marginTop: '20px',
                    background: '#0d3b66',
                    color: '#ffffff',
                    textAlign: 'center',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {isMr ? 'थेट प्रवेशासाठी अर्ज करा' : 'Apply for Admission'} &rarr;
                </Link>
              </div>
            ))}
          </div>

          {/* Step by Step Admission Workflow */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 8px 24px rgba(13, 59, 102, 0.05)',
              marginBottom: '50px',
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0d3b66', marginBottom: '25px', textAlign: 'center' }}>
              <i className="fas fa-route" style={{ color: '#f59e0b', marginRight: '10px' }}></i>
              {isMr ? 'प्रवेश प्रक्रिया टप्पे (Step-by-Step Procedure)' : 'Step-by-Step Admission Procedure'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {steps.map((st, sIdx) => (
                <div key={sIdx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0284c7', lineHeight: 1, marginBottom: '8px' }}>
                    {st.step}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0d3b66', margin: '0 0 6px' }}>{st.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 8px 24px rgba(13, 59, 102, 0.05)',
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0d3b66', marginBottom: '20px' }}>
              <i className="fas fa-folder-open" style={{ color: '#16a34a', marginRight: '10px' }}></i>
              {isMr ? 'प्रवेशासाठी आवश्यक मूळ कागदपत्रे सूची (Document Checklist)' : 'Required Original Documents Checklist'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
              {documents.map((doc, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                    <i className="fas fa-file-check" style={{ color: '#0284c7' }}></i>
                    <span>{doc.title}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '6px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {doc.req}
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
