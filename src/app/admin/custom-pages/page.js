'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '0.9rem',
  boxSizing: 'border-box',
  outline: 'none',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: '700',
  color: '#334155',
  marginBottom: '5px',
};

export default function CustomPagesAdmin() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editPage, setEditPage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    titleEn: '',
    titleMr: '',
    headTitle: '',
    slug: '',
    descriptionEn: '',
    descriptionMr: '',
    imageUrl: '',
    status: 'published',
  });
  const [errors, setErrors] = useState({});

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/custom-pages');
      const data = await res.json();
      setPages(data.pages || []);
    } catch {
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Page Builder | Admin - Samarth College of Nursing';
    fetchPages();
  }, []);

  const openAdd = () => {
    setEditPage(null);
    setForm({ titleEn: '', titleMr: '', headTitle: '', slug: '', descriptionEn: '', descriptionMr: '', imageUrl: '', status: 'published' });
    setImagePreview('');
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (page) => {
    setEditPage(page);
    setForm({
      titleEn: page.titleEn || '',
      titleMr: page.titleMr || '',
      headTitle: page.headTitle || '',
      slug: page.slug || '',
      descriptionEn: page.descriptionEn || '',
      descriptionMr: page.descriptionMr || '',
      imageUrl: page.imageUrl || '',
      status: page.status || 'published',
    });
    setImagePreview(page.imageUrl || '');
    setErrors({});
    setShowModal(true);
  };

  const handleTitleChange = (val) => {
    setForm((f) => ({
      ...f,
      titleEn: val,
      headTitle: editPage ? f.headTitle : (f.headTitle === f.titleEn || !f.headTitle ? val : f.headTitle),
      slug: editPage ? f.slug : val.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch('/api/custom-pages/upload-image', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.imageUrl) {
        setForm((f) => ({ ...f, imageUrl: data.imageUrl }));
        setImagePreview(data.imageUrl);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.titleEn.trim()) e.titleEn = 'Page title (English) is required.';
    if (!form.slug.trim()) e.slug = 'Slug / URL path is required.';
    if (!form.descriptionEn.trim()) e.descriptionEn = 'Description (English) is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const url = editPage ? `/api/custom-pages/${editPage.id}` : '/api/custom-pages';
      const method = editPage ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchPages();
        setShowModal(false);
      } else {
        alert(data.error || 'Save failed.');
      }
    } catch {
      alert('Network error while saving.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (page) => {
    if (!confirm(`Delete page "${page.titleEn}"? This cannot be undone.`)) return;
    setDeleting(page.id);
    try {
      await fetch(`/api/custom-pages/${page.id}`, { method: 'DELETE' });
      await fetchPages();
    } catch {
      alert('Delete failed.');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = pages.filter((p) =>
    !searchTerm ||
    p.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusBadge = (status) => ({
    background: status === 'published' ? '#dcfce7' : '#fef3c7',
    color: status === 'published' ? '#166534' : '#92400e',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 700,
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ background: '#0d3b66', color: '#ffd166', padding: '3px 10px', borderRadius: 20, fontWeight: 700, fontSize: '0.75rem' }}>
              CUSTOM PAGES
            </span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#0d3b66', fontFamily: "'Playfair Display', serif" }}>
              Page Builder
            </h1>
          </div>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.93rem' }}>
            Create and manage standalone website pages with title, image, and description.
          </p>
        </div>
        <button onClick={openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 8, background: '#0d3b66', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer' }}>
          <i className="fas fa-plus" /> Add New Page
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { icon: 'fa-file-alt', label: 'Total Pages', value: pages.length, color: '#0d3b66', bg: '#e0f2fe' },
          { icon: 'fa-check-circle', label: 'Published', value: pages.filter(p => p.status === 'published').length, color: '#166534', bg: '#dcfce7' },
          { icon: 'fa-clock', label: 'Draft', value: pages.filter(p => p.status === 'draft').length, color: '#92400e', bg: '#fef3c7' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className={`fas ${s.icon}`} style={{ color: s.color, fontSize: '1.1rem' }} />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0d3b66', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0', marginBottom: 20 }}>
        <div style={{ position: 'relative', maxWidth: 360 }}>
          <i className="fas fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.85rem' }} />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: 36 }}
          />
        </div>
      </div>

      {/* Pages List */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem', marginBottom: 10, display: 'block' }} />
            Loading pages...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>
            <i className="fas fa-file-plus" style={{ fontSize: '2.5rem', marginBottom: 12, display: 'block', color: '#cbd5e1' }} />
            <p style={{ margin: '0 0 16px', fontSize: '1.05rem', color: '#475569' }}>No pages yet</p>
            <button onClick={openAdd} style={{ background: '#0d3b66', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
              <i className="fas fa-plus" style={{ marginRight: 6 }} /> Create First Page
            </button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['Image', 'Page Title', 'URL Slug', 'Status', 'Created', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((page, i) => (
                <tr key={page.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px' }}>
                    {page.imageUrl ? (
                      <img src={page.imageUrl} alt={page.titleEn} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0' }} />
                    ) : (
                      <div style={{ width: 56, height: 40, background: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-image" style={{ color: '#cbd5e1', fontSize: '1rem' }} />
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#0d3b66', fontSize: '0.92rem' }}>{page.titleEn}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <code style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: 4, fontSize: '0.82rem', color: '#0284c7' }}>
                      /pages/{page.slug}
                    </code>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={statusBadge(page.status)}>{page.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748b' }}>
                    {new Date(page.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link href={`/pages/${page.slug}`} target="_blank"
                        style={{ padding: '6px 12px', borderRadius: 6, background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <i className="fas fa-external-link-alt" style={{ fontSize: '0.72rem' }} /> View
                      </Link>
                      <button onClick={() => openEdit(page)}
                        style={{ padding: '6px 12px', borderRadius: 6, background: '#fefce8', color: '#a16207', border: '1px solid #fde68a', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                        <i className="fas fa-edit" /> Edit
                      </button>
                      <button onClick={() => handleDelete(page)} disabled={deleting === page.id}
                        style={{ padding: '6px 12px', borderRadius: 6, background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                        {deleting === page.id ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-trash" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 16,
            width: '100%',
            maxWidth: 820,
            maxHeight: 'min(92vh, 760px)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 60px -15px rgba(13, 59, 102, 0.35)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            animation: 'fadeInModal 0.18s ease-out',
          }}>

            {/* Modal Header (Pinned at Top) */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#ffffff',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: editPage ? '#fef3c7' : '#e0f2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: editPage ? '#b45309' : '#0284c7',
                  fontSize: '1.05rem',
                }}>
                  <i className={`fas ${editPage ? 'fa-edit' : 'fa-plus'}`} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#0d3b66', fontWeight: 800 }}>
                    {editPage ? 'Edit Page' : 'Create New Custom Page'}
                  </h2>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    {editPage ? 'Update content and settings for this page.' : 'Publish a new page directly to your website menu.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                title="Close"
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: 8,
                  width: 34,
                  height: 34,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#ef4444'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Scrollable with smooth scroll) */}
            <div style={{
              padding: '24px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}>

              {/* Page Title & Head Title */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>
                    Page Title <span style={{ color: '#ef4444' }}>*</span>
                    <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: 6 }}>(Navigation menu & page name)</span>
                  </label>
                  <input
                    type="text"
                    value={form.titleEn}
                    onChange={e => handleTitleChange(e.target.value)}
                    placeholder="e.g. Annual Sports Meet 2025"
                    style={{ ...inputStyle, borderColor: errors.titleEn ? '#ef4444' : '#cbd5e1' }}
                  />
                  {errors.titleEn && <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#ef4444' }}>{errors.titleEn}</p>}
                </div>

                <div>
                  <label style={labelStyle}>
                    Head Title
                    <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: 6 }}>(Browser tab & banner heading)</span>
                  </label>
                  <input
                    type="text"
                    value={form.headTitle}
                    onChange={e => setForm(f => ({ ...f, headTitle: e.target.value }))}
                    placeholder="e.g. Annual Sports Meet 2025"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* URL Slug & Live URL Preview */}
              <div>
                <label style={labelStyle}>
                  URL Slug <span style={{ color: '#ef4444' }}>*</span>
                  <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: 6 }}>(URL address on your website)</span>
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: `1.5px solid ${errors.slug ? '#ef4444' : '#cbd5e1'}`,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#fff',
                }}>
                  <span style={{
                    background: '#f1f5f9',
                    padding: '10px 14px',
                    color: '#475569',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    borderRight: '1px solid #e2e8f0',
                    userSelect: 'none',
                  }}>
                    /pages/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))}
                    placeholder="page-url-slug"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                      color: '#0f172a',
                    }}
                  />
                </div>
                {errors.slug && <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#ef4444' }}>{errors.slug}</p>}
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#0284c7' }}>
                  <i className="fas fa-link" style={{ fontSize: '0.72rem' }} />
                  <span>Public link: <strong>samarthnursing.edu.in/pages/{form.slug || 'your-slug'}</strong></span>
                </div>
              </div>

              {/* Page Image */}
              <div>
                <label style={labelStyle}>
                  Page Banner / Featured Image
                  <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: 6 }}>(JPG, PNG, WEBP — optional)</span>
                </label>
                
                {imagePreview ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 12,
                    borderRadius: 10,
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                  }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: 110, height: 68, objectFit: 'cover', borderRadius: 8, border: '1px solid #cbd5e1' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#0f172a' }}>Image selected</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b', wordBreak: 'break-all' }}>{imagePreview}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ padding: '6px 12px', borderRadius: 6, background: '#e0f2fe', color: '#0284c7', border: '1px solid #bae6fd', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={() => { setImagePreview(''); setForm(f => ({ ...f, imageUrl: '' })); }}
                        style={{ padding: '6px 12px', borderRadius: 6, background: '#fee2e2', color: '#ef4444', border: '1px solid #fecdd3', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      border: '2px dashed #cbd5e1',
                      borderRadius: 10,
                      padding: '16px 20px',
                      textAlign: 'center',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = '#0284c7'; e.currentTarget.style.background = '#f0f9ff'; }}
                    onDragLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.background = '#f8fafc';
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        const mockEvent = { target: { files: [file] } };
                        await handleImageUpload(mockEvent);
                      }
                    }}
                  >
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    {uploadingImage ? (
                      <div style={{ color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0' }}>
                        <i className="fas fa-spinner fa-spin" />
                        <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Uploading image...</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 8, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', fontSize: '1.2rem' }}>
                          <i className="fas fa-cloud-upload-alt" />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>Click or drag image here to upload</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Supports JPG, PNG, WEBP, GIF (up to 10MB)</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Direct Image URL input */}
                <div style={{ marginTop: 8 }}>
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={e => { setForm(f => ({ ...f, imageUrl: e.target.value })); setImagePreview(e.target.value); }}
                    placeholder="Or paste an image URL directly..."
                    style={{ ...inputStyle, padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>
                  Page Description / Content <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  rows={6}
                  value={form.descriptionEn}
                  onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))}
                  placeholder="Write the full content for this page..."
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: 130,
                    lineHeight: 1.6,
                    borderColor: errors.descriptionEn ? '#ef4444' : '#cbd5e1',
                  }}
                />
                {errors.descriptionEn && <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#ef4444' }}>{errors.descriptionEn}</p>}
              </div>

              {/* Status */}
              <div>
                <label style={labelStyle}>Page Visibility Status</label>
                <div style={{ display: 'flex', gap: 14 }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: `1.5px solid ${form.status === 'published' ? '#16a34a' : '#e2e8f0'}`,
                    background: form.status === 'published' ? '#f0fdf4' : '#fff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: form.status === 'published' ? '#166534' : '#64748b',
                    transition: 'all 0.15s',
                  }}>
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={form.status === 'published'}
                      onChange={() => setForm(f => ({ ...f, status: 'published' }))}
                      style={{ accentColor: '#16a34a' }}
                    />
                    <span>✅ Published <span style={{ fontWeight: 400, fontSize: '0.78rem' }}>(Visible on Website)</span></span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: `1.5px solid ${form.status === 'draft' ? '#f59e0b' : '#e2e8f0'}`,
                    background: form.status === 'draft' ? '#fffbeb' : '#fff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: form.status === 'draft' ? '#b45309' : '#64748b',
                    transition: 'all 0.15s',
                  }}>
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={form.status === 'draft'}
                      onChange={() => setForm(f => ({ ...f, status: 'draft' }))}
                      style={{ accentColor: '#f59e0b' }}
                    />
                    <span>📝 Draft <span style={{ fontWeight: 400, fontSize: '0.78rem' }}>(Admin only)</span></span>
                  </label>
                </div>
              </div>

            </div>

            {/* Modal Footer (PERMANENTLY PINNED AT BOTTOM, NEVER CUT OFF) */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
            }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                <span style={{ color: '#ef4444' }}>*</span> Required fields
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#334155',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: '10px 26px',
                    borderRadius: 8,
                    background: '#0d3b66',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 12px rgba(13, 59, 102, 0.25)',
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving ? (
                    <>
                      <i className="fas fa-spinner fa-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className={`fas ${editPage ? 'fa-save' : 'fa-check'}`} />
                      {editPage ? 'Save Changes' : 'Create Page'}
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
