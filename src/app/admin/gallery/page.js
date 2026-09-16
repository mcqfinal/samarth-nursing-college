'use client';

import { useState, useEffect } from 'react';

const CATEGORIES = ['Campus', 'Clinical Training', 'Events', 'Hostel', 'Academic', 'Laboratory'];

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Add state
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Campus');
  const [submitting, setSubmitting] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Edit state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editCategory, setEditCategory] = useState('Campus');
  const [editOrder, setEditOrder] = useState(1);
  const [updating, setUpdating] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: imageUrl.trim(),
          title: title.trim(),
          category,
          displayOrder: items.length + 1,
        }),
      });
      if (res.ok) {
        setImageUrl('');
        setTitle('');
        fetchGallery();
        alert('Photo added successfully!');
      } else {
        alert('Failed to add photo');
      }
    } catch (err) {
      alert('Network error while adding photo');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditTitle(item.title || '');
    setEditImageUrl(item.imageUrl || '');
    setEditCategory(item.category || 'Campus');
    setEditOrder(item.displayOrder || 1);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingItem(null);
    setEditTitle('');
    setEditImageUrl('');
    setEditOrder(1);
  };

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editImageUrl.trim()) {
      alert('Image URL cannot be empty.');
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingItem.id,
          title: editTitle.trim(),
          imageUrl: editImageUrl.trim(),
          category: editCategory,
          displayOrder: parseInt(editOrder) || 1,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedItem = data.item || {
          ...editingItem,
          title: editTitle.trim(),
          imageUrl: editImageUrl.trim(),
          category: editCategory,
          displayOrder: parseInt(editOrder) || 1,
        };

        setItems((prev) =>
          prev.map((it) => (it.id === editingItem.id ? { ...it, ...updatedItem } : it))
        );
        closeEditModal();
        alert('Photo updated successfully!');
      } else {
        alert('Failed to update photo details.');
      }
    } catch (err) {
      alert('Network error while updating photo.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!confirm('Are you sure you want to remove this image from the gallery?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        // If fallback simulated or db error, remove from UI state
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      alert('Failed to delete image');
    }
  };

  // Filtered gallery items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category?.toLowerCase() === selectedCategory.toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      !search ||
      (item.title && item.title.toLowerCase().includes(search)) ||
      (item.imageUrl && item.imageUrl.toLowerCase().includes(search)) ||
      (item.category && item.category.toLowerCase().includes(search));
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px', fontSize: '1.6rem', color: '#0d3b66', fontFamily: "'Playfair Display', serif" }}>
            Campus Gallery Manager
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
            Manage campus photos, edit captions, organize categories, and arrange display order.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{
            background: 'rgba(13, 59, 102, 0.08)',
            padding: '8px 16px',
            borderRadius: '20px',
            color: '#0d3b66',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}>
            <i className="fas fa-images" style={{ marginRight: '6px', color: '#ffb703' }}></i>
            {items.length} Total Photos
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }} className="gallery-admin-grid">
        {/* Add Photo Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          height: 'fit-content',
          border: '1px solid #e2e8f0',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', color: '#0d3b66', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-plus-circle" style={{ color: '#ffb703' }}></i> Add New Photo
          </h3>
          <form onSubmit={handleAddImage}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Image URL or Path *
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/gallery/gallery-1.jpg or https://..."
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
              <small style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                Specify local paths like <code>/gallery/gallery-1.jpg</code> or external web URLs.
              </small>
            </div>

            {imageUrl && (
              <div style={{ marginBottom: '14px', borderRadius: '8px', overflow: 'hidden', height: '140px', background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Caption / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Pediatric Nursing Simulation Lab"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  backgroundColor: '#fff',
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0d3b66',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(13,59,102,0.2)',
                transition: 'background 0.2s',
              }}
            >
              {submitting ? (
                <span><i className="fas fa-spinner fa-spin" style={{ marginRight: '6px' }}></i> Adding...</span>
              ) : (
                <span><i className="fas fa-cloud-upload-alt" style={{ marginRight: '6px' }}></i> Add to Gallery</span>
              )}
            </button>
          </form>
        </div>

        {/* Existing Photos Section */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
        }}>
          {/* Controls Bar: Search & Category Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#0d3b66' }}>
                Photos ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'})
              </h3>
              
              <div style={{ position: 'relative', width: '260px' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.85rem' }}></i>
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 34px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['All', ...CATEGORIES].map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      background: isActive ? '#0d3b66' : '#f1f5f9',
                      color: isActive ? '#ffb703' : '#475569',
                      transition: 'all 0.2s',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
              <i className="fas fa-spinner fa-spin fa-2x" style={{ color: '#0d3b66', marginBottom: '12px', display: 'block' }}></i>
              Loading gallery items...
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '8px' }}>
              <i className="fas fa-image fa-3x" style={{ color: '#cbd5e1', marginBottom: '12px', display: 'block' }}></i>
              No photos found matching your search or category filter.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ width: '100%', height: '130px', overflow: 'hidden', position: 'relative', background: '#e2e8f0' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Photo'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/logo.png';
                        e.target.style.objectFit = 'contain';
                        e.target.style.padding = '20px';
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      background: 'rgba(13, 59, 102, 0.85)',
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: '600',
                    }}>
                      #{item.displayOrder || 1}
                    </div>
                  </div>

                  <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div
                        title={item.title || 'Untitled'}
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: '#0d3b66',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginBottom: '4px',
                        }}
                      >
                        {item.title || 'Untitled'}
                      </div>
                      <span style={{
                        fontSize: '0.7rem',
                        color: '#64748b',
                        background: '#f1f5f9',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        display: 'inline-block',
                      }}>
                        {item.category || 'Campus'}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '8px',
                      marginTop: '10px',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '8px',
                    }}>
                      <button
                        onClick={() => openEditModal(item)}
                        style={{
                          background: 'rgba(13, 59, 102, 0.08)',
                          border: 'none',
                          color: '#0d3b66',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontWeight: '500',
                          transition: 'background 0.15s',
                        }}
                        title="Edit photo details"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteImage(item.id)}
                        style={{
                          background: 'rgba(220, 38, 38, 0.08)',
                          border: 'none',
                          color: '#dc2626',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          transition: 'background 0.15s',
                        }}
                        title="Delete photo"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Photo Modal */}
      {editModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(13, 59, 102, 0.55)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '520px',
            width: '100%',
            boxShadow: '0 20px 30px rgba(0,0,0,0.25)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Modal Header */}
            <div style={{
              background: '#0d3b66',
              padding: '16px 20px',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffb703', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-edit"></i> Edit Photo Details
              </h3>
              <button
                onClick={closeEditModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateImage} style={{ padding: '20px', overflowY: 'auto' }}>
              {/* Image Preview */}
              {editImageUrl && (
                <div style={{
                  marginBottom: '16px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: '160px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={editImageUrl}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo.png';
                      e.target.style.objectFit = 'contain';
                      e.target.style.padding = '20px';
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Image URL / Path *
                </label>
                <input
                  type="text"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  placeholder="/gallery/gallery-1.jpg or https://..."
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Caption / Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="E.g., Clinical Training Demonstration"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                      backgroundColor: '#fff',
                    }}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editOrder}
                    onChange={(e) => setEditOrder(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={closeEditModal}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#475569',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#0d3b66',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: updating ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(13,59,102,0.2)',
                  }}
                >
                  {updating ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i> Save Changes
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
          .gallery-admin-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
