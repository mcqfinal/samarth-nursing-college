'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const pathname = usePathname();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const isMarathi = language === 'mr';

  const navItems = [
    { label: t('navHome'), href: '/' },
    {
      label: t('navAbout'),
      href: '/about',
      mega: true,
      children: [
        { label: isMarathi ? 'संस्थेविषयी' : 'About Us', href: '/about' },
        { label: isMarathi ? 'ध्येय व दृष्टी' : 'Vision & Mission', href: '/about/vision-mission' },
        { label: isMarathi ? 'प्राचार्य संदेश (GNM)' : "Principal's Desk (GNM)", href: '/about/principal-gnm' },
        { label: isMarathi ? 'प्राचार्य संदेश (ANM)' : "Principal's Desk (ANM)", href: '/about/principal-anm' },
        { label: isMarathi ? 'व्यवस्थापन संदेश' : 'Management Message', href: '/about/management' },
        { label: isMarathi ? 'समित्या व कक्ष' : 'Committees & Cells', href: '/about/committees' },
        { label: isMarathi ? 'उपलब्धी' : 'Achievements', href: '/achievements' },
      ],
    },
    {
      label: t('navCourses'),
      href: '/courses',
      children: [
        { label: 'GNM', href: '/courses/gnm' },
        { label: 'ANM', href: '/courses/anm' },
        { label: 'ADMLT', href: '/courses/admlt' },
        { label: isMarathi ? 'अभ्यासक्रम' : 'Syllabus', href: '/courses/syllabus' },
      ],
    },
    {
      label: t('navAdmission'),
      href: '/admission',
      children: [
        { label: isMarathi ? 'प्रवेश प्रक्रिया' : 'Admission Process', href: '/admission' },
        { label: isMarathi ? 'पात्रता निकष' : 'Eligibility Criteria', href: '/admission/criteria' },
        { label: isMarathi ? 'फी रचना' : 'Fees Structure', href: '/admission/fees-structure' },
      ],
    },
    { label: isMarathi ? 'फी रचना' : 'Fee Structure', href: '/admission/fees-structure' },
    {
      label: t('navFacilities'),
      href: '/facilities',
      children: [
        { label: isMarathi ? 'सर्व सुविधा' : 'All Facilities', href: '/facilities' },
        { label: isMarathi ? 'वसतिगृह' : 'Hostel', href: '/facilities#hostel' },
        { label: isMarathi ? 'क्लिनिकल ट्रेनिंग' : 'Clinical Training', href: '/facilities#clinical' },
        { label: isMarathi ? 'जुने प्रश्नसंच' : 'Question Papers', href: '/facilities/question-papers' },
      ],
    },
    { label: t('navGallery'), href: '/gallery' },
    { label: t('navContact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleSubmenu = (idx) => {
    setOpenSub(openSub === idx ? null : idx);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenSub(null);
  };

  return (
    <>
      {/* 1. TOP UTILITY BAR (Deep Navy) */}
      <div className="top-bar-mockup">
        <div className="top-bar-flex">
          {/* Left: Contact Info */}
          <div className="top-bar-contacts">
            <a href="tel:9689486570" className="top-item phone-item" title="Call Us">
              <i className="fas fa-phone-alt top-icon"></i> {t('phone')}
            </a>
            <a href="mailto:samarthnursing41@gmail.com" className="top-item email-item" title="Email Us">
              <i className="fas fa-envelope top-icon"></i> {t('email')}
            </a>
            <span className="top-item location-item">
              <i className="fas fa-map-marker-alt top-icon"></i> {t('location')}
            </span>
          </div>

          {/* Right: Socials, Language Switcher, Action Badges */}
          <div className="top-bar-actions">
            {/* Language Switcher Pill */}
            <div className="lang-switcher-pill" title="Switch Language / भाषा निवडा">
              <i className="fas fa-globe" style={{ fontSize: '0.75rem', marginLeft: '4px', opacity: 0.85 }}></i>
              <button
                type="button"
                className={language === 'en' ? 'active' : ''}
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span>|</span>
              <button
                type="button"
                className={language === 'mr' ? 'active' : ''}
                onClick={() => setLanguage('mr')}
                aria-label="मराठी मध्ये वाचा"
              >
                मराठी
              </button>
            </div>

            <div className="top-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR & BRANDING */}
      <header className={`main-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container header-content">
          {/* Brand Logo with Official Image */}
          <Link href="/" className="college-brand" onClick={closeMobile}>
            <div className="brand-logo-wrapper">
              <Image
                src="/images/logo.png"
                alt="Samarth College of Nursing"
                width={46}
                height={46}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="brand-text">
              <div className="brand-name">
                {isMarathi ? 'समर्थ कॉलेज ऑफ नर्सिंग' : 'SAMARTH COLLEGE'}
              </div>
              <div className="brand-subtitle">
                {isMarathi ? 'नर्सिंग इन्स्टिट्यूट • संगमनेर' : 'NURSING INSTITUTE • SANGAMNER'}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="desktop-menu">
            <ul className="desktop-nav-list">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={idx} className={`menu-item-wrapper ${isActive ? 'is-active-tab' : ''}`}>
                    <Link href={item.href} className="nav-anchor">
                      {item.label}
                      {item.children && <i className="fas fa-chevron-down dropdown-caret"></i>}
                    </Link>
                    {item.children && (
                      <div className={`sub-dropdown-menu${item.mega ? ' mega-cols' : ''}`}>
                        {item.children.map((child, cIdx) => (
                          <Link key={cIdx} href={child.href} className="sub-menu-link">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
              {/* WhatsApp Nav Item in Green */}
              <li className="menu-item-wrapper">
                <a
                  href="https://wa.me/919689486570"
                  target="_blank"
                  rel="noreferrer"
                  className="nav-anchor nav-whatsapp-text"
                  title="WhatsApp Admissions Desk"
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            {/* Prominent Golden Apply Now CTA Button */}
            <Link href="/admission#form" className="nav-btn-apply" title={isMarathi ? 'प्रवेश अर्ज भरा' : 'Apply for Admission'}>
              {isMarathi ? 'प्रवेश अर्ज' : 'Apply Now'}
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`mobile-hamburger ${mobileOpen ? 'open is-active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* 3. MOBILE MENU BACKDROP */}
      {mobileOpen && (
        <div className={`mobile-menu-backdrop ${mobileOpen ? 'open is-active' : ''}`} onClick={closeMobile}></div>
      )}

      {/* 4. MOBILE SLIDE-IN DRAWER */}
      <aside className={`mobile-nav-drawer ${mobileOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="brand-crest mini">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '0.92rem', color: '#0d3b66' }}>
                {isMarathi ? 'समर्थ कॉलेज' : 'SAMARTH COLLEGE'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                {isMarathi ? 'संगमनेर' : 'Sangamner'}
              </div>
            </div>
          </div>
          <button onClick={closeMobile} className="drawer-close-btn" aria-label="Close menu">&times;</button>
        </div>

        {/* Mobile Language Switcher */}
        <div style={{ padding: '10px 16px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0d3b66' }}>
            <i className="fas fa-language" style={{ marginRight: '6px' }}></i>
            {isMarathi ? 'भाषा निवडा:' : 'Language:'}
          </span>
          <div className="lang-switcher-pill lang-switcher-navbar">
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span>|</span>
            <button
              type="button"
              className={language === 'mr' ? 'active' : ''}
              onClick={() => setLanguage('mr')}
            >
              मराठी
            </button>
          </div>
        </div>

        <div className="drawer-body">
          <ul className="drawer-nav-list">
            {navItems.map((item, idx) => (
              <li key={idx} className="drawer-nav-item">
                <div className="drawer-row">
                  <Link href={item.href} onClick={closeMobile} className="drawer-link">
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      className={`drawer-sub-toggle ${openSub === idx ? 'open expanded' : ''}`}
                      onClick={() => toggleSubmenu(idx)}
                      aria-label="Toggle submenu"
                    >
                      <i className="fas fa-chevron-down"></i>
                    </button>
                  )}
                </div>
                {item.children && openSub === idx && (
                  <ul className="drawer-sub-list open expanded">
                    {item.children.map((child, cIdx) => (
                      <li key={cIdx}>
                        <Link href={child.href} onClick={closeMobile} className="drawer-sub-link">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="drawer-footer-actions">
            <a href="tel:9689486570" className="drawer-call-btn">
              <i className="fas fa-phone-alt"></i> {t('phone')}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
