'use client';

import { useState, useEffect } from 'react';

export default function AdminFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Modal State for Add & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    titleEn: '',
    titleMr: '',
    descEn: '',
    descMr: '',
    category: 'Campus',
    icon: 'fa-building',
    color: '#0d3b66',
    bgLight: '#e2e8f0',
    displayOrder: 1,
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);

  // Header / Banner Edit State
  const [headerModalOpen, setHeaderModalOpen] = useState(false);
  const [headerForm, setHeaderForm] = useState({
    badgeEn: 'CAMPUS AMENITIES',
    badgeMr: 'कॅम्पस सुविधा',
    titleEn: 'Campus Facilities & Infrastructure',
    titleMr: 'महाविद्यालयीन सुविधा व पायाभूत सुविधा',
    descEn: 'Hostels, Advanced Nursing Labs, Digital Classrooms, Library, and Modern Hospital Training.',
    descMr: 'वसतिगृह, अद्ययावत नर्सिंग लॅब्ज, डिजिटल वर्गखोल्या, समृद्ध ग्रंथालय आणि हॉस्पिटल ट्रेनिंग.',
    introHeadingEn: 'A Modern Campus for Better Nursing Education',
    introHeadingMr: 'उत्तम शिक्षणासाठी आधुनिक आणि विद्यार्थी-केंद्रित सुविधा',
    introDescEn: 'Samarth College of Nursing provides a supportive academic environment where students receive quality classroom education, practical skill training, clinical exposure, and opportunities for overall development.',
    introDescMr: 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे विद्यार्थ्यांना दर्जेदार शैक्षणिक शिक्षणासोबतच प्रात्यक्षिक प्रशिक्षण, क्लिनिकल अनुभव, कौशल्य विकास आणि सर्वांगीण व्यक्तिमत्त्व विकासासाठी आवश्यक सुविधा उपलब्ध करून देण्यावर भर दिला जातो.',
  });
  const [savingHeader, setSavingHeader] = useState(false);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/facilities?all=true');
      const data = await res.json();
      setFacilities(data.facilities || []);
    } catch (err) {
      console.error('Failed to load facilities:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeaderContent = async () => {
    try {
      const res = await fetch('/api/admin/pages?page=facilities');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          const d = json.data;
          setHeaderForm({
            badgeEn: d.hero?.badgeEn || 'CAMPUS AMENITIES',
            badgeMr: d.hero?.badgeMr || 'कॅम्पस सुविधा',
            titleEn: d.hero?.titleEn || 'Campus Facilities & Infrastructure',
            titleMr: d.hero?.titleMr || 'महाविद्यालयीन सुविधा व पायाभूत सुविधा',
            descEn: d.hero?.descEn || 'Hostels, Advanced Nursing Labs, Digital Classrooms, Library, and Modern Hospital Training.',
            descMr: d.hero?.descMr || 'वसतिगृह, अद्ययावत नर्सिंग लॅब्ज, डिजिटल वर्गखोल्या, समृद्ध ग्रंथालय आणि हॉस्पिटल ट्रेनिंग.',
            introHeadingEn: d.intro?.headingEn || 'A Modern Campus for Better Nursing Education',
            introHeadingMr: d.intro?.headingMr || 'उत्तम शिक्षणासाठी आधुनिक आणि विद्यार्थी-केंद्रित सुविधा',
            introDescEn: d.intro?.descEn || '',
            introDescMr: d.intro?.descMr || '',
          });
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchFacilities();
    fetchHeaderContent();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      titleEn: '',
      titleMr: '',
      descEn: '',
      descMr: '',
      category: 'Campus',
      icon: 'fa-building',
      color: '#0d3b66',
      bgLight: '#e2e8f0',
      displayOrder: facilities.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (facility) => {
    setEditingItem(facility);
    setFormData({
      titleEn: facility.titleEn || '',
      titleMr: facility.titleMr || '',
      descEn: facility.descEn || '',
      descMr: facility.descMr || '',
      category: facility.category || 'Campus',
      icon: facility.icon || 'fa-building',
      color: facility.color || '#0d3b66',
      bgLight: facility.bgLight || '#e2e8f0',
      displayOrder: facility.displayOrder || 1,
      isActive: facility.isActive !== undefined ? facility.isActive : true,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titleEn.trim()) {
      alert('Please provide an English title.');
      return;
    }
    setSubmitting(true);

    try {
      if (editingItem) {
        // UPDATE existing facility
        const res = await fetch(`/api/facilities/${editingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setFacilities((prev) =>
            prev.map((f) => (f.id === editingItem.id ? data.facility : f))
          );
          closeModal();
          alert('Facility updated successfully!');
        } else {
          alert(data.error || 'Failed to update facility');
        }
      } else {
        // CREATE new facility
        const res = await fetch('/api/facilities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setFacilities((prev) => [...prev, data.facility]);
          closeModal();
          alert('New facility added successfully!');
        } else {
          alert(data.error || 'Failed to add facility');
        }
      }
    } catch (err) {
      alert('Network error while saving facility');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (facility) => {
    const nextStatus = !facility.isActive;
    try {
      const res = await fetch(`/api/facilities/${facility.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: nextStatus }),
      });
      if (res.ok) {
        setFacilities((prev) =>
          prev.map((f) => (f.id === facility.id ? { ...f, isActive: nextStatus } : f))
        );
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this facility?')) return;
    try {
      const res = await fetch(`/api/facilities/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFacilities((prev) => prev.filter((f) => f.id !== id));
        alert('Facility deleted successfully');
      } else {
        alert('Failed to delete facility');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  // Categories list
  const categories = ['ALL', 'Infrastructure', 'Academic', 'Clinical Labs', 'Student Welfare', 'Campus'];

  const filteredFacilities = facilities.filter((item) => {
    if (categoryFilter !== 'ALL' && item.category?.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchEn = item.titleEn?.toLowerCase().includes(q);
      const matchMr = item.titleMr?.toLowerCase().includes(q);
      const matchDesc = item.descEn?.toLowerCase().includes(q) || item.descMr?.toLowerCase().includes(q);
      return matchEn || matchMr || matchDesc;
    }
    return true;
  });

  const handleSaveHeader = async (e) => {
    e.preventDefault();
    setSavingHeader(true);
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'facilities',
          data: {
            title: 'Campus Facilities',
            category: 'Main',
            path: '/facilities',
            hero: {
              badgeEn: headerForm.badgeEn,
              badgeMr: headerForm.badgeMr,
              titleEn: headerForm.titleEn,
              titleMr: headerForm.titleMr,
              descEn: headerForm.descEn,
              descMr: headerForm.descMr,
            },
            intro: {
              badgeEn: '17 KEY AMENITIES',
              badgeMr: '१७ आधुनिक सुविधा',
              headingEn: headerForm.introHeadingEn,
              headingMr: headerForm.introHeadingMr,
              descEn: headerForm.introDescEn,
              descMr: headerForm.introDescMr,
            },
          },
        }),
      });
      if (res.ok) {
        setHeaderModalOpen(false);
        alert('Page Header & Banner settings saved successfully!');
      } else {
        alert('Failed to save header settings.');
      }
    } catch (err) {
      alert('Error updating page header.');
    } finally {
      setSavingHeader(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <h1
            style={{
              margin: '0 0 6px',
              fontSize: '1.75rem',
              color: '#082238',
              fontWeight: 800,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Campus Facilities Manager
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
            Manage, edit, or add campus infrastructure, labs, and student amenities shown on the website.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setHeaderModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ffffff',
              color: '#082238',
              border: '1.5px solid #cbd5e1',
              padding: '12px 18px',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fas fa-heading" style={{ color: '#ffb703' }}></i> Edit Page Header / Banner
          </button>
          <button
            onClick={openAddModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#082238',
              color: '#ffffff',
              border: 'none',
              padding: '12px 22px',
              borderRadius: '10px',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(8, 34, 56, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fas fa-plus"></i> Add New Facility
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '18px 20px',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
          >
            <i className="fas fa-hospital-alt"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#082238' }}>{facilities.length}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Total Facilities</div>
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '18px 20px',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
          >
            <i className="fas fa-check-circle"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a' }}>
              {facilities.filter((f) => f.isActive).length}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Active on Website</div>
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '18px 20px',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
          >
            <i className="fas fa-layer-group"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#082238' }}>5</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Categories</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '16px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <i
            className="fas fa-search"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
              fontSize: '0.9rem',
            }}
          ></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search facility by English or Marathi name..."
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '7px 14px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: categoryFilter === cat ? '#082238' : '#f1f5f9',
                color: categoryFilter === cat ? '#ffffff' : '#475569',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#082238' }}></i>
          <p style={{ marginTop: '12px', fontWeight: 600 }}>Loading facilities...</p>
        </div>
      ) : filteredFacilities.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '50px 20px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
          }}
        >
          <i className="fas fa-hospital" style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '12px' }}></i>
          <h3 style={{ margin: '0 0 6px', color: '#082238' }}>No facilities found</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Try clearing your search query or add a new facility.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                opacity: fac.isActive ? 1 : 0.65,
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              {/* Top Row: Icon + Category Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: fac.bgLight || '#e0f2fe',
                    color: fac.color || '#0d3b66',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                  }}
                >
                  <i className={`fas ${fac.icon || 'fa-building'}`}></i>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: '#f1f5f9',
                      color: '#475569',
                    }}
                  >
                    {fac.category || 'General'}
                  </span>

                  <button
                    onClick={() => handleToggleActive(fac)}
                    title={fac.isActive ? 'Click to deactivate' : 'Click to activate'}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      border: 'none',
                      cursor: 'pointer',
                      background: fac.isActive ? '#dcfce7' : '#fee2e2',
                      color: fac.isActive ? '#166534' : '#991b1b',
                    }}
                  >
                    {fac.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>

              {/* Title EN & MR */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#082238', margin: '0 0 4px' }}>
                {fac.titleEn}
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, marginBottom: '12px' }}>
                {fac.titleMr}
              </div>

              {/* Descriptions */}
              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#475569',
                  lineHeight: 1.5,
                  margin: '0 0 10px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  flexGrow: 1,
                }}
              >
                {fac.descEn}
              </p>

              {/* Actions Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid #f1f5f9',
                  marginTop: 'auto',
                }}
              >
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
                  Order: #{fac.displayOrder}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* EDIT FACILITY BUTTON */}
                  <button
                    onClick={() => openEditModal(fac)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>

                  {/* DELETE FACILITY BUTTON */}
                  <button
                    onClick={() => handleDelete(fac.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
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
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              padding: '30px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#082238', fontWeight: 800 }}>
                  {editingItem ? 'Edit Facility' : 'Add New Campus Facility'}
                </h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                  {editingItem ? `Updating ${editingItem.titleEn}` : 'Fill in the details for the new facility.'}
                </p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  width: '34px',
                  height: '34px',
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

            <form onSubmit={handleSubmit}>
              {/* Titles Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                    Facility Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="e.g. Advanced Nursing Labs"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                    Facility Title (मराठी)
                  </label>
                  <input
                    type="text"
                    value={formData.titleMr}
                    onChange={(e) => setFormData({ ...formData, titleMr: e.target.value })}
                    placeholder="उदा. अद्ययावत नर्सिंग प्रयोगशाळा"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              {/* Category & Display Order Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      background: '#fff',
                    }}
                  >
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Academic">Academic</option>
                    <option value="Clinical Labs">Clinical Labs</option>
                    <option value="Student Welfare">Student Welfare</option>
                    <option value="Campus">Campus</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              {/* Icon & Color Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                    FontAwesome Icon (e.g. fa-flask)
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '6px',
                        background: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: formData.color,
                      }}
                    >
                      <i className={`fas ${formData.icon}`}></i>
                    </div>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="fa-flask"
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                    Accent Color (Hex)
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      style={{
                        width: '42px',
                        height: '42px',
                        padding: '2px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        cursor: 'pointer',
                      }}
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Description EN */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  English Description
                </label>
                <textarea
                  rows="3"
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  placeholder="Explain what this facility offers to students..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                  }}
                ></textarea>
              </div>

              {/* Description MR */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  मराठी वर्णन (Description)
                </label>
                <textarea
                  rows="3"
                  value={formData.descMr}
                  onChange={(e) => setFormData({ ...formData, descMr: e.target.value })}
                  placeholder="या सुविधेचे मराठीतील वर्णन..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                  }}
                ></textarea>
              </div>

              {/* Active Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="isActiveToggle" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', cursor: 'pointer' }}>
                  Active on Public Website (प्रदर्शित करा)
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: '10px 20px',
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
                  disabled={submitting}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#082238',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : editingItem ? (
                    <>
                      <i className="fas fa-check"></i> Save Changes
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus"></i> Add Facility
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER / BANNER EDIT MODAL */}
      {headerModalOpen && (
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
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              padding: '30px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#082238', fontWeight: 800 }}>
                  Edit Facilities Page Header & Banner
                </h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                  Update the top hero banner and introductory text displayed on /facilities.
                </p>
              </div>
              <button
                onClick={() => setHeaderModalOpen(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveHeader}>
              {/* SECTION: HERO BANNER */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '18px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem', color: '#082238', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fas fa-flag" style={{ color: '#ffb703' }}></i> Top Hero Banner
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Badge Text (English)
                    </label>
                    <input
                      type="text"
                      value={headerForm.badgeEn}
                      onChange={(e) => setHeaderForm({ ...headerForm, badgeEn: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Badge Text (मराठी)
                    </label>
                    <input
                      type="text"
                      value={headerForm.badgeMr}
                      onChange={(e) => setHeaderForm({ ...headerForm, badgeMr: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Main Title (English)
                    </label>
                    <input
                      type="text"
                      value={headerForm.titleEn}
                      onChange={(e) => setHeaderForm({ ...headerForm, titleEn: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Main Title (मराठी)
                    </label>
                    <input
                      type="text"
                      value={headerForm.titleMr}
                      onChange={(e) => setHeaderForm({ ...headerForm, titleMr: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Subtitle (English)
                    </label>
                    <textarea
                      rows="2"
                      value={headerForm.descEn}
                      onChange={(e) => setHeaderForm({ ...headerForm, descEn: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Subtitle (मराठी)
                    </label>
                    <textarea
                      rows="2"
                      value={headerForm.descMr}
                      onChange={(e) => setHeaderForm({ ...headerForm, descMr: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: INTRO TEXT */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '22px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem', color: '#0d3b66', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fas fa-paragraph" style={{ color: '#0284c7' }}></i> Introductory Section Below Banner
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Section Heading (English)
                    </label>
                    <input
                      type="text"
                      value={headerForm.introHeadingEn}
                      onChange={(e) => setHeaderForm({ ...headerForm, introHeadingEn: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Section Heading (मराठी)
                    </label>
                    <input
                      type="text"
                      value={headerForm.introHeadingMr}
                      onChange={(e) => setHeaderForm({ ...headerForm, introHeadingMr: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Intro Paragraph (English)
                    </label>
                    <textarea
                      rows="3"
                      value={headerForm.introDescEn}
                      onChange={(e) => setHeaderForm({ ...headerForm, introDescEn: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Intro Paragraph (मराठी)
                    </label>
                    <textarea
                      rows="3"
                      value={headerForm.introDescMr}
                      onChange={(e) => setHeaderForm({ ...headerForm, introDescMr: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setHeaderModalOpen(false)}
                  style={{
                    padding: '10px 20px',
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
                  disabled={savingHeader}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#082238',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: savingHeader ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {savingHeader ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save" style={{ color: '#ffb703' }}></i> Save Header Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
