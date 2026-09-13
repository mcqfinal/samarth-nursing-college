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
                    {isMarathi ? 'MSBTE परीक्षा अर्ज सादर करणे' : 'MSBTE Examination Form Submission'}
                  </div>
                  <div className="notice-desc">
                    {isMarathi
                      ? 'हिवाळी परीक्षा फॉर्म भरण्याची अंतिम मुदत जाहीर.'
                      : 'Last date for submission of winter examination forms for all eligible batches.'}
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
