'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageContent } from '@/hooks/usePageContent';

export default function ScholarshipFacilityPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const { content: cmsData } = usePageContent('facilities-scholarship');

  // 5 Core Guidance Points
  const scholarshipFeaturesEn = [
    {
      title: 'Information & Guidance on Government Scholarship Schemes',
      desc: 'Complete details on State and Central government scholarship schemes for nursing education.',
      icon: 'fa-info-circle',
      color: '#0284c7',
      bg: '#e0f2fe',
    },
    {
      title: 'Full Assistance with Online MahaDBT Application Process',
      desc: 'Dedicated college computer lab desk providing hands-on assistance during portal registration.',
      icon: 'fa-laptop',
      color: '#16a34a',
      bg: '#dcfce7',
    },
    {
      title: 'Detailed Scrutiny & Guidance on Mandatory Documents',
      desc: 'Pre-submission document verification to prevent application rejections or disbursement delays.',
      icon: 'fa-file-alt',
      color: '#9333ea',
      bg: '#f3e8ff',
    },
    {
      title: 'Category-wise Eligibility Verification as per Govt Resolutions',
      desc: 'Clear eligibility assessment for SC, ST, VJNT, OBC, SBC, EWS, EBC, and Minority categories.',
      icon: 'fa-university',
      color: '#ea580c',
      bg: '#ffedd5',
    },
    {
      title: 'Personalized Support for Students and Parents',
      desc: 'One-on-one helpdesk support until the final scholarship amount is credited to the student.',
      icon: 'fa-handshake',
      color: '#1a9988',
      bg: '#e6f7f4',
    },
  ];

  const scholarshipFeaturesMr = [
    {
      title: 'विविध शासकीय शिष्यवृत्ती योजनांची सविस्तर माहिती व मार्गदर्शन',
      desc: 'महाराष्ट्र शासन आणि केंद्र सरकारच्या नर्सिंग अभ्यासक्रमांसाठी उपलब्ध सर्व शिष्यवृत्ती योजनांची परिपूर्ण माहिती.',
      icon: 'fa-info-circle',
      color: '#0284c7',
      bg: '#e0f2fe',
    },
    {
      title: 'MahaDBT ऑनलाईन अर्ज प्रक्रियेसाठी महाविद्यालयामार्फत थेट सहाय्य',
      desc: 'महाविद्यालयाच्या संगणक लॅबमधून महाडीबीटी (MahaDBT) पोर्टलवर ऑनलाईन फॉर्म भरण्यासाठी तज्ज्ञांचे मार्गदर्शन.',
      icon: 'fa-laptop',
      color: '#16a34a',
      bg: '#dcfce7',
    },
    {
      title: 'आवश्यक कागदपत्रे व प्रमाणपत्रांबाबत अचूक पडताळणी',
      desc: 'अर्ज बाद होऊ नये यासाठी उत्पन्नाचा दाखला, जात प्रमाणपत्र इत्यादी आवश्यक सर्व कागदपत्रांची पूर्व तपासणी.',
      icon: 'fa-file-alt',
      color: '#9333ea',
      bg: '#f3e8ff',
    },
    {
      title: 'प्रवर्गनिहाय शासकीय योजनांनुसार पात्रता पडताळणीची सोय',
      desc: 'SC, ST, VJNT, OBC, SBC, EWS, EBC व अल्पसंख्याक प्रवर्गाच्या निकष व सवलतींनुसार अचूक मार्गदर्शन.',
      icon: 'fa-university',
      color: '#ea580c',
      bg: '#ffedd5',
    },
    {
      title: 'विद्यार्थी व पालकांना अर्ज मंजुरीपर्यंत आवश्यक ते सर्व सहकार्य',
      desc: 'अर्ज भरणे, कागदपत्रे जोडणे आणि शिष्यवृत्ती रक्कम विद्यार्थ्यांच्या खात्यात जमा होईपर्यंत निरंतर पाठपुरावा.',
      icon: 'fa-handshake',
      color: '#1a9988',
      bg: '#e6f7f4',
    },
  ];

  // Category Schemes
  const categorySchemes = [
    {
      categoryEn: 'SC / ST Category',
      categoryMr: 'अनुसुचित जाती (SC) / अनुसुचित जमाती (ST)',
      deptEn: 'Social Justice & Special Assistance / Tribal Development Dept',
      deptMr: 'समाजकल्याण विभाग / आदिवासी विकास विभाग',
      benefitEn: 'Full Tuition Fee Concession + Maintenance Allowance (Scholarship / Freeship as per norms)',
      benefitMr: '१००% शिक्षण शुल्क प्रतिपूर्ती व निर्वाह भत्ता (शासकीय नियमांनुसार)',
      icon: 'fa-award',
      color: '#0d3b66',
      badge: 'SC / ST',
    },
    {
      categoryEn: 'VJNT / OBC / SBC Category',
      categoryMr: 'विमुक्त जाती, भटक्या जमाती (VJNT), इतर मागासवर्ग (OBC), विशेष मागास प्रवर्ग (SBC)',
      deptEn: 'VJNT, OBC & SBC Welfare Department (Govt of Maharashtra)',
      deptMr: 'इतर मागास बहुजन कल्याण विभाग, महाराष्ट्र शासन',
      benefitEn: 'Tuition Fee Reimbursement & Exam Fee concession as per non-creamy layer criteria',
      benefitMr: 'नॉन-क्रिमिलेअर निकषानुसार शिक्षण शुल्क व परीक्षा शुल्क सवलत',
      icon: 'fa-users',
      color: '#16a34a',
      badge: 'OBC / VJNT',
    },
    {
      categoryEn: 'EBC / EWS (Open Category with Annual Income Limit)',
      categoryMr: 'आर्थिकदृष्ट्या दुर्बल घटक (EBC / EWS - खुला प्रवर्ग)',
      deptEn: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna',
      deptMr: 'राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना',
      benefitEn: '50% Tuition Fee Concession for eligible students with family income under ₹8 Lakhs',
      benefitMr: 'वार्षिक उत्पन्न रु. ८ लाखांच्या मर्यादेत असणाऱ्या पात्र विद्यार्थ्यांना ५०% शिक्षण शुल्क सवलत',
      icon: 'fa-hand-holding-usd',
      color: '#d97706',
      badge: 'EBC / EWS',
    },
    {
      categoryEn: 'Minority Communities (Muslim, Christian, Buddhist, Sikh, Jain, Parsi)',
      categoryMr: 'अल्पसंख्याक समुदाय (मुस्लिम, ख्रिश्चन, बौद्ध, शीख, जैन, पारशी)',
      deptEn: 'Minority Development Department (State & Central Govt Schemes)',
      deptMr: 'अल्पसंख्याक विकास विभाग (राज्य व केंद्र शासन योजना)',
      benefitEn: 'Merit-cum-Means Scholarship & State Post-Matric Minority Financial Aid',
      benefitMr: 'राज्य व केंद्र शासनाची मॅट्रिकोत्तर शिष्यवृत्ती व आर्थिक सहाय्य',
      icon: 'fa-star-and-crescent',
      color: '#7c3aed',
      badge: 'MINORITY',
    },
  ];

  // Mandatory Documents Checklist
  const mandatoryDocsEn = [
    'Domicile Certificate of Maharashtra State',
    'Current Financial Year Income Certificate (Tehsildar issued)',
    'Caste Certificate & Caste Validity (for reserved categories)',
    'Non-Creamy Layer Certificate (OBC / VJNT / SBC - valid for current year)',
    '10th & 12th Standard Marksheets & Passing Certificates',
    'Aadhaar Card (linked with Active Bank Savings Account and Mobile Number)',
    'Nationalized Bank Passbook (saving account with IFSC code)',
    'College Admission Allotment Letter & College Fee Receipt',
    'Ration Card copy (first and last page)',
    'Gap Certificate Affidavit (if applicable)',
  ];

  const mandatoryDocsMr = [
    'महाराष्ट्र राज्याचा अधिवास दाखला (Domicile Certificate)',
    'सक्षम अधिकाऱ्याचा (तहसीलदार) चालू आर्थिक वर्षाचा उत्पन्नाचा दाखला',
    'सक्षम प्राधिकरणाने दिलेले जात प्रमाणपत्र (Caste Certificate) व जात वैधता प्रमाणपत्र',
    'चालू वर्षासाठी वैध असलेले नॉन-क्रिमिलेअर प्रमाणपत्र (OBC/VJNT/SBC प्रवर्गासाठी)',
    'इयत्ता १० वी आणि १२ वी गुणपत्रिका व सनद',
    'आधार कार्ड (बँक खात्याशी व मोबाईल नंबरशी जोडलेले / NPCI Seeded)',
    'राष्ट्रीयीकृत बँकेचे पासबुक (विद्यार्थ्यांच्या नावावर स्वतंत्र बचत खाते)',
    'महाविद्यालयीन प्रवेश वाटप पत्र व फी पावती',
    'रेशन कार्ड (पहिले व शेवटचे पान)',
    'शिक्षणात खंड असल्यास गॅप प्रमाणपत्र (अ‍ॅफिडेव्हिट)',
  ];

  const scholarshipList = isMr ? scholarshipFeaturesMr : scholarshipFeaturesEn;
  const docsList = isMr ? mandatoryDocsMr : mandatoryDocsEn;

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. HERO BANNER */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d3b66 0%, #1a9988 100%)',
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
            <i className="fas fa-graduation-cap"></i> {isMr ? (cmsData?.hero?.badgeMr || 'शासकीय शिष्यवृत्ती मार्गदर्शन') : <>SCHOLARSHIP <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> FINANCIAL AID</>}
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.1rem, 4.5vw, 3rem)',
              fontWeight: 800,
              margin: '0 0 12px',
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {isMr ? (
              (cmsData?.hero?.titleMr || 'शिष्यवृत्ती सुविधा व योजना')
            ) : (
              <>Scholarship Guidance <span style={{ color: '#ffd166', fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> Financial Aid</>
            )}
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#e6f7f4', margin: '0 auto', lineHeight: 1.6, maxWidth: '780px' }}>
            {isMr
              ? (cmsData?.hero?.descMr || 'शिक्षणासाठी आर्थिक सहाय्याची संधी — उज्ज्वल भविष्यासाठी एक सक्षम पाऊल!')
              : <>End-to-End Support <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>&</span> Guidance for Government Scholarships (MahaDBT) for Deserving Nursing Students</>}
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT CONTAINER */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">

          {/* College Philosophy & Guarantee Card */}
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
                  backgroundColor: '#e6f7f4',
                  color: '#1a9988',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-hand-holding-medical"></i>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ color: '#1a9988', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.05em' }}>
                  {isMr ? 'आमची सामाजिक बांधिलकी' : 'OUR COMMITMENT TO EQUAL EDUCATION'}
                </span>
                <h2 style={{ color: '#0d3b66', fontSize: '1.8rem', margin: '6px 0 14px', fontWeight: 800 }}>
                  {isMr ? '“आर्थिक अडचणींमुळे शिक्षण थांबू नये, हीच आमची भूमिका”' : '“Financial Hardship Should Never Stop a Student’s Nursing Dream”'}
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', margin: 0 }}>
                  {isMr ? (
                    <>
                      <strong>समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर</strong> येथे पात्र विद्यार्थ्यांना उपलब्ध शासकीय नियम व योजनांनुसार शिष्यवृत्ती व आर्थिक सहाय्याच्या सुविधेबाबत परिपूर्ण मार्गदर्शन केले जाते. आर्थिक कारणांमुळे कोणत्याही होतकरू विद्यार्थ्याचे शिक्षण थांबू नये यासाठी महाविद्यालय कटिबद्ध आहे. कॉलेजच्या विशेष शिष्यवृत्ती कक्षातर्फे विद्यार्थ्यांना महाडीबीटी (MahaDBT) पोर्टलवर ऑनलाईन नोंदणीपासून ते रक्कम खात्यावर जमा होईपर्यंत संपूर्ण मदत दिली जाते.
                    </>
                  ) : (
                    <>
                      At <strong>Samarth College of Nursing, Sangamner</strong>, we believe that education is an empowering right. Eligible students from all reserved and economically weaker categories are provided with end-to-end guidance and technical assistance to apply for and receive Central and State Government scholarships through the MahaDBT portal and social welfare schemes.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* 5 Core Pillars of Scholarship Guidance */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ color: '#0d3b66', fontSize: '1.7rem', margin: 0, fontWeight: 800 }}>
                  <i className="fas fa-check-double" style={{ color: '#1a9988', marginRight: '10px' }}></i>
                  {isMr ? 'महाविद्यालयामार्फत शिष्यवृत्ती सहाय्य कक्ष' : 'How We Guide Students for Scholarships'}
                </h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.95rem' }}>
                  {isMr ? 'फॉर्म भरणे ते मंजुरीपर्यंत ५ टप्प्यांत संपूर्ण मार्गदर्शन' : 'Comprehensive 5-step assistance ensuring zero rejections and timely disbursement'}
                </p>
              </div>
              <span style={{ backgroundColor: '#e6f7f4', color: '#1a9988', padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem' }}>
                {isMr ? '५ प्रमुख सेवा' : '5 CORE SERVICES'}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {scholarshipList.map((item, idx) => (
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
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>STEP #{idx + 1}</span>
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

          {/* Category-Wise Government Schemes Grid */}
          <div style={{ marginBottom: '50px' }}>
            <h3 style={{ color: '#0d3b66', fontSize: '1.7rem', margin: '0 0 8px', fontWeight: 800 }}>
              <i className="fas fa-university" style={{ color: '#ffb703', marginRight: '10px' }}></i>
              {isMr ? 'प्रवर्गनिहाय शासकीय शिष्यवृत्ती योजना' : 'Category-Wise Government Scholarship Schemes'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 24px' }}>
              {isMr ? 'शासनाच्या अधिकृत नियमावली व जीआरनुसार मिळणारे लाभ' : 'Financial aid and fee concessions as per prevailing Maharashtra Govt GR norms'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {categorySchemes.map((scheme, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '28px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ backgroundColor: '#eef2ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>
                        {scheme.badge}
                      </span>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: scheme.color }}>
                        <i className={`fas ${scheme.icon}`}></i>
                      </div>
                    </div>
                    <h4 style={{ color: '#0d3b66', fontSize: '1.18rem', margin: '0 0 8px', fontWeight: 700 }}>
                      {isMr ? scheme.categoryMr : scheme.categoryEn}
                    </h4>
                    <span style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', fontWeight: 600, marginBottom: '12px' }}>
                      <i className="fas fa-building" style={{ marginRight: '6px' }}></i>
                      {isMr ? scheme.deptMr : scheme.deptEn}
                    </span>
                  </div>
                  <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '10px', borderLeft: `3px solid ${scheme.color}`, marginTop: '10px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '2px' }}>
                      {isMr ? 'अनुज्ञेय लाभ / सवलत:' : 'Benefit / Fee Concession:'}
                    </span>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#1e293b', fontWeight: 600, lineHeight: 1.5 }}>
                      {isMr ? scheme.benefitMr : scheme.benefitEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Documents Checklist Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '36px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
              marginBottom: '50px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                <i className="fas fa-folder-open"></i>
              </div>
              <div>
                <h3 style={{ color: '#0d3b66', fontSize: '1.45rem', margin: 0, fontWeight: 800 }}>
                  {isMr ? 'शिष्यवृत्ती अर्जासाठी आवश्यक कागदपत्रांची यादी' : 'Mandatory Documents Checklist for Scholarship Application'}
                </h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.92rem' }}>
                  {isMr ? 'अर्ज भरताना मूळ कागदपत्रे व सत्यप्रती सोबत ठेवणे आवश्यक आहे' : 'Ensure all original certificates and self-attested copies are ready before applying'}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '12px',
              }}
            >
              {docsList.map((doc, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <i className="fas fa-check-circle" style={{ color: '#16a34a', marginTop: '3px', fontSize: '0.95rem' }}></i>
                  <span style={{ fontSize: '0.92rem', color: '#334155', fontWeight: 500, lineHeight: 1.5 }}>
                    {doc}
                  </span>
                </div>
              ))}
            </div>

            {/* Note alert */}
            <div
              style={{
                marginTop: '24px',
                backgroundColor: '#fffbeb',
                borderLeft: '4px solid #f59e0b',
                padding: '14px 20px',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.88rem',
                color: '#92400e',
              }}
            >
              <strong>{isMr ? '*महत्त्वाची टीप: ' : '*Important Notice: '}</strong>
              {isMr
                ? 'शासनाच्या बदलत्या नियमांनुसार उत्पन्न मर्यादा आणि निकष वेळोवेळी लागू राहतील. अचूक माहिती व पडताळणीसाठी कॉलेजच्या शिष्यवृत्ती विभागाशी संपर्क साधावा.'
                : 'Eligibility and income ceilings are governed by current Government Resolutions. Students are advised to verify details at our scholarship desk.'}
            </div>
          </div>

          {/* Direct MahaDBT Official Portal Link Card */}
          <div
            style={{
              padding: '32px',
              background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)',
              borderRadius: '20px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              boxShadow: '0 10px 30px rgba(13, 59, 102, 0.18)',
              marginBottom: '50px',
            }}
          >
            <div>
              <span style={{ backgroundColor: 'rgba(255, 183, 3, 0.2)', color: '#ffd166', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid rgba(255, 183, 3, 0.4)' }}>
                {isMr ? 'महाराष्ट्र शासन अधिकृत पोर्टल' : 'GOVT OF MAHARASHTRA PORTAL'}
              </span>
              <h3 style={{ color: '#ffffff', fontSize: '1.5rem', margin: '10px 0 6px', fontWeight: 800 }}>
                MahaDBT (Aaple Sarkar DBT Portal)
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0 }}>
                {isMr ? 'शासकीय शिष्यवृत्ती ऑनलाईन अर्ज भरण्यासाठी थेट अधिकृत पोर्टलवर जा' : 'Direct link to submit and track your scholarship application online'}
              </p>
            </div>
            <a
              href="https://mahadbt.maharashtra.gov.in"
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: '#ffd166',
                color: '#0d3b66',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
              }}
            >
              <i className="fas fa-external-link-alt"></i> {isMr ? 'महाडीबीटी पोर्टल उघडा' : 'Open MahaDBT Portal'}
            </a>
          </div>

          {/* Helpdesk & Inquiries CTA */}
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
              {isMr ? 'शिष्यवृत्ती सहाय्य कक्ष व चौकशी' : 'Scholarship Helpdesk & Guidance Support'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {isMr
                ? 'कागदपत्रे तपासणी, फॉर्म भरताना येणाऱ्या अडचणी किंवा शिष्यवृत्ती योजनेच्या पात्रतेबाबत महाविद्यालयाच्या शिष्यवृत्ती कक्षात थेट भेटा किंवा संपर्क करा.'
                : 'For document verification, portal registration assistance, or category eligibility, reach out to our dedicated scholarship officer.'}
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
                <i className="fas fa-hotel"></i> {isMr ? 'वसतिगृह सुविधा पहा' : 'Hostel Facility'}
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
