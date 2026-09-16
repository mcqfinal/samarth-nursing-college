'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AdmissionPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'GNM',
    gender: 'Female',
    qualification: '12th (HSC) Passed',
    percentage: '',
    category: 'Open / General',
    city: '',
    hostelRequired: 'No',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to dynamically load Razorpay checkout script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);
    setPaymentSuccess(null);

    if (!formData.name || !formData.phone || !formData.city) {
      setStatusMsg({
        type: 'error',
        text: isMr
          ? 'कृपया सर्व आवश्यक (*) रकाने भरा.'
          : 'Please fill in all required (*) fields.',
      });
      setSubmitting(false);
      return;
    }

    // Submit Application Enquiry to Backend DB
    const submissionPayload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      course: formData.course,
      message: `[Admission Application 2026-27] Gender: ${formData.gender} | Qual: ${formData.qualification} (${formData.percentage || 'N/A'}) | Cat: ${formData.category} | City: ${formData.city} | Hostel: ${formData.hostelRequired} | Note: ${formData.message || 'None'}`,
    };

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });

      const dbData = await res.json();

      if (!res.ok) {
        throw new Error(dbData.error || 'Failed to register application.');
      }

      setStatusMsg({
        type: 'success',
        text: isMr
          ? 'आपला ऑनलाईन प्रवेश अर्ज यशस्वीरित्या नोंदवला गेला आहे! आमची प्रवेश समुपदेशन समिती लवकरच आपल्याशी संपर्क साधेल.'
          : 'Your Admission Application has been successfully submitted! Our admissions counseling team will contact you soon.',
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: 'GNM',
        gender: 'Female',
        qualification: '12th (HSC) Passed',
        percentage: '',
        category: 'Open / General',
        city: '',
        hostelRequired: 'No',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setStatusMsg({
        type: 'error',
        text: isMr
          ? 'अर्ज सबमिट करताना अडचण आली. कृपया थेट +९१ ९६८९४ ८६५७० वर संपर्क साधा.'
          : err.message || 'Error occurred. Please call +91 96894 86570.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const steps = [
    {
      num: '01',
      titleEn: 'Check Eligibility & Select Course',
      titleMr: 'पात्रता तपासा व कोर्स निवडा',
      descEn: 'Review the academic eligibility criteria for GNM (10+2 with 40%), ANM (10+2 Pass), or ADMLT.',
      descMr: 'GNM (१२वी किमान ४०%), ANM (१२वी उत्तीर्ण) किंवा ADMLT यापैकी आपल्या आवडीच्या कोर्सची पात्रता तपासा.',
      icon: 'fa-user-graduate',
      badge: 'Step 1',
    },
    {
      num: '02',
      titleEn: 'Fill Online Application Form',
      titleMr: 'ऑनलाईन प्रवेश अर्ज भरा',
      descEn: 'Submit student details, academic marks, and choose to pay the ₹500 fee instantly or later.',
      descMr: 'खालील अर्जात माहिती भरा आणि ₹५०० नोंदणी फी ऑनलाईन किंवा नंतर कॉलेजमध्ये भरण्याचा पर्याय निवडा.',
      icon: 'fa-file-signature',
      badge: 'Step 2',
    },
    {
      num: '03',
      titleEn: 'Document Verification & Counseling',
      titleMr: 'कागदपत्र पडताळणी व समुपदेशन',
      descEn: 'Visit campus or attend tele-counseling with your original marksheets, TC/LC, and caste/domicile certificates.',
      descMr: 'मूळ गुणपत्रिका, शाळा सोडल्याचा दाखला (LC), जात व अधिवास प्रमाणपत्रांसह कॉलेज कॅम्पसमध्ये प्रत्यक्ष भेट द्या.',
      icon: 'fa-id-card-alt',
      badge: 'Step 3',
    },
    {
      num: '04',
      titleEn: 'Seat Confirmation & Receipt',
      titleMr: 'जागा निश्चिती व अधिकृत पावती',
      descEn: 'Confirm your provisional seat allotment and download your official admission payment receipt.',
      descMr: 'आपला प्रवेश निश्चित करून अधिकृत डिजिटल पावती व प्रवेश नोंदणी क्रमांक प्राप्त करा.',
      icon: 'fa-check-circle',
      badge: 'Step 4',
    },
  ];

  const documents = [
    { en: '10th (SSC) Marksheet & Passing Certificate', mr: '१०वी (SSC) गुणपत्रिका व बोर्ड प्रमाणपत्र' },
    { en: '12th (HSC) Marksheet & Passing Certificate', mr: '१२वी (HSC) गुणपत्रिका व बोर्ड प्रमाणपत्र' },
    { en: 'School / College Leaving Certificate (LC / TC)', mr: 'शाळा / कॉलेज सोडल्याचा दाखला (LC / TC)' },
    { en: 'Domicile & Age / Nationality Certificate', mr: 'अधिवास (Domicile) व राष्ट्रीयत्व प्रमाणपत्र' },
    { en: 'Caste Certificate & Caste Validity (for reserved categories)', mr: 'जात प्रमाणपत्र व जात पडताळणी (लागू असल्यास)' },
    { en: 'Non-Creamy Layer Certificate (OBC / VJNT / SBC)', mr: 'नॉन-क्रीमीलेअर प्रमाणपत्र (चालू वर्षाचे)' },
    { en: 'Aadhaar Card Copy & 4 Passport Size Color Photographs', mr: 'आधार कार्ड प्रत व ४ पासपोर्ट आकाराचे रंगीत फोटो' },
    { en: 'Income Certificate / Ration Card (for Scholarship Schemes)', mr: 'उत्पन्नाचा दाखला / रेशन कार्ड (महाडीबीटी शिष्यवृत्तीसाठी)' },
  ];

  const courseTable = [
    {
      nameEn: 'GNM (General Nursing & Midwifery)',
      nameMr: 'जी.एन.एम. (जनरल नर्सिंग आणि मिडवायफरी)',
      durationEn: '3 Years (Full Time)',
      durationMr: '३ वर्षे (पूर्णवेळ)',
      eligibilityEn: '10+2 with minimum 40% aggregate (Science / Arts / Commerce). Registered by MNC & Govt.',
      eligibilityMr: '१२वी उत्तीर्ण किमान ४०% गुणांसह (विज्ञान / कला / वाणिज्य). महाराष्ट्र नर्सिंग कौन्सिल मान्यताप्राप्त.',
      intake: '40 Seats / जागा',
      type: 'Diploma in Nursing',
    },
    {
      nameEn: 'ANM (Auxiliary Nursing & Midwifery)',
      nameMr: 'ए.एन.एम. (ऑक्झिलरी नर्सिंग आणि मिडवायफरी)',
      durationEn: '2 Years (Full Time)',
      durationMr: '२ वर्षे (पूर्णवेळ)',
      eligibilityEn: '10+2 (HSC) passed in any stream from recognized board. Female candidates preferred.',
      eligibilityMr: 'कोणत्याही शाखेतून १२वी (HSC) उत्तीर्ण. विद्यार्थिनींसाठी सुवर्णसंधी.',
      intake: '40 Seats / जागा',
      type: 'Diploma in Nursing',
    },
    {
      nameEn: 'ADMLT (Advance Diploma in Medical Lab Tech)',
      nameMr: 'ए.डी.एम.एल.टी. (अॅडव्हान्स मेडिकल लॅब टेक्नॉलॉजी)',
      durationEn: '1.5 Years (18 Months)',
      durationMr: '१.५ वर्षे (१८ महिने)',
      eligibilityEn: '12th Science / Any 12th Pass or DMLT qualification. Practical diagnostic training.',
      eligibilityMr: '१२वी सायन्स / १२वी उत्तीर्ण. आधुनिक लॅब व पॅथॉलॉजी प्रात्यक्षिक प्रशिक्षण.',
      intake: '30 Seats / जागा',
      type: 'Paramedical Diploma',
    },
  ];

  return (
    <div className="page-wrapper" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. HERO BANNER */}
      <div
        className="page-banner"
        style={{
          background: 'linear-gradient(135deg, #0d3b66 0%, #1e5288 60%, #ffb703 250%)',
          padding: '60px 0 50px 0',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 183, 3, 0.2)',
              border: '1px solid rgba(255, 183, 3, 0.6)',
              padding: '6px 18px',
              borderRadius: '50px',
              color: '#ffd166',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            <i className="fas fa-bullhorn"></i>
            {isMr ? 'शैक्षणिक वर्ष २०२६-२७ प्रवेश प्रक्रिया सुरू' : 'Admissions Open for Academic Year 2026-27'}
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '12px',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {isMr ? 'प्रवेश प्रक्रिया व ऑनलाईन अर्ज' : 'Admission Process & Application Form'}
          </h1>

          <p
            style={{
              maxWidth: '750px',
              margin: '0 auto 20px auto',
              fontSize: '1.05rem',
              color: '#e2e8f0',
              lineHeight: 1.6,
            }}
          >
            {isMr
              ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर मध्ये GNM, ANM व ADMLT अभ्यासक्रमांसाठी प्रवेश मिळवा. खालील ४ सोप्या टप्प्यांत ऑनलाईन प्रवेश प्रक्रिया पूर्ण करा.'
              : 'Join Samarth College of Nursing, Sangamner for recognized GNM, ANM & ADMLT programs. Follow our simple 4-step admission flow or apply online below.'}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#form"
              style={{
                background: '#ffb703',
                color: '#082238',
                padding: '12px 26px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 15px rgba(255, 183, 3, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fas fa-edit"></i>
              {isMr ? 'ऑनलाईन अर्ज भरा' : 'Fill Online Application'}
            </a>
            <Link
              href="/pay"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fas fa-credit-card" style={{ color: '#ffd166' }}></i>
              {isMr ? 'ऑनलाईन फी पोर्टल' : 'Open Fee Portal (₹500 / ₹5k)'}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. FOUR-STEP ADMISSION PROCESS SECTION */}
      <section style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span
              style={{
                color: '#0d3b66',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: '#e0f2fe',
                padding: '4px 12px',
                borderRadius: '4px',
              }}
            >
              {isMr ? 'सोपी व पारदर्शक पद्धत' : 'Simple & Transparent'}
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.1rem',
                color: '#0d3b66',
                marginTop: '10px',
                fontWeight: 700,
              }}
            >
              {isMr ? '४ सोप्या टप्प्यांत प्रवेश प्रक्रिया' : '4-Step Admission Procedure'}
            </h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '8px auto 0 auto' }}>
              {isMr
                ? 'खालील टप्पे समजून घ्या आणि आपला प्रवेश वेळेत निश्चित करा.'
                : 'Follow these straightforward steps from application to final seat confirmation.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {steps.map((st, i) => (
              <div
                key={i}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '30px 22px',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(13, 59, 102, 0.04)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '20px',
                    background: '#0d3b66',
                    color: '#ffd166',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {st.badge}
                </div>

                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '12px',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    marginBottom: '18px',
                    marginTop: '6px',
                  }}
                >
                  <i className={`fas ${st.icon}`}></i>
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: '#0d3b66',
                    fontWeight: 700,
                    marginBottom: '10px',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {isMr ? st.titleMr : st.titleEn}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#475569',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {isMr ? st.descMr : st.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. APPLICATION FORM & DOCUMENT CHECKLIST (2 COLUMNS) */}
      <section id="form" style={{ padding: '60px 0', background: '#f1f5f9' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '35px',
              alignItems: 'start',
            }}
          >
            {/* LEFT COLUMN: Interactive Form OR Payment Receipt */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '36px',
                boxShadow: '0 8px 30px rgba(13, 59, 102, 0.08)',
                border: '1px solid #e2e8f0',
              }}
            >
              {paymentSuccess ? (
                /* OFFICIAL DIGITAL RECEIPT ON PAYMENT SUCCESS */
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      background: '#dcfce7',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      margin: '0 auto 16px auto',
                    }}
                  >
                    <i className="fas fa-check-circle"></i>
                  </div>

                  <h3 style={{ fontSize: '1.6rem', color: '#0d3b66', margin: '0 0 6px 0', fontWeight: 800 }}>
                    {isMr ? 'प्रवेश अर्ज व फी यशस्वीरित्या जमा!' : 'Application & Payment Successful!'}
                  </h3>
                  <p style={{ color: '#16a34a', fontSize: '0.95rem', fontWeight: 600, marginBottom: '24px' }}>
                    {isMr ? 'आपला प्रवेश अर्ज व नोंदणी शुल्क स्वीकारले गेले आहे.' : 'Your application and registration fee of ₹500 have been confirmed.'}
                  </p>

                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '24px',
                      textAlign: 'left',
                      marginBottom: '24px',
                      fontSize: '0.92rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0', marginBottom: '10px' }}>
                      <span style={{ color: '#64748b' }}>{isMr ? 'विद्यार्थ्याचे नाव:' : 'Student Name:'}</span>
                      <strong style={{ color: '#0d3b66' }}>{paymentSuccess.studentName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0', marginBottom: '10px' }}>
                      <span style={{ color: '#64748b' }}>{isMr ? 'कोर्स (Course):' : 'Course:'}</span>
                      <strong style={{ color: '#0d3b66' }}>{paymentSuccess.course}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0', marginBottom: '10px' }}>
                      <span style={{ color: '#64748b' }}>{isMr ? 'मोबाईल नंबर:' : 'Mobile Number:'}</span>
                      <strong style={{ color: '#0d3b66' }}>{paymentSuccess.phone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0', marginBottom: '10px' }}>
                      <span style={{ color: '#64748b' }}>{isMr ? 'भरलेली रक्कम:' : 'Amount Paid:'}</span>
                      <strong style={{ color: '#16a34a', fontSize: '1.1rem' }}>₹{paymentSuccess.amount}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0', marginBottom: '10px' }}>
                      <span style={{ color: '#64748b' }}>{isMr ? 'पेमेंट आयडी (Razorpay ID):' : 'Razorpay Payment ID:'}</span>
                      <strong style={{ color: '#0284c7', fontFamily: 'monospace' }}>{paymentSuccess.paymentId}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>{isMr ? 'तारीख व वेळ:' : 'Date & Time:'}</span>
                      <span style={{ color: '#334155' }}>{paymentSuccess.date}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={handlePrint}
                      style={{
                        background: '#0d3b66',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <i className="fas fa-print"></i>
                      {isMr ? 'पावती प्रिंट करा / PDF सेव्ह करा' : 'Print / Save Receipt PDF'}
                    </button>
                    <button
                      onClick={() => {
                        setPaymentSuccess(null);
                        setStatusMsg(null);
                      }}
                      style={{
                        background: '#e2e8f0',
                        color: '#334155',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {isMr ? 'नवीन अर्ज भरा' : 'Submit Another Form'}
                    </button>
                  </div>
                </div>
              ) : (
                /* REGULAR APPLICATION FORM */
                <div>
                  <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
                    <div
                      style={{
                        color: '#0284c7',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '4px',
                      }}
                    >
                      {isMr ? 'ऑनलाईन नावनोंदणी अर्ज' : 'Online Registration Form'}
                    </div>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        color: '#0d3b66',
                        margin: 0,
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                      }}
                    >
                      {isMr ? 'प्रवेश अर्ज भरा (२०२६-२७)' : 'Apply for Admission (2026-27)'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '6px 0 0 0' }}>
                      {isMr
                        ? 'आपली माहिती भरा. आमचे प्रवेश समुपदेशक लवकरच आपल्याशी संपर्क साधतील.'
                        : 'Submit your details below. Our admissions counseling team will contact you soon.'}
                    </p>
                  </div>

                  {/* Status Message */}
                  {statusMsg && (
                    <div
                      style={{
                        padding: '16px 20px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        background: statusMsg.type === 'success' ? '#f0fdf4' : statusMsg.type === 'info' ? '#eff6ff' : '#fef2f2',
                        border: `1px solid ${statusMsg.type === 'success' ? '#86efac' : statusMsg.type === 'info' ? '#bfdbfe' : '#fca5a5'}`,
                        color: statusMsg.type === 'success' ? '#166534' : statusMsg.type === 'info' ? '#1e40af' : '#991b1b',
                        fontSize: '0.92rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <i className={`fas ${statusMsg.type === 'success' ? 'fa-check-circle' : statusMsg.type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'}`}></i>
                      <span>{statusMsg.text}</span>
                    </div>
                  )}

                  <form onSubmit={(e) => handleFormSubmit(e)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Full Name */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: '#1e293b',
                          marginBottom: '6px',
                        }}
                      >
                        {isMr ? 'विद्यार्थ्याचे पूर्ण नाव *' : 'Student Full Name *'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.92rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    {/* Mobile & Email Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '6px',
                          }}
                        >
                          {isMr ? 'मोबाईल नंबर (WhatsApp) *' : 'Mobile Number (WhatsApp) *'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '6px',
                          }}
                        >
                          {isMr ? 'ईमेल आयडी' : 'Email Address (Optional)'}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* Course & Gender Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '6px',
                          }}
                        >
                          {isMr ? 'कोर्स निवडा *' : 'Select Course *'}
                        </label>
                        <select
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                            background: '#ffffff',
                          }}
                        >
                          <option value="GNM">GNM – Nursing (3 Yrs)</option>
                          <option value="ANM">ANM – Nursing (2 Yrs)</option>
                          <option value="ADMLT">ADMLT – Lab Tech (1.5 Yrs)</option>
                          <option value="PGDMLT">PGDMLT (Post Grad Lab Tech)</option>
                        </select>
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '6px',
                          }}
                        >
                          {isMr ? 'लिंग (Gender) *' : 'Gender *'}
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                            background: '#ffffff',
                          }}
                        >
                          <option value="Female">Female (महिला)</option>
                          <option value="Male">Male (पुरुष)</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Qualification & 12th Percentage */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '6px',
                          }}
                        >
                          {isMr ? 'शैक्षणिक पात्रता *' : 'Academic Qualification *'}
                        </label>
                        <select
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                            background: '#ffffff',
                          }}
                        >
                          <option value="12th (HSC) Science Passed">12th Science Passed</option>
                          <option value="12th (HSC) Arts Passed">12th Arts Passed</option>
                          <option value="12th (HSC) Commerce Passed">12th Commerce Passed</option>
                          <option value="12th Appearing">12th Appearing (निकाल प्रतीक्षेत)</option>
                          <option value="Graduate / Other">Graduate / Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '6px',
                          }}
                        >
                          {isMr ? '१२वी टक्केवारी / Marks (%)' : '12th Marks (%)'}
                        </label>
                        <input
                          type="text"
                          name="percentage"
                          value={formData.percentage}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* Category & City */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '6px',
                          }}
                        >
                          {isMr ? 'प्रवर्ग (Category)' : 'Category'}
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                            background: '#ffffff',
                          }}
                        >
                          <option value="Open / General">Open / General</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="VJ / NT">VJ / NT</option>
                          <option value="SBC">SBC</option>
                          <option value="EWS / SEBC">EWS / SEBC</option>
                        </select>
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '6px',
                          }}
                        >
                          {isMr ? 'गाव / शहर व जिल्हा *' : 'City / District *'}
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* Hostel accommodation option */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: '#1e293b',
                          marginBottom: '6px',
                        }}
                      >
                        {isMr ? 'वसतिगृह (Hostel) सुविधा हवी आहे का?' : 'Do you require Hostel Accommodation?'}
                      </label>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="hostelRequired"
                            value="Yes"
                            checked={formData.hostelRequired === 'Yes'}
                            onChange={handleChange}
                          />
                          {isMr ? 'होय (Yes)' : 'Yes'}
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="hostelRequired"
                            value="No"
                            checked={formData.hostelRequired === 'No'}
                            onChange={handleChange}
                          />
                          {isMr ? 'नाही (No / Day Scholar)' : 'No (Day Scholar)'}
                        </label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                      <button
                        type="submit"
                        disabled={submitting}
                        style={{
                          background: 'linear-gradient(135deg, #082238 0%, #0d3b66 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '15px 24px',
                          borderRadius: '8px',
                          fontSize: '1.02rem',
                          fontWeight: 800,
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          boxShadow: '0 4px 15px rgba(13, 59, 102, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {submitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin"></i>
                            {isMr ? 'प्रक्रिया सुरू आहे...' : 'Processing...'}
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane"></i>
                            {isMr ? 'प्रवेश अर्ज सबमिट करा' : 'Submit Admission Application'}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Documents Checklist & Helpdesk */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Document Checklist Card */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '30px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: '#fef3c7',
                      color: '#d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                    }}
                  >
                    <i className="fas fa-clipboard-check"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#0d3b66', margin: 0, fontWeight: 700 }}>
                      {isMr ? 'आवश्यक कागदपत्रांची यादी' : 'Required Documents Checklist'}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {isMr ? 'प्रवेशाच्या वेळी मूळ व छायांकित प्रती आवश्यक' : 'Original + 3 sets of photocopies required'}
                    </span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {documents.map((doc, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '0.88rem',
                        color: '#334155',
                        lineHeight: 1.4,
                      }}
                    >
                      <i className="fas fa-check-circle" style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }}></i>
                      <span>{isMr ? doc.mr : doc.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Online Payment Card Promo */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #0d3b66 0%, #1e5288 100%)',
                  borderRadius: '16px',
                  padding: '26px',
                  color: '#ffffff',
                  boxShadow: '0 6px 20px rgba(13, 59, 102, 0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <i className="fas fa-shield-alt" style={{ color: '#ffd166', fontSize: '1.4rem' }}></i>
                  <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
                    {isMr ? 'ऑनलाईन फी भरणा सुविधा (Razorpay)' : 'Instant Online Fee Payment'}
                  </h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5, marginBottom: '16px' }}>
                  {isMr
                    ? 'नोंदणी शुल्क (₹५००), जागा आरक्षण टोकन फी (₹५,०००) किंवा शिक्षण शुल्क थेट UPI, GPay, PhonePe द्वारे भरा आणि अधिकृत पावती मिळवा.'
                    : 'Pay registration fee (₹500), seat booking (₹5,000), or tuition instalment instantly via UPI/Cards with an official receipt.'}
                </p>
                <Link
                  href="/pay"
                  style={{
                    background: '#ffb703',
                    color: '#082238',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <i className="fas fa-arrow-right"></i>
                  {isMr ? 'पेमेंट पोर्टल वर जा' : 'Open Razorpay Fee Portal'}
                </Link>
              </div>

              {/* Direct Helpdesk Card */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <h4 style={{ color: '#0d3b66', fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
                  <i className="fas fa-headset" style={{ color: '#0284c7', marginRight: '8px' }}></i>
                  {isMr ? 'प्रवेश मार्गदर्शन कक्ष (Admissions Desk)' : 'Admissions Counseling Desk'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#475569' }}>
                  <div>
                    <strong>{isMr ? 'फोन:' : 'Call:'}</strong>{' '}
                    <a href="tel:9689486570" style={{ color: '#0d3b66', fontWeight: 700 }}>
                      +91 96894 86570
                    </a>
                  </div>
                  <div>
                    <strong>{isMr ? 'ईमेल:' : 'Email:'}</strong> samarthnursing41@gmail.com
                  </div>
                  <div>
                    <strong>{isMr ? 'कार्यालय वेळ:' : 'Office Hours:'}</strong> Mon - Sat (9:00 AM - 6:00 PM)
                  </div>
                  <div>
                    <strong>{isMr ? 'पत्ता:' : 'Address:'}</strong> Sangamner, Taluka Sangamner, Dist. Ahilyanagar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ELIGIBILITY CRITERIA & INTAKE CAPACITY TABLE */}
      <section id="eligibility" style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span
              style={{
                color: '#0d3b66',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: '#fef3c7',
                padding: '4px 12px',
                borderRadius: '4px',
              }}
            >
              {isMr ? 'कोर्सनिहाय तपशील' : 'Course Details'}
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.1rem',
                color: '#0d3b66',
                marginTop: '10px',
                fontWeight: 700,
              }}
            >
              {isMr ? 'पात्रता निकष व जागांची क्षमता' : 'Eligibility Criteria & Seat Capacity'}
            </h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0',
              }}
            >
              <thead>
                <tr style={{ background: '#0d3b66', color: '#ffffff', textAlign: 'left', fontSize: '0.9rem' }}>
                  <th style={{ padding: '16px 20px' }}>{isMr ? 'अभ्यासक्रम (Course)' : 'Course Program'}</th>
                  <th style={{ padding: '16px 20px' }}>{isMr ? 'कालावधी (Duration)' : 'Duration'}</th>
                  <th style={{ padding: '16px 20px' }}>{isMr ? 'किमान शैक्षणिक पात्रता (Eligibility)' : 'Eligibility Criteria'}</th>
                  <th style={{ padding: '16px 20px' }}>{isMr ? 'जागा क्षमता (Intake)' : 'Intake'}</th>
                </tr>
              </thead>
              <tbody>
                {courseTable.map((c, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid #e2e8f0',
                      background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                      fontSize: '0.9rem',
                    }}
                  >
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: '#0d3b66' }}>
                      {isMr ? c.nameMr : c.nameEn}
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.78rem',
                          color: '#0284c7',
                          fontWeight: 500,
                          marginTop: '4px',
                        }}
                      >
                        {c.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#334155', fontWeight: 600 }}>
                      {isMr ? c.durationMr : c.durationEn}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#475569', maxWidth: '380px', lineHeight: 1.5 }}>
                      {isMr ? c.eligibilityMr : c.eligibilityEn}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          background: '#e0f2fe',
                          color: '#0369a1',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.82rem',
                          display: 'inline-block',
                        }}
                      >
                        {c.intake}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. GOVERNMENT SCHOLARSHIPS SECTION */}
      <section style={{ padding: '50px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  color: '#d97706',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '6px',
                }}
              >
                {isMr ? 'शासकीय शिष्यवृत्ती सहाय्यता' : 'Government Scholarships'}
              </div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#0d3b66',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                {isMr ? 'महाडीबीटी (MahaDBT) शिष्यवृत्ती मार्गदर्शन' : 'MahaDBT Scholarship Guidance & Aid'}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                {isMr
                  ? 'SC, ST, OBC, VJNT, SBC व EBC प्रवर्गातील विद्यार्थ्यांना शासन नियमांनुसार फी सवलत व शिष्यवृत्ती मिळवून देण्यासाठी कॉलेजकडून संपूर्ण फॉर्म भरण्याचे मार्गदर्शन केले जाते.'
                  : 'Eligible students belonging to SC, ST, OBC, VJNT, SBC & EBC categories can avail government fee concession and scholarships through the MahaDBT portal with full guidance from our staff.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <div
                style={{
                  background: '#f1f5f9',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <i className="fas fa-award" style={{ color: '#ffb703' }}></i>
                {isMr ? 'SC / ST १००% फी सवलत' : 'SC / ST 100% Fee Concession'}
              </div>

              <div
                style={{
                  background: '#f1f5f9',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <i className="fas fa-percentage" style={{ color: '#0284c7' }}></i>
                {isMr ? 'OBC / EBC ५०% सवलत' : 'OBC / EBC 50% Concession'}
              </div>

              <div
                style={{
                  background: '#f1f5f9',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <i className="fas fa-hands-helping" style={{ color: '#10b981' }}></i>
                {isMr ? 'अल्पसंख्याक शिष्यवृत्ती' : 'Minority Scholarships'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
