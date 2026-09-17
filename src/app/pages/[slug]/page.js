'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function CustomPageView() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch('/api/custom-pages');
        const data = await res.json();
        const found = (data.pages || []).find(p => p.slug === slug && p.status === 'published');
        if (found) {
          setPage(found);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: 12 }} />
          Loading page...
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>📄</div>
          <h1 style={{ color: '#0d3b66', fontSize: '1.8rem', marginBottom: 8 }}>Page Not Found</h1>
          <p style={{ color: '#64748b', marginBottom: 24 }}>The page you are looking for does not exist or has been removed.</p>
          <Link href="/" style={{ background: '#0d3b66', color: '#fff', padding: '12px 28px', borderRadius: 50, textDecoration: 'none', fontWeight: 700 }}>
            Go to Home
          </Link>
        </div>
      </main>
    );
  }

  const title = isMr && page.titleMr ? page.titleMr : page.titleEn;
  const description = isMr && page.descriptionMr ? page.descriptionMr : page.descriptionEn;

  return (
    <main style={{ background: '#f1f5f9', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)',
        color: '#fff',
        padding: '60px 20px 50px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '5px 16px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700, marginBottom: 16, letterSpacing: '0.06em' }}>
            <i className="fas fa-file-alt" /> {isMr ? 'माहिती' : 'INFORMATION'}
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800, margin: 0 }}>
            {title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '56px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Image */}
          {page.imageUrl && (
            <div style={{ marginBottom: 36, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              <img
                src={page.imageUrl}
                alt={title}
                style={{ width: '100%', maxHeight: 460, objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          {/* Description Card */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '36px 40px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 20, borderBottom: '2px solid #f1f5f9' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-info-circle" style={{ color: '#0284c7', fontSize: '1rem' }} />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0d3b66', fontWeight: 800 }}>
                {isMr ? 'माहिती' : 'Details'}
              </h2>
            </div>

            <div style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
              {description}
            </div>

            {/* Date */}
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#94a3b8' }}>
              <i className="fas fa-calendar-alt" />
              {isMr ? 'प्रकाशित: ' : 'Published: '}
              {new Date(page.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
          </div>

          {/* Back Button */}
          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0d3b66', color: '#fff', padding: '12px 28px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
              <i className="fas fa-arrow-left" /> {isMr ? 'मुख्यपृष्ठावर परत जा' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
