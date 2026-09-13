'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FacilitiesPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

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
      <section className="page-banner">
        <div className="container">
          <h1 className="banner-title">{isMr ? 'कॅम्पस सुविधा' : 'Our Facilities'}</h1>
          <nav className="breadcrumb">
            <Link href="/">{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> /{' '}
            <span>{isMr ? 'सुविधा' : 'Facilities'}</span>
          </nav>
        </div>
      </section>

      <section className="page-content container section-padding" style={{ padding: '60px 0' }}>
        <div className="intro-text text-center" style={{ maxWidth: '820px', margin: '0 auto 50px' }}>
          <span className="section-pill-tag" style={{ marginBottom: '14px', display: 'inline-block' }}>
            {isMr ? 'उत्कृष्ट पायाभूत सुविधा' : 'EXCELLENT CAMPUS INFRASTRUCTURE'}
          </span>
          <h2 className="section-title" style={{ fontSize: '2.2rem', color: '#0d3b66', margin: '0 0 16px' }}>
            {isMr ? 'विद्यार्थ्यांच्या सुरक्षिततेसाठी व प्रगतीसाठी सर्व सोयी' : 'Everything You Need to Excel & Thrive'}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7' }}>
            {isMr
              ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे विद्यार्थ्यांचा अभ्यास, सुरक्षित निवास आणि आर्थिक सक्षमीकरण या सर्व गोष्टींची अत्यंत काळजीपूर्वक व्यवस्था केली आहे.'
              : 'At Samarth College of Nursing, we provide modern, student-centric amenities that ensure safety, academic focus, comfortable living, and financial peace of mind.'}
          </p>
        </div>

        {/* 1. Hostel Facility */}
        <div
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
                  <i className="fas fa-hotel"></i>
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '1.8rem', margin: 0 }}>
                  {isMr ? 'वसतिगृह सुविधा (Hostel Facility)' : 'Hostel Facility'}
                </h3>
              </div>
              <p style={{ margin: 0, color: '#93c5fd', fontSize: '1.05rem', fontStyle: 'italic' }}>
                {isMr
                  ? 'सुरक्षित, आरामदायी आणि आपलेसे घर… घरापासून दूर असलेले आपले दुसरे घर!'
                  : 'A Safe & Comfortable Home Away From Home'}
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

        {/* 2. Scholarship Facility */}
        <div
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

        {/* 3. Clinical & Labs Strip */}
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
