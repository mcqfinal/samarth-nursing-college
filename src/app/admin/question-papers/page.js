'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AdminQuestionPapersPage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    course: 'gnm',
    courseLabel: 'GNM 1st Year',
    year: '2025',
    session: 'Winter 2025',
    subjectEn: '',
    subjectMr: '',
    board: 'MSBNPE',
    paperCode: '',
    fileSize: '',
    fileUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Direct PDF Upload State
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadedPdfInfo, setUploadedPdfInfo] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Delete Confirmation Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/question-papers');
      const data = await res.json();
      if (data.success && Array.isArray(data.papers)) {
        setPapers(data.papers);
      }
    } catch (err) {
      console.error('Failed to load question papers:', err);
      showToast('Failed to load question papers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      showToast('Only PDF files (.pdf) are allowed', 'error');
      return;
    }

    if (file.size > 35 * 1024 * 1024) {
      showToast('File size must be under 35MB', 'error');
      return;
    }

    setUploadingPdf(true);
    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/question-papers/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          fileUrl: result.fileUrl,
          fileSize: result.fileSize,
        }));
        setUploadedPdfInfo({
          fileName: result.fileName,
          fileSize: result.fileSize,
          fileUrl: result.fileUrl,
        });
        showToast('PDF uploaded successfully!', 'success');
      } else {
        showToast(result.error || 'Failed to upload PDF', 'error');
      }
    } catch (err) {
      console.error('Error uploading PDF:', err);
      showToast('Network error while uploading PDF', 'error');
    } finally {
      setUploadingPdf(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      course: 'gnm',
      courseLabel: 'GNM 1st Year',
      year: '2025',
      session: 'Winter 2025',
      subjectEn: '',
      subjectMr: '',
      board: 'MSBNPE',
      paperCode: '',
      fileSize: '',
      fileUrl: '',
    });
    setUploadedPdfInfo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (paper) => {
    setEditingItem(paper);
    setFormData({
      course: paper.course || 'gnm',
      courseLabel: paper.courseLabel || 'GNM 1st Year',
      year: paper.year || '2025',
      session: paper.session || 'Winter 2025',
      subjectEn: paper.subjectEn || '',
      subjectMr: paper.subjectMr || '',
      board: paper.board || 'MSBNPE',
      paperCode: paper.paperCode || '',
      fileSize: paper.fileSize || '1.5 MB',
      fileUrl: paper.fileUrl || '',
    });
    setUploadedPdfInfo(
      paper.fileUrl
        ? {
            fileName: paper.fileUrl.split('/').pop(),
            fileSize: paper.fileSize,
            fileUrl: paper.fileUrl,
          }
        : null
    );
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subjectEn.trim()) {
      showToast('Subject name is required', 'error');
      return;
    }

    if (!formData.fileUrl || !formData.fileUrl.trim()) {
      showToast('Please upload a PDF document', 'error');
      return;
    }

    const payload = {
      ...formData,
      subjectMr: formData.subjectMr || formData.subjectEn,
    };

    setSubmitting(true);
    try {
      if (editingItem) {
        // Update existing paper
        const res = await fetch(`/api/question-papers/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast('Question paper updated successfully');
          setIsModalOpen(false);
          fetchPapers();
        } else {
          showToast(data.error || 'Failed to update', 'error');
        }
      } else {
        // Create new paper
        const res = await fetch('/api/question-papers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast('New question paper added successfully');
          setIsModalOpen(false);
          fetchPapers();
        } else {
          showToast(data.error || 'Failed to create', 'error');
        }
      }
    } catch (err) {
      showToast('Network error while saving', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/question-papers/${itemToDelete.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('Question paper deleted successfully');
        setDeleteModalOpen(false);
        setItemToDelete(null);
        fetchPapers();
      } else {
        showToast(data.error || 'Failed to delete', 'error');
      }
    } catch (err) {
      showToast('Network error while deleting', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Filtered papers
  const filteredPapers = papers.filter((p) => {
    const matchCourse = courseFilter === 'ALL' || p.course.toLowerCase() === courseFilter.toLowerCase();
    const matchYear = yearFilter === 'ALL' || String(p.year) === String(yearFilter);
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !searchTerm.trim() ||
      (p.subjectEn && p.subjectEn.toLowerCase().includes(q)) ||
      (p.subjectMr && p.subjectMr.toLowerCase().includes(q)) ||
      (p.paperCode && p.paperCode.toLowerCase().includes(q)) ||
      (p.courseLabel && p.courseLabel.toLowerCase().includes(q));
    return matchCourse && matchYear && matchSearch;
  });

  // Stats
  const totalCount = papers.length;
  const gnmCount = papers.filter((p) => p.course === 'gnm').length;
  const anmCount = papers.filter((p) => p.course === 'anm').length;
  const admltCount = papers.filter((p) => p.course === 'admlt').length;

  return (
    <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            padding: '12px 20px',
            borderRadius: '10px',
            backgroundColor: notification.type === 'error' ? '#dc2626' : '#16a34a',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 600,
            fontSize: '0.92rem',
          }}
        >
          <i className={notification.type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}></i>
          {notification.message}
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '25px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fas fa-file-pdf"></i>
            </span>
            <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#0d3b66' }}>
              Old Question Papers Manager
            </h1>
          </div>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
            Manage MSBNPE & MSBTE previous examination question papers for GNM, ANM & ADMLT students.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            href="/facilities/question-papers"
            target="_blank"
            style={{
              padding: '10px 18px',
              backgroundColor: '#f1f5f9',
              color: '#334155',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fas fa-external-link-alt"></i> View Public Archive
          </Link>
          <button
            type="button"
            onClick={openAddModal}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0d3b66',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(13, 59, 102, 0.2)',
            }}
          >
            <i className="fas fa-plus" style={{ color: '#ffb703' }}></i> Add Question Paper
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '25px',
        }}
      >
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            Total Question Papers
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0d3b66' }}>{totalCount}</div>
          <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>All courses & years</span>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ color: '#0284c7', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            GNM Nursing Papers
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7' }}>{gnmCount}</div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>1st, 2nd & 3rd Year (MSBNPE)</span>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ color: '#ea580c', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            ANM Nursing Papers
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ea580c' }}>{anmCount}</div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>1st & 2nd Year (MSBNPE)</span>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ color: '#7c3aed', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            ADMLT Lab Technology
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7c3aed' }}>{admltCount}</div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Pathology & Labs (MSBTE)</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <i
            className="fas fa-search"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
            }}
          ></i>
          <input
            type="text"
            placeholder="Search by subject, paper code (e.g. GNM-101, Anatomy)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.92rem',
              outline: 'none',
              backgroundColor: '#f8fafc',
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginRight: '4px' }}>Course:</span>
          {['ALL', 'gnm', 'anm', 'admlt'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCourseFilter(c)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: courseFilter === c ? '#0d3b66' : '#f1f5f9',
                color: courseFilter === c ? '#ffffff' : '#475569',
              }}
            >
              {c.toUpperCase()}
            </button>
          ))}

          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginLeft: '10px', marginRight: '4px' }}>Year:</span>
          {['ALL', ...Array.from(new Set(papers.map((p) => String(p.year)).filter(Boolean))).sort((a, b) => b.localeCompare(a))].map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setYearFilter(yr)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: yearFilter === yr ? '#ffd166' : '#f1f5f9',
                color: yearFilter === yr ? '#0d3b66' : '#64748b',
              }}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Main Papers Table Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#0d3b66', marginBottom: '12px' }}></i>
            <p style={{ margin: 0, fontWeight: 600 }}>Loading question papers...</p>
          </div>
        ) : filteredPapers.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
            <i className="fas fa-folder-open" style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '14px' }}></i>
            <h4 style={{ margin: '0 0 6px', color: '#334155', fontSize: '1.1rem' }}>No question papers found</h4>
            <p style={{ margin: '0 0 16px', fontSize: '0.9rem' }}>Try clearing your search or filter options.</p>
            <button
              type="button"
              onClick={openAddModal}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0d3b66',
                color: '#fff',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Add First Question Paper
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '14px 18px', width: '70px' }}>Code</th>
                  <th style={{ padding: '14px 18px' }}>Subject Details</th>
                  <th style={{ padding: '14px 18px' }}>Course</th>
                  <th style={{ padding: '14px 18px' }}>Exam Session</th>
                  <th style={{ padding: '14px 18px' }}>Board</th>
                  <th style={{ padding: '14px 18px' }}>File Size</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPapers.map((paper) => (
                  <tr key={paper.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s ease' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ backgroundColor: '#f1f5f9', color: '#0d3b66', padding: '4px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'monospace' }}>
                        {paper.paperCode || `#${paper.id}`}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700, color: '#0d3b66' }}>
                        {paper.subjectEn || paper.subjectMr || paper.subject}
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          backgroundColor:
                            paper.course === 'gnm' ? '#e0f2fe' : paper.course === 'anm' ? '#ffedd5' : '#f3e8ff',
                          color:
                            paper.course === 'gnm' ? '#0284c7' : paper.course === 'anm' ? '#ea580c' : '#7c3aed',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                        }}
                      >
                        {paper.courseLabel || paper.course.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#334155', fontWeight: 600 }}>
                      <i className="far fa-calendar-alt" style={{ marginRight: '6px', color: '#94a3b8' }}></i>
                      {paper.session || paper.year}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600 }}>
                        {paper.board || 'MSBNPE'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.85rem' }}>
                      <i className="fas fa-file-pdf" style={{ color: '#dc2626', marginRight: '6px' }}></i>
                      {paper.fileSize || '1.4 MB'}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                        <a
                          href={paper.fileUrl || '/admissions/fee-structure.pdf'}
                          target="_blank"
                          rel="noreferrer"
                          title="Preview PDF"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            backgroundColor: '#f1f5f9',
                            color: '#0d3b66',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                          }}
                        >
                          <i className="fas fa-eye"></i>
                        </a>
                        <button
                          type="button"
                          onClick={() => openEditModal(paper)}
                          title="Edit Question Paper"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            backgroundColor: '#e0f2fe',
                            color: '#0284c7',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setItemToDelete(paper);
                            setDeleteModalOpen(true);
                          }}
                          title="Delete Question Paper"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 34, 56, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#0d3b66',
                color: '#ffffff',
                borderRadius: '16px 16px 0 0',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {editingItem ? 'Edit Question Paper' : 'Add New Question Paper'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                {/* Course Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Course *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => {
                      const val = e.target.value;
                      let label = 'GNM 1st Year';
                      if (val === 'anm') label = 'ANM 1st Year';
                      if (val === 'admlt') label = 'ADMLT';
                      setFormData({ ...formData, course: val, courseLabel: label });
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="gnm">GNM (General Nursing)</option>
                    <option value="anm">ANM (Auxiliary Nursing)</option>
                    <option value="admlt">ADMLT (Lab Technology)</option>
                  </select>
                </div>

                {/* Course Label */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Course Year / Level *
                  </label>
                  <input
                    type="text"
                    value={formData.courseLabel}
                    onChange={(e) => setFormData({ ...formData, courseLabel: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                {/* Examination Year */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Exam Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                </div>

                {/* Exam Session */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Exam Session *
                  </label>
                  <input
                    type="text"
                    value={formData.session}
                    onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                {/* Board */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Exam Board *
                  </label>
                  <select
                    value={formData.board}
                    onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="MSBNPE">MSBNPE (Maharashtra Nursing Board)</option>
                    <option value="MSBTE">MSBTE (Technical Board)</option>
                    <option value="MUHS">MUHS Nashik</option>
                    <option value="INC">INC New Delhi</option>
                  </select>
                </div>
              </div>

              {/* Paper Code */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Paper Code / Subject Code *
                </label>
                <input
                  type="text"
                  value={formData.paperCode}
                  onChange={(e) => setFormData({ ...formData, paperCode: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              {/* Subject */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Subject Name *
                </label>
                <input
                  type="text"
                  value={formData.subjectEn}
                  onChange={(e) => setFormData({ ...formData, subjectEn: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              {/* DIRECT PDF UPLOAD */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: 700, color: '#0d3b66', marginBottom: '8px' }}>
                  <i className="fas fa-file-pdf" style={{ color: '#dc2626' }}></i>
                  Question Paper PDF Document *
                </label>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />

                {/* Uploaded Card or Drag-and-Drop Area */}
                {formData.fileUrl ? (
                  <div
                    style={{
                      border: '2px solid #bbf7d0',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '10px',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          flexShrink: 0,
                        }}
                      >
                        <i className="fas fa-file-pdf"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#166534', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fas fa-check-circle" style={{ color: '#16a34a' }}></i>
                          {uploadedPdfInfo?.fileName || formData.fileUrl.split('/').pop()}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                          Size: <strong style={{ color: '#334155' }}>{formData.fileSize || 'Standard PDF'}</strong> • Ready for students
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <a
                        href={formData.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: '7px 12px',
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#0d3b66',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <i className="fas fa-external-link-alt"></i> Preview PDF
                      </a>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingPdf}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '6px',
                          backgroundColor: '#0d3b66',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <i className="fas fa-sync-alt"></i> Replace PDF
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileUpload(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => {
                      if (!uploadingPdf) fileInputRef.current?.click();
                    }}
                    style={{
                      border: dragOver ? '2px dashed #0284c7' : '2px dashed #cbd5e1',
                      backgroundColor: dragOver ? '#e0f2fe' : '#f8fafc',
                      borderRadius: '12px',
                      padding: '30px 20px',
                      textAlign: 'center',
                      cursor: uploadingPdf ? 'wait' : 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {uploadingPdf ? (
                      <div>
                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#0d3b66', marginBottom: '10px' }}></i>
                        <div style={{ fontWeight: 700, color: '#0d3b66', fontSize: '0.95rem' }}>Uploading PDF Document...</div>
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.6rem',
                            marginBottom: '10px',
                          }}
                        >
                          <i className="fas fa-file-pdf"></i>
                        </div>
                        <div style={{ fontWeight: 700, color: '#0d3b66', fontSize: '1.02rem' }}>
                          Click to Choose PDF File or Drag & Drop Here
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    borderRadius: '8px',
                    border: 'none',
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
                    backgroundColor: '#0d3b66',
                    color: '#ffffff',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Saving...' : editingItem ? 'Update Question Paper' : 'Save Question Paper'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && itemToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 34, 56, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '460px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                margin: '0 auto 16px',
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </div>
            <h3 style={{ margin: '0 0 8px', color: '#0d3b66', fontSize: '1.3rem', fontWeight: 800 }}>
              Delete Question Paper?
            </h3>
            <p style={{ margin: '0 0 20px', color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5 }}>
              Are you sure you want to delete <strong>{itemToDelete.subjectEn || itemToDelete.paperCode}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setItemToDelete(null);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: '10px 22px',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 700,
                  cursor: deleting ? 'not-allowed' : 'pointer',
                }}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
