'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const sections = isMr
    ? [
        {
          icon: 'fa-info-circle',
          title: '१. प्रास्ताविक (Introduction)',
          content: `समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर (अहिल्यानगर) आपल्या संकेतस्थळावर भेट देणाऱ्या विद्यार्थी, पालक, शिक्षक आणि अभ्यागतांच्या गोपनीयतेचा पूर्ण आदर करते. हे गोपनीयता धोरण (Privacy Policy) स्पष्ट करते की आम्ही संकेतस्थळाच्या माध्यमातून कोणती माहिती गोळा करतो, तिचा कसा वापर करतो आणि ती कशी सुरक्षित ठेवतो.`,
        },
        {
          icon: 'fa-database',
          title: '२. गोळा केली जाणारी माहिती (Information We Collect)',
          content: `आमच्या संकेतस्थळावर विविध सेवांचा लाभ घेताना खालील माहिती गोळा केली जाऊ शकते:
• प्रवेश चौकशी अर्ज व संपर्क अर्ज: विद्यार्थ्याचे पूर्ण नाव, मोबाईल क्रमांक, ईमेल पत्ता, शैक्षणिक पात्रता आणि इच्छित अभ्यासक्रम (GNM, ANM, ADMLT).
• ऑनलाईन फी भरणा: विद्यार्थी आयडी, नाव, वर्ग, भरलेली रक्कम व ट्रॅन्झॅक्शन आयडी.
• तांत्रिक माहिती: ब्राउझरचा प्रकार, डिव्हाइस माहिती, आयपी ॲड्रेस आणि संकेतस्थळ वापराचा वेळ (केवळ सुरक्षा व कार्यक्षमता सुधारणेसाठी).`,
        },
        {
          icon: 'fa-tasks',
          title: '३. माहितीचा वापर (How We Use Your Information)',
          content: `गोळा केलेली माहिती केवळ खालील अधिकृत शैक्षणिक व प्रशासकीय कारणांसाठी वापरली जाते:
• प्रवेश अर्जांची पडताळणी करणे आणि विद्यार्थ्यांशी संपर्क साधणे.
• शैक्षणिक सूचना, परीक्षा वेळापत्रक व महत्त्वाच्या घोषणांची माहिती देणे.
• ऑनलाईन फी पावती जनरेट करणे आणि खात्याची नोंद ठेवणे.
• शासकीय व नियामक मंडळांच्या (MSBNPE, MSBTE) आवश्यकतेनुसार माहितीची नोंद ठेवणे.`,
        },
        {
          icon: 'fa-credit-card',
          title: '४. ऑनलाईन पेमेंट व आर्थिक सुरक्षा (Payment Security)',
          content: `ऑनलाईन फी भरण्यासाठी आम्ही अधिकृत आणि सुरक्षित पेमेंट गेटवे (उदा. Razorpay) चा वापर करतो. 
• आपल्या बँक खात्याची, डेबिट/क्रेडिट कार्डची अथवा यूपीआय पिनची संवेदनशील माहिती कॉलेजच्या सर्व्हरवर कधीही साठवली जात नाही.
• सर्व आर्थिक व्यवहार अत्याधुनिक SSL/TLS एनक्रिप्शनद्वारे सुरक्षित केले जातात.`,
        },
        {
          icon: 'fa-user-shield',
          title: '५. माहितीचे संरक्षण व गोपनीयता (Data Protection)',
          content: `आम्ही विद्यार्थ्यांची आणि पालकांची वैयक्तिक माहिती कोणत्याही त्रयस्थ पक्षाला (Third Party) व्यावसायिक हेतूने विकत नाही किंवा भाड्याने देत नाही. केवळ कायदेशीर आवश्यकता अथवा शासकीय शैक्षणिक मंडळांच्या निर्देशानुसारच अधिकृत माहिती सामायिक केली जाऊ शकते.`,
        },
        {
          icon: 'fa-cookie-bite',
          title: '६. कुकीज व डिजिटल ट्रॅकिंग (Cookies Policy)',
          content: `आमचे संकेतस्थळ वापरकर्त्याचा अनुभव अधिक सुरळीत आणि वेगवान करण्यासाठी मूलभूत कुकीजचा वापर करू शकते. आपण आपल्या ब्राउझर सेटिंग्जमधून कुकीज बंद करू शकता; मात्र यामुळे संकेतस्थळाच्या काही वैशिष्ट्यांवर मर्यादा येऊ शकतात.`,
        },
        {
          icon: 'fa-phone-alt',
          title: '७. संपर्क व तक्रार निवारण (Contact Us)',
          content: `या गोपनीयता धोरणाबाबत आपल्याला काही प्रश्न, शंका किंवा तक्रार असल्यास आपण थेट कॉलेज प्रशासनाशी संपर्क साधू शकता:
• पत्ता: समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर, जि. अहिल्यानगर, महाराष्ट्र - ४२२६०५
• फोन: +91 96894 86570
• ईमेल: samarthnursing41@gmail.com`,
        },
      ]
    : [
        {
          icon: 'fa-info-circle',
          title: '1. Introduction & Overview',
          content: `Samarth College of Nursing, Sangamner (Ahilyanagar) is dedicated to safeguarding the privacy and personal data of students, parents, faculty, alumni, and website visitors. This Privacy Policy outlines how we collect, utilize, store, and protect your information when you interact with our official website and digital portal.`,
        },
        {
          icon: 'fa-database',
          title: '2. Information We Collect',
          content: `We collect information necessary to facilitate academic, admission, and administrative services:
• Admission & Inquiry Forms: Full name, phone number, email address, educational background, permanent address, and preferred course (GNM, ANM, or ADMLT).
• Online Fee Transactions: Student roll/enrollment number, student name, academic year, amount paid, and digital transaction reference numbers.
• Technical & Log Data: Device type, browser specifications, IP address, and page interaction timestamps used strictly for platform security and performance optimization.`,
        },
        {
          icon: 'fa-tasks',
          title: '3. How We Use Collected Information',
          content: `Personal and academic details gathered are used strictly for legitimate educational purposes:
• Processing admission inquiries, counseling calls, and application reviews.
• Sending critical academic notices, examination alerts, timetable updates, and official announcements.
• Generating verified digital fee receipts and maintaining student accounting ledgers.
• Meeting regulatory compliance standards mandated by MSBNPE, MSBTE, and the Directorate of Medical Education and Research (DMER).`,
        },
        {
          icon: 'fa-credit-card',
          title: '4. Online Payments & Financial Security',
          content: `All online payment operations are managed through recognized, certified third-party payment gateways (e.g., Razorpay):
• Sensitive financial credentials—including credit/debit card numbers, CVVs, net banking passwords, and UPI PINs—are never collected or stored on our servers.
• Transactions are processed across bank-grade 256-bit SSL/TLS encrypted channels ensuring complete transaction integrity.`,
        },
        {
          icon: 'fa-user-shield',
          title: '5. Information Disclosure & Confidentiality',
          content: `We enforce strict confidentiality standards. We do not sell, trade, lease, or distribute your personal details to commercial third parties or advertisers. Information is only shared when required by law enforcement or authorized state education boards (such as MSBNPE / MSBTE) under statutory guidelines.`,
        },
        {
          icon: 'fa-cookie-bite',
          title: '6. Cookies & Analytical Tracking',
          content: `Our portal utilizes essential cookies and session storage to maintain authentication state and ensure seamless site navigation. You may modify your web browser preferences to disable cookies; however, certain portal modules (such as application submissions) may experience functional restrictions.`,
        },
        {
          icon: 'fa-phone-alt',
          title: '7. Inquiries & Data Privacy Officer',
          content: `If you have inquiries regarding our data handling procedures or wish to request corrections to your submitted personal information, please reach out to our administrative office:
• Campus Address: Samarth College of Nursing, Sangamner, Dist. Ahilyanagar, Maharashtra - 422605
• Phone: +91 96894 86570
• Email: samarthnursing41@gmail.com`,
        },
      ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
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
            color: '#ffd166', padding: '5px 16px', borderRadius: '999px',
            fontSize: '0.82rem', fontWeight: 700, marginBottom: '14px',
            letterSpacing: '0.05em',
          }}>
            <i className="fas fa-shield-alt"></i> {isMr ? 'कायदेशीर व गोपनीयता' : 'LEGAL & PRIVACY'}
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'गोपनीयता धोरण' : 'Privacy Policy'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: '0 0 16px', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            {isMr
              ? 'समर्थ कॉलेज ऑफ नर्सिंग आपल्या माहितीची सुरक्षा, गोपनीयता आणि पारदर्शकता राखण्यासाठी कटिबद्ध आहे.'
              : 'Committed to safeguarding the privacy, transparency, and data security of our students and visitors.'}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'गोपनीयता धोरण' : 'Privacy Policy'}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>

          {/* Quick Notice Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            borderLeft: '5px solid #1a9988',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              backgroundColor: '#e6f7f4',
              color: '#1a9988',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0,
            }}>
              <i className="fas fa-user-lock"></i>
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px', color: '#0d3b66', fontSize: '1.05rem' }}>
                {isMr ? 'शेवटचे अद्यतन: सप्टेंबर २०२६' : 'Last Updated: September 2026'}
              </h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {isMr
                  ? 'हे धोरण समर्थ कॉलेज ऑफ नर्सिंगच्या संकेतस्थळावर थेट लागू आहे. कृपया सर्व मुद्दे काळजीपूर्वक वाचावेत.'
                  : 'This policy governs digital interactions on the official portal of Samarth College of Nursing, Sangamner.'}
              </p>
            </div>
          </div>

          {/* Policy Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {sections.map((sec, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  padding: '28px 32px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.03)',
                }}
              >
                <h3 style={{
                  color: '#0d3b66',
                  fontSize: '1.25rem',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <i className={`fas ${sec.icon}`} style={{ color: '#0284c7', fontSize: '1.1rem' }}></i>
                  {sec.title}
                </h3>
                <div style={{
                  color: '#334155',
                  fontSize: '0.98rem',
                  lineHeight: '1.8',
                  whiteSpace: 'pre-line',
                }}>
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                backgroundColor: '#0d3b66',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(13,59,102,0.2)',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fas fa-arrow-left"></i> {isMr ? 'मुख्यपृष्ठावर परत जा' : 'Back to Home'}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
