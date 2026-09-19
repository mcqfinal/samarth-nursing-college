'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsConditionsPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const sections = isMr
    ? [
        {
          icon: 'fa-file-signature',
          title: '१. अटींची स्वीकृती (Acceptance of Terms)',
          content: `समर्थ कॉलेज ऑफ नर्सिंग, संगमनेरच्या अधिकृत संकेतस्थळाचा वापर करून आपण या नियम व अटींशी (Terms & Conditions) पूर्णतः बांधील राहण्यास सहमती दर्शविता. जर आपण या अटींशी सहमत नसाल, तर कृपया संकेतस्थळाचा वापर करू नये.`,
        },
        {
          icon: 'fa-user-graduate',
          title: '२. शैक्षणिक व प्रवेश नियम (Admissions & Academic Guidelines)',
          content: `• अभ्यासक्रमांचे प्रवेश (GNM, ANM, ADMLT) हे महाराष्ट्र शासन, MSBNPE, MSBTE आणि संबंधित नियामक संस्थांच्या मार्गदर्शक तत्त्वांनुसार व गुणवत्तेनुसार निश्चित केले जातात.
• संकेतस्थळावर दिलेला प्रवेश चौकशी अर्ज हा अंतिम प्रवेश मानला जाणार नाही. अंतिम प्रवेशासाठी कागदपत्रांची प्रत्यक्ष पडताळणी व विहित शुल्क भरणे अनिवार्य आहे.
• अपूर्ण माहिती किंवा चुकीचे कागदपत्र सादर केल्यास प्रवेश अर्ज रद्द करण्याचा अधिकार महाविद्यालय प्रशासनाकडे राखून ठेवलेला आहे.`,
        },
        {
          icon: 'fa-money-bill-wave',
          title: '३. ऑनलाईन फी भरणा व परतावा धोरण (Fees & Refund Policy)',
          content: `• ऑनलाईन पोर्टलद्वारे भरण्यात येणारी फी ही महाविद्यालयाच्या अधिकृत फी रचनेनुसारच स्वीकारली जाते.
• ऑनलाईन व्यवहार यशस्वी झाल्यानंतर डिजिटल पावती जनरेट केली जाईल, जी भविष्यातील संदर्भासाठी सुरक्षित ठेवणे आवश्यक आहे.
• तांत्रिक त्रुटीमुळे बँक खात्यातून पैसे कपात होऊन पावती न मिळाल्यास ७ ते १० कामकाजाच्या दिवसांत संबंधित रक्कम नियमानुसार बँक खात्यात जमा केली जाईल.
• प्रवेश रद्द करण्याबाबतचे शुल्क परतावा (Fee Refund) नियम महाराष्ट्र शासन व नियामक प्राधिकरणांच्या प्रचलित नियमांनुसार लागू राहतील.`,
        },
        {
          icon: 'fa-gavel',
          title: '४. आचारसंहिता व रॅगिंग प्रतिबंधक नियम (Code of Conduct & Anti-Ragging)',
          content: `• महाविद्यालयाच्या कॅम्पसमध्ये व वसतिगृहात शिस्त, परस्पर आदर आणि स्वच्छता राखणे प्रत्येक विद्यार्थ्यासाठी बंधनकारक आहे.
• रॅगिंगला महाविद्यालयात शून्य सहनशीलता (Zero Tolerance) धोरण आहे. मा. सर्वोच्च न्यायालय आणि यूजीसीच्या मार्गदर्शक तत्त्वांनुसार रॅगिंग हा दखलपात्र गुन्हा असून यामध्ये दोषी आढळणाऱ्यावर कडक कायदेशीर व शिस्तभंगाची कारवाई केली जाईल.`,
        },
        {
          icon: 'fa-copyright',
          title: '५. बौद्धिक संपदा हक्क (Intellectual Property Rights)',
          content: `या संकेतस्थळावरील सर्व मजकूर, महाविद्यालयाचा लोगो, छायाचित्रे, अभ्यासक्रम तपशील, प्रश्नसंच आणि डिजिटल साहित्य हे समर्थ कॉलेज ऑफ नर्सिंगच्या मालकीचे आहेत. प्रशासनाच्या लेखी परवानगीशिवाय याचा कोणताही भाग व्यावसायिक अथवा अनधिकृत कारणासाठी वापरता येणार नाही.`,
        },
        {
          icon: 'fa-exclamation-triangle',
          title: '६. दायित्व मर्यादा व अस्वीकरण (Limitation of Liability)',
          content: `महाविद्यालय संकेतस्थळावरील माहिती अचूक आणि अद्ययावत ठेवण्यासाठी सर्वतोपरी प्रयत्न करते. तथापि, तांत्रिक अडचणी, इंटरनेट समस्या किंवा बाह्य लिंकांच्या वापरामुळे होणाऱ्या कोणत्याही नुकसानास महाविद्यालय जबाबदार असणार नाही.`,
        },
        {
          icon: 'fa-balance-scale',
          title: '७. कायदेशीर अधिकारक्षेत्र (Governing Law & Jurisdiction)',
          content: `हे नियम व अटी भारताच्या कायद्यांनुसार नियंत्रित केल्या जातात. या संकेतस्थळाच्या वापरातून उद्भवणारे कोणतेही वाद हे केवळ संगमनेर / अहिल्यानगर (महाराष्ट्र) येथील सक्षम न्यायालयांच्या अधिकारक्षेत्रात सोडवले जातील.`,
        },
        {
          icon: 'fa-envelope-open-text',
          title: '८. प्रशासकीय संपर्क (Institutional Contact)',
          content: `नियम व अटींबाबत कोणत्याही स्पष्टीकरणासाठी आपण कॉलेज कार्यालयाशी संपर्क साधू शकता:
• पत्ता: समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर, जि. अहिल्यानगर, महाराष्ट्र - ४२२६०५
• फोन: +91 96894 86570
• ईमेल: samarthnursing41@gmail.com`,
        },
      ]
    : [
        {
          icon: 'fa-file-signature',
          title: '1. Acceptance of Terms',
          content: `By accessing, browsing, or utilizing the official website and digital resources of Samarth College of Nursing, Sangamner, you agree to comply with and be bound by these Terms & Conditions. If you do not consent to these terms, please refrain from using our online portal.`,
        },
        {
          icon: 'fa-user-graduate',
          title: '2. Academic & Admission Rules',
          content: `• Admissions to professional nursing (GNM, ANM) and paramedical (ADMLT) programs are subject to official eligibility norms prescribed by INC, MSBNPE, MSBTE, and the Government of Maharashtra.
• Inquiries or online registration forms submitted via this website do not constitute guaranteed admission. Final admission requires physical document verification and fee payment.
• The college reserves the right to reject or invalidate applications containing forged certificates, discrepancies, or misrepresentations.`,
        },
        {
          icon: 'fa-money-bill-wave',
          title: '3. Online Fee Payments & Refund Policy',
          content: `• Fee payments made through our online payment portal must strictly adhere to the approved annual fee schedule for each program.
• An authentic digital payment receipt is generated upon successful transaction completion; students must preserve this record for verification.
• In the event of duplicate charges or network deductions without receipt generation, the excess funds will be reconciled within 7 to 10 banking business days.
• Fee refund policies upon admission cancellation are strictly governed by statutory Government of Maharashtra and Directorate of Medical Education regulations.`,
        },
        {
          icon: 'fa-gavel',
          title: '4. Campus Discipline & Anti-Ragging Mandate',
          content: `• Students admitted to Samarth College of Nursing are expected to maintain exemplary ethical standards, clinical decorum, and mandatory attendance.
• Zero-Tolerance Anti-Ragging Policy: Ragging in any form on the campus, clinical premises, or hostel is strictly prohibited by law. Violators will face immediate police reporting, academic suspension, and severe disciplinary prosecution pursuant to Hon. Supreme Court and UGC directives.`,
        },
        {
          icon: 'fa-copyright',
          title: '5. Intellectual Property Rights',
          content: `All content featured on this platform—including course syllabi, institutional branding, crests, photographic media, notices, and question banks—is the exclusive intellectual property of Samarth College of Nursing. Unauthorized copying, scraping, or commercial dissemination is strictly prohibited.`,
        },
        {
          icon: 'fa-exclamation-triangle',
          title: '6. Disclaimer & Limitation of Liability',
          content: `While utmost care is taken to verify syllabus details, examination dates, and announcements published on this portal, official administrative circulars and notice boards take precedence in case of any technical discrepancy or typographical error.`,
        },
        {
          icon: 'fa-balance-scale',
          title: '7. Governing Law & Legal Jurisdiction',
          content: `These terms and conditions are governed by and construed in accordance with the substantive laws of India. Any disputes arising out of the website use or academic enrollment shall be subject to the exclusive jurisdiction of the competent courts in Sangamner / Ahilyanagar, Maharashtra.`,
        },
        {
          icon: 'fa-envelope-open-text',
          title: '8. Administrative Contact & Inquiries',
          content: `For questions, clarifications, or grievances regarding these terms of use, please contact the college administration:
• Address: Samarth College of Nursing, Sangamner, Dist. Ahilyanagar, Maharashtra - 422605
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
            <i className="fas fa-balance-scale"></i> {isMr ? 'नियम व अटी' : 'TERMS OF SERVICE'}
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'नियम व अटी' : (
              <>Terms <span style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", fontWeight: 600, fontStyle: 'normal', padding: '0 2px' }}>&</span> Conditions</>
            )}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: '0 0 16px', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            {isMr
              ? 'समर्थ कॉलेज ऑफ नर्सिंगच्या संकेतस्थळ वापर आणि डिजिटल सेवांसंदर्भातील सर्व अधिकृत नियम व अटी.'
              : 'Official terms and regulations governing website access, academic inquiries, and digital portal services.'}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'नियम व अटी' : 'Terms & Conditions'}</span>
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
            borderLeft: '5px solid #0284c7',
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
              backgroundColor: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0,
            }}>
              <i className="fas fa-file-contract"></i>
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px', color: '#0d3b66', fontSize: '1.05rem' }}>
                {isMr ? 'शैक्षणिक वर्ष: २०२६–२७' : 'Academic Year: 2026–27'}
              </h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {isMr
                  ? 'सर्व विद्यार्थी, पालक आणि अभ्यागतांनी महाविद्यालयाचे नियम व मार्गदर्शक तत्त्वांचे पालन करणे बंधनकारक आहे.'
                  : 'All applicants, students, and website users are advised to read and understand these terms thoroughly.'}
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
