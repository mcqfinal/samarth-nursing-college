'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FacilitiesPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  // 17 Comprehensive Campus Facilities (using exact user provided phrasing)
  const campusFacilities = [
    {
      titleEn: 'Spacious & Well-Maintained Campus',
      titleMr: 'विशाल व सुसज्ज परिसर',
      descEn: 'A clean, green, disciplined, and learner-friendly campus infrastructure providing a peaceful atmosphere for education.',
      descMr: 'निसर्गरम्य, स्वच्छ, सुरक्षित आणि शिस्तबद्ध कॅम्पस परिसर जो विद्यार्थ्यांना एकाग्रतेने शिक्षण घेण्यासाठी आदर्श वातावरण पुरवतो.',
      icon: 'fa-building',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Modern Classrooms',
      titleMr: 'आधुनिक व प्रशस्त वर्गखोल्या',
      descEn: 'Spacious, well-ventilated classrooms designed to provide a comfortable and focused learning environment.',
      descMr: 'स्वच्छ, प्रशस्त, हवेशीर आणि विद्यार्थ्यांना अभ्यासासाठी अनुकूल असे शैक्षणिक वातावरण.',
      icon: 'fa-chalkboard-teacher',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      titleEn: 'Advanced Nursing Labs',
      titleMr: 'अद्ययावत नर्सिंग प्रयोगशाळा',
      descEn: 'Well-equipped laboratories that provide students with hands-on practice in essential nursing procedures and clinical skills.',
      descMr: 'नर्सिंगच्या विविध प्रक्रियांचा प्रत्यक्ष सराव करण्यासाठी सुसज्ज प्रयोगशाळांची सुविधा.',
      icon: 'fa-flask',
      color: '#0d3b66',
      bgLight: '#e2e8f0',
    },
    {
      titleEn: 'Skill & Simulation Lab',
      titleMr: 'स्किल व सिम्युलेशन लॅब',
      descEn: 'A dedicated environment for developing nursing skills through demonstrations, practice sessions and simulation-based learning.',
      descMr: 'नर्सिंग कौशल्ये, प्रक्रिया आणि क्लिनिकल परिस्थितींचा सराव करण्यासाठी विशेष प्रशिक्षण सुविधा.',
      icon: 'fa-user-nurse',
      color: '#d97706',
      bgLight: '#fef3c7',
    },
    {
      titleEn: 'Well-Stocked Library',
      titleMr: 'सुसज्ज ग्रंथालय',
      descEn: 'Rich collection of nursing textbooks, reference manuals, medical journals, periodicals, and quiet reading study spaces.',
      descMr: 'नर्सिंग विषयाची पाठ्यपुस्तके, संदर्भ पुस्तके, जर्नल्स, मासिके आणि वाचनासाठी शांत अभ्यासिका कक्ष.',
      icon: 'fa-book-open',
      color: '#9333ea',
      bgLight: '#f3e8ff',
    },
    {
      titleEn: 'Computer & Digital Learning Facility',
      titleMr: 'संगणक व डिजिटल लर्निंग सुविधा',
      descEn: 'Modern computer workstations for digital health records, online research, assignments, and healthcare informatics.',
      descMr: 'ऑनलाइन रिसर्च, प्रोजेक्ट्स आणि हॉस्पिटल इन्फॉर्मेशन सिस्टीमचे तांत्रिक शिक्षण देण्यासाठी सुसज्ज कॉम्प्युटर लॅब.',
      icon: 'fa-laptop',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Internet / Wi-Fi Connectivity',
      titleMr: 'हाय-स्पीड इंटरनेट व वाय-फाय सुविधा',
      descEn: 'High-speed broadband Wi-Fi connectivity across campus and computer labs to facilitate continuous digital learning.',
      descMr: 'कॅम्पस आणि लॅबमध्ये अखंडित हाय-स्पीड इंटरनेट व वाय-फाय, ज्यामुळे डिजिटल शिक्षणामध्ये मदत होते.',
      icon: 'fa-wifi',
      color: '#2563eb',
      bgLight: '#dbeafe',
    },
    {
      titleEn: 'Comfortable Hostel Facility',
      titleMr: 'सुरक्षित व आरामदायी वसतिगृह सुविधा',
      descEn: 'Well-furnished living rooms, dedicated resident warden, 24/7 security, and a peaceful study atmosphere.',
      descMr: 'स्वच्छ खोल्या, अभ्यासासाठी अनुकूल वातावरण, पूर्णवेळ वॉर्डन देखरेख आणि २४ तास सुरक्षित निवास व्यवस्था.',
      icon: 'fa-hotel',
      color: '#e11d48',
      bgLight: '#ffe4e6',
    },
    {
      titleEn: 'Hygienic Dining & Food Facility',
      titleMr: 'स्वच्छ व सकस भोजन व्यवस्था / मेस',
      descEn: 'Clean, spacious dining hall providing freshly cooked, nutritious, balanced, and hygienic meals daily.',
      descMr: 'रोज ताजे, सकस आणि पौष्टिक जेवण पुरवणारी अत्यंत स्वच्छ व आरोग्यदायी मेस व भोजनालय व्यवस्था.',
      icon: 'fa-utensils',
      color: '#ea580c',
      bgLight: '#ffedd5',
    },
    {
      titleEn: 'Safe Drinking Water Facility (RO)',
      titleMr: 'शुद्ध पिण्याच्या पाण्याची सोय (RO Water)',
      descEn: 'Industrial Reverse Osmosis (RO) purified water stations with coolers installed across the campus.',
      descMr: 'विद्यार्थ्यांच्या चांगल्या आरोग्यासाठी संपूर्ण कॅम्पसमध्ये आधुनिक आरओ (RO) शुद्ध व थंड पिण्याच्या पाण्याची सोय.',
      icon: 'fa-tint',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Clean & Hygienic Washrooms',
      titleMr: 'स्वच्छ व निर्जंतुक स्वच्छतागृहे',
      descEn: 'Separately dedicated, sanitized, and regularly cleaned washroom facilities on each floor.',
      descMr: 'प्रत्येक मजल्यावर स्वतंत्र, दररोज निर्जंतुक केली जाणारी व अत्यंत स्वच्छ स्वच्छतागृहे.',
      icon: 'fa-restroom',
      color: '#059669',
      bgLight: '#d1fae5',
    },
    {
      titleEn: '24/7 Security & CCTV Surveillance',
      titleMr: '२४ तास सुरक्षा व सीसीटीव्ही देखरेख',
      descEn: 'Round-the-clock trained security guards and comprehensive high-definition CCTV camera monitoring.',
      descMr: 'प्रशिक्षित सुरक्षारक्षक, प्रवेशद्वारावर कडक नोंदणी आणि संपूर्ण कॅम्पसवर २४ तास सीसीटीव्ही कॅमेऱ्यांची नजर.',
      icon: 'fa-video',
      color: '#dc2626',
      bgLight: '#fee2e2',
    },
    {
      titleEn: 'Parking Facility',
      titleMr: 'वाहन पार्किंग व्यवस्था',
      descEn: 'Organized and spacious parking zones for two-wheelers and four-wheelers of students, staff, and visitors.',
      descMr: 'विद्यार्थी, प्राध्यापक व पाहुण्यांच्या वाहनांसाठी सुरक्षित व प्रशस्त पार्किंग व्यवस्था.',
      icon: 'fa-parking',
      color: '#475569',
      bgLight: '#f1f5f9',
    },
    {
      titleEn: 'Sports & Recreation Facilities',
      titleMr: 'क्रीडा व मैदानी खेळ सुविधा',
      descEn: 'Playground and facilities for outdoor sports along with indoor games encouraging physical fitness and team spirit.',
      descMr: 'शारीरिक तंदुरुस्ती व खेळभावना वाढवण्यासाठी मैदानी खेळ (व्हॉलीबॉल, बॅडमिंटन) व इनडोअर खेळांची सुविधा.',
      icon: 'fa-futbol',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      titleEn: 'Canteen & Refreshment Facility',
      titleMr: 'कॅन्टीन व अल्पोपहार सुविधा',
      descEn: 'On-campus clean canteen serving fresh tea, coffee, healthy snacks, and quick refreshments at student-friendly prices.',
      descMr: 'विद्यार्थ्यांसाठी चहा, कॉफी आणि स्वच्छ, ताजे अल्पोपहार माफक दरात उपलब्ध करून देणारी कॉलेज कॅन्टीन.',
      icon: 'fa-coffee',
      color: '#b45309',
      bgLight: '#fef3c7',
    },
    {
      titleEn: 'Seminar Hall & Auditorium',
      titleMr: 'ऑडिटोरियम व सेमिनार हॉल',
      descEn: 'Equipped with projection screens and sound systems for guest lectures, clinical workshops, and academic events.',
      descMr: 'तज्ज्ञ डॉक्टरांची व्याख्याने, सेमिनार, कार्यशाळा आणि सांस्कृतिक कार्यक्रमांसाठी सुसज्ज सेमिनार हॉल.',
      icon: 'fa-users',
      color: '#0d3b66',
      bgLight: '#e2e8f0',
    },
    {
      titleEn: 'Student Common Area & Lounge',
      titleMr: 'विद्यार्थी विश्रांती व चर्चा कक्ष',
      descEn: 'Dedicated spaces for students to relax, engage in group discussions, peer study, and co-curricular interactions.',
      descMr: 'अभ्यासाच्या फावल्या वेळेत विश्रांती, गटचर्चा आणि सहशालेय उपक्रमांच्या नियोजनासाठी स्वतंत्र विद्यार्थी कक्ष.',
      icon: 'fa-couch',
      color: '#7c3aed',
      bgLight: '#ede9fe',
    },
  ];

  // 20 Clinical Rotations & Experience (विविध क्षेत्रांतील क्लिनिकल अनुभव)
  const clinicalSpecialties = [
    {
      titleEn: 'Medical-Surgical Nursing',
      titleMr: 'Medical-Surgical Nursing',
      descEn: 'Medical & surgical ward inpatient care, bedside nursing, patient monitoring, and comprehensive pre-operative & post-operative care.',
      descMr: 'वैद्यकीय व शस्त्रक्रिया विभागातील रुग्णसेवा, बेडसाइड नर्सिंग, रुग्णाचे निरीक्षण, प्री-ऑपरेटिव्ह व पोस्ट-ऑपरेटिव्ह केअर.',
      icon: 'fa-user-md',
      emoji: '🩺',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Mental Health Nursing',
      titleMr: 'Mental Health Nursing',
      descEn: 'Mental health assessment, therapeutic communication, psychiatric patient care, observation, and psycho-social rehabilitation.',
      descMr: 'मानसिक आरोग्याचे मूल्यांकन, Therapeutic Communication, मानसोपचार रुग्णांची काळजी, निरीक्षण व पुनर्वसन.',
      icon: 'fa-brain',
      emoji: '🧠',
      color: '#9333ea',
      bgLight: '#f3e8ff',
    },
    {
      titleEn: 'Child Health / Paediatric Nursing',
      titleMr: 'Child Health / Paediatric Nursing',
      descEn: 'Neonatal, infant, and pediatric care, growth and development milestone assessment, and pediatric nursing interventions.',
      descMr: 'नवजात, बालक व मुलांची काळजी, वाढ-विकासाचे मूल्यांकन आणि बालरुग्णांच्या नर्सिंग प्रक्रिया.',
      icon: 'fa-baby',
      emoji: '👶',
      color: '#ea580c',
      bgLight: '#ffedd5',
    },
    {
      titleEn: 'Obstetric & Gynaecological Nursing',
      titleMr: 'Obstetric & Gynaecological Nursing',
      descEn: 'Pregnancy management, antenatal and postnatal care, labor room delivery training, maternal health, and gynecological nursing.',
      descMr: 'गर्भावस्था, प्रसूतीपूर्व व प्रसूतीनंतरची काळजी, प्रसूती सेवा, मातृ आरोग्य व स्त्रीरोग विभागातील अनुभव.',
      icon: 'fa-female',
      emoji: '🤰',
      color: '#e11d48',
      bgLight: '#ffe4e6',
    },
    {
      titleEn: 'Community Health Nursing',
      titleMr: 'Community Health Nursing',
      descEn: 'Family health surveys, home visits, health education, preventive healthcare, and community-based primary nursing.',
      descMr: 'कुटुंब आरोग्य सर्वेक्षण, Home Visits, आरोग्य शिक्षण, प्रतिबंधात्मक आरोग्यसेवा व समुदायाधारित नर्सिंग.',
      icon: 'fa-clinic-medical',
      emoji: '🏘️',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      titleEn: 'Rural Public Health (RPH)',
      titleMr: 'Rural Public Health (RPH)',
      descEn: 'Rural public health services, primary health center (PHC) operations, preventive community care, and grassroots health awareness.',
      descMr: 'ग्रामीण भागातील सार्वजनिक आरोग्य सेवा, समुदाय आरोग्य कार्यक्रम, प्रतिबंधात्मक सेवा व आरोग्य जनजागृतीचा अनुभव.',
      icon: 'fa-tree',
      emoji: '🌳',
      color: '#15803d',
      bgLight: '#f0fdf4',
    },
    {
      titleEn: 'Urban Public Health (UPH)',
      titleMr: 'Urban Public Health (UPH)',
      descEn: 'Urban healthcare post services, urban epidemiological outreach, community health assessments, and municipal public health campaigns.',
      descMr: 'शहरी समुदायातील आरोग्यसेवा, आरोग्यविषयक जनजागृती, समुदाय मूल्यांकन व सार्वजनिक आरोग्य उपक्रम.',
      icon: 'fa-city',
      emoji: '🏙️',
      color: '#0369a1',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Emergency Nursing',
      titleMr: 'Emergency Nursing',
      descEn: 'First aid, casualty triage, emergency room rapid response, vital signs stabilization, and immediate trauma care protocols.',
      descMr: 'प्रथमोपचार, आपत्कालीन परिस्थितीतील प्राथमिक नर्सिंग सेवा, रुग्ण निरीक्षण व तातडीच्या काळजीची समज.',
      icon: 'fa-ambulance',
      emoji: '🚑',
      color: '#dc2626',
      bgLight: '#fee2e2',
    },
    {
      titleEn: 'Critical Care Exposure',
      titleMr: 'Critical Care Exposure',
      descEn: 'Intensive care patient monitoring, multi-parameter telemetry, ventilator management, safe patient care, and infection prevention.',
      descMr: 'गंभीर रुग्णांचे निरीक्षण, मॉनिटरिंग, सुरक्षित रुग्णसेवा व संक्रमण नियंत्रण पद्धती.',
      icon: 'fa-heartbeat',
      emoji: '❤️',
      color: '#b91c1c',
      bgLight: '#fef2f2',
    },
    {
      titleEn: 'Geriatric Nursing',
      titleMr: 'Geriatric Nursing',
      descEn: 'Comprehensive geriatric assessment, chronic illness management, dignified bedside assistance, and elderly support services.',
      descMr: 'वृद्ध रुग्णांचे मूल्यांकन, दीर्घकालीन आजारांची काळजी व सहाय्यक नर्सिंग सेवा.',
      icon: 'fa-blind',
      emoji: '🧓',
      color: '#78350f',
      bgLight: '#fef3c7',
    },
    {
      titleEn: 'Fundamentals of Nursing',
      titleMr: 'Fundamentals of Nursing',
      descEn: 'Vital signs monitoring, personal hygiene, patient positioning, mobility, aseptic technique, and core clinical procedures.',
      descMr: 'Vital Signs, Personal Hygiene, Positioning, Mobility, Aseptic Technique आणि मूलभूत नर्सिंग प्रक्रिया.',
      icon: 'fa-band-aid',
      emoji: '🩹',
      color: '#d97706',
      bgLight: '#fffbeb',
    },
    {
      titleEn: 'Medication Care & Administration',
      titleMr: 'औषधोपचार व Medication Care',
      descEn: 'Safe medication administration (Rights of Medication), dosage verification, patient monitoring, and pharmacological accountability.',
      descMr: 'औषध प्रशासनातील सुरक्षितता, रुग्ण निरीक्षण व औषधोपचाराशी संबंधित नर्सिंग जबाबदाऱ्या.',
      icon: 'fa-pills',
      emoji: '💊',
      color: '#2563eb',
      bgLight: '#eff6ff',
    },
    {
      titleEn: 'Infection Prevention & Control',
      titleMr: 'Infection Prevention & Control',
      descEn: 'WHO Hand hygiene protocols, standard precautions, PPE compliance, infection containment, and biomedical waste management.',
      descMr: 'Hand Hygiene, Standard Precautions, PPE, संक्रमण प्रतिबंध व Biomedical Waste Management.',
      icon: 'fa-shield-virus',
      emoji: '🦠',
      color: '#059669',
      bgLight: '#ecfdf5',
    },
    {
      titleEn: 'Patient Assessment & Care Planning',
      titleMr: 'Patient Assessment & Care Planning',
      descEn: 'Patient history taking, physical examination, nursing diagnoses formulation, customized care plans, intervention, and evaluation.',
      descMr: 'रुग्ण इतिहास, शारीरिक मूल्यांकन, Nursing Diagnosis, Care Plan, Intervention व Evaluation.',
      icon: 'fa-clipboard-list',
      emoji: '📋',
      color: '#4f46e5',
      bgLight: '#eef2ff',
    },
    {
      titleEn: 'Clinical Documentation',
      titleMr: 'Clinical Documentation',
      descEn: 'Nursing records, patient case sheets, shift handover notes, clinical logs, and medico-legal documentation accuracy.',
      descMr: 'Nursing Records, Case Sheets, Care Plans, Reports आणि व्यावसायिक दस्तऐवजीकरण.',
      icon: 'fa-file-signature',
      emoji: '📝',
      color: '#0891b2',
      bgLight: '#ecfeff',
    },
    {
      titleEn: 'Patient & Family Education',
      titleMr: 'Patient & Family Education',
      descEn: 'Empathetic patient counseling, family health teaching, post-discharge instructions, and wellness lifestyle guidance.',
      descMr: 'रुग्ण व कुटुंबीयांना आरोग्य शिक्षण, समुपदेशन, उपचार व डिस्चार्ज मार्गदर्शन.',
      icon: 'fa-user-friends',
      emoji: '👨‍👩‍👧',
      color: '#8b5cf6',
      bgLight: '#f5f3ff',
    },
    {
      titleEn: 'Health Promotion & Disease Prevention',
      titleMr: 'Health Promotion & Disease Prevention',
      descEn: 'Health screening camps, preventive vaccination campaigns, lifestyle disease awareness, and community wellness promotion.',
      descMr: 'आरोग्य तपासणी, जनजागृती, आरोग्य संवर्धन व रोगप्रतिबंधक उपक्रम.',
      icon: 'fa-seedling',
      emoji: '🌿',
      color: '#10b981',
      bgLight: '#d1fae5',
    },
    {
      titleEn: 'Palliative & Supportive Care',
      titleMr: 'Palliative & Supportive Care',
      descEn: 'Compassionate comfort care, pain symptom alleviation, psychological and emotional dignity for chronically ill patients.',
      descMr: 'दीर्घकालीन व गंभीर आजार असलेल्या रुग्णांसाठी आरामदायी, संवेदनशील व सन्मानपूर्वक काळजी.',
      icon: 'fa-dove',
      emoji: '🕊️',
      color: '#6366f1',
      bgLight: '#e0e7ff',
    },
    {
      titleEn: 'Rehabilitation Nursing',
      titleMr: 'Rehabilitation Nursing',
      descEn: 'Restorative patient care, mobility and ADL training, physical therapy assistance, and continuity of care toward independence.',
      descMr: 'रुग्णांच्या पुनर्वसन प्रक्रियेत नर्सिंग भूमिका, हालचाल, स्वावलंबन व सातत्यपूर्ण काळजी.',
      icon: 'fa-wheelchair',
      emoji: '♿',
      color: '#d97706',
      bgLight: '#fef3c7',
    },
    {
      titleEn: 'Multidisciplinary Clinical Exposure',
      titleMr: 'Multidisciplinary Clinical Exposure',
      descEn: 'Collaborative team practice alongside doctors, senior nursing officers, clinical technicians, and allied healthcare professionals.',
      descMr: 'डॉक्टर, नर्सेस, तंत्रज्ञ व इतर आरोग्यसेवा व्यावसायिकांसोबत समन्वयाने काम करण्याचा अनुभव.',
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

  // Hostel 10 points
  const hostelFeaturesEn = [
    { title: 'Comfortable & Well-Maintained Rooms', icon: 'fa-bed' },
    { title: 'Safe & Secure Campus Environment with 24/7 Security', icon: 'fa-shield-alt' },
    { title: 'Dedicated Resident Warden & Vigilant Supervision', icon: 'fa-user-shield' },
    { title: 'Peaceful Study-Friendly Environment', icon: 'fa-book-reader' },
    { title: 'Hygienic, Nutritious Food & Dining Facility', icon: 'fa-utensils' },
    { title: 'Continuous Clean & Purified RO Drinking Water', icon: 'fa-tint' },
    { title: 'Reliable Electricity & Backup Inverter Facility', icon: 'fa-bolt' },
    { title: 'Clean & Daily Sanitized Living Premises', icon: 'fa-broom' },
    { title: 'Friendly, Caring & Supportive Community', icon: 'fa-hands-helping' },
    { title: 'Peaceful, Disciplined Living Atmosphere', icon: 'fa-spa' },
  ];

  const hostelFeaturesMr = [
    { title: 'आरामदायी व सुस्थितीत सुसज्ज खोल्या', icon: 'fa-bed' },
    { title: 'सुरक्षित व २४ तास संरक्षित निवास व्यवस्था', icon: 'fa-shield-alt' },
    { title: 'अनुभवी वॉर्डनचे मार्गदर्शन व सतत देखरेख', icon: 'fa-user-shield' },
    { title: 'अभ्यासासाठी शांत व अनुकूल वातावरण', icon: 'fa-book-reader' },
    { title: 'स्वच्छ, ताजे व पौष्टिक भोजनाची मेस सुविधा', icon: 'fa-utensils' },
    { title: 'स्वच्छ व शुद्ध (RO) पिण्याच्या पाण्याची सोय', icon: 'fa-tint' },
    { title: 'अखंड वीज पुरवठा व मूलभूत सोयीसुविधा', icon: 'fa-bolt' },
    { title: 'दररोज स्वच्छ व आरोग्यदायी राखलेला परिसर', icon: 'fa-broom' },
    { title: 'आपुलकीचे, सुरक्षित व सहकार्यपूर्ण वातावरण', icon: 'fa-hands-helping' },
    { title: 'शांत, शिस्तबद्ध व विद्यार्थीपूरक निवास व्यवस्था', icon: 'fa-spa' },
  ];

  // Scholarship 5 points
  const scholarshipFeaturesEn = [
    { title: 'Information & Comprehensive Guidance on Government Scholarship Schemes', icon: 'fa-info-circle' },
    { title: 'Full Step-by-Step Assistance with the Online MahaDBT Application Process', icon: 'fa-laptop' },
    { title: 'Detailed Guidance Regarding All Mandatory Verification Documents', icon: 'fa-file-alt' },
    { title: 'Category-wise Eligibility Verification as per Latest Government Resolutions', icon: 'fa-university' },
    { title: 'Personalized Support & Proactive Assistance for Students and Parents', icon: 'fa-handshake' },
  ];

  const scholarshipFeaturesMr = [
    { title: 'विविध शासकीय शिष्यवृत्ती योजनांची सविस्तर माहिती व मार्गदर्शन', icon: 'fa-info-circle' },
    { title: 'MahaDBT ऑनलाईन अर्ज प्रक्रियेसाठी महाविद्यालयामार्फत थेट सहाय्य', icon: 'fa-laptop' },
    { title: 'आवश्यक कागदपत्रे व प्रमाणपत्रांबाबत अचूक मार्गदर्शन', icon: 'fa-file-alt' },
    { title: 'प्रवर्गनिहाय शासकीय योजनांनुसार पात्रता पडताळणीची सोय', icon: 'fa-university' },
    { title: 'विद्यार्थी व पालकांना अर्ज मंजुरीपर्यंत आवश्यक ते सर्व सहकार्य', icon: 'fa-handshake' },
  ];

  const hostelList = isMr ? hostelFeaturesMr : hostelFeaturesEn;
  const scholarshipList = isMr ? scholarshipFeaturesMr : scholarshipFeaturesEn;

  return (
    <main className="page-main">
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1 className="banner-title">
            {isMr ? 'महाविद्यालयीन सुविधा' : 'Campus Facilities'}
          </h1>
          <nav className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> /{' '}
            <span>{isMr ? 'सुविधा' : 'Facilities'}</span>
          </nav>
        </div>
      </section>

      <section className="page-content container section-padding" style={{ padding: '60px 0' }}>
        {/* Intro Header matching exact user message */}
        <div className="intro-text text-center" style={{ maxWidth: '880px', margin: '0 auto 50px' }}>
          <span className="section-pill-tag" style={{ marginBottom: '14px', display: 'inline-block' }}>
            {isMr ? '🌟 महाविद्यालयीन सुविधा' : '🌟 FACILITIES'}
          </span>
          <h2 className="section-title" style={{ fontSize: '2.3rem', color: '#0d3b66', margin: '0 0 14px' }}>
            {isMr
              ? 'उत्तम शिक्षणासाठी आधुनिक आणि विद्यार्थी-केंद्रित सुविधा'
              : 'A Modern Campus for Better Nursing Education'}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.8', margin: '0 auto 20px' }}>
            {isMr ? (
              <>
                <strong>समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर</strong> येथे विद्यार्थ्यांना दर्जेदार शैक्षणिक शिक्षणासोबतच <em>प्रात्यक्षिक प्रशिक्षण, क्लिनिकल अनुभव, कौशल्य विकास आणि सर्वांगीण व्यक्तिमत्त्व विकासासाठी</em> आवश्यक सुविधा उपलब्ध करून देण्यावर भर दिला जातो.
              </>
            ) : (
              <>
                <strong>Samarth College of Nursing, Sangamner</strong> provides a supportive academic environment where students receive <em>quality classroom education, practical skill training, clinical exposure and opportunities for overall development</em>.
              </>
            )}
          </p>
          <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="#campus-grid"
              style={{
                backgroundColor: '#0d3b66',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.88rem',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-th-large" style={{ marginRight: '6px', color: '#ffb703' }}></i>
              {isMr ? '१७ कॅम्पस सुविधा' : '17 Campus Facilities'}
            </a>
            <a
              href="#clinical"
              style={{
                backgroundColor: '#dc2626',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.88rem',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-hospital-alt" style={{ marginRight: '6px' }}></i>
              {isMr ? 'क्लिनिकल अनुभव' : 'Clinical Experience'}
            </a>
            <a
              href="#hostel"
              style={{
                backgroundColor: '#0284c7',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.88rem',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-hotel" style={{ marginRight: '6px' }}></i>
              {isMr ? 'वसतिगृह' : 'Hostel'}
            </a>
            <a
              href="#scholarship"
              style={{
                backgroundColor: '#1a9988',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.88rem',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-graduation-cap" style={{ marginRight: '6px' }}></i>
              {isMr ? 'शिष्यवृत्ती' : 'Scholarship'}
            </a>
          </div>
        </div>

        {/* ========================================================
            1. 17 CAMPUS FACILITIES GRID
            ======================================================== */}
        <div id="campus-grid" style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ color: '#0d3b66', fontSize: '1.7rem', margin: 0 }}>
                <i className="fas fa-university" style={{ color: '#ffb703', marginRight: '10px' }}></i>
                {isMr ? 'आमच्या कॅम्पस सुविधा' : 'Our Campus Facilities'}
              </h3>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.95rem' }}>
                {isMr ? 'आरोग्य शिक्षणासाठी आवश्यक असणाऱ्या १७ प्रमुख पायाभूत सुविधा' : 'Comprehensive 17-point amenities built for world-class nursing education'}
              </p>
            </div>
            <span style={{ backgroundColor: '#eef8f6', color: '#1a9988', padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.88rem', border: '1px solid #c8e6e1' }}>
              {isMr ? '१७ आधुनिक सुविधा' : '17 Key Amenities'}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {campusFacilities.map((facility, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  padding: '22px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: facility.bgLight,
                      color: facility.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fas ${facility.icon}`}></i>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>
                      #{idx + 1}
                    </span>
                    <h4 style={{ color: '#0d3b66', fontSize: '1.05rem', margin: 0, lineHeight: '1.3' }}>
                      {isMr ? facility.titleMr : facility.titleEn}
                    </h4>
                  </div>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                  {isMr ? facility.descMr : facility.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            2. CLINICAL EXPERIENCE & FACILITIES (क्लिनिकल अनुभव व सुविधा)
            ======================================================== */}
        <div
          id="clinical"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
            marginBottom: '50px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '30px 36px',
              backgroundColor: '#0d3b66',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                <span
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: '#ffb703',
                    color: '#0d3b66',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  <i className="fas fa-hospital-alt"></i>
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '1.8rem', margin: 0 }}>
                  {isMr ? '🏥 विविध क्षेत्रांतील क्लिनिकल अनुभव' : '🏥 Comprehensive Clinical Exposure Across Specialties'}
                </h3>
              </div>
              <p style={{ margin: 0, color: '#93c5fd', fontSize: '1.05rem', fontStyle: 'italic' }}>
                {isMr
                  ? 'प्रत्यक्ष अनुभवातून उत्कृष्ट नर्सिंग कौशल्याकडे'
                  : 'Comprehensive Clinical Exposure • Practical Learning • Professional Excellence'}
              </p>
            </div>

            <span
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '700',
              }}
            >
              {isMr ? '२० विशेष क्लिनिकल क्षेत्रे' : '20 CLINICAL ROTATIONS'}
            </span>
          </div>

          <div style={{ padding: '36px' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', marginBottom: '28px' }}>
              {isMr ? (
                <>
                  <strong>समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर</strong> येथे विद्यार्थ्यांना केवळ पुस्तकी ज्ञान न देता विविध आरोग्यसेवा क्षेत्रांमध्ये <em>व्यवस्थित, प्रत्यक्ष व मार्गदर्शित क्लिनिकल अनुभव</em> दिला जातो. विविध विभागांमधील प्रशिक्षणामुळे विद्यार्थ्यांमध्ये <em>क्लिनिकल कौशल्य, आत्मविश्वास, चिकित्सक विचार, रुग्णसेवेची भावना आणि व्यावसायिक क्षमता</em> विकसित होण्यास मदत होते.
                </>
              ) : (
                <>
                  At <strong>Samarth College of Nursing, Sangamner</strong>, we believe that excellence in nursing is built through <em>knowledge, practice, experience and compassion</em>. Our clinical learning approach provides students with broad exposure to different specialties, healthcare settings and patient-care situations, helping them progressively develop professional competence and confidence.
                </>
              )}
            </p>

            {/* 20 Clinical Specialty Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '20px',
                marginBottom: '35px',
              }}
            >
              {clinicalSpecialties.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    borderTop: `4px solid ${item.color}`,
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        backgroundColor: item.bgLight,
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        flexShrink: 0,
                      }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8' }}>
                        #{idx + 1} {item.emoji}
                      </span>
                      <h4 style={{ color: '#0d3b66', fontSize: '1.02rem', margin: 0, lineHeight: '1.3' }}>
                        {isMr ? item.titleMr : item.titleEn}
                      </h4>
                    </div>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                    {isMr ? item.descMr : item.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* ========================================================
                CLINICAL LEARNING MANTRA (आमचा क्लिनिकल लर्निंग मंत्र)
                ======================================================== */}
            <div
              style={{
                marginTop: '30px',
                padding: '32px',
                background: 'linear-gradient(135deg, #0d3b66 0%, #1a5276 100%)',
                borderRadius: '16px',
                color: '#ffffff',
                boxShadow: '0 8px 25px rgba(13, 59, 102, 0.15)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(255, 183, 3, 0.2)',
                    color: '#ffb703',
                    padding: '4px 16px',
                    borderRadius: '20px',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    marginBottom: '10px',
                    border: '1px solid rgba(255, 183, 3, 0.4)',
                  }}
                >
                  {isMr ? '💙 आमचा क्लिनिकल लर्निंग मंत्र' : '💙 Our Clinical Learning Mantra'}
                </span>
                <h4 style={{ color: '#ffffff', fontSize: '1.35rem', margin: '6px 0 10px', letterSpacing: '0.5px' }}>
                  {isMr
                    ? 'निरीक्षण ➔ मूल्यांकन ➔ नियोजन ➔ प्रत्यक्ष कृती ➔ मूल्यमापन ➔ दस्तऐवजीकरण'
                    : 'Observation ➔ Assessment ➔ Planning ➔ Intervention ➔ Evaluation ➔ Documentation'}
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: 0 }}>
                  {isMr
                    ? 'शास्त्रीय, सुरक्षित व परिणामकारक रुग्णसेवेसाठीची ६-स्तरीय कार्यपद्धती'
                    : 'The 6-stage scientific workflow for compassionate, evidence-based bedside nursing'}
                </p>
              </div>

              {/* 6 Step Cards Flow */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '12px',
                  marginBottom: '25px',
                }}
              >
                {clinicalMantraSteps.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      padding: '16px 10px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#ffb703',
                        color: '#0d3b66',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                      }}
                    >
                      {m.step}
                    </div>
                    <div style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#ffb703' }}>
                      <i className={`fas ${m.icon}`}></i>
                    </div>
                    <h5 style={{ color: '#ffffff', margin: '0 0 4px', fontSize: '0.92rem', fontWeight: '700' }}>
                      {isMr ? m.titleMr : m.titleEn}
                    </h5>
                    <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
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
                  padding: '16px 22px',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  color: '#fef08a',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                {isMr ? (
                  <>
                    “वर्गातील ज्ञानाचे रूपांतर प्रत्यक्ष कौशल्यात आणि कौशल्याचे रूपांतर उत्कृष्ट रुग्णसेवेत — हीच आमच्या क्लिनिकल शिक्षणाची दिशा.”
                  </>
                ) : (
                  <>
                    “Transforming classroom knowledge into practical skills, and practical skills into compassionate patient care — this is our direction of clinical education.”
                  </>
                )}
              </div>

              {/* Learn • Practise • Experience • Care • Excel Ribbon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  padding: '12px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  marginBottom: '16px',
                }}
              >
                {(isMr
                  ? ['Learn • शिकणे', 'Practise • सराव', 'Experience • अनुभव', 'Care • सेवा', 'Excel • उत्कृष्टता']
                  : ['Learn', 'Practise', 'Experience', 'Care', 'Excel']
                ).map((pill, pIdx) => (
                  <span
                    key={pIdx}
                    style={{
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      color: pIdx === 3 || pIdx === 4 ? '#ffb703' : '#ffffff',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {pill} {pIdx < 4 && <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '6px' }}>•</span>}
                  </span>
                ))}
              </div>

              {/* College Commitment Tagline */}
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  color: '#e2e8f0',
                  fontWeight: '500',
                  lineHeight: '1.6',
                }}
              >
                {isMr ? (
                  <>
                    <strong style={{ color: '#ffb703' }}>समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर</strong> — कौशल्यपूर्ण, आत्मविश्वासू आणि संवेदनशील नर्सिंग व्यावसायिक घडविण्याच्या दिशेने एक सक्षम पाऊल.
                  </>
                ) : (
                  <>
                    <strong style={{ color: '#ffb703' }}>Samarth College of Nursing, Sangamner</strong> — An empowering step toward shaping skilled, confident, and compassionate nursing healthcare professionals.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. HOSTEL FACILITY (DETAILED SECTION)
            ======================================================== */}
        <div
          id="hostel"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
            marginBottom: '45px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '30px 36px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                <span
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  <i className="fas fa-hotel"></i>
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '1.8rem', margin: 0 }}>
                  {isMr ? 'वसतिगृह सुविधा (Hostel Facility)' : 'Hostel Facility'}
                </h3>
              </div>
              <p style={{ margin: 0, color: '#e0f2fe', fontSize: '1.05rem', fontStyle: 'italic' }}>
                {isMr
                  ? 'सुरक्षित, आरामदायी आणि आपलेसे घर… घरापासून दूर असलेले आपले दुसरे घर!'
                  : 'A Safe & Comfortable Home Away From Home'}
              </p>
            </div>

            <span
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '700',
              }}
            >
              {isMr ? '१० ठळक वैशिष्ट्ये' : '10 KEY HIGHLIGHTS'}
            </span>
          </div>

          <div style={{ padding: '36px' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', marginBottom: '28px' }}>
              {isMr
                ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे विद्यार्थ्यांच्या सुरक्षितता, आराम आणि सर्वांगीण विकासाचा विचार करून स्वच्छ, सुरक्षित, शिस्तबद्ध आणि विद्यार्थीपूरक वसतिगृह सुविधा उपलब्ध आहे. विद्यार्थिनींना कुटुंबाप्रमाणे सुरक्षित आणि अभ्यासासाठी प्रेरणादायी वातावरण लाभते.'
                : 'At Samarth College of Nursing, Sangamner, we understand that a comfortable living environment is an important part of a student’s academic journey. Our hostel facility is thoughtfully designed to provide students with a safe, peaceful, hygienic, and thoroughly student-friendly atmosphere.'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              {hostelList.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: '#e0f2fe',
                      color: '#0284c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span style={{ fontSize: '0.96rem', color: '#1e293b', fontWeight: '500' }}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundColor: '#eef8f6',
                borderLeft: '4px solid #1a9988',
                padding: '18px 24px',
                borderRadius: '0 10px 10px 0',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontWeight: '700', fontSize: '1.15rem', color: '#0d3b66' }}>
                {isMr
                  ? '💙 तुमची सुरक्षितता • तुमचा आराम • तुमचे दुसरे घर 💙'
                  : '💙 Your Safety • Your Comfort • Your Second Home 💙'}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. SCHOLARSHIP FACILITY (DETAILED SECTION)
            ======================================================== */}
        <div
          id="scholarship"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
            marginBottom: '45px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '30px 36px',
              backgroundColor: '#1a9988',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                <span
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    color: '#1a9988',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  <i className="fas fa-graduation-cap"></i>
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '1.8rem', margin: 0 }}>
                  {isMr ? 'शिष्यवृत्ती सुविधा (Scholarship Facility)' : 'Scholarship Facility'}
                </h3>
              </div>
              <p style={{ margin: 0, color: '#e6f7f4', fontSize: '1.05rem', fontStyle: 'italic' }}>
                {isMr
                  ? 'शिक्षणासाठी आर्थिक सहाय्याची संधी — उज्ज्वल भविष्यासाठी एक पाऊल!'
                  : 'Financial Support for Education — A Step Towards a Bright Future!'}
              </p>
            </div>

            <span
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '700',
              }}
            >
              {isMr ? 'शासकीय योजना मार्गदर्शन' : 'GOVT SCHEMES GUIDANCE'}
            </span>
          </div>

          <div style={{ padding: '36px' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', marginBottom: '28px' }}>
              {isMr
                ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे पात्र विद्यार्थ्यांना उपलब्ध शासकीय नियम व योजनांनुसार शिष्यवृत्ती व आर्थिक सहाय्याच्या सुविधेबाबत परिपूर्ण मार्गदर्शन केले जाते. आर्थिक कारणांमुळे कोणत्याही होतकरू विद्यार्थ्याचे शिक्षण थांबू नये यासाठी महाविद्यालय कटिबद्ध आहे.'
                : 'At Samarth College of Nursing, Sangamner, eligible students are provided with end-to-end guidance and support to avail scholarships and financial assistance as per applicable State and Central Government rules, schemes, and eligibility criteria.'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              {scholarshipList.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: '#e6f7f4',
                      color: '#1a9988',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span style={{ fontSize: '0.96rem', color: '#1e293b', fontWeight: '500' }}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundColor: '#fffbeb',
                borderLeft: '4px solid #f59e0b',
                padding: '18px 24px',
                borderRadius: '0 10px 10px 0',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontWeight: '700', fontSize: '1.15rem', color: '#92400e', fontStyle: 'italic' }}>
                {isMr
                  ? '“आर्थिक अडचणींमुळे शिक्षण थांबू नये, हीच आमची भूमिका.”'
                  : '“Financial Difficulties Should Never Stop a Student’s Education.”'}
              </p>
              <span style={{ display: 'block', fontSize: '0.88rem', color: '#b45309', marginTop: '6px' }}>
                {isMr
                  ? '*योग्य पात्रता आणि लागू शासकीय नियमांनुसार विद्यार्थ्यांना शिष्यवृत्ती सुविधेचा लाभ मिळवण्यासाठी आवश्यक मार्गदर्शन केले जाते.'
                  : '*Guidance provided strictly as per prevailing Social Welfare & Government Department norms.'}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            5. CLINICAL & LABS STRIP (CTA)
            ======================================================== */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#0d3b66', fontSize: '1.6rem', marginBottom: '12px' }}>
            {isMr ? 'प्रत्यक्ष क्लिनिकल व आधुनिक प्रयोगशाळा प्रशिक्षण' : 'Hospital Affiliations & Modern Sim Labs'}
          </h3>
          <p style={{ color: '#64748b', fontSize: '1.02rem', maxWidth: '750px', margin: '0 auto 24px' }}>
            {isMr
              ? 'विद्यार्थ्यांना अद्ययावत नर्सिंग फाउंडेशन लॅब, अ‍ॅनाटॉमी म्युझियम, कम्युनिटी हेल्थ लॅब, कॉम्प्युटर लॅब आणि नामांकित मल्टी-स्पेशालिटी रुग्णालयांमध्ये प्रत्यक्ष रुग्णसेवेचा अनुभव दिला जातो.'
              : 'Our advanced Nursing Foundation Labs, Anatomy Museum, CHN Lab, and tie-ups with leading multi-specialty hospitals ensure our students graduate with unparalleled clinical confidence.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              <i className="fas fa-phone-alt" style={{ marginRight: '8px' }}></i>
              {isMr ? 'अधिक माहितीसाठी संपर्क करा' : 'Inquire About Facilities'}
            </Link>
            <Link href="/gallery" className="btn btn-secondary">
              <i className="fas fa-images" style={{ marginRight: '8px' }}></i>
              {isMr ? 'कॅम्पस गॅलरी पहा' : 'View Campus Gallery'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
