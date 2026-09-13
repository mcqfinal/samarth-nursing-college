'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();
  const isMarathi = language === 'mr';

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer-mockup">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <div className="footer-crest">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div>
                <h3 className="footer-title">
                  {isMarathi ? 'समर्थ कॉलेज ऑफ नर्सिंग' : 'Samarth College'}
                </h3>
                <div className="footer-subtitle">
                  {isMarathi ? 'संगमनेर, अहिल्यानगर' : 'Sangamner'}
                </div>
                <div className="footer-tagline">{t('collegeTagline')}</div>
              </div>
            </div>
            <p className="footer-desc">
              {t('footerDesc')}
            </p>
            <div className="footer-affiliation-note">
              {t('footerAffiliation')}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-col">
            <h4 className="footer-heading">{t('quickLinks')}</h4>
            <ul className="footer-list">
              <li><Link href="/">{t('navHome')}</Link></li>
              <li><Link href="/about">{t('navAbout')}</Link></li>
              <li><Link href="/courses">{t('navCourses')}</Link></li>
              <li><Link href="/facilities">{t('navFacilities')}</Link></li>
              <li><Link href="/achievements">{t('navAchievements')}</Link></li>
              <li><Link href="/gallery">{t('navGallery')}</Link></li>
              <li><Link href="/contact">{t('navContact')}</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-contact-col">
            <h4 className="footer-heading">{t('navContact')}</h4>
            <div className="footer-contact-row">
              <i className="fas fa-phone-alt contact-icon"></i>
              <a href="tel:9689486570">{t('phone')}</a>
            </div>
            <div className="footer-contact-row">
              <i className="fas fa-envelope contact-icon"></i>
              <a href="mailto:samarthnursing41@gmail.com">{t('email')}</a>
            </div>
            <div className="footer-contact-row">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              <span>{t('location')}</span>
            </div>
          </div>

          {/* Follow Us Column */}
          <div className="footer-social-col">
            <h4 className="footer-heading">{t('followUs')}</h4>
            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Link href="/admin/login" className="btn-admin-access">
                <i className="fas fa-lock"></i> {t('adminPortal')}
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </div>
          <div className="footer-legal-links">
            <Link href="/about">{t('privacyPolicy')}</Link>
            <span>|</span>
            <Link href="/about">{t('termsConditions')}</Link>
          </div>
          <button onClick={scrollToTop} className="btn-scroll-top" title="Scroll to Top" aria-label="Scroll to top">
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}
