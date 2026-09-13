'use client';

import { useState, useEffect } from 'react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Campus');
  const [submitting, setSubmitting] = useState(false);

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
          imageUrl,
          title,
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
      alert('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!confirm('Are you sure you want to remove this image from the gallery?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      alert('Failed to delete image');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '1.6rem', color: '#0d3b66', fontFamily: "'Playfair Display', serif" }}>
          Campus Gallery Manager
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
          Manage photos displayed in the campus photo gallery.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }} className="gallery-admin-grid">
        {/* Add Photo Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          height: 'fit-content',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', color: '#0d3b66' }}>Add Photo</h3>
          <form onSubmit={handleAddImage}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
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
                  border: '1px solid #d1d5db',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
              <small style={{ color: '#64748b', fontSize: '0.75rem' }}>
                You can specify local files in `/gallery/` or external image URLs.
              </small>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                Caption / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Rural Health Camp Sangamner"
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

            <div style={{ marginBottom: '18px' }}>
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
                <option value="Campus">Campus Infrastructure</option>
                <option value="Clinical Training">Clinical Training</option>
                <option value="Events">College Events</option>
                <option value="Hostel">Hostel Life</option>
              </select>
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
              {submitting ? 'Adding...' : 'Add to Gallery'}
            </button>
          </form>
        </div>

        {/* Existing Photos Grid */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', color: '#0d3b66' }}>Active Gallery Images ({items.length})</h3>

          {loading ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
              <i className="fas fa-spinner fa-spin"></i> Loading gallery items...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '16px',
            }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#f8fafc',
                  }}
                >
                  <div style={{ width: '100%', height: '120px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Photo'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#0d3b66', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title || 'Untitled'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.category}</span>
                      <button
                        onClick={() => handleDeleteImage(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#dc2626',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          padding: '2px 4px',
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
