'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPagesManager() {
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const langView = 'en';
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Current page edit state
  const [currentPageData, setCurrentPageData] = useState(null);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      if (data.pages) {
        setPages(data.pages);
        if (data.pages[selectedKey]) {
          setCurrentPageData(JSON.parse(JSON.stringify(data.pages[selectedKey])));
        }
      }
    } catch (err) {
      console.error('Failed to load pages content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSelectPage = (key) => {
    setSelectedKey(key);
    if (pages[key]) {
      setCurrentPageData(JSON.parse(JSON.stringify(pages[key])));
    }
    setSaveSuccess(false);
  };

  const handleFieldChange = (path, value) => {
    if (!currentPageData) return;
    setCurrentPageData((prev) => {
      const updated = { ...prev };
      const keys = path.split('.');
      let cur = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!cur[keys[i]]) cur[keys[i]] = {};
        cur = cur[keys[i]];
      }
      const lastKey = keys[keys.length - 1];
      cur[lastKey] = value;
      if (lastKey.endsWith('En')) {
        const mrKey = lastKey.slice(0, -2) + 'Mr';
        cur[mrKey] = value;
      }
      return updated;
    });
    setSaveSuccess(false);
  };

  const handleSavePage = async () => {
    if (!currentPageData || !selectedKey) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: selectedKey,
          data: currentPageData,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setPages((prev) => ({
          ...prev,
          [selectedKey]: result.data,
        }));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        alert('Failed to save page changes. Please check permissions.');
      }
    } catch (err) {
      alert('Network error while saving page content.');
    } finally {
      setSaving(false);
    }
  };

  const categories = ['All', 'Main', 'About', 'Courses', 'Admissions', 'Contact', 'More'];

  const pageKeys = Object.keys(pages);
  const filteredPageKeys = pageKeys.filter((k) => {
    const p = pages[k];
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: '#ffb703',
              color: '#0d3b66',
              padding: '3px 10px',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '0.75rem',
              letterSpacing: '0.5px'
            }}>
              WEBSITE CMS
            </span>
            <h1 style={{
              margin: 0,
              fontSize: '1.65rem',
              color: '#0d3b66',
              fontFamily: "'Playfair Display', serif",
            }}>
              Page Content Management
            </h1>
          </div>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
            Directly edit headings, banners, descriptions, and bilingual details across all pages of the college website.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentPageData && (
            <Link
              href={currentPageData.path || '/'}
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '8px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#0d3b66',
                fontWeight: '600',
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem', color: '#ffb703' }}></i>
              View Live Page
            </Link>
          )}

          <button
            onClick={handleSavePage}
            disabled={saving || !currentPageData}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '8px',
              background: '#0d3b66',
              color: '#ffffff',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.92rem',
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(13,59,102,0.25)',
              transition: 'background 0.2s',
            }}
          >
            {saving ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save" style={{ color: '#ffb703' }}></i> Save All Changes
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #10b981',
          color: '#065f46',
          padding: '12px 18px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '600',
        }}>
          <i className="fas fa-check-circle" style={{ color: '#10b981', fontSize: '1.2rem' }}></i>
          Changes saved successfully! The live page now reflects the updated content.
        </div>
      )}

      {/* Main Grid: Sidebar Pages List + Editor Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '24px',
        alignItems: 'start',
      }} className="cms-grid">

        {/* Page Selector Sidebar */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: '#0d3b66', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-sitemap" style={{ color: '#ffb703' }}></i> Website Pages ({pageKeys.length})
            </h3>
            
            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.8rem' }}></i>
              <input
                type="text"
                placeholder="Search page..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 30px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeCategory === cat ? '#0d3b66' : '#f1f5f9',
                    color: activeCategory === cat ? '#ffffff' : '#475569',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Pages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '580px', overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                <i className="fas fa-spinner fa-spin"></i> Loading pages...
              </div>
            ) : filteredPageKeys.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                No pages match filter.
              </div>
            ) : (
              filteredPageKeys.map((key) => {
                const item = pages[key];
                const isSelected = selectedKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectPage(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #0d3b66' : '1px solid #f1f5f9',
                      background: isSelected ? 'rgba(13, 59, 102, 0.05)' : '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: isSelected ? '700' : '600',
                        color: isSelected ? '#0d3b66' : '#1e293b',
                      }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                        {item.path}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: '600',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: isSelected ? '#0d3b66' : '#e2e8f0',
                      color: isSelected ? '#ffb703' : '#475569',
                    }}>
                      {item.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Page Content Editor Panel */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          {currentPageData ? (
            <div>
              {/* Page Editor Header Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                paddingBottom: '16px',
                marginBottom: '20px',
                borderBottom: '1px solid #e2e8f0',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#0d3b66' }}>
                      {currentPageData.title}
                    </h2>
                    <span style={{
                      fontSize: '0.75rem',
                      background: '#f1f5f9',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      color: '#475569',
                      fontFamily: 'monospace'
                    }}>
                      {currentPageData.path}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Editing section content and details for this page
                  </span>
                </div>

                
              </div>

              {/* SECTION 1: HERO BANNER */}
              {currentPageData.hero && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <i className="fas fa-flag" style={{ color: '#0d3b66' }}></i>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0d3b66' }}>
                      Top Hero Banner / Page Header
                    </h3>
                  </div>

                  {/* Badge / Pill */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    marginBottom: '14px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Badge / Pill Text
                        </label>
                        <input
                          type="text"
                          value={currentPageData.hero.badgeEn || ''}
                          onChange={(e) => handleFieldChange('hero.badgeEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Badge / Pill Text (मराठी)
                        </label>
                        <input
                          type="text"
                          value={currentPageData.hero.badgeMr || ''}
                          onChange={(e) => handleFieldChange('hero.badgeMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Main Heading */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    marginBottom: '14px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Main Heading
                        </label>
                        <input
                          type="text"
                          value={currentPageData.hero.titleEn || ''}
                          onChange={(e) => handleFieldChange('hero.titleEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            fontWeight: '600',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Main Heading (मराठी)
                        </label>
                        <input
                          type="text"
                          value={currentPageData.hero.titleMr || ''}
                          onChange={(e) => handleFieldChange('hero.titleMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            fontWeight: '600',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Subheading / Description */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Subtitle / Brief Description
                        </label>
                        <textarea
                          rows="2"
                          value={currentPageData.hero.descEn || ''}
                          onChange={(e) => handleFieldChange('hero.descEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Subtitle / Brief Description (मराठी)
                        </label>
                        <textarea
                          rows="2"
                          value={currentPageData.hero.descMr || ''}
                          onChange={(e) => handleFieldChange('hero.descMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION 2: SPECIALIZED CONTENT BLOCKS */}

              {/* HOME PAGE SPECIFIC: About Section & Key Stats */}
              {selectedKey === 'home' && currentPageData.aboutSection && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <i className="fas fa-landmark" style={{ color: '#0d3b66' }}></i>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0d3b66' }}>
                      Welcome / About Section (Home Page)
                    </h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    marginBottom: '14px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Section Heading
                        </label>
                        <input
                          type="text"
                          value={currentPageData.aboutSection.headingEn || ''}
                          onChange={(e) => handleFieldChange('aboutSection.headingEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Section Heading (मराठी)
                        </label>
                        <input
                          type="text"
                          value={currentPageData.aboutSection.headingMr || ''}
                          onChange={(e) => handleFieldChange('aboutSection.headingMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Paragraph 1 */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    marginBottom: '14px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Paragraph 1
                        </label>
                        <textarea
                          rows="3"
                          value={currentPageData.aboutSection.p1En || ''}
                          onChange={(e) => handleFieldChange('aboutSection.p1En', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Paragraph 1 (मराठी)
                        </label>
                        <textarea
                          rows="3"
                          value={currentPageData.aboutSection.p1Mr || ''}
                          onChange={(e) => handleFieldChange('aboutSection.p1Mr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ABOUT US: Overview Section */}
              {selectedKey === 'about' && currentPageData.overview && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <i className="fas fa-university" style={{ color: '#0d3b66' }}></i>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0d3b66' }}>
                      Foundation Overview & History
                    </h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    marginBottom: '14px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Overview Heading
                        </label>
                        <input
                          type="text"
                          value={currentPageData.overview.headingEn || ''}
                          onChange={(e) => handleFieldChange('overview.headingEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Overview Heading (मराठी)
                        </label>
                        <input
                          type="text"
                          value={currentPageData.overview.headingMr || ''}
                          onChange={(e) => handleFieldChange('overview.headingMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Main Story / Text
                        </label>
                        <textarea
                          rows="4"
                          value={currentPageData.overview.p1En || ''}
                          onChange={(e) => handleFieldChange('overview.p1En', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Main Story / Text (मराठी)
                        </label>
                        <textarea
                          rows="4"
                          value={currentPageData.overview.p1Mr || ''}
                          onChange={(e) => handleFieldChange('overview.p1Mr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VISION & MISSION */}
              {selectedKey === 'vision-mission' && currentPageData.vision && currentPageData.mission && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <i className="fas fa-eye" style={{ color: '#0d3b66' }}></i>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0d3b66' }}>
                      Vision & Mission Statements
                    </h3>
                  </div>

                  {/* Vision Statement */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    marginBottom: '16px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Vision Statement
                        </label>
                        <textarea
                          rows="3"
                          value={currentPageData.vision.textEn || ''}
                          onChange={(e) => handleFieldChange('vision.textEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Vision Statement (मराठी)
                        </label>
                        <textarea
                          rows="3"
                          value={currentPageData.vision.textMr || ''}
                          onChange={(e) => handleFieldChange('vision.textMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Mission Statement */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Mission Statement
                        </label>
                        <textarea
                          rows="3"
                          value={currentPageData.mission.textEn || ''}
                          onChange={(e) => handleFieldChange('mission.textEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Mission Statement (मराठी)
                        </label>
                        <textarea
                          rows="3"
                          value={currentPageData.mission.textMr || ''}
                          onChange={(e) => handleFieldChange('mission.textMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* COURSES — GNM / ANM / ADMLT */}
              {selectedKey === 'courses' && currentPageData.gnm && currentPageData.anm && currentPageData.admlt && (
                <>
                  {[
                    { key: 'gnm', label: 'GNM — General Nursing & Midwifery', icon: 'fa-hospital-user', color: '#0284c7' },
                    { key: 'anm', label: 'ANM — Auxiliary Nursing & Midwifery', icon: 'fa-baby', color: '#16a34a' },
                    { key: 'admlt', label: 'ADMLT — Medical Laboratory Technician', icon: 'fa-flask', color: '#d97706' },
                  ].map(({ key, label, icon, color }) => (
                    <div key={key} style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', border: `1px solid #e2e8f0`, marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <i className={`fas ${icon}`} style={{ color }} />
                        <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0d3b66' }}>{label}</h3>
                      </div>

                      {/* Title */}
                      <div style={{ display: 'grid', gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr', gap: '16px', marginBottom: '14px' }}>
                        {(langView === 'bilingual' || langView === 'en') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Course Title</label>
                            <input type="text" value={currentPageData[key].titleEn || ''} onChange={(e) => handleFieldChange(`${key}.titleEn`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                        {(langView === 'bilingual' || langView === 'mr') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Course Title (मराठी)</label>
                            <input type="text" value={currentPageData[key].titleMr || ''} onChange={(e) => handleFieldChange(`${key}.titleMr`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                      </div>

                      {/* Badge + Since + Seats (row) */}
                      <div style={{ display: 'grid', gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr 1fr 1fr auto' : '1fr 1fr auto', gap: '12px', marginBottom: '14px', alignItems: 'end' }}>
                        {(langView === 'bilingual' || langView === 'en') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Duration Badge</label>
                            <input type="text" value={currentPageData[key].badgeEn || ''} onChange={(e) => handleFieldChange(`${key}.badgeEn`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                        {(langView === 'bilingual' || langView === 'mr') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Duration Badge (मराठी)</label>
                            <input type="text" value={currentPageData[key].badgeMr || ''} onChange={(e) => handleFieldChange(`${key}.badgeMr`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                        {(langView === 'bilingual' || langView === 'en') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Started Since</label>
                            <input type="text" value={currentPageData[key].sinceEn || ''} onChange={(e) => handleFieldChange(`${key}.sinceEn`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                        {(langView === 'bilingual' || langView === 'mr') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Started Since (मराठी)</label>
                            <input type="text" value={currentPageData[key].sinceMr || ''} onChange={(e) => handleFieldChange(`${key}.sinceMr`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                        <div style={{ minWidth: 90 }}>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Total Seats</label>
                          <input type="number" value={currentPageData[key].seats || ''} onChange={(e) => handleFieldChange(`${key}.seats`, e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                        </div>
                      </div>

                      {/* Description */}
                      <div style={{ display: 'grid', gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr', gap: '16px', marginBottom: '14px' }}>
                        {(langView === 'bilingual' || langView === 'en') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Description</label>
                            <textarea rows="3" value={currentPageData[key].descEn || ''} onChange={(e) => handleFieldChange(`${key}.descEn`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                        {(langView === 'bilingual' || langView === 'mr') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Description (मराठी)</label>
                            <textarea rows="3" value={currentPageData[key].descMr || ''} onChange={(e) => handleFieldChange(`${key}.descMr`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                      </div>

                      {/* Eligibility */}
                      <div style={{ display: 'grid', gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr', gap: '16px', marginBottom: '14px' }}>
                        {(langView === 'bilingual' || langView === 'en') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Eligibility</label>
                            <input type="text" value={currentPageData[key].eligibilityEn || ''} onChange={(e) => handleFieldChange(`${key}.eligibilityEn`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                        {(langView === 'bilingual' || langView === 'mr') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Eligibility (मराठी)</label>
                            <input type="text" value={currentPageData[key].eligibilityMr || ''} onChange={(e) => handleFieldChange(`${key}.eligibilityMr`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                      </div>

                      {/* Affiliation */}
                      <div style={{ display: 'grid', gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr', gap: '16px' }}>
                        {(langView === 'bilingual' || langView === 'en') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Affiliation</label>
                            <input type="text" value={currentPageData[key].affiliationEn || ''} onChange={(e) => handleFieldChange(`${key}.affiliationEn`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                        {(langView === 'bilingual' || langView === 'mr') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Affiliation (मराठी)</label>
                            <input type="text" value={currentPageData[key].affiliationMr || ''} onChange={(e) => handleFieldChange(`${key}.affiliationMr`, e.target.value)}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* PRINCIPAL MESSAGES */}
              {(selectedKey === 'principal-gnm' || selectedKey === 'principal-anm') && currentPageData.principal && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <i className="fas fa-user-tie" style={{ color: '#0d3b66' }}></i>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0d3b66' }}>
                      Principal Information & Message
                    </h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    marginBottom: '14px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Principal Name
                        </label>
                        <input
                          type="text"
                          value={currentPageData.principal.nameEn || ''}
                          onChange={(e) => handleFieldChange('principal.nameEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Principal Name (मराठी)
                        </label>
                        <input
                          type="text"
                          value={currentPageData.principal.nameMr || ''}
                          onChange={(e) => handleFieldChange('principal.nameMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Desk Message
                        </label>
                        <textarea
                          rows="4"
                          value={currentPageData.principal.messageEn || ''}
                          onChange={(e) => handleFieldChange('principal.messageEn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Desk Message (मराठी)
                        </label>
                        <textarea
                          rows="4"
                          value={currentPageData.principal.messageMr || ''}
                          onChange={(e) => handleFieldChange('principal.messageMr', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* COURSE DETAILS (GNM, ANM, ADMLT) */}
              {currentPageData.details && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <i className="fas fa-graduation-cap" style={{ color: '#0d3b66' }}></i>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0d3b66' }}>
                      Course Key Specifications
                    </h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '14px',
                    marginBottom: '14px',
                  }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                        Duration
                      </label>
                      <input
                        type="text"
                        value={currentPageData.details.durationEn || ''}
                        onChange={(e) => handleFieldChange('details.durationEn', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                        Duration (मराठी)
                      </label>
                      <input
                        type="text"
                        value={currentPageData.details.durationMr || ''}
                        onChange={(e) => handleFieldChange('details.durationMr', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                        Intake Seats
                      </label>
                      <input
                        type="text"
                        value={currentPageData.details.intake || ''}
                        onChange={(e) => handleFieldChange('details.intake', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Eligibility Criteria
                        </label>
                        <textarea
                          rows="2"
                          value={currentPageData.details.eligibilityEn || ''}
                          onChange={(e) => handleFieldChange('details.eligibilityEn', e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          Eligibility Criteria (मराठी)
                        </label>
                        <textarea
                          rows="2"
                          value={currentPageData.details.eligibilityMr || ''}
                          onChange={(e) => handleFieldChange('details.eligibilityMr', e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CONTACT DETAILS PAGE SPECIFIC */}
              {selectedKey === 'contact' && currentPageData.contactInfo && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <i className="fas fa-phone-alt" style={{ color: '#0d3b66' }}></i>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0d3b66' }}>
                      Campus Contact Numbers & Address
                    </h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '14px',
                    marginBottom: '14px',
                  }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                        Primary Phone / Admission Helpline
                      </label>
                      <input
                        type="text"
                        value={currentPageData.contactInfo.primaryPhone || ''}
                        onChange={(e) => handleFieldChange('contactInfo.primaryPhone', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                        Secondary Phone
                      </label>
                      <input
                        type="text"
                        value={currentPageData.contactInfo.secondaryPhone || ''}
                        onChange={(e) => handleFieldChange('contactInfo.secondaryPhone', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                        Primary Email
                      </label>
                      <input
                        type="email"
                        value={currentPageData.contactInfo.primaryEmail || ''}
                        onChange={(e) => handleFieldChange('contactInfo.primaryEmail', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                      College Postal Address
                    </label>
                    <textarea
                      rows="2"
                      value={currentPageData.contactInfo.addressEn || ''}
                      onChange={(e) => handleFieldChange('contactInfo.addressEn', e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              )}

              {/* SECTION: CNE UPDATES (Continuous Nursing Education Programme) */}
              {selectedKey === 'cne-updates' && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fas fa-calendar-check" style={{ color: '#0d3b66', fontSize: '1.15rem' }}></i>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0d3b66', fontWeight: 700 }}>
                        CNE Programme & Workshop Management
                      </h3>
                    </div>
                    <span style={{ fontSize: '0.78rem', background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '20px', fontWeight: 700 }}>
                      Upcoming Events & Announcements
                    </span>
                  </div>

                  {/* Organizing Body / Foundation */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                      Organizing Foundation / Department Banner
                    </label>
                    <input
                      type="text"
                      value={currentPageData.cneDetails?.organizerEn || ''}
                      onChange={(e) => handleFieldChange('cneDetails.organizerEn', e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* Status Headline & Subtitle */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                        Status / Main Announcement Headline
                      </label>
                      <input
                        type="text"
                        value={currentPageData.cneDetails?.statusTitleEn || ''}
                        onChange={(e) => handleFieldChange('cneDetails.statusTitleEn', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 700, boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                        Announcement Subtitle / Tagline
                      </label>
                      <input
                        type="text"
                        value={currentPageData.cneDetails?.statusSubtitleEn || ''}
                        onChange={(e) => handleFieldChange('cneDetails.statusSubtitleEn', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                      Detailed Programme Announcement / Description
                    </label>
                    <textarea
                      rows="3"
                      value={currentPageData.cneDetails?.statusDescEn || ''}
                      onChange={(e) => handleFieldChange('cneDetails.statusDescEn', e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', lineHeight: 1.5, boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* Event Schedule Info Box */}
                  <div style={{ background: '#ffffff', borderRadius: '10px', padding: '18px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0d3b66', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fas fa-calendar-alt" style={{ color: '#ffb703' }}></i> Event Schedule & Registration Details (For Future Events)
                    </div>
                    <p style={{ margin: '0 0 14px', fontSize: '0.78rem', color: '#64748b' }}>
                      Fill these in whenever you organize a new CNE workshop. Leave empty if no specific date is announced yet.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Workshop / Event Date & Time
                        </label>
                        <input
                          type="text"
                          value={currentPageData.cneDetails?.eventDate || ''}
                          onChange={(e) => handleFieldChange('cneDetails.eventDate', e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Venue / Location
                        </label>
                        <input
                          type="text"
                          value={currentPageData.cneDetails?.eventVenue || ''}
                          onChange={(e) => handleFieldChange('cneDetails.eventVenue', e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          MNC Credit Points
                        </label>
                        <input
                          type="text"
                          value={currentPageData.cneDetails?.creditPoints || ''}
                          onChange={(e) => handleFieldChange('cneDetails.creditPoints', e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Registration Fee
                        </label>
                        <input
                          type="text"
                          value={currentPageData.cneDetails?.regFee || ''}
                          onChange={(e) => handleFieldChange('cneDetails.regFee', e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Registration & Brochure URLs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Online Registration Link (Google Form / Portal URL)
                        </label>
                        <input
                          type="text"
                          value={currentPageData.cneDetails?.regUrl || ''}
                          onChange={(e) => handleFieldChange('cneDetails.regUrl', e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Brochure / Schedule PDF Download Link
                        </label>
                        <input
                          type="text"
                          value={currentPageData.cneDetails?.brochureUrl || ''}
                          onChange={(e) => handleFieldChange('cneDetails.brochureUrl', e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Sticky Save Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid #e2e8f0',
                marginTop: '20px',
              }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Changes will be saved to <code>{currentPageData.path}</code>
                </div>
                <button
                  onClick={handleSavePage}
                  disabled={saving}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    background: '#0d3b66',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.92rem',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(13,59,102,0.2)',
                  }}
                >
                  {saving ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save" style={{ color: '#ffb703' }}></i> Save All Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
              Select a page from the sidebar to view and edit its content.
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .cms-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
