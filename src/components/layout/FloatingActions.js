'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language } = useLanguage();
  const isMr = language === 'mr';

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    isMr
      ? 'नमस्कार, मला समर्थ कॉलेज ऑफ नर्सिंग (GNM / ANM / ADMLT) प्रवेशाबद्दल माहिती हवी आहे.'
      : 'Hello, I would like to inquire about admissions at Samarth College of Nursing for GNM / ANM / ADMLT courses.'
  );

  return (
    <div className="floating-actions-container" aria-label="Quick Actions">
      {/* 1. Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="floating-btn scroll-top-btn"
          title={isMr ? 'वर स्क्रोल करा' : 'Scroll to Top'}
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      {/* 2. WhatsApp Floating Button with Notification Badge */}
      <a
        href={`https://wa.me/919689486570?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        title={isMr ? 'व्हॉट्सॲपवर संपर्क साधा' : 'Chat on WhatsApp'}
        aria-label="WhatsApp Admissions Inquiry"
      >
        <span className="whatsapp-badge">1</span>
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}
