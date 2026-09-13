'use client';

import { useState, useEffect } from 'react';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Admission');
  const [submitting, setSubmitting] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notices');
      const data = await res.json();
      setNotices(data.notices || []);
    } catch (err) {
      console.error('Failed to load notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      });
      if (res.ok) {
        setTitle('');
        setContent('');
        fetchNotices();
        alert('Notice published successfully!');
      } else {
        alert('Failed to publish notice');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/notices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        setNotices(prev => prev.map(n => n.id === id ? { ...n, isActive: !currentStatus } : n));
      }
    } catch (err) {
      alert('Failed to toggle notice');
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`/api/admin/notices/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotices(prev => prev.filter(n => n.id !== id));
      }
    } catch (err) {
      alert('Failed to delete notice');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '1.6rem', color: '#0d3b66', fontFamily: "'Playfair Display', serif" }}>
          Notices & Announcements
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
          Publish and manage circulars, admission deadlines, and campus updates.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }} className="notices-grid">
        {/* Create Form Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          height: 'fit-content',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', color: '#0d3b66' }}>Post New Notice</h3>
          <form onSubmit={handleCreateNotice}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                Notice Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., GNM Admission Round 2 Verification Schedule"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  backgroundColor: '#fff',
                }}
              >
                <option value="Admission">Admission Alert</option>
                <option value="Academic">Academic Notice</option>
                <option value="Scholarship">Scholarship & Govt Schemes</option>
                <option value="General">General Announcement</option>
              </select>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                Notice Details / Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Details of the announcement, required documents, or instructions for students."
                rows="4"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#1a9988',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? 'Publishing...' : 'Publish Notice'}
            </button>
          </form>
        </div>

        {/* Notices List */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', color: '#0d3b66' }}>Active & Published Notices</h3>

          {loading ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
              <i className="fas fa-spinner fa-spin"></i> Loading notices...
            </div>
          ) : notices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
              No notices currently posted.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {notices.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    backgroundColor: item.isActive ? '#fff' : '#f8fafc',
                    opacity: item.isActive ? 1 : 0.7,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{
                        backgroundColor: '#eef2f7',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#0d3b66',
                      }}>
                        {item.category}
                      </span>
                      <span style={{
                        backgroundColor: item.isActive ? '#dcfce7' : '#fee2e2',
                        color: item.isActive ? '#166534' : '#991b1b',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                      }}>
                        {item.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', color: '#0d3b66' }}>{item.title}</h4>
                    {item.content && (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                        {item.content}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleToggleActive(item.id, item.isActive)}
                      title={item.isActive ? 'Hide Notice' : 'Show Notice'}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '4px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        color: '#334155',
                      }}
                    >
                      <i className={item.isActive ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(item.id)}
                      title="Delete Notice"
                      style={{
                        padding: '6px 10px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .notices-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
