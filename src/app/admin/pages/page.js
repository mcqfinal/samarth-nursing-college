'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPagesManager() {
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [langView, setLangView] = useState('bilingual'); // 'en', 'mr', 'bilingual'
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
      cur[keys[keys.length - 1]] = value;
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
                    Editing section content and bilingual texts for this page
                  </span>
                </div>

                {/* Language View Switcher */}
                <div style={{
                  display: 'inline-flex',
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  padding: '3px',
                }}>
                  <button
                    onClick={() => setLangView('bilingual')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      background: langView === 'bilingual' ? '#0d3b66' : 'transparent',
                      color: langView === 'bilingual' ? '#ffffff' : '#64748b',
                    }}
                  >
                    Bilingual (Both)
                  </button>
                  <button
                    onClick={() => setLangView('en')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      background: langView === 'en' ? '#0d3b66' : 'transparent',
                      color: langView === 'en' ? '#ffffff' : '#64748b',
                    }}
                  >
                    English Only
                  </button>
                  <button
                    onClick={() => setLangView('mr')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      background: langView === 'mr' ? '#0d3b66' : 'transparent',
                      color: langView === 'mr' ? '#ffffff' : '#64748b',
                    }}
                  >
                    मराठी Only
                  </button>
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
                          Badge / Pill Text (English)
                        </label>
                        <input
                          type="text"
                          value={currentPageData.hero.badgeEn || ''}
                          onChange={(e) => handleFieldChange('hero.badgeEn', e.target.value)}
                          placeholder="E.g., ADMISSIONS OPEN 2026-27"
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
                          placeholder="उदा., प्रवेश सुरू शैक्षणिक वर्ष २०२६-२७"
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
                          Main Heading (English)
                        </label>
                        <input
                          type="text"
                          value={currentPageData.hero.titleEn || ''}
                          onChange={(e) => handleFieldChange('hero.titleEn', e.target.value)}
                          placeholder="Enter page headline"
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
                          placeholder="मुख्य शीर्षक मराठीत लिहा"
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
                          Subtitle / Brief Description (English)
                        </label>
                        <textarea
                          rows="2"
                          value={currentPageData.hero.descEn || ''}
                          onChange={(e) => handleFieldChange('hero.descEn', e.target.value)}
                          placeholder="Page description text"
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
                          placeholder="पानाचा संक्षिप्त परिचय मराठीत"
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
                          Section Heading (English)
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
                          Paragraph 1 (English)
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
                          Overview Heading (English)
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
                          Main Story / Text (English)
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
                          Vision Statement (English)
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
                          Mission Statement (English)
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
                          Principal Name (English)
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
                          Desk Message (English)
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
                        Duration (English)
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
                          Eligibility Criteria (English)
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
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: langView === 'bilingual' ? '1fr 1fr' : '1fr',
                    gap: '16px',
                  }}>
                    {(langView === 'bilingual' || langView === 'en') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          College Postal Address (English)
                        </label>
                        <textarea
                          rows="2"
                          value={currentPageData.contactInfo.addressEn || ''}
                          onChange={(e) => handleFieldChange('contactInfo.addressEn', e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    )}
                    {(langView === 'bilingual' || langView === 'mr') && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                          College Postal Address (मराठी)
                        </label>
                        <textarea
                          rows="2"
                          value={currentPageData.contactInfo.addressMr || ''}
                          onChange={(e) => handleFieldChange('contactInfo.addressMr', e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    )}
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
