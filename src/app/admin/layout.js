'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/me');
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        const data = await res.json();
        setAdminUser(data.user);
      } catch (err) {
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
    } catch (e) {
      router.replace('/admin/login');
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#082238',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#ffb703' }}>
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.3px' }}>
            Loading Samarth Admin Console...
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: 'fas fa-th-large' },
    { label: 'Website Pages CMS', href: '/admin/pages', icon: 'fas fa-file-alt' },
    { label: 'Admission Enquiries', href: '/admin/enquiries', icon: 'fas fa-user-graduate' },
    { label: 'Notices & Circulars', href: '/admin/notices', icon: 'fas fa-bullhorn' },
    { label: 'Gallery Manager', href: '/admin/gallery', icon: 'fas fa-images' },
    { label: 'Campus Facilities', href: '/admin/facilities', icon: 'fas fa-hospital-alt' },
    { label: 'Old Question Papers', href: '/admin/question-papers', icon: 'fas fa-book' },
    { label: 'Custom Pages', href: '/admin/custom-pages', icon: 'fas fa-file-plus' },

  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 34, 56, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '270px',
        backgroundColor: '#082238',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        {/* Brand Header */}
        <div style={{
          padding: '22px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            flexShrink: 0,
          }}>
            <Image
              src="/images/college-logo.png"
              alt="Samarth College Logo"
              width={38}
              height={38}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h3 style={{
              margin: 0,
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '0.3px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}>
              SAMARTH
            </h3>
            <span style={{
              fontSize: '0.72rem',
              color: '#ffb703',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '1px',
            }}>
              Nursing Institute
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '22px 14px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1.2px', padding: '0 12px 6px' }}>
            Management
          </div>

          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  color: active ? '#082238' : 'rgba(255,255,255,0.85)',
                  background: active ? 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: active ? '700' : '500',
                  boxShadow: active ? '0 4px 14px rgba(251, 133, 0, 0.35)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className={item.icon} style={{ width: '20px', fontSize: '1.05rem', color: active ? '#082238' : '#ffb703' }}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '18px 6px 12px' }}></div>

          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1.2px', padding: '0 12px 6px' }}>
            Shortcuts
          </div>

          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 16px',
              borderRadius: '10px',
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontSize: '0.92rem',
              fontWeight: 500,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fas fa-external-link-alt" style={{ width: '20px', color: '#93c5fd' }}></i>
            <span>View Live Website</span>
          </Link>
        </nav>

        {/* User Badge & Logout */}
        <div style={{
          padding: '18px 16px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.2)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '14px',
            background: 'rgba(255,255,255,0.05)',
            padding: '10px 12px',
            borderRadius: '8px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#082238',
              fontWeight: 800,
              fontSize: '0.85rem',
            }}>
              <i className="fas fa-user-shield"></i>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Signed in as
              </span>
              <strong style={{ color: '#fff', fontSize: '0.84rem', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {adminUser?.email || 'Administrator'}
              </strong>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '11px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '270px', display: 'flex', flexDirection: 'column' }} className="admin-main-wrapper">
        {/* Top Header */}
        <header style={{
          backgroundColor: '#ffffff',
          padding: '16px 32px',
          boxShadow: '0 2px 10px rgba(13, 59, 102, 0.04)',
          borderBottom: '1.5px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 80,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin-menu-btn"
              style={{
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                width: '38px',
                height: '38px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                color: '#082238',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i className="fas fa-bars"></i>
            </button>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Samarth College of Nursing
              </span>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#082238', fontFamily: "'Playfair Display', serif" }}>
                Management Dashboard
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              backgroundColor: '#fef3c7',
              border: '1px solid #fde68a',
              padding: '6px 14px',
              borderRadius: '30px',
              fontSize: '0.82rem',
              color: '#b45309',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <i className="fas fa-crown" style={{ color: '#d97706' }}></i>
              {adminUser?.role === 'superadmin' ? 'Super Administrator' : 'Administrator'}
            </span>
          </div>
        </header>

        {/* Page Body */}
        <main style={{ padding: '24px', flex: 1 }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            transform: translateX(-100%) !important;
          }
          .admin-sidebar.open {
            transform: translateX(0) !important;
          }
          .admin-main-wrapper {
            margin-left: 0 !important;
          }
          .admin-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
