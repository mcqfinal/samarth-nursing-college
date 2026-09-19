'use client';

import { useState, useEffect } from 'react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // New Event Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [titleMr, setTitleMr] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [venueMr, setVenueMr] = useState('');
  const [category, setCategory] = useState('Workshop');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTitleMr, setEditTitleMr] = useState('');
  const [editEventDate, setEditEventDate] = useState('');
  const [editEventTime, setEditEventTime] = useState('');
  const [editVenue, setEditVenue] = useState('');
  const [editVenueMr, setEditVenueMr] = useState('');
  const [editCategory, setEditCategory] = useState('Workshop');
  const [editDescription, setEditDescription] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);
  const [updating, setUpdating] = useState(false);

  const categories = [
    { key: 'Workshop', label: 'Workshop / Training', color: '#0284c7', bg: '#e0f2fe', icon: 'fa-chalkboard-teacher' },
    { key: 'Medical Camp', label: 'Medical & Health Camp', color: '#16a34a', bg: '#dcfce7', icon: 'fa-heartbeat' },
    { key: 'Clinical', label: 'Clinical Visit / Training', color: '#0d9488', bg: '#ccfbf1', icon: 'fa-hospital-user' },
    { key: 'Seminar', label: 'Seminar & Guest Lecture', color: '#7c3aed', bg: '#f3e8ff', icon: 'fa-microphone-alt' },
    { key: 'Cultural', label: 'Cultural & Celebrations', color: '#d97706', bg: '#fef3c7', icon: 'fa-guitar' },
    { key: 'Sports', label: 'Sports & Athletics', color: '#dc2626', bg: '#fee2e2', icon: 'fa-running' },
  ];

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data && Array.isArray(data.events)) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Event title is required');
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          titleMr,
          eventDate,
          eventTime,
          venue,
          venueMr,
          category,
          description,
          isActive: true,
        }),
      });

      if (res.ok) {
        setTitle('');
        setTitleMr('');
        setEventDate('');
        setEventTime('');
        setVenue('');
        setVenueMr('');
        setDescription('');
        setShowAddModal(false);
        fetchEvents();
        alert('Event added successfully!');
      } else {
        alert('Failed to add event');
      }
    } catch (err) {
      alert('Network error while creating event');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setEditTitle(event.title || '');
    setEditTitleMr(event.titleMr || '');
    setEditEventDate(event.eventDate || '');
    setEditEventTime(event.eventTime || '');
    setEditVenue(event.venue || '');
    setEditVenueMr(event.venueMr || '');
    setEditCategory(event.category || 'Workshop');
    setEditDescription(event.description || '');
    setEditIsActive(event.isActive !== undefined ? event.isActive : true);
    setEditModalOpen(true);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!editingEvent || !editTitle.trim()) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/events/${editingEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          titleMr: editTitleMr,
          eventDate: editEventDate,
          eventTime: editEventTime,
          venue: editVenue,
          venueMr: editVenueMr,
          category: editCategory,
          description: editDescription,
          isActive: editIsActive,
        }),
      });

      if (res.ok) {
        setEditModalOpen(false);
        setEditingEvent(null);
        fetchEvents();
        alert('Event updated successfully!');
      } else {
        alert('Failed to update event');
      }
    } catch (err) {
      alert('Error updating event');
    } finally {
      setUpdating(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        fetchEvents();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleDeleteEvent = async (id, eventTitle) => {
    if (!confirm(`Are you sure you want to delete the event: "${eventTitle}"?`)) return;

    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchEvents();
        alert('Event deleted successfully!');
      } else {
        alert('Failed to delete event');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      !searchTerm.trim() ||
      e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && e.isActive) ||
      (statusFilter === 'INACTIVE' && !e.isActive);

    const matchesCategory =
      categoryFilter === 'ALL' || e.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalEvents = events.length;
  const activeEventsCount = events.filter((e) => e.isActive).length;

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              <i className="far fa-calendar-alt"></i>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>
                Upcoming Events Manager
              </h1>
              <p style={{ margin: '2px 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                Manage campus events, clinical training visits, workshops and seminars shown on the Homepage.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#0d3b66',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(13, 59, 102, 0.25)',
            transition: 'all 0.2s',
          }}
        >
          <i className="fas fa-plus-circle"></i> Add New Event
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            <i className="far fa-calendar-check"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{totalEvents}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>Total Events</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            <i className="fas fa-eye"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16a34a', lineHeight: 1 }}>{activeEventsCount}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>Live on Homepage</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            <i className="fas fa-tags"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{categories.length}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>Categories</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px 20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by event title, venue or description..."
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'ACTIVE', 'INACTIVE'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: statusFilter === status ? '1px solid #0d3b66' : '1px solid #cbd5e1',
                  backgroundColor: statusFilter === status ? '#0d3b66' : '#ffffff',
                  color: statusFilter === status ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                }}
              >
                {status === 'ALL' ? 'All Status' : status === 'ACTIVE' ? 'Active' : 'Inactive'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setCategoryFilter('ALL')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: categoryFilter === 'ALL' ? '1px solid #0284c7' : '1px solid #e2e8f0',
              backgroundColor: categoryFilter === 'ALL' ? '#e0f2fe' : '#ffffff',
              color: categoryFilter === 'ALL' ? '#0284c7' : '#64748b',
              cursor: 'pointer',
            }}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategoryFilter(cat.key)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: categoryFilter === cat.key ? `1px solid ${cat.color}` : '1px solid #e2e8f0',
                backgroundColor: categoryFilter === cat.key ? cat.bg : '#ffffff',
                color: categoryFilter === cat.key ? cat.color : '#64748b',
                cursor: 'pointer',
              }}
            >
              <i className={`fas ${cat.icon}`} style={{ marginRight: '6px' }}></i>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
          <i className="fas fa-spinner fa-spin fa-2x" style={{ color: '#0d3b66', marginBottom: '14px' }}></i>
          <p>Loading upcoming events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <i className="far fa-calendar-times fa-3x" style={{ color: '#cbd5e1', marginBottom: '14px' }}></i>
          <h3 style={{ margin: '0 0 6px', color: '#1e293b' }}>No Events Found</h3>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
            Click the &quot;Add New Event&quot; button above to create and publish your first event.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '18px' }}>
          {filteredEvents.map((evt) => {
            const date = evt.eventDate ? new Date(evt.eventDate) : new Date();
            const day = isNaN(date.getDate()) ? '01' : date.getDate().toString().padStart(2, '0');
            const month = isNaN(date.getTime()) ? 'Sep' : date.toLocaleString('en-US', { month: 'short' });
            const year = isNaN(date.getFullYear()) ? '2026' : date.getFullYear();

            const catConfig = categories.find((c) => c.key === evt.category) || {
              color: '#0284c7',
              bg: '#e0f2fe',
              label: evt.category || 'Event',
            };

            return (
              <div
                key={evt.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                  position: 'relative',
                  borderTop: `4px solid ${catConfig.color}`,
                }}
              >
                <div>
                  {/* Top Bar: Category & Active Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        backgroundColor: catConfig.bg,
                        color: catConfig.color,
                        padding: '3px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {catConfig.label}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleActive(evt.id, evt.isActive)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        backgroundColor: evt.isActive ? '#dcfce7' : '#f1f5f9',
                        color: evt.isActive ? '#16a34a' : '#64748b',
                      }}
                      title="Click to toggle status"
                    >
                      <i className={`fas ${evt.isActive ? 'fa-check-circle' : 'fa-eye-slash'}`}></i>
                      {evt.isActive ? 'Live on Home' : 'Hidden'}
                    </button>
                  </div>

                  {/* Main Event Row */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Blue Date Badge (matching homepage style) */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '58px',
                        height: '58px',
                        borderRadius: '12px',
                        backgroundColor: '#e0f2fe',
                        color: '#0284c7',
                        border: '1px solid #bae6fd',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: '1.3rem', fontWeight: 800, lineHeight: 1 }}>{day}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{month}</span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35 }}>
                        {evt.title}
                      </h3>
                      {evt.titleMr && (
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
                          {evt.titleMr}
                        </div>
                      )}

                      {/* Time & Venue meta tags */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem', color: '#475569', marginTop: '6px' }}>
                        {evt.eventTime && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className="far fa-clock" style={{ color: '#0284c7', width: '14px' }}></i>
                            <span>Time: <strong>{evt.eventTime}</strong></span>
                          </div>
                        )}
                        {evt.venue && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: '#dc2626', width: '14px' }}></i>
                            <span>Venue: <strong>{evt.venue}</strong></span>
                          </div>
                        )}
                      </div>

                      {evt.description && (
                        <p style={{ margin: '10px 0 0', fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5 }}>
                          {evt.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => openEditModal(evt)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      backgroundColor: '#f8fafc',
                      color: '#0d3b66',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(evt.id, evt.title)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      border: '1px solid #fecaca',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================
          ADD EVENT MODAL
          ======================================================== */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                Add New Upcoming Event
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateEvent} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Event Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Emergency Nursing & Critical Care Workshop"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Event Title (Marathi - optional)
                  </label>
                  <input
                    type="text"
                    value={titleMr}
                    onChange={(e) => setTitleMr(e.target.value)}
                    placeholder="उदा. आपत्कालीन नर्सिंग व क्रिटिकल केअर कार्यशाळा"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Event Time
                    </label>
                    <input
                      type="text"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="e.g. 11:00 AM or 10:00 AM - 1:00 PM"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem', backgroundColor: '#fff' }}
                    >
                      {categories.map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Venue / Location
                    </label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="e.g. College Seminar Hall"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Description & Schedule Details
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter detailed agenda, chief guests, instructions for students..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem', resize: 'vertical' }}
                  ></textarea>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', backgroundColor: '#0d3b66', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                >
                  {submitting ? 'Publishing...' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT EVENT MODAL
          ======================================================== */}
      {editModalOpen && (
        <div
          onClick={() => setEditModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                Edit Event
              </h2>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Event Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Event Title (Marathi - optional)
                  </label>
                  <input
                    type="text"
                    value={editTitleMr}
                    onChange={(e) => setEditTitleMr(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={editEventDate}
                      onChange={(e) => setEditEventDate(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Event Time
                    </label>
                    <input
                      type="text"
                      value={editEventTime}
                      onChange={(e) => setEditEventTime(e.target.value)}
                      placeholder="e.g. 11:00 AM"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Category
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem', backgroundColor: '#fff' }}
                    >
                      {categories.map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Venue / Location
                    </label>
                    <input
                      type="text"
                      value={editVenue}
                      onChange={(e) => setEditVenue(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Description & Schedule Details
                  </label>
                  <textarea
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem', resize: 'vertical' }}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <input
                    type="checkbox"
                    id="editIsActive"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="editIsActive" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                    Active (Show in Upcoming Events on Homepage)
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', backgroundColor: '#0d3b66', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}