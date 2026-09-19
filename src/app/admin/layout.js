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
  const [customPages, setCustomPages] = useState([]);
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

        // Fetch custom pages list
        fetch('/api/custom-pages')
          .then((r) => r.json())
          .then((d) => {
            if (d && d.pages) setCustomPages(d.pages);
          })
          .catch(() => {});
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

  const navSections = [
    {
      title: 'Management',
      items: [
        { label: 'Dashboard', href: '/admin', icon: 'fas fa-th-large' },
        { label: 'Admission Enquiries', href: '/admin/enquiries', icon: 'fas fa-user-graduate' },
        { label: 'Notices & Circulars', href: '/admin/notices', icon: 'fas fa-bullhorn' },
        { label: 'Upcoming Events', href: '/admin/events', icon: 'far fa-calendar-alt' },
      ],
    },
    {
      title: 'Content & CMS',
      items: [
        { label: 'Website Pages CMS', href: '/admin/pages', icon: 'fas fa-file-alt' },
        {
          label: 'Custom Pages',
          href: '/admin/custom-pages',
          icon: 'fas fa-layer-group',
          badge: customPages.length > 0 ? customPages.length : null,
          children: customPages.map((cp) => ({
            id: cp.id,
            label: cp.titleEn,
            href: `/admin/custom-pages?edit=${cp.id}`,
            viewHref: `/pages/${cp.slug}`,
          })),
        },
        { label: 'Campus Facilities', href: '/admin/facilities', icon: 'fas fa-hospital-alt' },
        { label: 'Old Question Papers', href: '/admin/question-papers', icon: 'fas fa-book-open' },
        { label: 'Gallery Manager', href: '/admin/gallery', icon: 'fas fa-images' },
      ],
    },
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
      <aside
        style={{
          width: '275px',
          backgroundColor: '#07192b',
          backgroundImage: 'linear-gradient(180deg, #081e33 0%, #051322 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          boxShadow: '4px 0 24px rgba(0,0,0,0.18)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '20px 18px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              flexShrink: 0,
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Image
              src="/images/college-logo.png"
              alt="Samarth College Logo"
              width={34}
              height={34}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: "'Inter', -apple-system, sans-serif",
                }}
              >
                SAMARTH
              </h3>
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.14)',
                  border: '1px solid rgba(16, 185, 129, 0.28)',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                Live
              </span>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#ffb703',
                fontWeight: 600,
                letterSpacing: '0.5px',
                display: 'block',
                marginTop: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Nursing Institute
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav
          style={{
            flex: 1,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto',
          }}
        >
          {navSections.map((sec) => (
            <div key={sec.title}>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'rgba(148, 163, 184, 0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  padding: '0 10px 6px',
                }}
              >
                {sec.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {sec.items.map((item) => {
                  const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
                  return (
                    <div key={item.href} style={{ display: 'flex', flexDirection: 'column' }}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`admin-sidebar-nav-item ${active ? 'active' : ''}`}
                      >
                        <div className="admin-nav-icon-box">
                          <i className={item.icon}></i>
                        </div>
                        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.label}
                        </span>
                        {item.badge !== null && item.badge !== undefined && (
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              padding: '1px 6px',
                              borderRadius: '8px',
                              backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(56, 189, 248, 0.15)',
                              color: active ? '#ffffff' : '#38bdf8',
                              marginRight: active ? '6px' : '0',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                        {active && (
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#ffb703',
                              boxShadow: '0 0 8px #ffb703',
                              marginLeft: item.badge ? '0' : 'auto',
                            }}
                          ></span>
                        )}
                      </Link>

                      {/* Sub-items for custom pages */}
                      {item.children && item.children.length > 0 && (
                        <div style={{ paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '3px', marginBottom: '4px' }}>
                          {item.children.map((child) => (
                            <div
                              key={child.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '5px 8px',
                                borderRadius: '6px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                fontSize: '0.78rem',
                              }}
                              className="admin-custom-subpage-row"
                            >
                              <Link
                                href={child.href}
                                onClick={() => setSidebarOpen(false)}
                                style={{
                                  color: 'rgba(226, 232, 240, 0.85)',
                                  textDecoration: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  flex: 1,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981', flexShrink: 0 }}></span>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{child.label}</span>
                              </Link>
                              <Link
                                href={child.viewHref}
                                target="_blank"
                                title="Open live page in new tab"
                                style={{ color: '#94a3b8', fontSize: '0.72rem', padding: '2px 4px', textDecoration: 'none', marginLeft: '6px' }}
                              >
                                <i className="fas fa-external-link-alt"></i>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Shortcuts */}
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'rgba(148, 163, 184, 0.65)',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                padding: '0 10px 6px',
              }}
            >
              Shortcuts
            </div>
            <Link
              href="/"
              target="_blank"
              className="admin-sidebar-nav-item admin-shortcut-btn"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
              }}
            >
              <div className="admin-nav-icon-box" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)' }}>
                <i className="fas fa-external-link-alt"></i>
              </div>
              <span style={{ flex: 1 }}>View Live Website</span>
              <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}></i>
            </Link>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div
          style={{
            padding: '14px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, rgba(8, 26, 44, 0.5) 0%, rgba(4, 15, 26, 0.85) 100%)',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '12px',
              transition: 'all 0.2s ease',
            }}
            className="admin-user-profile-box"
          >
            {/* Top row: Avatar + Name + Role Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    boxShadow: '0 2px 10px rgba(2, 132, 199, 0.3)',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <i className="fas fa-shield-alt"></i>
                </div>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: '-1px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    border: '2px solid #07192b',
                  }}
                  title="System Online"
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                  <span
                    style={{
                      color: '#ffffff',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      letterSpacing: '0.2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {adminUser?.name || 'Administrator'}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: '#fbbf24',
                      background: 'rgba(251, 191, 36, 0.14)',
                      border: '1px solid rgba(251, 191, 36, 0.28)',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                      flexShrink: 0,
                    }}
                  >
                    {adminUser?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#94a3b8',
                    display: 'block',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={adminUser?.email || 'admin@samarthnursing.edu.in'}
                >
                  {adminUser?.email || 'admin@samarthnursing.edu.in'}
                </span>
              </div>
            </div>

            {/* Bottom button: Integrated clean Sign Out */}
            <button
              onClick={handleLogout}
              className="admin-logout-btn"
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fas fa-sign-out-alt" style={{ fontSize: '0.82rem' }}></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '275px', display: 'flex', flexDirection: 'column' }} className="admin-main-wrapper">
        {/* Top Header */}
        <header
          style={{
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
          }}
        >
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
            <span
              style={{
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
              }}
            >
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
        .admin-sidebar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
        }
        .admin-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        .admin-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        .admin-sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 12px;
          border-radius: 9px;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(226, 232, 240, 0.78);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid transparent;
        }
        .admin-sidebar-nav-item:hover {
          background: rgba(255, 255, 255, 0.07) !important;
          color: #ffffff !important;
          transform: translateX(3px);
        }
        .admin-sidebar-nav-item:hover .admin-nav-icon-box {
          background: rgba(255, 255, 255, 0.12) !important;
          color: #ffb703 !important;
        }
        .admin-sidebar-nav-item.active {
          background: linear-gradient(90deg, rgba(245, 158, 11, 0.16) 0%, rgba(245, 158, 11, 0.04) 100%) !important;
          border-color: rgba(245, 158, 11, 0.32) !important;
          color: #ffffff !important;
          font-weight: 600 !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15) !important;
        }
        .admin-sidebar-nav-item.active .admin-nav-icon-box {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
          color: #ffffff !important;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35) !important;
        }
        .admin-nav-icon-box {
          width: 30px;
          height: 30px;
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .admin-user-profile-box {
          transition: all 0.2s ease;
        }
        .admin-user-profile-box:hover {
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
        .admin-custom-subpage-row {
          transition: all 0.2s ease;
        }
        .admin-custom-subpage-row:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(56, 189, 248, 0.3) !important;
          transform: translateX(2px);
        }
        .admin-logout-btn {
          transition: all 0.2s ease;
        }
        .admin-logout-btn:hover {
          background: rgba(239, 68, 68, 0.24) !important;
          border-color: rgba(239, 68, 68, 0.45) !important;
          color: #ffffff !important;
          transform: translateY(-1px);
        }
        .admin-shortcut-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.16) !important;
          color: #ffffff !important;
          transform: translateY(-1px);
        }
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
