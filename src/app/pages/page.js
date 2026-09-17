'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PagesIndex() {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/custom-pages')
      .then(r => r.json())
      .then(d => setPages((d.pages || []).filter(p => p.status === 'published')))
      .catch(() => setPages([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: '#f1f5f9', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)', color: '#fff', padding: '60px 20px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '5px 16px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, marginBottom: 16, letterSpacing: '0.06em' }}>
            <i className="fas fa-file-alt" /> {isMr ? 'माहिती पृष्ठे' : 'INFORMATION PAGES'}
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, margin: '0 0 12px', fontFamily: "'Playfair Display', serif", color: '#ffffff' }}>
            {isMr ? 'सर्व माहिती पृष्ठे' : 'All Information Pages'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: 0 }}>
            {isMr ? 'महाविद्यालयाशी संबंधित सर्व महत्त्वाची माहिती येथे उपलब्ध आहे.' : 'Find all important information and documents related to Samarth College of Nursing.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '56px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: 12 }} />
              {isMr ? 'लोड होत आहे...' : 'Loading pages...'}
            </div>
          ) : pages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <i className="fas fa-file-times" style={{ fontSize: '2.5rem', color: '#cbd5e1', display: 'block', marginBottom: 14 }} />
              <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
                {isMr ? 'अद्याप कोणतेही पृष्ठ उपलब्ध नाही.' : 'No pages published yet.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {pages.map(page => {
                const title = isMr && page.titleMr ? page.titleMr : page.titleEn;
                const desc = isMr && page.descriptionMr ? page.descriptionMr : page.descriptionEn;
                return (
                  <Link key={page.id} href={`/pages/${page.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)'; }}
                    >
                      {/* Image */}
                      {page.imageUrl ? (
                        <img src={page.imageUrl} alt={title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ width: '100%', height: 160, background: 'linear-gradient(135deg, #e0f2fe, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-file-alt" style={{ fontSize: '2.5rem', color: '#93c5fd' }} />
                        </div>
                      )}
                      {/* Body */}
                      <div style={{ padding: '20px 22px' }}>
                        <h3 style={{ color: '#0d3b66', fontSize: '1.08rem', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.3 }}>{title}</h3>
                        {desc && (
                          <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {desc}
                          </p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                            <i className="fas fa-calendar-alt" style={{ marginRight: 4 }} />
                            {new Date(page.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                            {isMr ? 'वाचा' : 'Read More'} <i className="fas fa-arrow-right" style={{ fontSize: '0.72rem' }} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
