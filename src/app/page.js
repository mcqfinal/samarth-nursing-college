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
    '/gallery/gallery-2.jpg',
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
          1. HERO SECTION (DIAGONAL WAVE & BADGES)
          ======================================================== */}
      <section className="mockup-hero-section">
        {/* Background Image Carousel with Crossfade */}
        <div className="hero-bg-layer">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === activeSlide ? 'hero-slide-active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
          <div className="hero-gradient-overlay"></div>
        </div>

        <div className="container hero-content-grid">
          {/* Left Column: Headlines & CTAs */}
          <div className="hero-left-content animate-on-scroll" data-animation="fade-up">
            <div className="pill-tag-gold">
              <span>{t('heroPill')}</span>
            </div>

            <h1 className="hero-main-title">
              <span className="title-lead">{t('heroWelcome')}</span>
              <span className="title-college">{t('heroCollege')}</span>
              <span className="title-city">{t('heroCity')}</span>
            </h1>

            <h2 className="hero-sub-title">
              {typewriterText}
              <span style={{ color: '#ffb703', animation: 'pulse-glow 1s infinite' }}>|</span>
            </h2>

            <p className="hero-description">
              {t('heroDescription')}
            </p>

            <div className="hero-action-buttons">
              <Link href="/courses" className="btn-explore-courses">
                {t('heroExploreCourses')} &nbsp;&rarr;
              </Link>
              <button onClick={() => setVideoModal(true)} className="btn-watch-video">
                <span className="play-icon">
                  <i className="fas fa-play" style={{ fontSize: '0.75rem', color: '#ffb703' }}></i>
                </span>
                {t('heroWatchVideo')}
              </button>
            </div>
          </div>

          {/* Right Column: Campus Arch Photo & Admissions Badge */}
          <div className="hero-right-content animate-on-scroll" data-animation="fade-left" data-delay="200">
            <div className="floating-script-future" style={{ whiteSpace: 'pre-line' }}>
              {t('heroBuildFuture')}
            </div>

            <Image
              src="/gallery/gallery-5.jpg"
              alt="Samarth College Students"
              width={420}
              height={460}
              className="hero-arch-photo"
              priority
            />

            {/* Floating Admissions Open Widget */}
            <Link href="/contact" className="floating-admission-widget">
              <div className="widget-cap-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className="widget-text">
                <span className="widget-title">{t('heroAdmissionsOpen')}</span>
                <span className="widget-sub">{t('heroAdmissionsSub')}</span>
              </div>
              <div className="widget-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </Link>
          </div>
        </div>

        {/* Diagonal Wave Bottom Divider */}
        <div className="hero-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

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
          3. ABOUT US SECTION (3-COLUMN LAYOUT)
          ======================================================== */}
      <section className="mockup-about-section">
        <div className="container about-3col-grid">
          {/* Column 1: Legacy Text & Counters */}
          <div className="about-left-col animate-on-scroll" data-animation="fade-right">
            <div className="section-pill-tag">{t('aboutPill')}</div>
            <h2 className="about-section-heading">
              {t('aboutHeading')}
            </h2>
            <p className="about-body-text">
              {t('aboutBody')}
            </p>

            {/* 4 Counter Stats */}
            <div className="about-stats-grid">
              <div className="stat-box">
                <div className="stat-icon gold"><i className="fas fa-trophy"></i></div>
                <div className="stat-number">
                  <AnimatedCounter end="14" suffix="+" />
                </div>
                <div className="stat-label">{t('aboutStatYears')}</div>
              </div>

              <div className="stat-box">
                <div className="stat-icon yellow"><i className="fas fa-user-graduate"></i></div>
                <div className="stat-number">
                  <AnimatedCounter end="2000" suffix="+" />
                </div>
                <div className="stat-label">{t('aboutStatStudents')}</div>
              </div>

              <div className="stat-box">
                <div className="stat-icon gold"><i className="fas fa-user-md"></i></div>
                <div className="stat-number">
                  <AnimatedCounter end="100" suffix="+" />
                </div>
                <div className="stat-label">{t('aboutStatFaculty')}</div>
              </div>

              <div className="stat-box">
                <div className="stat-icon yellow"><i className="fas fa-book-medical"></i></div>
                <div className="stat-number">
                  <AnimatedCounter end="05" suffix="+" />
                </div>
                <div className="stat-label">{t('aboutStatCourses')}</div>
              </div>
            </div>

            <Link href="/about" className="btn-know-more">
              {t('aboutKnowMore')} &nbsp;&rarr;
            </Link>
          </div>

          {/* Column 2: Arched Photo Frame with Gate Banner */}
          <div className="arched-photo-container animate-on-scroll" data-animation="zoom-in" data-delay="150">
            <div className="arched-photo-frame">
              <Image
                src="/gallery/gallery-1.jpg"
                alt="Samarth College Entrance Gate"
                width={380}
                height={500}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="photo-gate-banner">
              <div className="badge-education-lives">{t('aboutGateMarathi')}</div>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>{t('aboutBadgeLives')}</span>
            </div>
            <div className="arch-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

          {/* Column 3: Stacked Vision, Mission, Values Cards */}
          <div className="about-right-col animate-on-scroll" data-animation="fade-left" data-delay="250">
            <div className="vmv-card">
              <div className="vmv-icon-circle vision-circle">
                <i className="fas fa-eye"></i>
              </div>
              <div className="vmv-content">
                <h3>{t('visionTitle')}</h3>
                <p>{t('visionDesc')}</p>
              </div>
            </div>

            <div className="vmv-card">
              <div className="vmv-icon-circle mission-circle">
                <i className="fas fa-bullseye"></i>
              </div>
              <div className="vmv-content">
                <h3>{t('missionTitle')}</h3>
                <p>{t('missionDesc')}</p>
              </div>
            </div>

            <div className="vmv-card">
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
      </section>

      {/* ========================================================
          4. COURSES SECTION: "CHOOSE YOUR PATH"
          ======================================================== */}
      <section className="mockup-courses-section">
        <div className="container courses-layout-flex">
          {/* Left Intro Column */}
          <div className="courses-left-intro animate-on-scroll" data-animation="fade-up">
            <div className="section-pill-tag light">{t('coursesPill')}</div>
            <h2 className="courses-main-heading">{t('coursesHeading')}</h2>
            <p className="courses-sub-text">
              {t('coursesSub')}
            </p>
            <Link href="/courses" className="btn-view-all-courses">
              {t('coursesViewAll')} &nbsp;&rarr;
            </Link>
          </div>

          {/* Courses Cards Grid */}
          <div className="courses-cards-container">
            {/* Card 1: GNM */}
            <div className="mockup-course-card animate-on-scroll" data-animation="fade-up" data-delay="100">
              <div className="course-card-icon-wrapper blue-1">
                <i className="fas fa-user-nurse"></i>
              </div>
              <div className="course-card-info">
                <h3 className="course-card-abbr">GNM</h3>
                <p className="course-card-full">{t('gnmName')}</p>
                <span className="course-card-duration">{t('gnmDuration')}</span>
              </div>
              <Link href="/courses/gnm" className="course-card-arrow-btn" aria-label="GNM details">
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 2: ANM */}
            <div className="mockup-course-card animate-on-scroll" data-animation="fade-up" data-delay="200">
              <div className="course-card-icon-wrapper blue-2">
                <i className="fas fa-clinic-medical"></i>
              </div>
              <div className="course-card-info">
                <h3 className="course-card-abbr">ANM</h3>
                <p className="course-card-full">{t('anmName')}</p>
                <span className="course-card-duration">{t('anmDuration')}</span>
              </div>
              <Link href="/courses/anm" className="course-card-arrow-btn" aria-label="ANM details">
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 3: ADMLT */}
            <div className="mockup-course-card animate-on-scroll" data-animation="fade-up" data-delay="300">
              <div className="course-card-icon-wrapper blue-3">
                <i className="fas fa-vial"></i>
              </div>
              <div className="course-card-info">
                <h3 className="course-card-abbr">ADMLT</h3>
                <p className="course-card-full">{t('admltName')}</p>
                <span className="course-card-duration">{t('admltDuration')}</span>
              </div>
              <Link href="/courses/admlt" className="course-card-arrow-btn" aria-label="ADMLT details">
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 4: Clinical Rotations */}
            <div className="mockup-course-card animate-on-scroll" data-animation="fade-up" data-delay="400">
              <div className="course-card-icon-wrapper blue-4">
                <i className="fas fa-stethoscope"></i>
              </div>
              <div className="course-card-info">
                <h3 className="course-card-abbr">Clinical</h3>
                <p className="course-card-full">{t('clinicalName')}</p>
                <span className="course-card-duration">{t('clinicalDuration')}</span>
              </div>
              <Link href="/facilities" className="course-card-arrow-btn" aria-label="Clinical details">
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Right Floating Nurse Portrait */}
          <div className="courses-student-portrait animate-on-scroll" data-animation="fade-left">
            <Image
              src="/gallery/gallery-7.jpg"
              alt="Nursing Student"
              width={260}
              height={360}
              style={{ objectFit: 'cover', borderRadius: '16px' }}
            />
            <div className="script-dreams-support" style={{ whiteSpace: 'pre-line' }}>
              {t('dreamsSupport')}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4B. WHY CHOOSE SAMARTH? (13 PILLARS OF EXCELLENCE)
          ======================================================== */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '70px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="section-header-center animate-on-scroll" data-animation="fade-up" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 45px' }}>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {whyChooseUsList.map((item, idx) => (
              <div
                key={idx}
                className="animate-on-scroll"
                data-animation="fade-up"
                data-delay={`${(idx % 4 + 1) * 100}`}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '22px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
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
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>
                      #{idx + 1}
                    </span>
                    <h3 style={{ color: '#0d3b66', fontSize: '1.02rem', margin: 0, lineHeight: '1.3' }}>
                      {isMarathi ? item.titleMr : item.titleEn}
                    </h3>
                  </div>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                  {isMarathi ? item.descMr : item.descEn}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/about" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              {isMarathi ? 'आमच्याविषयी अधिक जाणून घ्या' : 'Learn More About Samarth'} &nbsp;&rarr;
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
            <h2>{t('leadershipHeading')}</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '8px' }}>
              {t('leadershipSub')}
            </p>
          </div>

          <div className="principals-grid">
            {/* Card 1: GNM Principal */}
            <div className="principal-card-modern animate-on-scroll" data-animation="fade-right">
              <div className="principal-photo-wrapper">
                <Image
                  src="/images/leadership/principal-gnm.jpg"
                  alt="Mrs. Sayyed Firdosh Gulab"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="principal-details-col">
                <span className="principal-course-badge gnm-badge">GNM Course</span>
                <h3 className="principal-name">{t('gnmPrincipalName')}</h3>
                <div className="principal-designation">{t('gnmPrincipalDesig')}</div>
                <div className="principal-exp-row">
                  <div className="principal-exp-item">
                    <strong>12 {isMarathi ? 'वर्षे' : 'Yrs'}</strong>
                    <span>{isMarathi ? 'क्लिनिकल' : 'Clinical'}</span>
                  </div>
                  <div className="principal-exp-item">
                    <strong>10 {isMarathi ? 'वर्षे' : 'Yrs'}</strong>
                    <span>{isMarathi ? 'अध्यापन' : 'Teaching'}</span>
                  </div>
                  <div className="principal-exp-item">
                    <strong>PB BSc</strong>
                    <span>{isMarathi ? 'शिक्षण' : 'Qualification'}</span>
                  </div>
                </div>
                <p className="principal-quote-snippet">
                  {t('gnmPrincipalQuote')}
                </p>
                <Link href="/about/principal-gnm" className="principal-read-link">
                  {t('readFullMessage')} &nbsp;&rarr;
                </Link>
              </div>
            </div>

            {/* Card 2: ANM Principal */}
            <div className="principal-card-modern anm-card animate-on-scroll" data-animation="fade-left">
              <div className="principal-photo-wrapper">
                <Image
                  src="/images/leadership/principal-anm.jpg"
                  alt="Raghatate Pooja Tarachand"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="principal-details-col">
                <span className="principal-course-badge anm-badge">ANM Course</span>
                <h3 className="principal-name">{t('anmPrincipalName')}</h3>
                <div className="principal-designation">{t('anmPrincipalDesig')}</div>
                <div className="principal-exp-row">
                  <div className="principal-exp-item">
                    <strong>3 {isMarathi ? 'वर्षे' : 'Yrs'}</strong>
                    <span>{isMarathi ? 'क्लिनिकल' : 'Clinical'}</span>
                  </div>
                  <div className="principal-exp-item">
                    <strong>12 {isMarathi ? 'वर्षे' : 'Yrs'}</strong>
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
                  {t('readFullMessage')} &nbsp;&rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. 3-COLUMN UPDATES & GALLERY SECTION
          ======================================================== */}
      <section className="mockup-updates-section">
        <div className="container updates-3col-grid">
          {/* Column 1: Latest Notices */}
          <div className="updates-column animate-on-scroll" data-animation="fade-up" data-delay="100">
            <div className="column-header-row">
              <h3 className="column-title">
                <i className="fas fa-bullhorn text-blue" style={{ marginRight: '8px' }}></i> {t('noticesTitle')}
              </h3>
              <Link href="/contact" className="view-all-link">{t('viewAll')} &rarr;</Link>
            </div>

            <div className="notice-item-list">
              <div className="notice-card">
                <div className="date-badge">
                  <span className="badge-day">12</span>
                  <span className="badge-month">{isMarathi ? 'सप्टें' : 'Sep'}</span>
                </div>
                <div className="notice-details">
                  <div className="notice-title">
                    {isMarathi
                      ? 'शैक्षणिक वर्ष २०२६-२७ साठी थेट प्रवेश सुरू'
                      : 'Admission Open for Academic Year 2026-27'}
                    <span className="new-pill">{t('newBadge')}</span>
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'GNM, ANM आणि ADMLT अभ्यासक्रमांसाठी थेट अर्ज व समुपदेशन सुरू.'
                      : 'Applications invited for GNM, ANM & ADMLT batches. Direct counseling available.'}
                  </div>
                </div>
              </div>

              <div className="notice-card">
                <div className="date-badge">
                  <span className="badge-day">05</span>
                  <span className="badge-month">{isMarathi ? 'सप्टें' : 'Sep'}</span>
                </div>
                <div className="notice-details">
                  <div className="notice-title">
                    {isMarathi ? 'MSBNPE व MSBTE परीक्षा अर्ज प्रक्रिया' : 'MSBNPE & MSBTE Examination Form Submission'}
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'नर्सिंग (MSBNPE) व पॅरामेडिकल (MSBTE) परीक्षा फॉर्म भरण्याची अंतिम मुदत जाहीर.'
                      : 'Last date for submission of examination forms for nursing (MSBNPE) & lab tech (MSBTE) batches.'}
                  </div>
                </div>
              </div>

              <div className="notice-card">
                <div className="date-badge">
                  <span className="badge-day">28</span>
                  <span className="badge-month">{isMarathi ? 'ऑगस्ट' : 'Aug'}</span>
                </div>
                <div className="notice-details">
                  <div className="notice-title">
                    {isMarathi
                      ? 'दीपप्रज्वलन व फ्लोरेन्स नाइटिंगेल शपथविधी सोहळा'
                      : 'Lamp Lighting & Florence Nightingale Oath Ceremony'}
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'नवीन नर्सिंग विद्यार्थ्यांसाठी वार्षिक पवित्र शपथविधी सोहळा.'
                      : 'Annual solemn ceremony for fresh incoming nursing students.'}
                  </div>
                </div>
              </div>

              <div className="notice-card">
                <div className="date-badge">
                  <span className="badge-day">15</span>
                  <span className="badge-month">{isMarathi ? 'ऑगस्ट' : 'Aug'}</span>
                </div>
                <div className="notice-details">
                  <div className="notice-title">
                    {isMarathi ? 'स्वातंत्र्य दिन ध्वजारोहण सोहळा' : 'Independence Day Campus Celebration'}
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'सकाळी ८:०० वाजता मुख्य प्रांगणात ध्वजारोहण व सांस्कृतिक कार्यक्रम.'
                      : 'Flag hoisting ceremony at 8:00 AM on the main campus ground.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Upcoming Events */}
          <div className="updates-column animate-on-scroll" data-animation="fade-up" data-delay="200">
            <div className="column-header-row">
              <h3 className="column-title">
                <i className="far fa-calendar-alt text-blue" style={{ marginRight: '8px' }}></i> {t('eventsTitle')}
              </h3>
              <Link href="/contact" className="view-all-link">{t('viewAll')} &rarr;</Link>
            </div>

            <div className="notice-item-list">
              <div className="notice-card">
                <div className="date-badge blue-badge">
                  <span className="badge-day">10</span>
                  <span className="badge-month">{isMarathi ? 'सप्टें' : 'Sep'}</span>
                </div>
                <div className="notice-details">
                  <div className="notice-title">
                    {isMarathi
                      ? 'आपत्कालीन नर्सिंग व क्रिटिकल केअर कार्यशाळा'
                      : 'Emergency Nursing & Critical Care Workshop'}
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'वेळ: सकाळी ११:०० वाजता • सेमिनार हॉल'
                      : 'Time: 11:00 AM • College Seminar Hall'}
                  </div>
                </div>
              </div>

              <div className="notice-card">
                <div className="date-badge blue-badge">
                  <span className="badge-day">20</span>
                  <span className="badge-month">{isMarathi ? 'सप्टें' : 'Sep'}</span>
                </div>
                <div className="notice-details">
                  <div className="notice-title">
                    {isMarathi
                      ? 'ग्रामीण आरोग्य तपासणी व लसीकरण शिबीर'
                      : 'Community Rural Health & Immunization Drive'}
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'वेळ: सकाळी ९:०० वाजता • प्राथमिक आरोग्य केंद्र'
                      : 'Time: 9:00 AM • Sangamner Rural Primary Health Center'}
                  </div>
                </div>
              </div>

              <div className="notice-card">
                <div className="date-badge blue-badge">
                  <span className="badge-day">26</span>
                  <span className="badge-month">{isMarathi ? 'सप्टें' : 'Sep'}</span>
                </div>
                <div className="notice-details">
                  <div className="notice-title">
                    {isMarathi
                      ? 'जिल्हा शासकीय रुग्णालय प्रत्यक्ष क्लिनिकल भेट'
                      : 'Multi-Speciality Hospital Clinical Visit'}
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'वेळ: सकाळी ७:०० वाजता • जिल्हा रुग्णालय अहिल्यानगर'
                      : 'Time: 7:00 AM • District Civil Hospital Ahilyanagar'}
                  </div>
                </div>
              </div>

              <div className="notice-card">
                <div className="date-badge blue-badge">
                  <span className="badge-day">05</span>
                  <span className="badge-month">{isMarathi ? 'ऑक्टो' : 'Oct'}</span>
                </div>
                <div className="notice-details">
                  <div className="notice-title">
                    {isMarathi ? 'माजी विद्यार्थी मेळावा व करिअर मार्गदर्शन' : 'Alumni Meet & Senior Career Guidance'}
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'वेळ: सायंकाळी ५:०० वाजता • मुख्य सभागृह'
                      : 'Time: 5:00 PM • Main College Auditorium'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Gallery 4-Grid Preview */}
          <div className="updates-column animate-on-scroll" data-animation="fade-up" data-delay="300">
            <div className="column-header-row">
              <h3 className="column-title">
                <i className="fas fa-camera text-blue" style={{ marginRight: '8px' }}></i> {t('galleryTitle')}
              </h3>
              <Link href="/gallery" className="view-all-link">{t('viewAll')} &rarr;</Link>
            </div>

            <div className="gallery-preview-4grid">
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-1.jpg"
                  alt="Campus Gathering"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-2.jpg"
                  alt="College Infrastructure"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-3.jpg"
                  alt="Clinical Session"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <Link href="/gallery" className="gallery-mini-tile">
                <Image
                  src="/gallery/gallery-4.jpg"
                  alt="Library & Study Hall"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. "TOGETHER WE GROW" PRE-FOOTER STATS RIBBON
          ======================================================== */}
      <section className="prefooter-stats-ribbon">
        <div className="container ribbon-inner-flex">
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
    </div>
  );
}
