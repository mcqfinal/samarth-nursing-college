'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    gnmLeads: 0,
    anmLeads: 0,
    admltLeads: 0,
    noticesCount: 0,
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [enqRes, notRes] = await Promise.all([
          fetch('/api/enquiries'),
          fetch('/api/notices'),
        ]);

        const enqData = await enqRes.json();
        const notData = await notRes.json();

        const enquiries = enqData.enquiries || [];
        const notices = notData.notices || [];

        const total = enquiries.length;
        const newCount = enquiries.filter(e => e.status === 'NEW').length;
        const gnm = enquiries.filter(e => e.course === 'GNM').length;
        const anm = enquiries.filter(e => e.course === 'ANM').length;
        const admlt = enquiries.filter(e => e.course === 'ADMLT').length;

        setStats({
          totalLeads: total,
          newLeads: newCount,
          gnmLeads: gnm,
          anmLeads: anm,
          admltLeads: admlt,
          noticesCount: notices.length,
        });

        setRecentLeads(enquiries.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#0d3b66' }}></i>
        <p style={{ marginTop: '10px' }}>Loading dashboard metrics...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Enquiries', value: stats.totalLeads, icon: 'fas fa-users', bg: '#082238', color: '#ffb703', border: '#082238' },
    { label: 'New Uncontacted Leads', value: stats.newLeads, icon: 'fas fa-user-clock', bg: '#dc2626', color: '#fee2e2', border: '#ef4444' },
    { label: 'GNM Inquiries', value: stats.gnmLeads, icon: 'fas fa-heartbeat', bg: '#0284c7', color: '#e0f2fe', border: '#0284c7' },
    { label: 'Active Notices', value: stats.noticesCount, icon: 'fas fa-bullhorn', bg: '#d97706', color: '#fef3c7', border: '#ffb703' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '1.75rem', fontWeight: 800, color: '#082238', fontFamily: "'Playfair Display', serif" }}>
          Welcome, Administrator
        </h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
          Real-time overview of admissions, student inquiries, and campus circulars for Samarth College of Nursing.
        </p>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {statCards.map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '22px 24px',
              boxShadow: '0 4px 20px rgba(13, 59, 102, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1.5px solid #e2e8f0',
              borderTop: `4px solid ${card.border}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>{card.label}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#082238' }}>{card.value}</div>
            </div>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: card.color,
              color: card.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.35rem',
            }}>
              <i className={card.icon}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '30px' }} className="admin-grid-2col">
        {/* Recent Leads Table */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '26px',
          boxShadow: '0 4px 20px rgba(13, 59, 102, 0.05)',
          border: '1.5px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', borderBottom: '1.5px solid #f1f5f9', paddingBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#082238' }}>Recent Admission Leads</h3>
            <Link
              href="/admin/enquiries"
              style={{ fontSize: '0.86rem', color: '#d97706', fontWeight: '700', textDecoration: 'none' }}
            >
              View All Leads &rarr;
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <i className="fas fa-inbox" style={{ fontSize: '2.5rem', marginBottom: '12px', color: '#cbd5e1' }}></i>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>No enquiries received yet. Forms submitted on the Contact page will appear here.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #edf2f7', textAlign: 'left', color: '#666' }}>
                    <th style={{ padding: '10px 8px' }}>Student Name</th>
                    <th style={{ padding: '10px 8px' }}>Phone</th>
                    <th style={{ padding: '10px 8px' }}>Course</th>
                    <th style={{ padding: '10px 8px' }}>Status</th>
                    <th style={{ padding: '10px 8px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#082238' }}>{lead.name}</td>
                      <td style={{ padding: '12px 8px', color: '#64748b' }}>{lead.phone}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          backgroundColor: '#e0f2fe',
                          color: '#0369a1',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                        }}>
                          {lead.course}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          backgroundColor: lead.status === 'NEW' ? '#fee2e2' : '#dcfce7',
                          color: lead.status === 'NEW' ? '#b91c1c' : '#15803d',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                        }}>
                          {lead.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                        <a
                          href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20thank%20you%20for%20enquiring%20about%20Samarth%20College%20of%20Nursing.`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            backgroundColor: '#25D366',
                            color: '#fff',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <i className="fab fa-whatsapp"></i> Chat
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Course Breakdown Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '26px',
          boxShadow: '0 4px 20px rgba(13, 59, 102, 0.05)',
          border: '1.5px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ margin: '0 0 20px', fontSize: '1.2rem', fontWeight: 800, color: '#082238' }}>Program Interest</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  <span>GNM (General Nursing)</span>
                  <strong style={{ color: '#082238' }}>{stats.gnmLeads} leads</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: stats.totalLeads ? `${(stats.gnmLeads / stats.totalLeads) * 100}%` : '0%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #082238 0%, #1e3a8a 100%)',
                    borderRadius: '4px',
                  }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  <span>ANM (Auxiliary Nursing)</span>
                  <strong style={{ color: '#082238' }}>{stats.anmLeads} leads</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: stats.totalLeads ? `${(stats.anmLeads / stats.totalLeads) * 100}%` : '0%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #d97706 0%, #ffb703 100%)',
                    borderRadius: '4px',
                  }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  <span>ADMLT (Medical Lab Tech)</span>
                  <strong style={{ color: '#082238' }}>{stats.admltLeads} leads</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: stats.totalLeads ? `${(stats.admltLeads / stats.totalLeads) * 100}%` : '0%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
                    borderRadius: '4px',
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/admin/pages"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                color: '#082238',
                padding: '12px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '800',
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(251, 133, 0, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fas fa-file-alt"></i> Edit Website Pages (CMS)
            </Link>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                href="/admin/notices"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #082238 0%, #1e3a8a 100%)',
                  color: '#ffffff',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  boxShadow: '0 4px 12px rgba(8, 34, 56, 0.2)',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className="fas fa-bullhorn" style={{ color: '#ffb703' }}></i> Notices
              </Link>
              <Link
                href="/admin/facilities"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  background: '#f1f5f9',
                  color: '#082238',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  border: '1px solid #cbd5e1',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className="fas fa-hospital-alt" style={{ color: '#0284c7' }}></i> Facilities
              </Link>
            </div>
            <Link
              href="/admin/question-papers"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textAlign: 'center',
                background: '#f8fafc',
                color: '#0d3b66',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '0.88rem',
                border: '1.5px solid #0d3b66',
                marginTop: '10px',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fas fa-book" style={{ color: '#ffb703' }}></i> Manage Old Question Papers
            </Link>
            <Link
              href="/admin/custom-pages"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '0.88rem',
                marginTop: '10px',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fas fa-file-plus" style={{ color: '#ffd166' }}></i> Custom Pages Builder
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .admin-grid-2col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
