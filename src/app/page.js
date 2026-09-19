'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// Custom Hook for Scroll Triggered Animations
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// Animated Counter with Smooth Easing
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const parsedEnd = parseInt(end.toString().replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * parsedEnd));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [parsedEnd, duration]);

  return (
    <span ref={ref} className="counter-animated">
      {count}{suffix}
    </span>
  );
}

export default function HomePage() {
  useScrollAnimation();
  const { language, t } = useLanguage();
  const isMarathi = language === 'mr';

  // 1. Auto-sliding background carousel
  const [activeSlide, setActiveSlide] = useState(0);
  const heroSlides = [
    '/gallery/gallery-1.jpg',
    '/gallery/gallery-3.jpg',
    '/gallery/gallery-4.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 2. Video Modal State
  const [videoModal, setVideoModal] = useState(false);

  // 3. Typewriter effect for Hero Subtitle
  const [typewriterText, setTypewriterText] = useState('');
  const fullTagline = isMarathi
    ? 'आजच्या विद्यार्थ्यांमध्ये उद्याच्या आरोग्यसेवेची ताकद घडविणे'
    : 'Empowering Young Minds for a Brighter Tomorrow';

  useEffect(() => {
    let index = 0;
    setTypewriterText('');
    const interval = setInterval(() => {
      setTypewriterText(fullTagline.slice(0, index));
      index++;
      if (index > fullTagline.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [fullTagline]);

  // 4. Live Notices State
  const [liveNotices, setLiveNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showAllNoticesModal, setShowAllNoticesModal] = useState(false);
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeCategoryFilter, setNoticeCategoryFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.notices && data.notices.length > 0) {
          setLiveNotices(data.notices);
        }
      })
      .catch((err) => console.error('Failed to load live notices:', err));
  }, []);

  // 5. Live Events State
  const [liveEvents, setLiveEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAllEventsModal, setShowAllEventsModal] = useState(false);
  const [eventSearch, setEventSearch] = useState('');
  const [eventCategoryFilter, setEventCategoryFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.events && data.events.length > 0) {
          setLiveEvents(data.events);
        }
      })
      .catch((err) => console.error('Failed to load live events:', err));
  }, []);

  // 13 Pillars: Why Choose Samarth?
  const whyChooseUsList = [
    {
      icon: 'fa-graduation-cap',
      titleEn: 'Quality-Oriented Nursing Education',
      titleMr: 'गुणवत्तापूर्ण व मूल्याधिष्ठित नर्सिंग शिक्षण',
      descEn: 'Approved curriculum adhering to MSBNPE & MSBTE standards blending core medical theory with clinical discipline.',
      descMr: 'महाराष्ट्र शासन, MSBNPE व MSBTE मानकांनुसार दर्जेदार अभ्यासक्रम, सखोल ज्ञान आणि वैद्यकीय नीतिमूल्यांची शिकवण.',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      icon: 'fa-user-nurse',
      titleEn: 'Student-Centred Teaching & Learning',
      titleMr: 'विद्यार्थी-केंद्रित अध्यापन व मार्गदर्शन',
      descEn: 'Personalized mentoring, interactive smart classrooms, and supportive faculty ensuring individual academic progress.',
      descMr: 'प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष, संवादात्मक अध्यापन पद्धती आणि सातत्यपूर्ण शैक्षणिक प्रगतीचे मार्गदर्शन.',
      color: '#16a34a',
      bgLight: '#dcfce7',
    },
    {
      icon: 'fa-hospital-alt',
      titleEn: 'Clinical & Practical Learning Exposure',
      titleMr: 'रुग्णालयांमध्ये प्रत्यक्ष क्लिनिकल अनुभव',
      descEn: 'Direct hands-on bedside patient care training in multi-specialty affiliated hospitals and emergency trauma centers.',
      descMr: 'अग्रगण्य मल्टि-स्पेशालिटी रुग्णालये, आयसीयू आणि आपत्कालीन कक्षांमध्ये प्रत्यक्ष रुग्णसेवेचा सखोल अनुभव.',
      color: '#dc2626',
      bgLight: '#fee2e2',
    },
    {
      icon: 'fa-flask',
      titleEn: 'Well-Equipped Nursing Laboratories',
      titleMr: 'सुसज्ज व अद्ययावत नर्सिंग प्रयोगशाळा',
      descEn: 'Advanced Nursing Foundation, Nutrition, Anatomy, Community Health, and Maternal & Child Health practical labs.',
      descMr: 'नर्सिंग फाउंडेशन, मानवी शरीररचना (अ‍ॅनाटॉमी), पोषणशास्त्र आणि बालसंगोपन विषयांच्या आधुनिक प्रात्यक्षिक लॅब्ज.',
      color: '#0d3b66',
      bgLight: '#e2e8f0',
    },
    {
      icon: 'fa-book-reader',
      titleEn: 'Library & Digital Learning Resources',
      titleMr: 'समृद्ध ग्रंथालय व डिजिटल शिक्षण संसाधने',
      descEn: 'Rich repository of nursing, medical textbooks, national journals, and quiet reading halls for focused research.',
      descMr: 'वैद्यकीय व नर्सिंग संदर्भांची विपुल पुस्तके, जर्नल्स, ई-पुस्तके आणि एकाग्र अभ्यासासाठी वातानुकूलित ग्रंथालय.',
      color: '#9333ea',
      bgLight: '#f3e8ff',
    },
    {
      icon: 'fa-chalkboard-teacher',
      titleEn: 'Smart & Technology-Enabled Learning',
      titleMr: 'स्मार्ट व तंत्रज्ञानाधारित डिजिटल शिक्षण',
      descEn: 'Audio-visual smart rooms, digital presentation projectors, and multimedia demonstrations for modern pedagogy.',
      descMr: 'आधुनिक प्रोजेक्टर, दृकश्राव्य साधने आणि डिजिटल तंत्रज्ञानाचा वापर करून दिलेले प्रभावी व रंजक शिक्षण.',
      color: '#ea580c',
      bgLight: '#ffedd5',
    },
    {
      icon: 'fa-wifi',
      titleEn: 'Wi-Fi & Internet Connectivity',
      titleMr: 'हाय-स्पीड इंटरनेट व वाय-फाय सुविधा',
      descEn: 'Campus-wide broadband connectivity allowing seamless online research and digital reference material access.',
      descMr: 'अखंडित इंटरनेट कनेक्टिव्हिटी, ज्यामुळे विद्यार्थ्यांना ऑनलाइन अभ्यास साहित्य व संशोधन सहज उपलब्ध होते.',
      color: '#2563eb',
      bgLight: '#dbeafe',
    },
    {
      icon: 'fa-hotel',
      titleEn: 'Hostel & Student Support Facilities',
      titleMr: 'सुरक्षित वसतिगृह व विद्यार्थी सहाय्य व्यवस्था',
      descEn: 'Safe residential living, nutritious dining mess, continuous warden supervision, and a home-like caring environment.',
      descMr: 'सुरक्षित व आरामदायी वसतिगृह, सकस मेस भोजन, २४ तास वॉर्डन देखरेख आणि घरगुती काळजीचे वातावरण.',
      color: '#e11d48',
      bgLight: '#ffe4e6',
    },
    {
      icon: 'fa-shield-alt',
      titleEn: 'Safe & Secure Campus Environment',
      titleMr: 'सुरक्षित व शिस्तबद्ध परिसर आणि सीसीटीव्ही सुरक्षा',
      descEn: '24/7 security personnel, gated surveillance, CCTV cameras, and strict ragging-free code of conduct.',
      descMr: 'संपूर्ण कॅम्पसमध्ये २४ तास सुरक्षा रक्षक, सीसीटीव्ही कॅमेरे आणि संपूर्णतः रॅगिंगमुक्त, सुरक्षित वातावरण.',
      color: '#059669',
      bgLight: '#d1fae5',
    },
    {
      icon: 'fa-brain',
      titleEn: 'Academic Guidance & Mentorship',
      titleMr: 'वैयक्तिक शैक्षणिक मार्गदर्शन व मेन्टॉरशिप',
      descEn: 'Personal counseling, exam coaching, remedial sessions, and moral encouragement by dedicated senior faculty.',
      descMr: 'अनुभवी प्राध्यापकांचे वैयक्तिक समुपदेशन, अभ्यास नियोजन, परीक्षा मार्गदर्शन आणि करिअर समुपदेशन.',
      color: '#7c3aed',
      bgLight: '#ede9fe',
    },
    {
      icon: 'fa-stethoscope',
      titleEn: 'Skill Development & Clinical Competency',
      titleMr: 'कौशल्य विकास व व्यावसायिक सक्षमता',
      descEn: 'Vital assessments, CPR emergency response, patient communication skills, and bedside compassionate care.',
      descMr: 'रुग्णांशी संवाद कौशल्य, आपत्कालीन सीपीआर प्रशिक्षण आणि थेट वैद्यकीय कार्यपद्धतींची परिपूर्ण तयारी.',
      color: '#d97706',
      bgLight: '#fef3c7',
    },
    {
      icon: 'fa-hand-holding-heart',
      titleEn: 'Community Health & Social Responsibility',
      titleMr: 'सामाजिक आरोग्य सेवा व समाजसेवेची बांधिलकी',
      descEn: 'Regular rural health checkup camps, pulse polio drives, blood donation events, and public disease prevention campaigns.',
      descMr: 'ग्रामीण आरोग्य शिबिरे, मोफत तपासणी, रक्तदान मोहिमा आणि जनआरोग्य जागृतीद्वारे समाजात सेवेचा वसा.',
      color: '#0284c7',
      bgLight: '#e0f2fe',
    },
    {
      icon: 'fa-trophy',
      titleEn: 'Co-Curricular & Personality Development Activities',
      titleMr: 'सहशालेय उपक्रम व सर्वांगीण व्यक्तिमत्त्व विकास',
      descEn: 'Sports tournaments, cultural festivals, SNA leadership councils, public speaking, and personality development.',
      descMr: 'वार्षिक क्रीडा स्पर्धा, सांस्कृतिक सोहळे, वक्तृत्व स्पर्धा आणि कलागुणांना वाव देणारे विविध उपक्रम.',
      color: '#ffb703',
      bgLight: '#fef3c7',
    },
  ];

  return (
    <div className="front-page-container">
      {/* Floating Decorative Dots */}
      <div className="ultra-float-dot" style={{ top: '15%', left: '4%', width: '12px', height: '12px' }}></div>
      <div className="ultra-float-dot" style={{ top: '40%', right: '6%', width: '16px', height: '16px', animationDelay: '2.5s' }}></div>
      <div className="ultra-float-dot" style={{ bottom: '20%', left: '10%', width: '10px', height: '10px', animationDelay: '5s' }}></div>

      {/* ========================================================
          1. HERO SECTION (SPLIT MODERN UNIVERSITY BANNER)
          ======================================================== */}
      <section className="mockup-hero-section">
        {/* Background Image Carousel with Crossfade & Solid Dark Overlay */}
        <div className="hero-bg-layer">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === activeSlide ? 'hero-slide-active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
          <div className="hero-gradient-overlay-dark"></div>
        </div>

        <div className="hero-left-layout">
          <div className="hero-glass-panel">
            <div className="hero-pill-badge">
              <i className="fas fa-award"></i>
              <span>{isMarathi ? 'महाराष्ट्र शासन मान्यताप्राप्त • MSBNPE व MSBTE संलग्नित' : 'Govt. Recognized • MSBNPE & MSBTE Affiliated'}</span>
            </div>

            <div className="hero-heading-group">
              <span className="hero-kicker-text">
                {isMarathi ? 'ज्ञान, सेवा आणि समर्पण' : 'Empowering Healthcare Careers'}
              </span>
              <h1 className="hero-title-refined">
                <span className="hero-name-gold">{isMarathi ? 'समर्थ कॉलेज ऑफ नर्सिंग' : 'Samarth College of Nursing'}</span>
                <span className="hero-location-text">{isMarathi ? 'संगमनेर, अहिल्यानगर' : 'Sangamner, Ahilyanagar'}</span>
              </h1>
            </div>

            <p className="hero-typewriter-tagline">
              <i className="fas fa-quote-left" style={{ opacity: 0.6, marginRight: '8px' }}></i>
              {typewriterText}
              <span className="cursor-blink">|</span>
            </p>

            <p className="hero-description-text">
              {isMarathi
                ? 'आधुनिक वैद्यकीय पायाभूत सुविधा, सुसज्ज प्रयोगशाळा आणि अग्रगण्य रुग्णालयांमध्ये थेट प्रत्यक्ष क्लिनिकल अनुभवासह दर्जेदार नर्सिंग शिक्षण.'
                : 'Providing high-quality nursing education, advanced lab infrastructure, and extensive hospital clinical rotations to build rewarding careers in healthcare.'}
            </p>

            {/* 4 Feature Checkmarks */}
            <div className="hero-checkmarks-grid">
              <div className="hero-check-item">
                <i className="fas fa-check-circle"></i>
                <span>{isMarathi ? 'प्रत्यक्ष रुग्णालय क्लिनिकल ट्रेनिंग' : 'Hospital Clinical Rotations'}</span>
              </div>
              <div className="hero-check-item">
                <i className="fas fa-check-circle"></i>
                <span>{isMarathi ? 'अद्ययावत सिम्युलेशन लॅब्स' : 'Advanced Nursing Labs'}</span>
              </div>
              <div className="hero-check-item">
                <i className="fas fa-check-circle"></i>
                <span>{isMarathi ? 'महाडीबीटी शिष्यवृत्ती मार्गदर्शन' : 'MahaDBT Scholarship Guidance'}</span>
              </div>
              <div className="hero-check-item">
                <i className="fas fa-check-circle"></i>
                <span>{isMarathi ? 'सुरक्षित वसतिगृह (मुले/मुली)' : 'Hostel Accommodation (Boys/Girls)'}</span>
              </div>
            </div>

            <div className="hero-action-row">
              <Link href="/admission#form" className="btn-hero-primary-gold">
                <i className="fas fa-edit"></i> {isMarathi ? 'प्रवेश अर्ज भरा २०२६-२७' : 'Apply for Admission 2026-27'} &rarr;
              </Link>
              <Link href="/courses" className="btn-hero-secondary-glass">
                <i className="fas fa-graduation-cap"></i> {t('heroExploreCourses')}
              </Link>
            </div>

            {/* Slide Navigation Dots */}
            <div className="hero-slide-dots">
              <span className="slide-dots-label">{isMarathi ? 'गॅलरी' : 'Campus Glimpses'}:</span>
              {heroSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveSlide(dotIdx)}
                  className={`hero-dot-btn ${dotIdx === activeSlide ? 'active' : ''}`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Organic Flowing Wave Divider (Kautike Foundation Style) */}
        <div className="hero-organic-wave-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="hero-organic-wave-svg">
            <path
              d="M0,45 C320,90 520,15 780,50 C1040,85 1260,20 1440,40 L1440,100 L0,100 Z"
              fill="rgba(255, 183, 3, 0.25)"
            />
            <path
              d="M0,30 C280,75 480,5 720,38 C960,70 1200,10 1440,28 L1440,100 L0,100 Z"
              className="organic-wave-fill"
            />
          </svg>
        </div>
      </section>

      {/* ========================================================
          2. ADMISSIONS & DIPLOMA COURSES CARD (BELOW HERO)
          ======================================================== */}
      <section className="admissions-below-hero-section">
        <div className="container">
          <div className="hero-admission-card-below animate-on-scroll" data-animation="fade-up">
            <div className="admission-card-header-center">
              <div className="admission-badge-live">
                <span className="live-dot"></span>
                <span>{isMarathi ? 'प्रवेश प्रक्रिया सुरू २०२६-२७' : 'Admissions Open 2026-27'}</span>
              </div>
              <h2 className="admission-card-title-lg">
                {isMarathi ? 'डिप्लोमा व पॅरामेडिकल कोर्सेस प्रवेश' : (
                  <>Professional Nursing <span className="clean-ampersand">&amp;</span> <span className="title-gold-accent">Paramedical Courses</span></>
                )}
              </h2>
              <p className="admission-card-sub-lg">
                {isMarathi
                  ? 'स्वामी समर्थ + ॐ गगनगिरी फाउंडेशन संचालित • महाराष्ट्र शासन, MSBNPE व MSBTE मुंबई संलग्नित'
                  : 'Run by Swami Samarth + Om Gagangiri Foundation • Affiliated to MSBNPE & MSBTE Mumbai'}
              </p>
            </div>

            <div className="admission-courses-grid">
              {/* GNM */}
              <Link href="/courses/gnm" className="hero-course-item-card">
                <div className="hero-course-icon-lg" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                  <i className="fas fa-user-nurse"></i>
                </div>
                <div className="hero-course-details-lg">
                  <h4>GNM (General Nursing <span className="clean-ampersand-navy">&amp;</span> Midwifery)</h4>
                  <div className="course-spec-pills">
                    <span><i className="fas fa-clock"></i> 3 Years</span>
                    <span><i className="fas fa-user-check"></i> 12th Any Stream / PCB</span>
                  </div>
                  <p className="course-affil">Affiliated to MSBNPE Mumbai</p>
                </div>
                <span className="course-arrow-pill">View Details &rarr;</span>
              </Link>

              {/* ANM */}
              <Link href="/courses/anm" className="hero-course-item-card">
                <div className="hero-course-icon-lg" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                  <i className="fas fa-clinic-medical"></i>
                </div>
                <div className="hero-course-details-lg">
                  <h4>ANM (Auxiliary Nursing <span className="clean-ampersand-navy">&amp;</span> Midwifery)</h4>
                  <div className="course-spec-pills">
                    <span><i className="fas fa-clock"></i> 2 Years</span>
                    <span><i className="fas fa-user-check"></i> 12th Pass</span>
                  </div>
                  <p className="course-affil">Affiliated to MSBNPE Mumbai</p>
                </div>
                <span className="course-arrow-pill">View Details &rarr;</span>
              </Link>

              {/* ADMLT */}
              <Link href="/courses/admlt" className="hero-course-item-card">
                <div className="hero-course-icon-lg" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                  <i className="fas fa-vial"></i>
                </div>
                <div className="hero-course-details-lg">
                  <h4>ADMLT (Medical Lab Technician)</h4>
                  <div className="course-spec-pills">
                    <span><i className="fas fa-clock"></i> 1.5 Years</span>
                    <span><i className="fas fa-user-check"></i> B.Sc / 12th Sci</span>
                  </div>
                  <p className="course-affil">Affiliated to MSBTE Mumbai</p>
                </div>
                <span className="course-arrow-pill">View Details &rarr;</span>
              </Link>
            </div>

            <div className="admission-card-perks-row">
              <span><i className="fas fa-check-circle"></i> {isMarathi ? 'स्वतंत्र वसतिगृह सुविधा (मुले व मुली)' : 'Separate Hostel Facility for Boys & Girls'}</span>
              <span><i className="fas fa-check-circle"></i> {isMarathi ? 'महाडीबीटी १००% शासकीय शिष्यवृत्ती मार्गदर्शन' : 'MahaDBT Govt Scholarship Guidance'}</span>
              <span><i className="fas fa-check-circle"></i> {isMarathi ? 'मल्टि-स्पेशालिटी हॉस्पिटल क्लिनिकल ट्रेनिंग' : 'Hospital Bedside Clinical Rotations'}</span>
            </div>

            <div className="admission-card-action-center">
              <Link href="/contact" className="btn-admission-apply-lg">
                <i className="fas fa-file-signature"></i> {isMarathi ? 'थेट प्रवेश चौकशी अर्ज भरा' : 'Submit Admission Enquiry Online'} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          LIVE NOTICE FLASH / TICKER STRIP (ON HOMEPAGE)
          ======================================================== */}
      {liveNotices.length > 0 && (
        <div style={{ backgroundColor: '#071829', borderTop: '1px solid #1e3a5f', borderBottom: '1px solid #1e3a5f', padding: '10px 0', color: '#ffffff', position: 'relative', zIndex: 10 }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: '#dc2626', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-bullhorn"></i> {isMarathi ? 'ताजी सूचना' : 'Latest Notice'}
            </span>
            <div
              onClick={() => setSelectedNotice(liveNotices[0])}
              style={{ cursor: 'pointer', flex: 1, minWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.92rem', color: '#f8fafc' }}
              title={liveNotices[0].title}
            >
              <strong style={{ color: '#fbbf24', marginRight: '6px' }}>[{liveNotices[0].category || 'Update'}]:</strong>
              {liveNotices[0].title}
              <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#38bdf8', textDecoration: 'underline' }}>
                {isMarathi ? 'सविस्तर वाचा →' : 'Read Details →'}
              </span>
            </div>
            <a
              href="#notices"
              style={{ fontSize: '0.84rem', color: '#cbd5e1', textDecoration: 'none', flexShrink: 0, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{isMarathi ? 'सर्व सूचना फलक' : 'All Notices'}</span> &darr;
            </a>
          </div>
        </div>
      )}

      {/* ========================================================
          2. OVERLAPPING 5-FEATURE STRIP
          ======================================================== */}
      <section className="feature-ribbon-section">
        <div className="container">
          <div className="feature-ribbon-card animate-on-scroll" data-animation="zoom-in">
            <div className="ribbon-item">
              <div className="ribbon-icon-circle blue-1">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="ribbon-text">
                <strong>{t('featQualityEdu')}</strong>
                <span>{t('featQualityEduSub')}</span>
              </div>
            </div>

            <div className="ribbon-item">
              <div className="ribbon-icon-circle blue-2">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <div className="ribbon-text">
                <strong>{t('featFaculty')}</strong>
                <span>{t('featFacultySub')}</span>
              </div>
            </div>

            <div className="ribbon-item">
              <div className="ribbon-icon-circle blue-3">
                <i className="fas fa-hospital-alt"></i>
              </div>
              <div className="ribbon-text">
                <strong>{t('featInfra')}</strong>
                <span>{t('featInfraSub')}</span>
              </div>
            </div>

            <div className="ribbon-item">
              <div className="ribbon-icon-circle blue-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="ribbon-text">
                <strong>{t('featCareer')}</strong>
                <span>{t('featCareerSub')}</span>
              </div>
            </div>

            <div className="ribbon-item">
              <div className="ribbon-icon-circle blue-5">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="ribbon-text">
                <strong>{t('featSafe')}</strong>
                <span>{t('featSafeSub')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. ABOUT US SECTION (CLEAN 2-COLUMN SPLIT - NO PHOTO CONFLICT)
          ======================================================== */}
      <section className="mockup-about-section">
        <div className="container">
          <div className="about-main-split-grid animate-on-scroll" data-animation="fade-up">
            {/* Left Column: Story, Stats & CTA */}
            <div className="about-story-col">
              <div className="section-pill-tag">{t('aboutPill')}</div>
              <h2 className="about-section-heading">
                {t('aboutHeading')}
              </h2>
              <p className="about-body-text">
                {t('aboutBody')}
              </p>

              {/* 4 Counter Stats in 2x2 Grid */}
              <div className="about-stats-grid">
                <div className="stat-box">
                  <div className="stat-icon gold"><i className="fas fa-hotel"></i></div>
                  <div className="stat-number" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                    {isMarathi ? 'उपलब्ध' : 'Available'}
                  </div>
                  <div className="stat-label">{t('aboutStatHostel')}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon yellow"><i className="fas fa-user-graduate"></i></div>
                  <div className="stat-number">
                    <AnimatedCounter end="400" suffix="+" />
                  </div>
                  <div className="stat-label">{t('aboutStatStudents')}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon gold"><i className="fas fa-user-md"></i></div>
                  <div className="stat-number">
                    <AnimatedCounter end="30" suffix="+" />
                  </div>
                  <div className="stat-label">{t('aboutStatFaculty')}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon yellow"><i className="fas fa-book-medical"></i></div>
                  <div className="stat-number">
                    <AnimatedCounter end="03" suffix="+" />
                  </div>
                  <div className="stat-label">{t('aboutStatCourses')}</div>
                </div>
              </div>

              <div className="about-cta-wrapper">
                <Link href="/about" className="btn-know-more">
                  {t('aboutKnowMore')} &nbsp;&rarr;
                </Link>
              </div>
            </div>

            {/* Right Column: Vision, Mission & Values Stack */}
            <div className="about-vmv-col">
              <div className="vmv-card vision-highlight">
                <div className="vmv-icon-circle vision-circle">
                  <i className="fas fa-eye"></i>
                </div>
                <div className="vmv-content">
                  <h3>{t('visionTitle')}</h3>
                  <p>{t('visionDesc')}</p>
                </div>
              </div>

              <div className="vmv-card mission-highlight">
                <div className="vmv-icon-circle mission-circle">
                  <i className="fas fa-bullseye"></i>
                </div>
                <div className="vmv-content">
                  <h3>{t('missionTitle')}</h3>
                  <p>{t('missionDesc')}</p>
                </div>
              </div>

              <div className="vmv-card values-highlight">
                <div className="vmv-icon-circle values-circle">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="vmv-content">
                  <h3>{t('valuesTitle')}</h3>
                  <p>{t('valuesDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. COURSES SECTION: "CHOOSE YOUR PATH" (MODERN 4-CARD SHOWCASE WITH ORGANIC WAVE DIVIDERS)
          ======================================================== */}
      <section className="mockup-courses-section">
        {/* Top Organic Wave Divider (Smooth transition from White About Section) */}
        <div className="section-wave-divider top">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="section-wave-svg">
            <path
              d="M0,0 C320,50 640,10 960,45 C1200,65 1360,20 1440,35 L1440,0 L0,0 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          {/* Section Header */}
          <div className="courses-section-header animate-on-scroll" data-animation="fade-up">
            <div className="section-pill-tag light">{t('coursesPill')}</div>
            <h2 className="courses-main-heading">{t('coursesHeading')}</h2>
            <p className="courses-sub-text">
              {t('coursesSub')}
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="navy-courses-grid">
            {/* Card 1: GNM */}
            <div className="navy-course-card animate-on-scroll" data-animation="fade-up" data-delay="100">
              <div className="navy-card-top-row">
                <div className="navy-card-icon blue-icon">
                  <i className="fas fa-user-nurse"></i>
                </div>
                <span className="navy-card-badge">MSBNPE</span>
              </div>
              <h3 className="navy-course-title">GNM</h3>
              <p className="navy-course-desc">{t('gnmName')}</p>
              <div className="navy-course-specs">
                <div className="spec-row">
                  <i className="fas fa-clock"></i>
                  <span><strong>{isMarathi ? 'कालावधी' : 'Duration'}:</strong> 3 {isMarathi ? 'वर्षे' : 'Years'}</span>
                </div>
                <div className="spec-row">
                  <i className="fas fa-user-graduate"></i>
                  <span><strong>{isMarathi ? 'पात्रता' : 'Eligibility'}:</strong> 12th Any / PCB</span>
                </div>
                <div className="spec-row">
                  <i className="fas fa-hospital-alt"></i>
                  <span><strong>{isMarathi ? 'प्रशिक्षण' : 'Clinical'}:</strong> ICU & Bedside Care</span>
                </div>
              </div>
              <Link href="/courses/gnm" className="btn-navy-explore">
                <span>{isMarathi ? 'कोर्स सविस्तर माहिती' : 'Explore GNM Course'}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 2: ANM */}
            <div className="navy-course-card animate-on-scroll" data-animation="fade-up" data-delay="200">
              <div className="navy-card-top-row">
                <div className="navy-card-icon green-icon">
                  <i className="fas fa-clinic-medical"></i>
                </div>
                <span className="navy-card-badge">MSBNPE</span>
              </div>
              <h3 className="navy-course-title">ANM</h3>
              <p className="navy-course-desc">{t('anmName')}</p>
              <div className="navy-course-specs">
                <div className="spec-row">
                  <i className="fas fa-clock"></i>
                  <span><strong>{isMarathi ? 'कालावधी' : 'Duration'}:</strong> 2 {isMarathi ? 'वर्षे' : 'Years'}</span>
                </div>
                <div className="spec-row">
                  <i className="fas fa-user-graduate"></i>
                  <span><strong>{isMarathi ? 'पात्रता' : 'Eligibility'}:</strong> 12th Pass</span>
                </div>
                <div className="spec-row">
                  <i className="fas fa-baby"></i>
                  <span><strong>{isMarathi ? 'प्रशिक्षण' : 'Field'}:</strong> Maternal Health</span>
                </div>
              </div>
              <Link href="/courses/anm" className="btn-navy-explore">
                <span>{isMarathi ? 'कोर्स सविस्तर माहिती' : 'Explore ANM Course'}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 3: ADMLT */}
            <div className="navy-course-card animate-on-scroll" data-animation="fade-up" data-delay="300">
              <div className="navy-card-top-row">
                <div className="navy-card-icon amber-icon">
                  <i className="fas fa-vial"></i>
                </div>
                <span className="navy-card-badge">MSBTE</span>
              </div>
              <h3 className="navy-course-title">ADMLT</h3>
              <p className="navy-course-desc">{t('admltName')}</p>
              <div className="navy-course-specs">
                <div className="spec-row">
                  <i className="fas fa-clock"></i>
                  <span><strong>{isMarathi ? 'कालावधी' : 'Duration'}:</strong> 1.5 {isMarathi ? 'वर्षे' : 'Years'}</span>
                </div>
                <div className="spec-row">
                  <i className="fas fa-user-graduate"></i>
                  <span><strong>{isMarathi ? 'पात्रता' : 'Eligibility'}:</strong> B.Sc / 12th Sci</span>
                </div>
                <div className="spec-row">
                  <i className="fas fa-microscope"></i>
                  <span><strong>{isMarathi ? 'प्रशिक्षण' : 'Lab'}:</strong> Pathology Diagnostics</span>
                </div>
              </div>
              <Link href="/courses/admlt" className="btn-navy-explore">
                <span>{isMarathi ? 'कोर्स सविस्तर माहिती' : 'Explore ADMLT Course'}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 4: Clinical Training */}
            <div className="navy-course-card animate-on-scroll" data-animation="fade-up" data-delay="400">
              <div className="navy-card-top-row">
                <div className="navy-card-icon purple-icon">
                  <i className="fas fa-stethoscope"></i>
                </div>
                <span className="navy-card-badge">HOSPITAL</span>
              </div>
              <h3 className="navy-course-title">Clinical</h3>
              <p className="navy-course-desc">{t('clinicalName')}</p>
              <div className="navy-course-specs">
                <div className="spec-row">
                  <i className="fas fa-clock"></i>
                  <span><strong>{isMarathi ? 'प्रशिक्षण' : 'Training'}:</strong> Daily Patient Care</span>
                </div>
                <div className="spec-row">
                  <i className="fas fa-procedures"></i>
                  <span><strong>{isMarathi ? 'कक्षा' : 'Units'}:</strong> ICU, OT, Emergency</span>
                </div>
                <div className="spec-row">
                  <i className="fas fa-award"></i>
                  <span><strong>{isMarathi ? 'अनुभव' : 'Partner'}:</strong> Multi-Specialty</span>
                </div>
              </div>
              <Link href="/facilities" className="btn-navy-explore">
                <span>{isMarathi ? 'क्लिनिकल सुविधा पहा' : 'View Clinical Facilities'}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="navy-courses-cta-row animate-on-scroll" data-animation="fade-up" data-delay="500">
            <Link href="/courses" className="btn-navy-primary-gold">
              <i className="fas fa-graduation-cap"></i> {t('coursesViewAll')} &rarr;
            </Link>
            <Link href="/admission" className="btn-navy-secondary-glass">
              <i className="fas fa-file-signature"></i> {isMarathi ? 'थेट प्रवेश प्रक्रिया २०२४-२५' : 'Direct Admission 2024-25'}
            </Link>
          </div>
        </div>

        {/* Bottom Organic Wave Divider (Smooth transition to Why Choose Section) */}
        <div className="section-wave-divider bottom">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="section-wave-svg">
            <path
              d="M0,35 C320,65 640,15 960,50 C1200,70 1360,25 1440,40 L1440,70 L0,70 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ========================================================
          4B. WHY CHOOSE SAMARTH? (13 PILLARS OF EXCELLENCE)
          ======================================================== */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '60px 0 20px' }}>
        <div className="container">
          <div className="section-header-center animate-on-scroll" data-animation="fade-up" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px' }}>
            <div className="section-pill-tag">
              {isMarathi ? '🌟 समर्थ कॉलेजच का?' : '🌟 WHY CHOOSE SAMARTH?'}
            </div>
            <h2 style={{ fontSize: '2.3rem', color: '#0d3b66', margin: '10px 0 14px' }}>
              {isMarathi ? 'विद्यार्थी-केंद्रित व गुणवत्तापूर्ण आरोग्य शिक्षण' : 'Why Choose Samarth College of Nursing?'}
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
              {isMarathi
                ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे विद्यार्थ्यांना गुणवत्तापूर्ण नर्सिंग शिक्षणासोबत ज्ञान, कौशल्य, शिस्त, आत्मविश्वास आणि सेवाभाव विकसित करण्यासाठी विद्यार्थी-केंद्रित शैक्षणिक वातावरण उपलब्ध करून देण्याचा प्रयत्न केला जातो.'
                : 'At Samarth College of Nursing, Sangamner, we are dedicated to providing student-centred healthcare education, fostering knowledge, clinical excellence, discipline, confidence, and compassionate service.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '22px',
            }}
          >
            {whyChooseUsList.map((item, idx) => (
              <div
                key={idx}
                className="why-pillar-card animate-on-scroll"
                data-animation="fade-up"
                data-delay={`${(idx % 4 + 1) * 100}`}
              >
                <div className="why-pillar-header">
                  <div
                    className="why-pillar-icon"
                    style={{
                      backgroundColor: item.bgLight,
                      color: item.color,
                    }}
                  >
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="why-pillar-title-wrap">
                    <span className="why-pillar-num-badge">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="why-pillar-title">
                      {isMarathi ? item.titleMr : (
                        item.titleEn.includes('&') ? (
                          item.titleEn.split('&').map((part, pIdx, arr) => (
                            <span key={pIdx}>
                              {part.trim()}
                              {pIdx < arr.length - 1 && <span className="clean-ampersand-navy">&amp;</span>}
                            </span>
                          ))
                        ) : item.titleEn
                      )}
                    </h3>
                  </div>
                </div>
                <p className="why-pillar-desc">
                  {isMarathi ? item.descMr : item.descEn}
                </p>
              </div>
            ))}
          </div>

          <div className="why-pillars-cta-row animate-on-scroll" data-animation="fade-up" data-delay="500">
            <Link href="/about" className="btn-why-explore-primary">
              <i className="fas fa-university"></i>
              <span>{isMarathi ? 'समर्थ कॉलेजविषयी सविस्तर जाणून घ्या' : 'Learn More About Samarth Institute'}</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. LEADERSHIP & PRINCIPALS' DESK
          ======================================================== */}
      <section className="principals-dual-section">
        <div className="container">
          <div className="section-header-center animate-on-scroll" data-animation="fade-up">
            <div className="section-pill-tag">{t('leadershipPill')}</div>
            <h2 className="principals-section-title">{t('leadershipHeading')}</h2>
            <p className="principals-section-subtitle">
              {t('leadershipSub')}
            </p>
          </div>

          <div className="principals-grid">
            {/* Card 1: GNM Principal */}
            <div className="principal-card-modern gnm-leader-card animate-on-scroll" data-animation="fade-right">
              <div className="principal-top-identity">
                <div className="principal-photo-ring gnm-ring">
                  <div className="principal-avatar-img-box">
                    <Image
                      src="/images/leadership/principal-gnm-headshot.jpg"
                      alt="Mrs. Sayyed Firdosh Gulab"
                      fill
                      sizes="100px"
                      style={{ objectFit: 'cover', objectPosition: 'center 12%' }}
                    />
                  </div>
                  <span className="principal-avatar-mini-badge gnm-badge">
                    <i className="fas fa-award"></i>
                  </span>
                </div>
                <div className="principal-title-block">
                  <span className="principal-course-badge gnm-badge">
                    <i className="fas fa-graduation-cap"></i> GNM Course
                  </span>
                  <h3 className="principal-name">{t('gnmPrincipalName')}</h3>
                  <div className="principal-designation">{t('gnmPrincipalDesig')}</div>
                </div>
              </div>

              <div className="principal-exp-row">
                <div className="principal-exp-item">
                  <strong>12+ {isMarathi ? 'वर्षे' : 'Yrs'}</strong>
                  <span>{isMarathi ? 'क्लिनिकल' : 'Clinical Exp'}</span>
                </div>
                <div className="principal-exp-item">
                  <strong>10+ {isMarathi ? 'वर्षे' : 'Yrs'}</strong>
                  <span>{isMarathi ? 'अध्यापन' : 'Teaching'}</span>
                </div>
                <div className="principal-exp-item">
                  <strong>PB B.Sc</strong>
                  <span>{isMarathi ? 'पात्रता' : 'Nursing'}</span>
                </div>
              </div>

              <p className="principal-quote-snippet">
                {t('gnmPrincipalQuote')}
              </p>

              <Link href="/about/principal-gnm" className="principal-read-link">
                <span>{t('readFullMessage')}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 2: ANM Principal */}
            <div className="principal-card-modern anm-leader-card animate-on-scroll" data-animation="fade-left">
              <div className="principal-top-identity">
                <div className="principal-photo-ring anm-ring">
                  <div className="principal-avatar-img-box">
                    <Image
                      src="/images/leadership/principal-anm-headshot.jpg"
                      alt="Raghatate Pooja Tarachand"
                      fill
                      sizes="100px"
                      style={{ objectFit: 'cover', objectPosition: 'center 12%' }}
                    />
                  </div>
                  <span className="principal-avatar-mini-badge anm-badge">
                    <i className="fas fa-award"></i>
                  </span>
                </div>
                <div className="principal-title-block">
                  <span className="principal-course-badge anm-badge">
                    <i className="fas fa-graduation-cap"></i> ANM Course
                  </span>
                  <h3 className="principal-name">{t('anmPrincipalName')}</h3>
                  <div className="principal-designation">{t('anmPrincipalDesig')}</div>
                </div>
              </div>

              <div className="principal-exp-row">
                <div className="principal-exp-item">
                  <strong>3+ {isMarathi ? 'वर्षे' : 'Yrs'}</strong>
                  <span>{isMarathi ? 'क्लिनिकल' : 'Clinical Exp'}</span>
                </div>
                <div className="principal-exp-item">
                  <strong>12+ {isMarathi ? 'वर्षे' : 'Yrs'}</strong>
                  <span>{isMarathi ? 'अध्यापन' : 'Teaching'}</span>
                </div>
                <div className="principal-exp-item">
                  <strong>{isMarathi ? 'तज्ज्ञ' : 'Expert'}</strong>
                  <span>{isMarathi ? 'मिडवायफ्री' : 'Midwifery'}</span>
                </div>
              </div>

              <p className="principal-quote-snippet">
                {t('anmPrincipalQuote')}
              </p>

              <Link href="/about/principal-anm" className="principal-read-link">
                <span>{t('readFullMessage')}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. 3-COLUMN UPDATES & GALLERY SECTION
          ======================================================== */}
      <section className="mockup-updates-section" id="notices">
        <div className="container updates-3col-grid">
          {/* Column 1: Latest Notices */}
          <div className="updates-column animate-on-scroll" data-animation="fade-up" data-delay="100">
            <div className="column-header-row">
              <h3 className="column-title">
                <i className="fas fa-bullhorn text-blue" style={{ marginRight: '8px' }}></i> {t('noticesTitle')}
              </h3>
              <button
                type="button"
                onClick={() => setShowAllNoticesModal(true)}
                className="view-all-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: 0 }}
                title={isMarathi ? 'सर्व सूचना पहा' : 'View all notices'}
              >
                {t('viewAll')} &rarr;
              </button>
            </div>

            <div className="notice-item-list">
              {(liveNotices.length > 0 ? liveNotices.slice(0, 4) : [
                {
                  id: 'n1',
                  title: isMarathi ? 'शैक्षणिक वर्ष २०२६-२७ साठी थेट प्रवेश सुरू' : 'Admission Open for Academic Year 2026-27',
                  content: isMarathi ? 'GNM, ANM आणि ADMLT अभ्यासक्रमांसाठी थेट अर्ज व समुपदेशन सुरू.' : 'Applications invited for GNM, ANM & ADMLT batches. Direct counseling available.',
                  category: 'Admission',
                  createdAt: new Date().toISOString(),
                },
                {
                  id: 'n2',
                  title: isMarathi ? 'MSBNPE व MSBTE परीक्षा अर्ज प्रक्रिया' : 'MSBNPE & MSBTE Examination Form Submission',
                  content: isMarathi ? 'नर्सिंग (MSBNPE) व पॅरामेडिकल (MSBTE) परीक्षा फॉर्म भरण्याची अंतिम मुदत जाहीर.' : 'Last date for submission of examination forms for nursing (MSBNPE) & lab tech (MSBTE) batches.',
                  category: 'Exam',
                  createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
                },
                {
                  id: 'n3',
                  title: isMarathi ? 'दीपप्रज्वलन व फ्लोरेन्स नाइटिंगेल शपथविधी सोहळा' : 'Lamp Lighting & Florence Nightingale Oath Ceremony',
                  content: isMarathi ? 'नवीन नर्सिंग विद्यार्थ्यांसाठी वार्षिक पवित्र शपथविधी सोहळा.' : 'Annual solemn ceremony for fresh incoming nursing students.',
                  category: 'Academic',
                  createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
                },
                {
                  id: 'n4',
                  title: isMarathi ? 'स्वातंत्र्य दिन ध्वजारोहण सोहळा' : 'Independence Day Campus Celebration',
                  content: isMarathi ? 'सकाळी ८:०० वाजता मुख्य प्रांगणात ध्वजारोहण व सांस्कृतिक कार्यक्रम.' : 'Flag hoisting ceremony at 8:00 AM on the main campus ground.',
                  category: 'Campus',
                  createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
                }
              ]).map((notice, idx) => {
                const date = notice.createdAt ? new Date(notice.createdAt) : new Date();
                const day = isNaN(date.getDate()) ? '01' : date.getDate().toString().padStart(2, '0');
                const month = isNaN(date.getTime()) ? (isMarathi ? 'सप्टें' : 'Sep') : date.toLocaleString(isMarathi ? 'mr-IN' : 'en-US', { month: 'short' });
                return (
                  <div
                    key={notice.id || idx}
                    onClick={() => setSelectedNotice(notice)}
                    className="notice-card"
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    title={isMarathi ? 'सविस्तर वाचण्यासाठी क्लिक करा' : 'Click to read full details'}
                  >
                    <div className="date-badge">
                      <span className="badge-day">{day}</span>
                      <span className="badge-month">{month}</span>
                    </div>
                    <div className="notice-details">
                      <div className="notice-title">
                        {notice.title}
                        {idx === 0 && <span className="new-pill">{t('newBadge')}</span>}
                      </div>
                      {notice.category && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#0284c7', fontWeight: 600, marginTop: '2px', marginBottom: '3px' }}>
                          <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0284c7' }}></span>
                          {notice.category}
                        </div>
                      )}
                      {notice.content && (
                        <div className="notice-desc">
                          {notice.content}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {liveNotices.length > 4 && (
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowAllNoticesModal(true)}
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#0d3b66',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e0f2fe';
                    e.currentTarget.style.borderColor = '#0284c7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }}
                >
                  <i className="fas fa-list-ul" style={{ color: '#0284c7' }}></i>
                  {isMarathi ? `सर्व ${liveNotices.length} सूचना पहा` : `View All ${liveNotices.length} Notices`} &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Column 2: Upcoming Events */}
          <div className="updates-column animate-on-scroll" data-animation="fade-up" data-delay="200">
            <div className="column-header-row">
              <h3 className="column-title">
                <i className="far fa-calendar-alt text-blue" style={{ marginRight: '8px' }}></i> {t('eventsTitle')}
              </h3>
              <button
                type="button"
                onClick={() => setShowAllEventsModal(true)}
                className="view-all-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: 0 }}
                title={isMarathi ? 'सर्व कार्यक्रम पहा' : 'View all events'}
              >
                {t('viewAll')} &rarr;
              </button>
            </div>

            <div className="notice-item-list">
              {(liveEvents.length > 0 ? liveEvents.filter((e) => e.isActive).slice(0, 4) : [
                {
                  id: 'ev1',
                  title: 'Emergency Nursing & Critical Care Workshop',
                  titleMr: 'आपत्कालीन नर्सिंग व क्रिटिकल केअर कार्यशाळा',
                  eventDate: '2026-09-10',
                  eventTime: '11:00 AM',
                  venue: 'College Seminar Hall',
                  venueMr: 'कॉलेज सेमिनार हॉल',
                  description: 'Advanced emergency triage and critical care simulation workshop organized for nursing students.',
                  category: 'Workshop',
                },
                {
                  id: 'ev2',
                  title: 'Community Rural Health & Immunization Drive',
                  titleMr: 'ग्रामीण आरोग्य तपासणी व लसीकरण शिबीर',
                  eventDate: '2026-09-20',
                  eventTime: '9:00 AM',
                  venue: 'Sangamner Rural Primary Health Center',
                  venueMr: 'प्राथमिक आरोग्य केंद्र',
                  description: 'Free healthcare checkup, immunization and community nutrition guidance camp.',
                  category: 'Medical Camp',
                },
                {
                  id: 'ev3',
                  title: 'Multi-Speciality Hospital Clinical Visit',
                  titleMr: 'जिल्हा शासकीय रुग्णालय प्रत्यक्ष क्लिनिकल भेट',
                  eventDate: '2026-09-26',
                  eventTime: '7:00 AM',
                  venue: 'District Civil Hospital Ahilyanagar',
                  venueMr: 'जिल्हा रुग्णालय अहिल्यानगर',
                  description: 'Bedside clinical rotations and observational rounds across emergency and surgical wards.',
                  category: 'Clinical',
                },
                {
                  id: 'ev4',
                  title: 'Alumni Meet & Senior Career Guidance',
                  titleMr: 'माजी विद्यार्थी मेळावा व करिअर मार्गदर्शन',
                  eventDate: '2026-10-05',
                  eventTime: '5:00 PM',
                  venue: 'Main College Auditorium',
                  venueMr: 'मुख्य सभागृह',
                  description: 'Annual alumni interaction, placement experience sharing and career counseling.',
                  category: 'Seminar',
                },
              ]).map((evt, idx) => {
                const date = evt.eventDate ? new Date(evt.eventDate) : new Date();
                const day = isNaN(date.getDate()) ? '10' : date.getDate().toString().padStart(2, '0');
                const month = isNaN(date.getTime()) ? (isMarathi ? 'सप्टें' : 'Sep') : date.toLocaleString(isMarathi ? 'mr-IN' : 'en-US', { month: 'short' });
                const evtTitle = isMarathi && evt.titleMr ? evt.titleMr : evt.title;
                const evtVenue = isMarathi && evt.venueMr ? evt.venueMr : evt.venue;

                return (
                  <div
                    key={evt.id || idx}
                    onClick={() => setSelectedEvent(evt)}
                    className="notice-card"
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    title={isMarathi ? 'कार्यक्रमाची माहिती पाहण्यासाठी क्लिक करा' : 'Click to view event details'}
                  >
                    <div className="date-badge blue-badge">
                      <span className="badge-day">{day}</span>
                      <span className="badge-month">{month}</span>
                    </div>
                    <div className="notice-details">
                      <div className="notice-title">
                        {evtTitle}
                        {idx === 0 && <span className="new-pill">{t('newBadge')}</span>}
                      </div>
                      <div className="notice-desc">
                        {evt.eventTime && <span>{isMarathi ? 'वेळ: ' : 'Time: '}{evt.eventTime}</span>}
                        {evt.eventTime && evtVenue && <span> • </span>}
                        {evtVenue && <span>{evtVenue}</span>}
                      </div>
                      {evt.category && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#0284c7', fontWeight: 600, marginTop: '3px' }}>
                          <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0284c7' }}></span>
                          {evt.category}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {liveEvents.length > 4 && (
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowAllEventsModal(true)}
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1px dashed #bae6fd',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#0284c7',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e0f2fe';
                    e.currentTarget.style.borderColor = '#0284c7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#bae6fd';
                  }}
                >
                  <i className="far fa-calendar-alt"></i>
                  {isMarathi ? `सर्व ${liveEvents.length} कार्यक्रम पहा` : `View All ${liveEvents.length} Events`} &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Column 3: Gallery 6-Grid Preview */}
          <div className="updates-column animate-on-scroll" data-animation="fade-up" data-delay="300">
            <div className="column-header-row">
              <h3 className="column-title">
                <i className="fas fa-camera text-blue" style={{ marginRight: '8px' }}></i> {t('galleryTitle')}
              </h3>
              <Link href="/gallery" className="view-all-link">{t('viewAll')} &rarr;</Link>
            </div>

            <div className="gallery-preview-6grid">
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-1.jpg"
                  alt="Campus Gathering"
                  fill
                  sizes="(max-width: 768px) 50vw, 180px"
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-2.jpg"
                  alt="College Infrastructure"
                  fill
                  sizes="(max-width: 768px) 50vw, 180px"
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-3.jpg"
                  alt="Clinical Session"
                  fill
                  sizes="(max-width: 768px) 50vw, 180px"
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-4.jpg"
                  alt="Library & Study Hall"
                  fill
                  sizes="(max-width: 768px) 50vw, 180px"
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-5.jpg"
                  alt="Laboratory Practical"
                  fill
                  sizes="(max-width: 768px) 50vw, 180px"
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-6.jpg"
                  alt="Students Activities"
                  fill
                  sizes="(max-width: 768px) 50vw, 180px"
                  style={{ objectFit: 'cover' }}
                />
              </Link>
            </div>

            <Link href="/gallery" className="gallery-col-bottom-cta">
              <i className="fas fa-images"></i>
              <span>{isMarathi ? 'सर्व ५०+ फोटो पहा' : 'View Full Gallery (50+ Photos)'}</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. "TOGETHER WE GROW" PRE-FOOTER STATS RIBBON
          ======================================================== */}
      <section className="prefooter-stats-ribbon">
        {/* Top Organic Wave Divider (Smooth transition from light Updates section) */}
        <div className="section-wave-divider top">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="section-wave-svg">
            <path
              d="M0,0 C320,45 640,10 960,40 C1200,60 1360,18 1440,30 L1440,0 L0,0 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>

        <div className="container ribbon-inner-flex" style={{ position: 'relative', zIndex: 3, paddingTop: '2rem' }}>
          <div className="ribbon-script-title animate-on-scroll" data-animation="zoom-in">
            {t('togetherWeGrow')}
          </div>

          {/* 5 Statistics with Animated Counters */}
          <div className="ribbon-stats-row">
            <div className="ribbon-stat-item animate-on-scroll" data-animation="fade-up" data-delay="100">
              <div className="stat-big">
                <AnimatedCounter end="2000" suffix="+" />
              </div>
              <div className="stat-small">{t('aboutStatStudents')}</div>
            </div>

            <div className="ribbon-stat-item animate-on-scroll" data-animation="fade-up" data-delay="200">
              <div className="stat-big">
                <AnimatedCounter end="120" suffix="+" />
              </div>
              <div className="stat-small">{t('aboutStatFaculty')}</div>
            </div>

            <div className="ribbon-stat-item animate-on-scroll" data-animation="fade-up" data-delay="300">
              <div className="stat-big">
                <AnimatedCounter end="14" suffix="+" />
              </div>
              <div className="stat-small">{t('statBatches')}</div>
            </div>

            <div className="ribbon-stat-item animate-on-scroll" data-animation="fade-up" data-delay="400">
              <div className="stat-big">
                <AnimatedCounter end="05" suffix="+" />
              </div>
              <div className="stat-small">{t('statLabs')}</div>
            </div>

            <div className="ribbon-stat-item animate-on-scroll" data-animation="fade-up" data-delay="500">
              <div className="stat-big">
                <AnimatedCounter end="100" suffix="%" />
              </div>
              <div className="stat-small">{t('statPlacement')}</div>
            </div>
          </div>

          <Link href="/contact" className="ribbon-join-banner animate-on-scroll" data-animation="zoom-in">
            <div>
              <div className="join-lead">{t('joinUsToday')}</div>
              <div className="join-sub">{t('joinUsSub')}</div>
            </div>
            <div className="join-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================
          8. VIDEO MODAL POPUP
          ======================================================== */}
      <div
        className={`video-modal-backdrop ${videoModal ? 'active' : ''}`}
        onClick={() => setVideoModal(false)}
      >
        <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
          <button
            className="video-modal-close"
            onClick={() => setVideoModal(false)}
            aria-label="Close video tour"
          >
            &times;
          </button>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <Image
              src="/gallery/gallery-1.jpg"
              alt="Campus Tour Video Placeholder"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(13, 59, 102, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                padding: '24px',
              }}
            >
              <div>
                <i className="fas fa-hospital-user" style={{ fontSize: '3.5rem', marginBottom: '16px', color: '#ffb703' }}></i>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '10px' }}>
                  {isMarathi ? 'समर्थ कॉलेज ऑफ नर्सिंग कॅम्पस' : 'Samarth College of Nursing Campus'}
                </h3>
                <p style={{ color: '#e2e8f0', maxWidth: '500px', margin: '0 auto 20px', fontSize: '1rem' }}>
                  {isMarathi
                    ? 'अद्ययावत वर्गखोल्या, हाय-टेक नर्सिंग लॅबोरेटरी, सुसज्ज रुग्णालय प्रशिक्षण आणि सुरक्षित वसतिगृह सुविधा.'
                    : 'Experience our modern classrooms, advanced simulation labs, hospital training wings, and student hostels in Sangamner.'}
                </p>
                <Link
                  href="/contact"
                  onClick={() => setVideoModal(false)}
                  className="btn-explore-courses"
                  style={{ display: 'inline-flex' }}
                >
                  {isMarathi ? 'कॅम्पस भेटीची वेळ निश्चित करा' : 'Schedule Campus Walkthrough'} &nbsp;&rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          9. NOTICE DETAIL MODAL (ON HOMEPAGE)
          ======================================================== */}
      {selectedNotice && (
        <div
          onClick={() => setSelectedNotice(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 34, 57, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '650px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #0b2239 0%, #0d3b66 100%)',
                color: '#ffffff',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 183, 3, 0.2)',
                    color: '#ffb703',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
                >
                  <i className="fas fa-bullhorn"></i>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#ffb703', fontWeight: 700 }}>
                    {isMarathi ? 'अधिकृत सूचना' : 'Official Notice'}
                  </span>
                  {selectedNotice.category && (
                    <span style={{ marginLeft: '8px', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                      {selectedNotice.category}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  opacity: 0.8,
                  padding: '4px 8px',
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '24px 28px', maxHeight: '68vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', marginBottom: '14px' }}>
                <i className="far fa-calendar-alt" style={{ color: '#0284c7' }}></i>
                <span>
                  {selectedNotice.createdAt
                    ? new Date(selectedNotice.createdAt).toLocaleDateString(isMarathi ? 'mr-IN' : 'en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : ''}
                </span>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.4 }}>
                {selectedNotice.title}
              </h2>

              <div style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-line', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                {selectedNotice.content || (isMarathi ? 'सविस्तर माहितीसाठी कार्यालयाशी संपर्क साधावा.' : 'Please contact the college administration office for further details.')}
              </div>
            </div>

            <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                style={{
                  backgroundColor: '#0d3b66',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 20px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {isMarathi ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          10. ALL NOTICES MODAL (ON HOMEPAGE)
          ======================================================== */}
      {showAllNoticesModal && (
        <div
          onClick={() => setShowAllNoticesModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 34, 57, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '820px',
              width: '100%',
              height: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0b2239 0%, #0d3b66 100%)',
                color: '#ffffff',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 183, 3, 0.2)',
                    color: '#ffb703',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  <i className="fas fa-bullhorn"></i>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                    {isMarathi ? 'सर्व सूचना व परिपत्रके' : 'Notices & Circulars'}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    {isMarathi ? 'समर्थ नर्सिंग कॉलेज, अकोले बायपास, संगमनेर' : 'Samarth Nursing College, Akole Bypass, Sangamner'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAllNoticesModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  opacity: 0.8,
                  lineHeight: 1,
                  padding: '4px 8px',
                }}
              >
                &times;
              </button>
            </div>

            {/* Filters & Search */}
            <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                <input
                  type="text"
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                  placeholder={isMarathi ? 'सूचना किंवा विषय शोधा...' : 'Search notices...'}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[
                  { key: 'ALL', label: isMarathi ? 'सर्व' : 'All' },
                  { key: 'Admission', label: isMarathi ? 'प्रवेश' : 'Admission' },
                  { key: 'Exam', label: isMarathi ? 'परीक्षा' : 'Exam' },
                  { key: 'Scholarship', label: isMarathi ? 'शिष्यवृत्ती' : 'Scholarship' },
                  { key: 'Academic', label: isMarathi ? 'शैक्षणिक' : 'Academic' },
                  { key: 'Campus', label: isMarathi ? 'परिसर' : 'Campus' },
                ].map((item) => {
                  const isActive = noticeCategoryFilter === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setNoticeCategoryFilter(item.key)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: isActive ? '1px solid #0d3b66' : '1px solid #cbd5e1',
                        backgroundColor: isActive ? '#0d3b66' : '#ffffff',
                        color: isActive ? '#ffffff' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notices List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(liveNotices.length > 0 ? liveNotices : [
                {
                  id: 'n1',
                  title: isMarathi ? 'शैक्षणिक वर्ष २०२६-२७ साठी थेट प्रवेश सुरू' : 'Admission Open for Academic Year 2026-27',
                  content: isMarathi ? 'GNM, ANM आणि ADMLT अभ्यासक्रमांसाठी थेट अर्ज व समुपदेशन सुरू.' : 'Applications invited for GNM, ANM & ADMLT batches. Direct counseling available.',
                  category: 'Admission',
                  createdAt: new Date().toISOString(),
                }
              ])
                .filter((n) => {
                  const matchCat = noticeCategoryFilter === 'ALL' || n.category === noticeCategoryFilter;
                  const matchSearch =
                    !noticeSearch.trim() ||
                    n.title?.toLowerCase().includes(noticeSearch.toLowerCase()) ||
                    n.content?.toLowerCase().includes(noticeSearch.toLowerCase());
                  return matchCat && matchSearch;
                })
                .map((n, idx) => {
                  const date = n.createdAt ? new Date(n.createdAt) : new Date();
                  const day = isNaN(date.getDate()) ? '01' : date.getDate().toString().padStart(2, '0');
                  const month = isNaN(date.getTime()) ? (isMarathi ? 'सप्टें' : 'Sep') : date.toLocaleString(isMarathi ? 'mr-IN' : 'en-US', { month: 'short' });
                  const year = isNaN(date.getFullYear()) ? '2026' : date.getFullYear();
                  return (
                    <div
                      key={n.id || idx}
                      onClick={() => setSelectedNotice(n)}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        gap: '16px',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0d3b66')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '52px',
                          height: '52px',
                          borderRadius: '10px',
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0d3b66', lineHeight: 1 }}>{day}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginTop: '2px' }}>{month}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, backgroundColor: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px' }}>
                            {n.category || 'General'}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{year}</span>
                        </div>
                        <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                          {n.title}
                        </h4>
                        {n.content && (
                          <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {n.content}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '14px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowAllNoticesModal(false)}
                style={{
                  backgroundColor: '#0d3b66',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 20px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {isMarathi ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          11. EVENT DETAIL MODAL (ON HOMEPAGE)
          ======================================================== */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 34, 57, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '650px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                  }}
                >
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#e0f2fe', fontWeight: 700 }}>
                    {isMarathi ? 'महाविद्यालयीन कार्यक्रम' : 'Campus Event'}
                  </span>
                  {selectedEvent.category && (
                    <span style={{ marginLeft: '8px', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '6px' }}>
                      {selectedEvent.category}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  opacity: 0.8,
                  padding: '4px 8px',
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '24px 28px', maxHeight: '68vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px', color: '#475569', fontSize: '0.88rem' }}>
                {selectedEvent.eventDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="far fa-calendar-check" style={{ color: '#0284c7' }}></i>
                    <span>
                      {new Date(selectedEvent.eventDate).toLocaleDateString(isMarathi ? 'mr-IN' : 'en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {selectedEvent.eventTime && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="far fa-clock" style={{ color: '#0284c7' }}></i>
                    <span>{selectedEvent.eventTime}</span>
                  </div>
                )}
                {selectedEvent.venue && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#dc2626' }}></i>
                    <span>{isMarathi && selectedEvent.venueMr ? selectedEvent.venueMr : selectedEvent.venue}</span>
                  </div>
                )}
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.4 }}>
                {isMarathi && selectedEvent.titleMr ? selectedEvent.titleMr : selectedEvent.title}
              </h2>

              <div style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-line', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                {selectedEvent.description || (isMarathi ? 'सर्व विद्यार्थी व प्राध्यापकांनी उपस्थित राहावे.' : 'All students and faculty members are requested to attend.')}
              </div>
            </div>

            <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 20px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {isMarathi ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          12. ALL EVENTS MODAL (ON HOMEPAGE)
          ======================================================== */}
      {showAllEventsModal && (
        <div
          onClick={() => setShowAllEventsModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 34, 57, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '820px',
              width: '100%',
              height: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                    {isMarathi ? 'महाविद्यालयीन आगामी कार्यक्रम' : 'Upcoming Campus Events'}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#e0f2fe' }}>
                    {isMarathi ? 'समर्थ नर्सिंग कॉलेज, अकोले बायपास, संगमनेर' : 'Samarth Nursing College, Akole Bypass, Sangamner'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAllEventsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  opacity: 0.8,
                  lineHeight: 1,
                  padding: '4px 8px',
                }}
              >
                &times;
              </button>
            </div>

            {/* Filters & Search */}
            <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                <input
                  type="text"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  placeholder={isMarathi ? 'कार्यक्रम किंवा स्थळ शोधा...' : 'Search events or venues...'}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[
                  { key: 'ALL', label: isMarathi ? 'सर्व' : 'All' },
                  { key: 'Workshop', label: isMarathi ? 'कार्यशाळा' : 'Workshop' },
                  { key: 'Medical Camp', label: isMarathi ? 'आरोग्य शिबीर' : 'Medical Camp' },
                  { key: 'Clinical', label: isMarathi ? 'क्लिनिकल भेट' : 'Clinical' },
                  { key: 'Seminar', label: isMarathi ? 'सेमिनार' : 'Seminar' },
                  { key: 'Cultural', label: isMarathi ? 'सांस्कृतिक' : 'Cultural' },
                  { key: 'Sports', label: isMarathi ? 'क्रीडा' : 'Sports' },
                ].map((item) => {
                  const isActive = eventCategoryFilter === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setEventCategoryFilter(item.key)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: isActive ? '1px solid #0284c7' : '1px solid #cbd5e1',
                        backgroundColor: isActive ? '#0284c7' : '#ffffff',
                        color: isActive ? '#ffffff' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Events List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {liveEvents
                .filter((e) => {
                  const matchCat = eventCategoryFilter === 'ALL' || e.category === eventCategoryFilter;
                  const matchSearch =
                    !eventSearch.trim() ||
                    e.title?.toLowerCase().includes(eventSearch.toLowerCase()) ||
                    e.venue?.toLowerCase().includes(eventSearch.toLowerCase()) ||
                    e.description?.toLowerCase().includes(eventSearch.toLowerCase());
                  return matchCat && matchSearch;
                })
                .map((e, idx) => {
                  const date = e.eventDate ? new Date(e.eventDate) : new Date();
                  const day = isNaN(date.getDate()) ? '01' : date.getDate().toString().padStart(2, '0');
                  const month = isNaN(date.getTime()) ? (isMarathi ? 'सप्टें' : 'Sep') : date.toLocaleString(isMarathi ? 'mr-IN' : 'en-US', { month: 'short' });
                  const evtTitle = isMarathi && e.titleMr ? e.titleMr : e.title;
                  const evtVenue = isMarathi && e.venueMr ? e.venueMr : e.venue;

                  return (
                    <div
                      key={e.id || idx}
                      onClick={() => setSelectedEvent(e)}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        gap: '16px',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      }}
                      onMouseEnter={(el) => (el.currentTarget.style.borderColor = '#0284c7')}
                      onMouseLeave={(el) => (el.currentTarget.style.borderColor = '#e2e8f0')}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '54px',
                          height: '54px',
                          borderRadius: '10px',
                          backgroundColor: '#e0f2fe',
                          color: '#0284c7',
                          border: '1px solid #bae6fd',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7', lineHeight: 1 }}>{day}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>{month}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, backgroundColor: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px' }}>
                            {e.category || 'Event'}
                          </span>
                          {e.eventTime && (
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              <i className="far fa-clock" style={{ marginRight: '4px' }}></i>
                              {e.eventTime}
                            </span>
                          )}
                        </div>
                        <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                          {evtTitle}
                        </h4>
                        {evtVenue && (
                          <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '4px' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: '#dc2626', marginRight: '5px' }}></i>
                            {evtVenue}
                          </div>
                        )}
                        {e.description && (
                          <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {e.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Footer */}
            <div style={{ padding: '14px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowAllEventsModal(false)}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 20px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {isMarathi ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
