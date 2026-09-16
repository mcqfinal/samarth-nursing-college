'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function HostelFacilityPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cmsData } = usePageContent('facilities-hostel');

  const hostelFeaturesEn = [
    { title: 'Comfortable & Well-Maintained Rooms', desc: 'Well-ventilated, spacious rooms with individual bed, study table, chair, and personal storage wardrobe.', icon: 'fa-bed', color: '#0284c7', bg: '#e0f2fe' },
    { title: 'Safe & Secure Campus Environment with 24/7 Security', desc: 'Round-the-clock security personnel, gated entry verification, and CCTV surveillance throughout.', icon: 'fa-shield-alt', color: '#dc2626', bg: '#fee2e2' },
    { title: 'Dedicated Resident Warden & Vigilant Supervision', desc: 'Full-time experienced resident warden available on-campus to ensure discipline, safety, and student care.', icon: 'fa-user-shield', color: '#7c3aed', bg: '#ede9fe' },
    { title: 'Peaceful Study-Friendly Environment', desc: 'Dedicated reading rooms and quiet hours in evenings to facilitate concentrated academic study.', icon: 'fa-book-reader', color: '#16a34a', bg: '#dcfce7' },
    { title: 'Hygienic, Nutritious Food & Dining Facility', desc: 'Clean dining hall serving wholesome, freshly prepared, balanced vegetarian breakfast, lunch, and dinner.', icon: 'fa-utensils', color: '#ea580c', bg: '#ffedd5' },
    { title: 'Continuous Clean & Purified RO Drinking Water', desc: 'Multi-stage Industrial RO water filtration stations with cold water coolers installed on each floor.', icon: 'fa-tint', color: '#0891b2', bg: '#ecfeff' },
    { title: 'Reliable Electricity & Backup Inverter Facility', desc: '24-hour power backup inverter/generator system ensuring continuous lighting and fans.', icon: 'fa-bolt', color: '#d97706', bg: '#fef3c7' },
    { title: 'Clean & Daily Sanitized Living Premises', desc: 'Daily housekeeping staff sanitizing corridors, rooms, common areas, and modern washrooms.', icon: 'fa-broom', color: '#059669', bg: '#d1fae5' },
    { title: 'Friendly, Caring & Supportive Community', desc: 'Encouraging senior-junior bonding under strict anti-ragging guidelines creating a warm home atmosphere.', icon: 'fa-hands-helping', color: '#2563eb', bg: '#dbeafe' },
    { title: 'Peaceful, Disciplined Living Atmosphere', desc: 'Structured daily routine, evening prayer/assembly, and well-managed recreational lounge.', icon: 'fa-spa', color: '#9333ea', bg: '#f3e8ff' },
  ];

  const hostelFeaturesMr = [
    { title: 'आरामदायी व सुस्थितीत सुसज्ज खोल्या', desc: 'हवेशीर व प्रशस्त खोल्या, स्वतंत्र कॉट, अभ्यास टेबल, खुर्ची आणि वैयक्तिक कपाटाची उत्तम सोय.', icon: 'fa-bed', color: '#0284c7', bg: '#e0f2fe' },
    { title: 'सुरक्षित व २४ तास संरक्षित निवास व्यवस्था', desc: 'प्रशिक्षित सुरक्षारक्षक, प्रवेशद्वारावर कडक नोंदणी आणि संपूर्ण परिसरात २४ तास सीसीटीव्ही नजर.', icon: 'fa-shield-alt', color: '#dc2626', bg: '#fee2e2' },
    { title: 'अनुभवी वॉर्डनचे मार्गदर्शन व सतत देखरेख', desc: 'विद्यार्थिनींच्या सुरक्षिततेसाठी आणि मार्गदर्शनासाठी २४ तास पूर्णवेळ निवासी वॉर्डनची उपस्थिती.', icon: 'fa-user-shield', color: '#7c3aed', bg: '#ede9fe' },
    { title: 'अभ्यासासाठी शांत व अनुकूल वातावरण', desc: 'एकाग्रतेने अभ्यास करण्यासाठी स्वतंत्र वाचन कक्ष, शांततेचे नियम आणि प्रेरणादायी वातावरण.', icon: 'fa-book-reader', color: '#16a34a', bg: '#dcfce7' },
    { title: 'स्वच्छ, ताजे व पौष्टिक भोजनाची मेस सुविधा', desc: 'रोज स्वच्छ किचनमध्ये बनवलेले ताजे, पौष्टिक व चवदार शुद्ध शाकाहारी भोजन आणि नाश्ता.', icon: 'fa-utensils', color: '#ea580c', bg: '#ffedd5' },
    { title: 'स्वच्छ व शुद्ध (RO) पिण्याच्या पाण्याची सोय', desc: 'आरोग्याच्या दृष्टीने आधुनिक आरओ (RO) शुद्ध व थंड पिण्याच्या पाण्याची प्रत्येक मजल्यावर सोय.', icon: 'fa-tint', color: '#0891b2', bg: '#ecfeff' },
    { title: 'अखंड वीज पुरवठा व मूलभूत सोयीसुविधा', desc: 'अखंड वीज पुरवठ्यासाठी इन्व्हर्टर व जनरेटर बॅकअप सुविधा, पुरेसा प्रकाश व पंख्यांची व्यवस्था.', icon: 'fa-bolt', color: '#d97706', bg: '#fef3c7' },
    { title: 'दररोज स्वच्छ व आरोग्यदायी राखलेला परिसर', desc: 'कर्मचाऱ्यांमार्फत वसतिगृहातील खोल्या, पॅसेज आणि स्वच्छतागृहांची दररोज निर्जंतुकीकरण व स्वच्छता.', icon: 'fa-broom', color: '#059669', bg: '#d1fae5' },
    { title: 'आपुलकीचे, सुरक्षित व सहकार्यपूर्ण वातावरण', desc: 'रॅगिंगमुक्त सुरक्षित कॅम्पस, मैत्रिपूर्ण सहजीवन आणि कुटुंबासारखा स्नेह व काळजी.', icon: 'fa-hands-helping', color: '#2563eb', bg: '#dbeafe' },
    { title: 'शांत, शिस्तबद्ध व विद्यार्थीपूरक निवास व्यवस्था', desc: 'निश्चित दिनचर्या, सुरक्षित हजेरी पद्धती आणि व्यक्तिमत्त्व विकासासाठी शिस्तबद्ध वातावरण.', icon: 'fa-spa', color: '#9333ea', bg: '#f3e8ff' },
  ];

  const hostelList = isMr ? hostelFeaturesMr : hostelFeaturesEn;

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. HERO HEADER */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d3b66 0%, #0284c7 100%)',
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
            <i className="fas fa-hotel"></i> {isMr ? (cmsData?.hero?.badgeMr || 'वसतिगृह सुविधा') : (cmsData?.hero?.badgeEn || 'HOSTEL FACILITY')}
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
            {isMr ? (cmsData?.hero?.titleMr || 'सुरक्षित व आरामदायी वसतिगृह') : (cmsData?.hero?.titleEn || 'Comfortable & Secure Hostel Facility')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#e0f2fe', margin: '0 auto 20px', lineHeight: 1.6, maxWidth: '780px' }}>
            {isMr
              ? (cmsData?.hero?.descMr || 'सुरक्षित, आरामदायी आणि आपलेसे घर… घरापासून दूर असलेले आपले दुसरे घर!')
              : (cmsData?.hero?.descEn || 'A Safe, Peaceful & Supportive Home Away From Home for Aspiring Healthcare Professionals')}
          </p>

          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <Link href="/facilities" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'सुविधा' : 'Facilities'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'वसतिगृह' : 'Hostel'}</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT CONTAINER */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          
          {/* Overview Statement Card */}
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
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-home"></i>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.05em' }}>
                  {isMr ? 'कॅम्पस निवास व्यवस्था' : 'CAMPUS RESIDENCE OVERVIEW'}
                </span>
                <h2 style={{ color: '#0d3b66', fontSize: '1.8rem', margin: '6px 0 14px', fontWeight: 800 }}>
                  {isMr ? 'विद्यार्थिनींसाठी सुरक्षित, स्नेहमयी व अभ्यासाभिमुख वातावरण' : 'Safe, Disciplined & Nurturing Atmosphere for Students'}
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', margin: 0 }}>
                  {isMr
                    ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे विद्यार्थ्यांच्या सुरक्षितता, आराम आणि सर्वांगीण विकासाचा विचार करून स्वच्छ, सुरक्षित, शिस्तबद्ध आणि विद्यार्थीपूरक वसतिगृह सुविधा उपलब्ध आहे. विद्यार्थिनींना कुटुंबाप्रमाणे सुरक्षित, अभ्यासासाठी प्रेरणादायी आणि आरोग्यदायी वातावरण लाभते. वसतिगृहात २४ तास सुरक्षारक्षक, सीसीटीव्ही देखरेख आणि निवासी वॉर्डन कार्यरत असतात.'
                    : 'At Samarth College of Nursing, Sangamner, we understand that a comfortable living environment is a vital part of a student’s academic success. Our hostel facility is thoughtfully designed to provide nursing students with a safe, peaceful, hygienic, and student-friendly atmosphere where they can rest, study, and grow together.'}
                </p>
              </div>
            </div>
          </div>

          {/* 10 Key Highlights Grid */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ color: '#0d3b66', fontSize: '1.7rem', margin: 0, fontWeight: 800 }}>
                  <i className="fas fa-star" style={{ color: '#ffb703', marginRight: '10px' }}></i>
                  {isMr ? 'वसतिगृहाची १० प्रमुख वैशिष्ट्ये' : '10 Key Highlights of Our Hostel'}
                </h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.95rem' }}>
                  {isMr ? 'विद्यार्थिनींच्या आरामदायी व सुरक्षित निवासासाठी परिपूर्ण व्यवस्था' : 'Designed to ensure student safety, hygiene, nutrition, and peaceful learning'}
                </p>
              </div>
              <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem' }}>
                {isMr ? '१० ठळक सोयीसुविधा' : '10 KEY AMENITIES'}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {hostelList.map((item, idx) => (
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
                        backgroundColor: item.bg,
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
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>#{idx + 1}</span>
                      <h4 style={{ margin: 0, color: '#0d3b66', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.35 }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Living, Dining, and Security 3-Column Highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '50px',
            }}
          >
            {/* Room Features */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '28px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '16px' }}>
                <i className="fas fa-door-open"></i>
              </div>
              <h4 style={{ color: '#0d3b66', fontSize: '1.25rem', margin: '0 0 10px', fontWeight: 700 }}>
                {isMr ? 'खोल्यांची व्यवस्था' : 'Room Amenities'}
              </h4>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', color: '#475569', fontSize: '0.93rem', lineHeight: 1.8 }}>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'हवेशीर, स्वच्छ व नैसर्गिक प्रकाशयुक्त खोल्या' : 'Spacious, well-ventilated rooms with windows'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'प्रत्येक विद्यार्थिनीस कॉट, गादी व कपाट' : 'Individual bed, mattress, and lockable wardrobe'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'स्वतंत्र अभ्यास टेबल व खुर्ची' : 'Dedicated study desk and chair'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'दररोज स्वच्छता व स्वच्छतागृहांचे निर्जंतुकीकरण' : 'Daily housekeeping & sanitized washrooms'}</li>
              </ul>
            </div>

            {/* Mess & Dining */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '28px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '16px' }}>
                <i className="fas fa-utensils"></i>
              </div>
              <h4 style={{ color: '#0d3b66', fontSize: '1.25rem', margin: '0 0 10px', fontWeight: 700 }}>
                {isMr ? 'मेस व सकस भोजन' : 'Dining & Nutrition'}
              </h4>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', color: '#475569', fontSize: '0.93rem', lineHeight: 1.8 }}>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'रोज ताजे, सकस व चवदार शुद्ध शाकाहारी जेवण' : 'Freshly prepared pure vegetarian meals'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'सकाळचा नाश्ता, दुपारचे व रात्रीचे जेवण' : 'Nutritious breakfast, lunch, and dinner'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'स्वच्छ किचन व स्टेनलेस स्टील भांडी' : 'Hygienic kitchen with modern stainless steel utensils'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'थंड व शुद्ध आरओ (RO) पिण्याचे पाणी' : 'Industrial RO purified drinking water stations'}</li>
              </ul>
            </div>

            {/* Safety & Vigilance */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '28px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '16px' }}>
                <i className="fas fa-user-shield"></i>
              </div>
              <h4 style={{ color: '#0d3b66', fontSize: '1.25rem', margin: '0 0 10px', fontWeight: 700 }}>
                {isMr ? 'सुरक्षा व शिस्त' : 'Safety & Code of Conduct'}
              </h4>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', color: '#475569', fontSize: '0.93rem', lineHeight: 1.8 }}>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? '२४ तास पूर्णवेळ निवासी महिला वॉर्डन' : '24/7 dedicated resident female warden'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'प्रवेशद्वारावर प्रशिक्षित सुरक्षारक्षक व रजिस्टर' : 'Security guards & mandatory sign-in gate register'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'कॅम्पसमध्ये सीसीटीव्ही कॅमेऱ्यांची नजर' : 'High-definition CCTV coverage in public zones'}</li>
                <li><i className="fas fa-check-circle" style={{ color: '#16a34a', marginRight: '8px' }}></i> {isMr ? 'कडक रॅगिंग प्रतिबंधक नियमावली' : 'Strict zero-tolerance Anti-Ragging policy'}</li>
              </ul>
            </div>
          </div>

          {/* Tagline Ribbon */}
          <div
            style={{
              backgroundColor: '#0284c7',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              color: '#ffffff',
              marginBottom: '50px',
              boxShadow: '0 8px 25px rgba(2, 132, 199, 0.18)',
            }}
          >
            <h3 style={{ margin: '0 0 6px', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              {isMr ? '💙 तुमची सुरक्षितता • तुमचा आराम • तुमचे दुसरे घर 💙' : '💙 Your Safety • Your Comfort • Your Second Home 💙'}
            </h3>
            <p style={{ margin: 0, color: '#e0f2fe', fontSize: '0.96rem' }}>
              {isMr
                ? 'समर्थ कॉलेज ऑफ नर्सिंग हॉस्टेलमध्ये विद्यार्थिनींना कौटुंबिक प्रेम आणि सुरक्षिततेची शाश्वती मिळते.'
                : 'Providing peace of mind to parents and an empowering living experience for every nursing student.'}
            </p>
          </div>

          {/* Hostel Admission & Helpdesk CTA */}
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
              {isMr ? 'वसतिगृह प्रवेश व चौकशीसाठी संपर्क' : 'Hostel Admission & Inquiries'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {isMr
                ? 'वसतिगृह जागा वाटप, नियम, मेस फी आणि प्रत्यक्ष वसतिगृह भेटीसाठी कॉलेजच्या कार्यालयीन वेळेत आमच्याशी संपर्क साधा.'
                : 'For room allocation, hostel rules, mess schedule, fee details, or booking a campus tour, please contact our administrative desk.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="tel:9689486570"
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
                <i className="fas fa-phone-alt" style={{ color: '#ffb703' }}></i> +91 96894 86570
              </a>
              <Link
                href="/admission"
                style={{
                  backgroundColor: '#e69500',
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
                <i className="fas fa-graduation-cap"></i> {isMr ? 'प्रवेश प्रक्रिया पहा' : 'Apply for Admission'}
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
