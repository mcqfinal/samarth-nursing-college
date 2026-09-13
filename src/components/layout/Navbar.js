'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
      children: [
        { label: t('navAboutTrust'), href: '/about' },
        { label: t('navVisionMission'), href: '/about/vision-mission' },
        { label: t('navPrincipalGnm'), href: '/about/principal-gnm' },
        { label: t('navPrincipalAnm'), href: '/about/principal-anm' },
        { label: t('navManagement'), href: '/about/management' },
        { label: t('navAchievements'), href: '/achievements' },
      ],
    },
    {
      label: t('navCourses'),
      href: '/courses',
      children: [
        { label: t('navGnm'), href: '/courses/gnm' },
        { label: t('navAnm'), href: '/courses/anm' },
        { label: t('navAdmlt'), href: '/courses/admlt' },
      ],
    },
    {
      label: t('navAdmission'),
      href: '/contact',
      children: [
        { label: t('navAdmissionProcess'), href: '/contact' },
        { label: t('navEligibility'), href: '/courses' },
        { label: t('navScholarshipSchemes'), href: '/facilities#scholarship' },
      ],
    },
    {
      label: t('navFacilities'),
      href: '/facilities',
      children: [
        { label: t('navFacilities'), href: '/facilities' },
        { label: t('navClinicalTraining'), href: '/facilities#clinical' },
        { label: t('navHostel'), href: '/facilities#hostel' },
        { label: t('navScholarship'), href: '/facilities#scholarship' },
      ],
    },
    { label: t('navAchievements'), href: '/achievements' },
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
        <div className="container top-bar-flex">
          {/* Left: Contact Info */}
          <div className="top-bar-contacts">
            <a href="tel:9689486570" className="top-item" title="Call Us">
              <i className="fas fa-phone-alt"></i> {t('phone')}
            </a>
            <a href="mailto:samarthnursing41@gmail.com" className="top-item" title="Email Us">
              <i className="fas fa-envelope"></i> {t('email')}
            </a>
            <span className="top-item location-item">
              <i className="fas fa-map-marker-alt"></i> {t('location')}
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

            <Link href="/admin/login" className="btn-student-login">
              <i className="fas fa-user-graduate"></i> {t('studentLogin')}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR & CREST BRANDING */}
      <header className={`main-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container header-content">
          {/* Brand Logo with Crest */}
          <Link href="/" className="college-brand" onClick={closeMobile}>
            <div className="brand-crest">
              <i className="fas fa-graduation-cap crest-icon"></i>
              <div className="crest-badge">ESTD 2021</div>
            </div>
            <div className="brand-text">
              <div className="brand-name">
                {isMarathi ? 'समर्थ कॉलेज ऑफ नर्सिंग' : 'SAMARTH COLLEGE'}
              </div>
              <div className="brand-location">
                {isMarathi ? 'संगमनेर, अहिल्यानगर' : 'SANGAMNER'}
              </div>
              <div className="brand-tagline">{t('collegeTagline')}</div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="desktop-menu">
            <ul style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', margin: 0, padding: 0 }}>
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={idx} className={`menu-item-wrapper ${isActive ? 'is-active-tab' : ''}`}>
                    <Link href={item.href} className="nav-anchor">
                      {item.label}
                      {item.children && <i className="fas fa-chevron-down dropdown-caret"></i>}
                    </Link>
                    {item.children && (
                      <div className="sub-dropdown-menu">
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
            </ul>

            {/* Desktop Language Switcher Shortcut */}
            <div className="lang-switcher-pill lang-switcher-navbar" title="Switch Language">
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
            <Link href="/admin/login" onClick={closeMobile} className="btn-student-login mobile" style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>
              <i className="fas fa-user-graduate"></i> {t('studentLogin')}
            </Link>
            <a href="tel:9689486570" className="drawer-call-btn">
              <i className="fas fa-phone-alt"></i> {t('phone')}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
