'use client';

import { useState, useEffect } from 'react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [notesInput, setNotesInput] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesInput }),
      });
      if (res.ok) {
        setEnquiries(prev => prev.map(e => e.id === selectedEnquiry.id ? { ...e, notes: notesInput } : e));
        setSelectedEnquiry(prev => ({ ...prev, notes: notesInput }));
        alert('Counselor notes saved successfully!');
      }
    } catch (err) {
      alert('Failed to save notes');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  const filteredEnquiries = enquiries.filter(item => {
    if (courseFilter !== 'ALL' && item.course !== courseFilter) return false;
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = item.name && item.name.toLowerCase().includes(q);
      const matchPhone = item.phone && item.phone.includes(q);
      const matchEmail = item.email && item.email.toLowerCase().includes(q);
      return matchName || matchPhone || matchEmail;
    }
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px', fontSize: '1.6rem', color: '#0d3b66', fontFamily: "'Playfair Display', serif" }}>
            Admission Leads & Enquiries
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
            Manage prospective student inquiries, follow-up calls, and admission statuses.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0d3b66',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i> Refresh Leads
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: '#fff',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
      }}>
        <div style={{ flex: '1 1 250px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by student name, phone, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 34px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '0.85rem',
              backgroundColor: '#fff',
              color: '#333',
            }}
          >
            <option value="ALL">All Courses</option>
            <option value="GNM">GNM (3 Yr)</option>
            <option value="ANM">ANM (2 Yr)</option>
            <option value="ADMLT">ADMLT (1.5 Yr)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '0.85rem',
              backgroundColor: '#fff',
              color: '#333',
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="ADMITTED">Admitted</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedEnquiry ? '3fr 2fr' : '1fr',
        gap: '24px',
      }} className="enquiries-main-grid">
        {/* Table Container */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#0d3b66' }}></i>
              <p style={{ marginTop: '10px' }}>Loading enquiries...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div style={{ padding: '50px 20px', textAlign: 'center', color: '#888' }}>
              <i className="fas fa-folder-open" style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '12px' }}></i>
              <p style={{ margin: 0, fontSize: '1rem' }}>No enquiries found matching your criteria.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                    <th style={{ padding: '12px 16px' }}>Date</th>
                    <th style={{ padding: '12px 16px' }}>Student</th>
                    <th style={{ padding: '12px 16px' }}>Course</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((item) => {
                    const isSelected = selectedEnquiry?.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => {
                          setSelectedEnquiry(item);
                          setNotesInput(item.notes || '');
                        }}
                        style={{
                          borderBottom: '1px solid #f1f5f9',
                          backgroundColor: isSelected ? '#f0fdf4' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                      >
                        <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                          {new Date(item.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontWeight: '600', color: '#0d3b66' }}>{item.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.phone}</div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            backgroundColor: '#eef2f7',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            color: '#0d3b66',
                          }}>
                            {item.course}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <select
                            value={item.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              border: 'none',
                              backgroundColor:
                                item.status === 'NEW' ? '#fde8e8' :
                                item.status === 'CONTACTED' ? '#fef3c7' :
                                item.status === 'ADMITTED' ? '#dcfce7' : '#f1f5f9',
                              color:
                                item.status === 'NEW' ? '#991b1b' :
                                item.status === 'CONTACTED' ? '#92400e' :
                                item.status === 'ADMITTED' ? '#166534' : '#475569',
                              cursor: 'pointer',
                            }}
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="ADMITTED">ADMITTED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
                            <a
                              href={`tel:${item.phone}`}
                              title="Call Student"
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#0d3b66',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                textDecoration: 'none',
                              }}
                            >
                              <i className="fas fa-phone-alt"></i>
                            </a>
                            <a
                              href={`https://wa.me/91${item.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(item.name)},%20greeting%20from%20Samarth%20College%20of%20Nursing.`}
                              target="_blank"
                              rel="noreferrer"
                              title="WhatsApp Student"
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#25D366',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                textDecoration: 'none',
                              }}
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
                            <button
                              onClick={() => handleDelete(item.id)}
                              title="Delete Record"
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#fef2f2',
                                color: '#dc2626',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                              }}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Lead Details Drawer / Panel */}
        {selectedEnquiry && (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            position: 'sticky',
            top: '80px',
            height: 'fit-content',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0d3b66' }}>Lead Information</h3>
              <button
                onClick={() => setSelectedEnquiry(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>

            <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#0d3b66', marginBottom: '4px' }}>
                {selectedEnquiry.name}
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginTop: '6px' }}>
                <span style={{ backgroundColor: '#eef2f7', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                  Interested in: {selectedEnquiry.course}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Contact Phone</strong>
                <a href={`tel:${selectedEnquiry.phone}`} style={{ color: '#0d3b66', fontSize: '1rem', fontWeight: '600' }}>
                  {selectedEnquiry.phone}
                </a>
              </div>
              {selectedEnquiry.email && (
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Email</strong>
                  <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#0d3b66', fontSize: '0.95rem' }}>
                    {selectedEnquiry.email}
                  </a>
                </div>
              )}
              {selectedEnquiry.message && (
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Student's Message</strong>
                  <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '6px', fontSize: '0.9rem', color: '#334155', marginTop: '4px' }}>
                    {selectedEnquiry.message}
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                Counselor Internal Notes
              </strong>
              <textarea
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="E.g., Called parent, student scored 78% in 12th science, visiting campus Saturday."
                rows="4"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
              <button
                onClick={handleSaveNotes}
                disabled={updating}
                style={{
                  marginTop: '8px',
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#1a9988',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                {updating ? 'Saving...' : 'Save Notes'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <a
                href={`tel:${selectedEnquiry.phone}`}
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: '#0d3b66',
                  color: '#fff',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <i className="fas fa-phone-alt"></i> Call
              </a>
              <a
                href={`https://wa.me/91${selectedEnquiry.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(selectedEnquiry.name)},%20greeting%20from%20Samarth%20College%20of%20Nursing.`}
                target="_blank"
                rel="noreferrer"
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: '#25D366',
                  color: '#fff',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .enquiries-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
