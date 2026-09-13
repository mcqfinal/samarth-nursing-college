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
    { label: 'Total Enquiries', value: stats.totalLeads, icon: 'fas fa-users', bg: '#0d3b66', color: '#fff' },
    { label: 'New Uncontacted Leads', value: stats.newLeads, icon: 'fas fa-user-clock', bg: '#e74c3c', color: '#fff' },
    { label: 'GNM Inquiries', value: stats.gnmLeads, icon: 'fas fa-heartbeat', bg: '#1a9988', color: '#fff' },
    { label: 'Active Notices', value: stats.noticesCount, icon: 'fas fa-bullhorn', bg: '#f39c12', color: '#fff' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '1.6rem', color: '#0d3b66', fontFamily: "'Playfair Display', serif" }}>
          Welcome, Administrator
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
          Overview of admissions, leads, and web updates for Samarth College of Nursing.
        </p>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
      }}>
        {statCards.map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderLeft: `5px solid ${card.bg}`,
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '6px' }}>{card.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0d3b66' }}>{card.value}</div>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: `${card.bg}15`,
              color: card.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
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
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#0d3b66' }}>Recent Admission Leads</h3>
            <Link
              href="/admin/enquiries"
              style={{ fontSize: '0.85rem', color: '#1a9988', fontWeight: '600', textDecoration: 'none' }}
            >
              View All Leads &rarr;
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
              <i className="fas fa-inbox" style={{ fontSize: '2rem', marginBottom: '10px', color: '#ccc' }}></i>
              <p>No enquiries received yet. Forms submitted on the Contact page will appear here.</p>
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
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#0d3b66' }}>{lead.name}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <a href={`tel:${lead.phone}`} style={{ color: '#1a9988', textDecoration: 'none' }}>
                          <i className="fas fa-phone-alt" style={{ fontSize: '0.75rem', marginRight: '4px' }}></i>
                          {lead.phone}
                        </a>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          backgroundColor: '#eef2f7',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#0d3b66',
                        }}>
                          {lead.course}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          backgroundColor: lead.status === 'NEW' ? '#fde8e8' : lead.status === 'CONTACTED' ? '#fef3c7' : '#dcfce7',
                          color: lead.status === 'NEW' ? '#991b1b' : lead.status === 'CONTACTED' ? '#92400e' : '#166534',
                          padding: '3px 8px',
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
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
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
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', color: '#0d3b66' }}>Program Interest</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>GNM (General Nursing)</span>
                  <strong>{stats.gnmLeads} leads</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#eef2f7', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: stats.totalLeads ? `${(stats.gnmLeads / stats.totalLeads) * 100}%` : '0%',
                    height: '100%',
                    backgroundColor: '#0d3b66',
                  }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>ANM (Auxiliary Nursing)</span>
                  <strong>{stats.anmLeads} leads</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#eef2f7', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: stats.totalLeads ? `${(stats.anmLeads / stats.totalLeads) * 100}%` : '0%',
                    height: '100%',
                    backgroundColor: '#1a9988',
                  }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>ADMLT (Medical Lab Tech)</span>
                  <strong>{stats.admltLeads} leads</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#eef2f7', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: stats.totalLeads ? `${(stats.admltLeads / stats.totalLeads) * 100}%` : '0%',
                    height: '100%',
                    backgroundColor: '#f39c12',
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #edf2f7' }}>
            <Link
              href="/admin/notices"
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#0d3b66',
                color: '#fff',
                padding: '10px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
              }}
            >
              <i className="fas fa-plus-circle" style={{ marginRight: '6px' }}></i> Post New Notice
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
