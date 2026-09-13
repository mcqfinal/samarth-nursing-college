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

  // 6 Clinical Rotations & Experience
  const clinicalSpecialties = [
    {
      titleEn: 'Medical-Surgical Nursing Experience',
      titleMr: 'वैद्यकीय व शस्त्रक्रिया नर्सिंग अनुभव',
      descEn: 'Medical wards, surgical wards, bedside nursing, patient assessment, pre-operative and post-operative care.',
      descMr: 'वैद्यकीय व शस्त्रक्रिया वॉर्ड, थेट रुग्ण शुश्रूषा, रुग्ण तपासणी आणि शस्त्रक्रियापूर्व व शस्त्रक्रियेनंतरची अद्ययावत काळजी.',
      icon: 'fa-user-md',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Mental Health Nursing Experience',
      titleMr: 'मानसोपचार नर्सिंग अनुभव',
      descEn: 'Psychiatric assessment, therapeutic communication, rehabilitation, and compassionate mental healthcare.',
      descMr: 'मानसोपचार मूल्यांकन, उपचारात्मक संवाद (थेरप्युटिक कम्युनिकेशन), मानसिक आजारांवरील उपचार व पुनर्वसन.',
      icon: 'fa-brain',
      color: '#9333ea',
      bgLight: '#f3e8ff',
    },
    {
      titleEn: 'Pediatric / Child Health Nursing',
      titleMr: 'बाल आरोग्य व बालरोग नर्सिंग अनुभव',
      descEn: 'Neonatal care, pediatric wards, immunization protocols, nutritional assessment, and pediatric emergencies.',
      descMr: 'नवजात शिशु कक्ष (NICU), बालरोग वॉर्ड, बाल पोषण, प्रतिबंधात्मक लसीकरण आणि बालरोग उपचार पद्धती.',
      icon: 'fa-baby',
      color: '#ea580c',
      bgLight: '#ffedd5',
    },
    {
      titleEn: 'Obstetrics & Gynaecological Nursing',
      titleMr: 'प्रसूती व स्त्रीरोग नर्सिंग अनुभव',
      descEn: 'Antenatal care, intranatal labor room training, postnatal care, and newborn resuscitation.',
      descMr: 'प्रसूतीपूर्व तपासणी, लेबर रूम प्रशिक्षण, प्रसूतीनंतरची माता व नवजात बाळ शुश्रूषा आणि स्त्रीरोग उपचार.',
      icon: 'fa-female',
      color: '#e11d48',
      bgLight: '#ffe4e6',
    },
    {
      titleEn: 'Community Health Nursing Experience',
      titleMr: 'सामुदायिक आरोग्य नर्सिंग अनुभव',
      descEn: 'Rural and urban primary health centers, home visits, community health surveying, and disease prevention education.',
      descMr: 'ग्रामीण व शहरी प्राथमिक आरोग्य केंद्रे (PHC), कौटुंबिक आरोग्य सर्वेक्षण, लसीकरण आणि सार्वजनिक आरोग्य जनजागृती.',
      icon: 'fa-clinic-medical',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      titleEn: 'Critical Care & Emergency Nursing',
      titleMr: 'अतिदक्षता व आपत्कालीन नर्सिंग अनुभव',
      descEn: 'Intensive Care Units (ICU/ICCU), casualty triage, trauma response, ventilator care, and emergency resuscitation.',
      descMr: 'अतिदक्षता विभाग (ICU/ICCU), कॅज्युअल्टी, अपघात विभाग, व्हेंटिलेटर केअर आणि तत्काळ जीवनरक्षक प्रथमोपचार.',
      icon: 'fa-ambulance',
      color: '#dc2626',
      bgLight: '#fee2e2',
    },
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
                  {isMr ? '🏥 क्लिनिकल अनुभव व सुविधा' : '🏥 Clinical Experience & Facilities'}
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
              {isMr ? '६ विशेष क्लिनिकल क्षेत्रे' : '6 CLINICAL ROTATIONS'}
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

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
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
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: item.bgLight,
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.15rem',
                        flexShrink: 0,
                      }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <h4 style={{ color: '#0d3b66', fontSize: '1.05rem', margin: 0, lineHeight: '1.3' }}>
                      {isMr ? item.titleMr : item.titleEn}
                    </h4>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                    {isMr ? item.descMr : item.descEn}
                  </p>
                </div>
              ))}
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
