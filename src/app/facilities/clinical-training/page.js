'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function ClinicalTrainingPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cmsData } = usePageContent('facilities-clinical');

  // 20 Clinical Rotations & Specialties
  const clinicalSpecialties = [
    {
      titleEn: 'Medical-Surgical Nursing',
      titleMr: 'Medical-Surgical Nursing (वैद्यकीय व शस्त्रक्रिया नर्सिंग)',
      descEn: 'Medical & surgical ward inpatient care, bedside nursing, patient monitoring, and pre-operative & post-operative care.',
      descMr: 'वैद्यकीय व शस्त्रक्रिया विभागातील रुग्णसेवा, बेडसाइड नर्सिंग, रुग्णाचे निरीक्षण, प्री-ऑपरेटिव्ह व पोस्ट-ऑपरेटिव्ह केअर.',
      icon: 'fa-user-md',
      emoji: '🩺',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Mental Health Nursing',
      titleMr: 'Mental Health Nursing (मानसोपचार नर्सिंग)',
      descEn: 'Mental health assessment, therapeutic communication, psychiatric patient care, observation, and psycho-social rehabilitation.',
      descMr: 'मानसिक आरोग्याचे मूल्यांकन, Therapeutic Communication, मानसोपचार रुग्णांची काळजी, निरीक्षण व पुनर्वसन.',
      icon: 'fa-brain',
      emoji: '🧠',
      color: '#9333ea',
      bgLight: '#f3e8ff',
    },
    {
      titleEn: 'Child Health / Paediatric Nursing',
      titleMr: 'Child Health Nursing (बालरुग्ण नर्सिंग)',
      descEn: 'Neonatal, infant, and pediatric care, growth and development milestone assessment, and pediatric nursing interventions.',
      descMr: 'नवजात, बालक व मुलांची काळजी, वाढ-विकासाचे मूल्यांकन आणि बालरुग्णांच्या नर्सिंग प्रक्रिया.',
      icon: 'fa-baby',
      emoji: '👶',
      color: '#ea580c',
      bgLight: '#ffedd5',
    },
    {
      titleEn: 'Community Health Nursing',
      titleMr: 'Community Health Nursing (समुदाय आरोग्य नर्सिंग)',
      descEn: 'Primary Health Centres (PHC), rural community health postings, urban health centers, school health, and family health surveys.',
      descMr: 'प्राथमिक आरोग्य केंद्र (PHC), ग्रामीण व शहरी समुदाय आरोग्य, गृहभेटी, सर्वेक्षण व लसीकरण कार्यक्रम.',
      icon: 'fa-users',
      emoji: '🏘️',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      titleEn: 'Midwifery & Obstetrical Nursing',
      titleMr: 'Midwifery & OBGY (प्रसूती व स्त्रीरोग नर्सिंग)',
      descEn: 'Antenatal care, labor room assistance, normal delivery observation, postnatal care, and comprehensive newborn management.',
      descMr: 'गरोदरपणातील काळजी (Antenatal), लेबर रूम अनुभव, प्रसूती सहाय्य, बाळंतपणानंतरची काळजी व नवजात बालकाची निगा.',
      icon: 'fa-female',
      emoji: '🤰',
      color: '#e11d48',
      bgLight: '#ffe4e6',
    },
    {
      titleEn: 'Critical Care / ICU Nursing',
      titleMr: 'Critical Care / ICU Nursing (अतिदक्षता विभाग)',
      descEn: 'Intensive Care Unit (ICU, ICCU, NICU), mechanical ventilator management, cardiac monitors, and vital sign monitoring.',
      descMr: 'ICU, ICCU व व्हेंटिलेटरवरील गंभीर रुग्णांचे निरीक्षण, कार्डियाक मॉनिटरिंग आणि आपत्कालीन औषधोपचार.',
      icon: 'fa-heartbeat',
      emoji: '🫀',
      color: '#dc2626',
      bgLight: '#fee2e2',
    },
    {
      titleEn: 'Emergency & Casualty Nursing',
      titleMr: 'Emergency & Casualty (आपत्कालीन व अपघात विभाग)',
      descEn: 'Accident & trauma care, triage protocol, emergency resuscitation, BLS/ACLS protocols, and immediate acute stabilization.',
      descMr: 'अपघात व आपत्कालीन रुग्ण triage, तातडीची प्रथमोपचार, CPR आणि जीवनरक्षक वैद्यकीय प्रक्रिया.',
      icon: 'fa-ambulance',
      emoji: '🚨',
      color: '#b91c1c',
      bgLight: '#fef2f2',
    },
    {
      titleEn: 'Operation Theatre (OT) Nursing',
      titleMr: 'Operation Theatre Nursing (शस्त्रक्रिया गृह अनुभव)',
      descEn: 'Surgical scrubbing, instrument handling, sterility maintenance, anesthesia assistance, and post-anesthesia recovery monitoring.',
      descMr: 'शस्त्रक्रिया मदत, सर्जिकल स्क्रबिंग, निर्जंतुकीकरण, भूलशास्त्र सहाय्य व रिकव्हरी रूम देखरेख.',
      icon: 'fa-procedures',
      emoji: '🏥',
      color: '#0d9488',
      bgLight: '#ccfbf1',
    },
    {
      titleEn: 'Geriatric Nursing (Elderly Care)',
      titleMr: 'Geriatric Nursing (ज्येष्ठ नागरिक रुग्णसेवा)',
      descEn: 'Care of senior citizens, chronic age-related illness management, mobility assistance, nutritional support, and dignity preservation.',
      descMr: 'ज्येष्ठ नागरिकांची काळजी, दीर्घकालीन आजार व्यवस्थापन, आदरयुक्त संवाद व जीवनमानाची गुणवत्ता वाढवणे.',
      icon: 'fa-blind',
      emoji: '👵',
      color: '#b45309',
      bgLight: '#fef3c7',
    },
    {
      titleEn: 'Orthopaedic Nursing',
      titleMr: 'Orthopaedic Nursing (अस्थिव्यंग विभाग)',
      descEn: 'Fracture management, traction care, plaster/cast application assistance, post-ortho surgery mobilization, and fall prevention.',
      descMr: 'अस्थिभंग, ट्रॅक्शन व प्लास्टर काळजी, शस्त्रक्रियेनंतरची हालचाल व पुनर्वसन व्यायाम मदत.',
      icon: 'fa-bone',
      emoji: '🦴',
      color: '#475569',
      bgLight: '#f1f5f9',
    },
    {
      titleEn: 'Cardiovascular & Thoracic Nursing',
      titleMr: 'Cardiovascular Care (हृदयरोग विभाग)',
      descEn: 'Cardiac patient monitoring, 12-lead ECG recording & basic interpretation, chest physiotherapy, and cardiac lifestyle education.',
      descMr: 'हृदयरुग्णांची काळजी, ECG काढणे व वाचन, रक्तदाब नियंत्रण व हृदयविकार प्रतिबंधक समुपदेशन.',
      icon: 'fa-heart',
      emoji: '💓',
      color: '#e11d48',
      bgLight: '#ffe4e6',
    },
    {
      titleEn: 'Oncology Nursing (Cancer Care)',
      titleMr: 'Oncology Nursing (कर्करोग रुग्णसेवा)',
      descEn: 'Compassionate cancer patient care, chemotherapy administration safety protocols, symptom management, and emotional counseling.',
      descMr: 'कर्करोग रुग्णांची संवेदनशील काळजी, केमोथेरपी प्रोटोकॉल, वेदना नियंत्रण व मानसिक आधार.',
      icon: 'fa-ribbon',
      emoji: '🎗️',
      color: '#7c3aed',
      bgLight: '#ede9fe',
    },
    {
      titleEn: 'Infection Control & Biomedical Waste',
      titleMr: 'Infection Control (संक्रमण नियंत्रण व कचरा व्यवस्थापन)',
      descEn: 'Hospital Infection Prevention (HIC), hand hygiene audits, PPE protocols, sterile techniques, and color-coded BMW disposal.',
      descMr: 'Hand Hygiene, Standard Precautions, PPE, संक्रमण प्रतिबंध व Biomedical Waste Management नियमावली.',
      icon: 'fa-shield-virus',
      emoji: '🦠',
      color: '#059669',
      bgLight: '#ecfdf5',
    },
    {
      titleEn: 'Patient Assessment & Care Planning',
      titleMr: 'Patient Assessment & Care Planning (रुग्ण मूल्यांकन)',
      descEn: 'Comprehensive patient history taking, physical head-to-toe examination, nursing diagnoses formulation, care plans, and evaluation.',
      descMr: 'रुग्ण इतिहास, शारीरिक मूल्यांकन, Nursing Diagnosis, Care Plan, Intervention व नियमित Evaluation.',
      icon: 'fa-clipboard-list',
      emoji: '📋',
      color: '#4f46e5',
      bgLight: '#eef2ff',
    },
    {
      titleEn: 'Clinical Documentation & Records',
      titleMr: 'Clinical Documentation (वैद्यकीय दस्तऐवजीकरण)',
      descEn: 'Nursing chart records, patient case sheets, shift handover notes, clinical logs, and medico-legal documentation accuracy.',
      descMr: 'Nursing Records, Case Sheets, Care Plans, Reports आणि व्यावसायिक अचूक दस्तऐवजीकरण.',
      icon: 'fa-file-signature',
      emoji: '📝',
      color: '#0891b2',
      bgLight: '#ecfeff',
    },
    {
      titleEn: 'Patient & Family Education',
      titleMr: 'Patient & Family Education (रुग्ण व कुटुंब समुपदेशन)',
      descEn: 'Empathetic patient counseling, health teaching, post-discharge medication guidance, and wellness lifestyle modification.',
      descMr: 'रुग्ण व कुटुंबीयांना आरोग्य शिक्षण, समुपदेशन, उपचार व डिस्चार्ज नंतरची काळजी मार्गदर्शन.',
      icon: 'fa-user-friends',
      emoji: '👨‍👩‍👧',
      color: '#8b5cf6',
      bgLight: '#f5f3ff',
    },
    {
      titleEn: 'Health Promotion & Disease Prevention',
      titleMr: 'Health Promotion (आरोग्य संवर्धन व प्रतिबंध)',
      descEn: 'Free health screening camps, immunization campaigns, lifestyle disease awareness, and community hygiene initiatives.',
      descMr: 'आरोग्य तपासणी शिबिरे, जनजागृती रॅली, आरोग्य संवर्धन व संसर्गजन्य रोगप्रतिबंधक उपक्रम.',
      icon: 'fa-seedling',
      emoji: '🌿',
      color: '#10b981',
      bgLight: '#d1fae5',
    },
    {
      titleEn: 'Palliative & Supportive Care',
      titleMr: 'Palliative Care (उपशामक रुग्णसेवा)',
      descEn: 'Compassionate comfort care, pain symptom alleviation, psychological, spiritual and emotional dignity for chronically ill patients.',
      descMr: 'दीर्घकालीन व गंभीर आजार असलेल्या रुग्णांसाठी आरामदायी, संवेदनशील व सन्मानपूर्वक काळजी.',
      icon: 'fa-dove',
      emoji: '🕊️',
      color: '#6366f1',
      bgLight: '#e0e7ff',
    },
    {
      titleEn: 'Rehabilitation Nursing',
      titleMr: 'Rehabilitation Nursing (पुनर्वसन नर्सिंग)',
      descEn: 'Restorative patient care, mobility training, activities of daily living (ADL) assistance, and continuity of care toward self-reliance.',
      descMr: 'रुग्णांच्या पुनर्वसन प्रक्रियेत नर्सिंग भूमिका, हालचाल, स्वावलंबन व सातत्यपूर्ण काळजी.',
      icon: 'fa-wheelchair',
      emoji: '♿',
      color: '#d97706',
      bgLight: '#fef3c7',
    },
    {
      titleEn: 'Multidisciplinary Clinical Collaboration',
      titleMr: 'Multidisciplinary Teamwork (बहुविद्याशाखीय समन्वय)',
      descEn: 'Collaborative bedside clinical practice alongside doctors, senior nursing officers, clinical technicians, and allied healthcare staff.',
      descMr: 'डॉक्टर, नर्सेस, प्रयोगशाळा तंत्रज्ञ व इतर आरोग्यसेवा व्यावसायिकांसोबत समन्वयाने काम करण्याचा थेट अनुभव.',
      icon: 'fa-handshake',
      emoji: '🤝',
      color: '#0d9488',
      bgLight: '#ccfbf1',
    },
  ];

  // Clinical Learning Mantra Steps
  const clinicalMantraSteps = [
    { step: 1, titleMr: 'निरीक्षण', titleEn: 'Observation', icon: 'fa-eye', color: '#0284c7' },
    { step: 2, titleMr: 'मूल्यांकन', titleEn: 'Assessment', icon: 'fa-stethoscope', color: '#7c3aed' },
    { step: 3, titleMr: 'नियोजन', titleEn: 'Planning', icon: 'fa-clipboard-check', color: '#2563eb' },
    { step: 4, titleMr: 'प्रत्यक्ष कृती', titleEn: 'Intervention', icon: 'fa-hand-holding-medical', color: '#e11d48' },
    { step: 5, titleMr: 'मूल्यमापन', titleEn: 'Evaluation', icon: 'fa-chart-line', color: '#16a34a' },
    { step: 6, titleMr: 'दस्तऐवजीकरण', titleEn: 'Documentation', icon: 'fa-file-signature', color: '#d97706' },
  ];

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. HERO BANNER */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d3b66 0%, #0369a1 100%)',
          color: '#ffffff',
          padding: '60px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 209, 102, 0.2)',
              border: '1px solid #ffd166',
              color: '#ffd166',
              padding: '6px 18px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '16px',
              letterSpacing: '0.05em',
            }}
          >
            <i className="fas fa-hospital-alt"></i> {isMr ? (cmsData?.hero?.badgeMr || 'क्लिनिकल अनुभव व प्रशिक्षण') : (cmsData?.hero?.badgeEn || 'CLINICAL TRAINING & ROTATIONS')}
          </div>
          <h1
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              margin: '0 0 12px',
              color: '#ffffff',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {isMr ? (cmsData?.hero?.titleMr || 'विविध क्षेत्रांतील क्लिनिकल अनुभव') : (cmsData?.hero?.titleEn || 'Comprehensive Clinical Exposure Across Specialties')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#e0f2fe', margin: '0 auto 20px', lineHeight: 1.6, maxWidth: '780px' }}>
            {isMr
              ? (cmsData?.hero?.descMr || 'प्रत्यक्ष अनुभवातून उत्कृष्ट नर्सिंग कौशल्याकडे • शास्त्रीय व व्यावहारिक प्रशिक्षण')
              : (cmsData?.hero?.descEn || 'Bridging Classroom Knowledge to Direct Bedside Patient Care Across 20 Key Clinical Specialties')}
          </p>

          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <Link href="/facilities" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'सुविधा' : 'Facilities'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'क्लिनिकल ट्रेनिंग' : 'Clinical Training'}</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT CONTAINER */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">

          {/* Philosophy Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              padding: '36px 40px',
              marginBottom: '45px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-stethoscope"></i>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.05em' }}>
                  {isMr ? 'क्लिनिकल शिक्षण पद्धती' : 'CLINICAL TRAINING PHILOSOPHY'}
                </span>
                <h2 style={{ color: '#0d3b66', fontSize: '1.8rem', margin: '6px 0 14px', fontWeight: 800 }}>
                  {isMr ? 'थेट रुग्णसेवा, तांत्रिक प्रात्यक्षिके आणि आत्मविश्वास' : 'Direct Patient Care, Simulation Labs & Confident Practice'}
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', margin: 0 }}>
                  {isMr ? (
                    <>
                      <strong>समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर</strong> येथे विद्यार्थ्यांना केवळ पुस्तकी ज्ञान न देता विविध आरोग्यसेवा क्षेत्रांमध्ये <em>व्यवस्थित, प्रत्यक्ष व मार्गदर्शित क्लिनिकल अनुभव</em> दिला जातो. विविध विभागांमधील प्रशिक्षणामुळे विद्यार्थ्यांमध्ये <em>क्लिनिकल कौशल्य, आत्मविश्वास, चिकित्सक विचार, रुग्णसेवेची भावना आणि व्यावसायिक क्षमता</em> विकसित होण्यास मदत होते.
                    </>
                  ) : (
                    <>
                      At <strong>Samarth College of Nursing, Sangamner</strong>, we believe that excellence in nursing is forged through <em>knowledge, practice, experience and compassion</em>. Our clinical learning approach provides students with broad exposure to different specialties, healthcare settings and real patient-care situations under senior nursing faculty guidance.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* 20 Clinical Rotations Grid */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ color: '#0d3b66', fontSize: '1.7rem', margin: 0, fontWeight: 800 }}>
                  <i className="fas fa-notes-medical" style={{ color: '#dc2626', marginRight: '10px' }}></i>
                  {isMr ? '२० विशेष क्लिनिकल क्षेत्रे व अनुभव' : '20 Clinical Rotations & Practice Areas'}
                </h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.95rem' }}>
                  {isMr ? 'अभ्यासक्रमादरम्यान विद्यार्थी या सर्व विभागांमध्ये प्रत्यक्ष रुग्णसेवा शिकतात' : 'Rotational postings covering primary, secondary, and tertiary clinical healthcare'}
                </p>
              </div>
              <span style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem', border: '1px solid #fecaca' }}>
                {isMr ? '२० क्लिनिकल पोस्टिंग्स' : '20 CLINICAL SPECIALTIES'}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {clinicalSpecialties.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: item.bgLight,
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        flexShrink: 0,
                      }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>ROTATION #{idx + 1}</span>
                      <h4 style={{ margin: 0, color: '#0d3b66', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.35 }}>
                        {isMr ? item.titleMr : item.titleEn}
                      </h4>
                    </div>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                    {isMr ? item.descMr : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6-Stage Clinical Learning Mantra Banner */}
          <div
            style={{
              padding: '36px 32px',
              background: 'linear-gradient(135deg, #0d3b66 0%, #1a5276 100%)',
              borderRadius: '20px',
              color: '#ffffff',
              boxShadow: '0 10px 30px rgba(13, 59, 102, 0.18)',
              marginBottom: '50px',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255, 183, 3, 0.2)',
                  color: '#ffb703',
                  padding: '5px 18px',
                  borderRadius: '20px',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  marginBottom: '12px',
                  border: '1px solid rgba(255, 183, 3, 0.4)',
                }}
              >
                {isMr ? '💙 आमचा क्लिनिकल लर्निंग मंत्र' : '💙 Our Clinical Learning Mantra'}
              </span>
              <h3 style={{ color: '#ffffff', fontSize: '1.5rem', margin: '6px 0 10px', letterSpacing: '0.5px', fontWeight: 800 }}>
                {isMr
                  ? 'निरीक्षण ➔ मूल्यांकन ➔ नियोजन ➔ प्रत्यक्ष कृती ➔ मूल्यमापन ➔ दस्तऐवजीकरण'
                  : 'Observation ➔ Assessment ➔ Planning ➔ Intervention ➔ Evaluation ➔ Documentation'}
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0, maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                {isMr
                  ? 'शास्त्रीय, सुरक्षित व परिणामकारक रुग्णसेवेसाठीची समर्थ कॉलेजची ६-स्तरीय कार्यपद्धती'
                  : 'The 6-stage scientific workflow instilled in every student for compassionate, evidence-based nursing care.'}
              </p>
            </div>

            {/* 6 Step Cards Flow */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '14px',
                marginBottom: '28px',
              }}
            >
              {clinicalMantraSteps.map((m, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '14px',
                    padding: '18px 10px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#ffb703',
                      color: '#0d3b66',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                    }}
                  >
                    {m.step}
                  </div>
                  <div style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#ffb703' }}>
                    <i className={`fas ${m.icon}`}></i>
                  </div>
                  <h5 style={{ color: '#ffffff', margin: '0 0 4px', fontSize: '0.95rem', fontWeight: '700' }}>
                    {isMr ? m.titleMr : m.titleEn}
                  </h5>
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                    {isMr ? m.titleEn : m.titleMr}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote Banner */}
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                borderLeft: '4px solid #ffb703',
                borderRadius: '10px',
                padding: '18px 24px',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#fef08a',
                textAlign: 'center',
              }}
            >
              {isMr ? (
                <>“वर्गातील ज्ञानाचे रूपांतर प्रत्यक्ष कौशल्यात आणि कौशल्याचे रूपांतर उत्कृष्ट रुग्णसेवेत — हीच आमच्या क्लिनिकल शिक्षणाची दिशा.”</>
              ) : (
                <>“Transforming classroom knowledge into practical skills, and practical skills into compassionate patient care — this is our direction of clinical education.”</>
              )}
            </div>
          </div>

          {/* Affiliated Hospitals & Simulation Labs Section */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '50px',
            }}
          >
            {/* Practical Sim Labs Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '16px' }}>
                <i className="fas fa-flask"></i>
              </div>
              <h4 style={{ color: '#0d3b66', fontSize: '1.25rem', margin: '0 0 10px', fontWeight: 700 }}>
                {isMr ? 'अद्ययावत प्रात्यक्षिक प्रयोगशाळा' : 'On-Campus Clinical Simulation Labs'}
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '16px' }}>
                {isMr
                  ? 'प्रत्यक्ष हॉस्पिटल पोस्टिंगपूर्वी विद्यार्थ्यांना कॉलेजच्या सुसज्ज प्रयोगशाळांमध्ये मानवनिर्मित मॉडेल्सवर प्रात्यक्षिकांचा सखोल सराव दिला जातो.'
                  : 'Before entering actual hospital wards, students gain mastery over procedures using modern manikins and medical equipment in our specialized labs.'}
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', color: '#475569', fontSize: '0.9rem', lineHeight: 1.8 }}>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Nursing Foundations Lab</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Community Health Nursing (CHN) Lab</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Anatomy & Physiology Museum</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Obstetrics & Gynaecology (MCH) Lab</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Nutrition & Dietetics Lab</li>
              </ul>
            </div>

            {/* Hospital Affiliations Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '16px' }}>
                <i className="fas fa-hospital"></i>
              </div>
              <h4 style={{ color: '#0d3b66', fontSize: '1.25rem', margin: '0 0 10px', fontWeight: 700 }}>
                {isMr ? 'रुग्णालय संलग्नता व अनुभव' : 'Hospital Affiliations & Clinical Tie-ups'}
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '16px' }}>
                {isMr
                  ? 'विद्यार्थ्यांना नामांकित मल्टिस्पेशालिटी हॉस्पिटल्स, शासकीय ग्रामीण व उपजिल्हा रुग्णालये आणि प्राथमिक आरोग्य केंद्रांमध्ये थेट रुग्णसेवेचा दांडगा अनुभव मिळतो.'
                  : 'Students rotate through affiliated multi-speciality tertiary care hospitals, civil sub-district hospitals, and government PHCs to develop high clinical competence.'}
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', color: '#475569', fontSize: '0.9rem', lineHeight: 1.8 }}>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Leading Multi-Specialty Partner Hospitals</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Govt Sub-District & Rural Hospitals (Sangamner)</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Primary Health Centres & Rural Postings</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Urban Health Training Centers</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> Community Immunization & Health Camps</li>
              </ul>
            </div>
          </div>

          {/* CTA Box */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '36px',
              border: '1.5px solid #e2e8f0',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            }}
          >
            <h3 style={{ color: '#0d3b66', fontSize: '1.6rem', margin: '0 0 10px', fontWeight: 800 }}>
              {isMr ? 'क्लिनिकल प्रशिक्षण व प्रवेश माहितीसाठी संपर्क' : 'Clinical Exposure & Course Inquiries'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {isMr
                ? 'GNM, ANM आणि ADMLT अभ्यासक्रमांमधील हॉस्पिटल पोस्टिंग, प्रयोगशाळा आणि क्लिनिकल प्रशिक्षणाबाबत अधिक माहितीसाठी संपर्क साधा.'
                : 'Learn more about hospital rotations, skill lab demonstrations, and practical curriculum for GNM, ANM, and ADMLT courses.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/courses"
                style={{
                  backgroundColor: '#0d3b66',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.95rem',
                }}
              >
                <i className="fas fa-graduation-cap" style={{ color: '#ffd166' }}></i> {isMr ? 'कोर्सेसची माहिती पहा' : 'View Nursing Courses'}
              </Link>
              <Link
                href="/facilities/hostel"
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.95rem',
                }}
              >
                <i className="fas fa-hotel"></i> {isMr ? 'वसतिगृह सुविधा पहा' : 'View Hostel Facility'}
              </Link>
              <Link
                href="/facilities"
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.95rem',
                }}
              >
                <i className="fas fa-th-large"></i> {isMr ? 'सर्व सुविधा पहा' : 'All Facilities'}
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
