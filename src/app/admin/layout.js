'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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
        backgroundColor: '#092847',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p>Loading Samarth Admin Console...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: 'fas fa-chart-line' },
    { label: 'Admission Enquiries', href: '/admin/enquiries', icon: 'fas fa-user-graduate' },
    { label: 'Notices & Circulars', href: '/admin/notices', icon: 'fas fa-bullhorn' },
    { label: 'Gallery Manager', href: '/admin/gallery', icon: 'fas fa-images' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: "'Inter', sans-serif" }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 90,
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '260px',
        backgroundColor: '#0d3b66',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(0)',
        transition: 'transform 0.3s ease',
      }}
      className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#1a9988',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}>
            S
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: '#fff', fontFamily: 'inherit' }}>Samarth Nursing</h3>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Admin Console</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  color: active ? '#fff' : 'rgba(255,255,255,0.8)',
                  backgroundColor: active ? '#1a9988' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: active ? '600' : '400',
                  transition: 'background 0.2s',
                }}
              >
                <i className={item.icon} style={{ width: '20px' }}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '15px 0' }}></div>

          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '6px',
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
          >
            <i className="fas fa-external-link-alt" style={{ width: '20px' }}></i>
            <span>View Live Website</span>
          </Link>
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
            Logged in as:<br />
            <strong style={{ color: '#fff' }}>{adminUser?.email || 'Admin'}</strong>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="admin-main-wrapper">
        {/* Top Header */}
        <header style={{
          backgroundColor: '#fff',
          padding: '16px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 80,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#0d3b66',
                display: 'none',
              }}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#0d3b66', fontFamily: 'inherit' }}>
              Management Dashboard
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              backgroundColor: '#eef2f7',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              color: '#0d3b66',
              fontWeight: '500',
            }}>
              <i className="fas fa-shield-alt" style={{ color: '#1a9988', marginRight: '6px' }}></i>
              {adminUser?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
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
