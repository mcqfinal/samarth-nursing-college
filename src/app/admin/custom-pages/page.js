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

  useEffect(() => { fetchPages(); }, []);

  const openAdd = () => {
    setEditPage(null);
    setForm({ titleEn: '', titleMr: '', slug: '', descriptionEn: '', descriptionMr: '', imageUrl: '', status: 'published' });
    setImagePreview('');
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (page) => {
    setEditPage(page);
    setForm({
      titleEn: page.titleEn || '',
      titleMr: page.titleMr || '',
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
                    {page.titleMr && <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2 }}>{page.titleMr}</div>}
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 780, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>

            {/* Modal Header */}
            <div style={{ padding: '22px 28px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0d3b66', fontFamily: "'Playfair Display', serif" }}>
                  {editPage ? '✏️ Edit Page' : '➕ Create New Page'}
                </h2>
                <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                  Fill in the details below. Fields marked * are required.
                </p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: '1rem', color: '#64748b' }}>✕</button>
            </div>

            <div style={{ padding: '28px' }}>

              {/* Page Title */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Page Title (English) *</label>
                  <input type="text" value={form.titleEn} onChange={e => handleTitleChange(e.target.value)}
                    placeholder="e.g., Annual Report 2024"
                    style={{ ...inputStyle, borderColor: errors.titleEn ? '#ef4444' : '#cbd5e1' }} />
                  {errors.titleEn && <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#ef4444' }}>{errors.titleEn}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Page Title (मराठी)</label>
                  <input type="text" value={form.titleMr} onChange={e => setForm(f => ({ ...f, titleMr: e.target.value }))}
                    placeholder="e.g., वार्षिक अहवाल २०२४"
                    style={inputStyle} />
                </div>
              </div>

              {/* Slug */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>URL Slug * <span style={{ fontWeight: 400, color: '#94a3b8' }}>(auto-generated from title)</span></label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: 8, overflow: 'hidden', borderColor: errors.slug ? '#ef4444' : '#cbd5e1' }}>
                  <span style={{ background: '#f8fafc', padding: '10px 12px', color: '#64748b', fontSize: '0.88rem', borderRight: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>/pages/</span>
                  <input type="text" value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))}
                    placeholder="page-url-slug"
                    style={{ flex: 1, padding: '10px 12px', border: 'none', outline: 'none', fontSize: '0.9rem', fontFamily: 'monospace' }} />
                </div>
                {errors.slug && <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#ef4444' }}>{errors.slug}</p>}
              </div>

              {/* Image Upload */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Page Image <span style={{ fontWeight: 400, color: '#94a3b8' }}>(JPG, PNG, WEBP — max 10MB)</span></label>
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: 10, padding: 20, textAlign: 'center', background: '#f8fafc', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = '#0284c7'; }}
                  onDragLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; }}
                  onDrop={async (e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    const file = e.dataTransfer.files[0];
                    if (file) {
                      const mockEvent = { target: { files: [file] } };
                      await handleImageUpload(mockEvent);
                    }
                  }}
                >
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  {imagePreview ? (
                    <div>
                      <img src={imagePreview} alt="Preview" style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 8, objectFit: 'cover', marginBottom: 10 }} />
                      <br />
                      <span style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 600 }}>Click to replace image</span>
                    </div>
                  ) : uploadingImage ? (
                    <div style={{ color: '#64748b' }}>
                      <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem', marginBottom: 8, display: 'block' }} />
                      Uploading image...
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', color: '#94a3b8', marginBottom: 8, display: 'block' }} />
                      <p style={{ margin: 0, color: '#475569', fontWeight: 600 }}>Click or drag image here to upload</p>
                      <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Supports JPG, PNG, WEBP, GIF</p>
                    </div>
                  )}
                </div>
                {/* OR manual URL */}
                <div style={{ marginTop: 10 }}>
                  <input type="text" value={form.imageUrl}
                    onChange={e => { setForm(f => ({ ...f, imageUrl: e.target.value })); setImagePreview(e.target.value); }}
                    placeholder="Or paste image URL directly..."
                    style={{ ...inputStyle, fontSize: '0.84rem' }} />
                </div>
              </div>

              {/* Description */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Description (English) *</label>
                  <textarea rows={6} value={form.descriptionEn}
                    onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))}
                    placeholder="Write the full page content in English..."
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, borderColor: errors.descriptionEn ? '#ef4444' : '#cbd5e1' }} />
                  {errors.descriptionEn && <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#ef4444' }}>{errors.descriptionEn}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Description (मराठी)</label>
                  <textarea rows={6} value={form.descriptionMr}
                    onChange={e => setForm(f => ({ ...f, descriptionMr: e.target.value }))}
                    placeholder="मराठीमध्ये पूर्ण माहिती लिहा..."
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
              </div>

              {/* Status */}
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Page Status</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['published', 'draft'].map(s => (
                    <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '8px 16px', borderRadius: 8, border: `2px solid ${form.status === s ? '#0d3b66' : '#e2e8f0'}`, background: form.status === s ? '#e0f2fe' : '#f8fafc', fontWeight: 600, fontSize: '0.88rem', color: form.status === s ? '#0d3b66' : '#64748b' }}>
                      <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => setForm(f => ({ ...f, status: s }))} style={{ accentColor: '#0d3b66' }} />
                      {s === 'published' ? '✅ Published' : '📝 Draft'}
                    </label>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                <button onClick={() => setShowModal(false)} style={{ padding: '10px 24px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#334155', fontWeight: 600, cursor: 'pointer', fontSize: '0.92rem' }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  style={{ padding: '10px 28px', borderRadius: 8, background: '#0d3b66', color: '#fff', border: 'none', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: 8, opacity: saving ? 0.7 : 1 }}>
                  {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><i className="fas fa-save" /> {editPage ? 'Save Changes' : 'Create Page'}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
