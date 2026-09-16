'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function GalleryPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const [activeIndex, setActiveIndex] = useState(null);

  const images = Array.from({ length: 38 }, (_, i) => `/gallery/gallery-${i + 1}.jpg`);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const nextImage = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }
  }, [activeIndex, images.length]);

  const prevImage = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [activeIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, nextImage, prevImage]);

  return (
    <div style={{ background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)', color: '#ffffff', padding: '55px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '5px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.06em' }}>
            <i className="fas fa-images"></i> {isMr ? 'गॅलरी' : 'CAMPUS GALLERY'}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'छायाचित्रे / गॅलरी' : 'Campus Gallery'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: '0 0 16px' }}>
            {isMr ? 'समर्थ कॉलेज जीवन, क्लिनिकल प्रशिक्षण व उपक्रम' : 'Campus Life, Clinical Training & Events'}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'गॅलरी' : 'Gallery'}</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="text-center mb-5" style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
            <span className="section-pill-tag" style={{ marginBottom: '14px', display: 'inline-block' }}>
              {isMr ? 'कॅम्पस आठवणी व उपक्रम' : 'CAMPUS LIFE & CLINICAL MOMENTS'}
            </span>
            <h2 style={{ color: '#0d3b66', fontSize: '2.2rem', margin: '0 0 14px' }}>
              {isMr ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर' : 'Samarth College of Nursing in Action'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
              {isMr
                ? 'महाविद्यालयातील आधुनिक प्रयोगशाळा, प्रत्यक्ष रुग्णालय क्लिनिकल प्रात्यक्षिके, सांस्कृतिक कार्यक्रम व शैक्षणिक उपक्रमांची क्षणचित्रे.'
                : 'A visual glimpse into our state-of-the-art simulation labs, hospital bedside rotations, lamp lighting ceremonies, and campus celebrations.'}
            </p>
          </div>

          <div className="gallery-grid">
            {images.map((src, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openLightbox(index)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <Image
                  src={src}
                  alt={`Samarth College Gallery Photo ${index + 1}`}
                  width={400}
                  height={300}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(13,59,102,0.4)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '1.5rem',
                  }}
                  className="gallery-overlay"
                >
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div className="lightbox active" onClick={closeLightbox}>
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label={isMr ? 'बंद करा' : 'Close'}
          >
            &times;
          </button>
          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label={isMr ? 'मागील' : 'Previous'}
          >
            &#8249;
          </button>
          <img
            src={images[activeIndex]}
            alt={`Samarth College Preview ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label={isMr ? 'पुढील' : 'Next'}
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}
