'use client';

import { useState, useEffect } from 'react';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Admission');
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('Admission');
  const [editIsActive, setEditIsActive] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Category Colors and Icons Map
  const categoryConfig = {
    Admission: {
      color: '#0284c7',
      bgLight: '#e0f2fe',
      borderColor: '#38bdf8',
      icon: 'fa-user-graduate',
      label: 'Admission & Enrollment',
    },
    Exam: {
      color: '#dc2626',
      bgLight: '#fee2e2',
      borderColor: '#f87171',
      icon: 'fa-file-signature',
      label: 'Examination & Results',
    },
    Scholarship: {
      color: '#d97706',
      bgLight: '#fef3c7',
      borderColor: '#fcd34d',
      icon: 'fa-award',
      label: 'Scholarship Scheme',
    },
    Academic: {
      color: '#7c3aed',
      bgLight: '#f3e8ff',
      borderColor: '#c084fc',
      icon: 'fa-calendar-alt',
      label: 'Academic Schedule',
    },
    Campus: {
      color: '#059669',
      bgLight: '#d1fae5',
      borderColor: '#34d399',
      icon: 'fa-university',
      label: 'Campus & Hostel Life',
    },
  };

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

  const openEditModal = (item) => {
    setEditingNotice(item);
    setEditTitle(item.title || '');
    setEditContent(item.content || '');
    setEditCategory(item.category || 'Admission');
    setEditIsActive(item.isActive !== undefined ? item.isActive : true);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingNotice(null);
  };

  const handleUpdateNotice = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) {
      alert('Notice title cannot be empty.');
      return;
    }
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/notices/${editingNotice.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle.trim(),
          content: editContent ? editContent.trim() : '',
          category: editCategory,
          isActive: editIsActive,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setNotices((prev) =>
          prev.map((n) => (n.id === editingNotice.id ? { ...n, ...data.notice } : n))
        );
        closeEditModal();
        alert('Notice updated successfully!');
      } else {
        alert('Failed to update notice');
      }
    } catch (err) {
      alert('Network error while updating notice');
    } finally {
      setUpdating(false);
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
        setNotices((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isActive: !currentStatus } : n))
        );
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
        setNotices((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (err) {
      alert('Failed to delete notice');
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            margin: '0 0 6px',
            fontSize: '1.75rem',
            color: '#082238',
            fontWeight: 800,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Notices & Announcements
        </h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
          Publish, edit, and manage circulars, admission deadlines, and campus updates.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }} className="notices-grid">
        {/* Create Form Card */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            border: '1px solid #e2e8f0',
            height: 'fit-content',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
              }}
            >
              <i className="fas fa-plus"></i>
            </span>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#082238', fontWeight: 700 }}>
              Post New Notice
            </h3>
          </div>

          <form onSubmit={handleCreateNotice}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', marginBottom: '6px' }}>
                Notice Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Final Examination Schedule Announced"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.92rem',
                  outline: 'none',
                  background: '#f8fafc',
                  color: '#0f172a',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', marginBottom: '6px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.92rem',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                }}
              >
                <option value="Admission">🎓 Admission & Enrollment</option>
                <option value="Exam">📝 Examination & Results</option>
                <option value="Scholarship">🏆 Scholarship Scheme</option>
                <option value="Academic">📅 Academic Schedule</option>
                <option value="Campus">🏛️ Campus & Hostel Life</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', marginBottom: '6px' }}>
                Detailed Content / Instructions
              </label>
              <textarea
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter detailed notice information, eligibility, deadlines or instructions..."
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.92rem',
                  outline: 'none',
                  background: '#f8fafc',
                  color: '#0f172a',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  lineHeight: 1.5,
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#082238',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(8, 34, 56, 0.2)',
                transition: 'all 0.2s',
              }}
            >
              {submitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Publishing...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane" style={{ color: '#38bdf8' }}></i> Publish Notice
                </>
              )}
            </button>
          </form>
        </div>

        {/* Notices List */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  color: '#082238',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                }}
              >
                <i className="fas fa-bullhorn"></i>
              </span>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#082238', fontWeight: 700 }}>
                Active & Published Notices
              </h3>
            </div>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#0284c7',
                background: '#e0f2fe',
                padding: '3px 10px',
                borderRadius: '12px',
              }}
            >
              {notices.length} Total
            </span>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.8rem', color: '#082238' }}></i>
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Loading notices...</p>
            </div>
          ) : notices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              <i className="fas fa-bullhorn" style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '10px' }}></i>
              <p style={{ margin: 0 }}>No notices currently posted.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {notices.map((item) => {
                const conf = categoryConfig[item.category] || categoryConfig.Admission;
                const formattedDate = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Recent';

                return (
                  <div
                    key={item.id}
                    className="notice-admin-card"
                    style={{
                      border: '1px solid #e2e8f0',
                      borderLeft: `5px solid ${conf.color}`,
                      borderRadius: '16px',
                      padding: '20px 22px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '20px',
                      backgroundColor: item.isActive ? '#ffffff' : '#f8fafc',
                      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                      position: 'relative',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {/* Badge Strip */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                          marginBottom: '10px',
                          flexWrap: 'wrap',
                        }}
                      >
                        {/* Category Badge */}
                        <span
                          style={{
                            backgroundColor: conf.bgLight,
                            color: conf.color,
                            border: `1px solid ${conf.borderColor}`,
                            padding: '4px 11px',
                            borderRadius: '8px',
                            fontSize: '0.74rem',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            letterSpacing: '0.01em',
                          }}
                        >
                          <i className={`fas ${conf.icon}`} style={{ fontSize: '0.72rem' }}></i>
                          {item.category}
                        </span>

                        {/* Status Badge */}
                        <span
                          style={{
                            backgroundColor: item.isActive ? '#dcfce7' : '#fef2f2',
                            color: item.isActive ? '#15803d' : '#b91c1c',
                            border: `1px solid ${item.isActive ? '#bbf7d0' : '#fecaca'}`,
                            padding: '4px 11px',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              backgroundColor: item.isActive ? '#22c55e' : '#ef4444',
                              boxShadow: item.isActive ? '0 0 0 2px rgba(34, 197, 94, 0.25)' : 'none',
                            }}
                          />
                          {item.isActive ? 'Live & Active' : 'Hidden / Inactive'}
                        </span>

                        {/* Date info */}
                        <span
                          style={{
                            fontSize: '0.73rem',
                            color: '#94a3b8',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            marginLeft: 'auto',
                            fontWeight: 500,
                          }}
                        >
                          <i className="far fa-calendar-alt" style={{ fontSize: '0.7rem' }}></i>
                          {formattedDate}
                        </span>
                      </div>

                      {/* Notice Title */}
                      <h4
                        style={{
                          margin: '0 0 8px',
                          fontSize: '1.08rem',
                          color: '#082238',
                          fontWeight: 700,
                          lineHeight: 1.45,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.title}
                      </h4>

                      {/* Notice Content */}
                      {item.content && (
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.9rem',
                            color: '#475569',
                            lineHeight: 1.6,
                          }}
                        >
                          {item.content}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons Toolbar */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        flexShrink: 0,
                        paddingTop: '2px',
                      }}
                    >
                      {/* EDIT NOTICE BUTTON */}
                      <button
                        onClick={() => openEditModal(item)}
                        title="Edit Notice"
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: '#0284c7',
                          color: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)',
                          transition: 'all 0.2s',
                        }}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>

                      {/* TOGGLE VISIBILITY BUTTON */}
                      <button
                        onClick={() => handleToggleActive(item.id, item.isActive)}
                        title={item.isActive ? 'Hide from public website' : 'Publish to public website'}
                        style={{
                          padding: '7px 11px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: item.isActive ? '#ffffff' : '#fef3c7',
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                          color: item.isActive ? '#475569' : '#b45309',
                          transition: 'all 0.2s',
                        }}
                      >
                        <i className={item.isActive ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                      </button>

                      {/* DELETE NOTICE BUTTON */}
                      <button
                        onClick={() => handleDeleteNotice(item.id)}
                        title="Delete Notice"
                        style={{
                          padding: '7px 11px',
                          borderRadius: '8px',
                          border: '1px solid #fee2e2',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                          transition: 'all 0.2s',
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* EDIT NOTICE MODAL */}
      {editModalOpen && editingNotice && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 34, 56, 0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '550px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#082238', fontWeight: 800 }}>
                Edit Notice Details
              </h2>
              <button
                onClick={closeEditModal}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleUpdateNotice}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    backgroundColor: '#fff',
                    outline: 'none',
                  }}
                >
                  <option value="Admission">Admission & Enrollment</option>
                  <option value="Exam">Examination & Results</option>
                  <option value="Scholarship">Scholarship Scheme</option>
                  <option value="Academic">Academic Schedule</option>
                  <option value="Campus">Campus & Hostel Life</option>
                </select>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Content / Details
                </label>
                <textarea
                  rows="4"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={editIsActive}
                  onChange={(e) => setEditIsActive(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="editIsActive" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', cursor: 'pointer' }}>
                  Visible on Public Website (Active)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={closeEditModal}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#082238',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: updating ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {updating ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .notices-grid {
            grid-template-columns: 1fr !important;
          }
        }
        :global(.notice-admin-card:hover) {
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
