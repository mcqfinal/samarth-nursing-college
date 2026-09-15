'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PaymentPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    email: '',
    course: 'GNM',
    purpose: 'Application Fee',
    customAmount: '',
  });

  const [selectedPurpose, setSelectedPurpose] = useState('application'); // 'application', 'seat', 'tuition', 'custom'
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fee structure presets
  const feePresets = {
    application: {
      titleEn: 'Application & Registration Fee',
      titleMr: 'प्रवेश अर्ज व नोंदणी शुल्क',
      amount: 500,
    },
    seat: {
      titleEn: 'Provisional Seat Booking / Token Fee',
      titleMr: 'तात्पुरते जागा आरक्षण / टोकन फी',
      amount: 5000,
    },
    tuition: {
      titleEn: 'First Term / Tuition Fee Instalment',
      titleMr: 'पहिले सत्र / शिक्षण शुल्क हप्ता',
      amount: 25000,
    },
    custom: {
      titleEn: 'Custom / Other Fee Payment',
      titleMr: 'इतर / सानुकूल शुल्क भरणा',
      amount: 0,
    },
  };

  const getEffectiveAmount = () => {
    if (selectedPurpose === 'custom') {
      return Math.max(1, Number(formData.customAmount) || 0);
    }
    return feePresets[selectedPurpose].amount;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to dynamically load Razorpay checkout script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const amountToPay = getEffectiveAmount();

    if (amountToPay <= 0) {
      setErrorMessage(isMr ? 'कृपया वैध रक्कम प्रविष्ट करा.' : 'Please enter a valid payment amount.');
      setLoading(false);
      return;
    }

    try {
      // 1. Ensure Razorpay checkout script is loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setErrorMessage(
          isMr
            ? 'पेमेंट गेटवे लोड करण्यात अडचण आली. कृपया इंटरनेट कनेक्शन तपासा.'
            : 'Failed to load payment gateway SDK. Please check your internet connection.'
        );
        setLoading(false);
        return;
      }

      // 2. Initialize Order on our Backend
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountToPay,
          studentName: formData.studentName,
          phone: formData.phone,
          email: formData.email,
          course: formData.course,
          purpose: feePresets[selectedPurpose].titleEn,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Unable to generate Razorpay order.');
      }

      // 3. Configure Razorpay Standard Checkout Options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Samarth College of Nursing',
        description: `${formData.course} - ${feePresets[selectedPurpose].titleEn}`,
        image: '/images/logo.png',
        order_id: orderData.orderId.startsWith('order_test_') ? undefined : orderData.orderId,
        prefill: {
          name: formData.studentName,
          contact: formData.phone,
          email: formData.email,
        },
        notes: {
          course: formData.course,
          purpose: feePresets[selectedPurpose].titleEn,
        },
        theme: {
          color: '#0d3b66',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        handler: async function (response) {
          try {
            // 4. Verify Payment with Backend
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || orderData.orderId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                studentName: formData.studentName,
                phone: formData.phone,
                email: formData.email,
                course: formData.course,
                purpose: feePresets[selectedPurpose].titleEn,
                amount: amountToPay,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setPaymentSuccess({
                paymentId: response.razorpay_payment_id || verifyData.paymentId,
                orderId: response.razorpay_order_id || orderData.orderId,
                amount: amountToPay,
                studentName: formData.studentName,
                phone: formData.phone,
                email: formData.email,
                course: formData.course,
                purpose: feePresets[selectedPurpose].titleEn,
                date: new Date().toLocaleString(),
              });
            } else {
              throw new Error(verifyData.error || 'Payment verification failed.');
            }
          } catch (verErr) {
            setErrorMessage(verErr.message || 'Error verifying payment receipt.');
          } finally {
            setLoading(false);
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (resp) {
        setErrorMessage(
          resp.error?.description ||
            (isMr ? 'पेमेंट अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा.' : 'Payment failed. Please try again.')
        );
        setLoading(false);
      });

      razorpayInstance.open();
    } catch (err) {
      console.error('Payment flow error:', err);
      setErrorMessage(err.message || 'Payment processing error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '70px' }}>
      {/* Banner */}
      <div className="page-banner" style={{ backgroundColor: '#082238', color: '#fff', padding: '50px 0 45px', textAlign: 'center' }}>
        <div className="container">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 183, 3, 0.15)',
              border: '1px solid rgba(255, 183, 3, 0.4)',
              color: '#ffb703',
              padding: '5px 14px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: '700',
              marginBottom: '12px',
            }}
          >
            <i className="fas fa-shield-alt"></i>
            <span>{isMr ? 'सुरक्षित ऑनलाइन फी पेमेंट' : 'Razorpay Secure Payment Gateway'}</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#ffffff', margin: '0 0 8px 0' }}>
            {isMr ? 'ऑनलाइन फी व प्रवेश शुल्क भरणा' : 'Online Fee & Admission Payment'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.98rem', maxWidth: '640px', margin: '0 auto 12px' }}>
            {isMr
              ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर – प्रवेश अर्ज, नोंदणी किंवा कॉलेज फी सुरक्षितपणे भरा.'
              : 'Samarth College of Nursing, Sangamner – Pay your application, seat reservation, or tuition fees online.'}
          </p>
          <div className="breadcrumb" style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            <Link href="/" style={{ color: '#ffb703' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link> /{' '}
            <Link href="/contact" style={{ color: '#ffb703' }}>{isMr ? 'प्रवेश' : 'Admission'}</Link> /{' '}
            <span style={{ color: '#fff' }}>{isMr ? 'ऑनलाइन पेमेंट' : 'Pay Online'}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1040px', margin: '40px auto 0', padding: '0 1.5rem' }}>
        {paymentSuccess ? (
          /* SUCCESSFUL PAYMENT RECEIPT */
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 50px rgba(13, 59, 102, 0.12)',
              border: '2px solid #86efac',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 20px',
              }}
            >
              <i className="fas fa-check"></i>
            </div>
            <h2 style={{ color: '#166534', fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '8px' }}>
              {isMr ? 'पेमेंट यशस्वीरित्या पूर्ण झाले!' : 'Payment Received Successfully!'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '30px' }}>
              {isMr
                ? 'आपला भरणा सुरक्षितपणे प्राप्त झाला आहे. खालील पावती जतन करून ठेवा.'
                : 'Your transaction has been verified. Please save or print this official receipt for your records.'}
            </p>

            {/* Official Receipt Card */}
            <div
              style={{
                background: '#f8fafc',
                border: '1.5px dashed #cbd5e1',
                borderRadius: '16px',
                padding: '28px',
                textAlign: 'left',
                maxWidth: '680px',
                margin: '0 auto 30px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#0d3b66', fontSize: '1.2rem', fontWeight: '800' }}>
                    SAMARTH COLLEGE OF NURSING
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Sangamner, Ahilyanagar (MSBNPE & MSBTE Affiliated)</span>
                </div>
                <span style={{ background: '#dcfce7', color: '#166534', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem' }}>
                  PAID SUCCESS
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '0.92rem' }}>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Applicant Name:</span>
                  <strong style={{ color: '#1e293b' }}>{paymentSuccess.studentName}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Course Selected:</span>
                  <strong style={{ color: '#1e293b' }}>{paymentSuccess.course}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Payment Purpose:</span>
                  <strong style={{ color: '#1e293b' }}>{paymentSuccess.purpose}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Payment ID (Razorpay):</span>
                  <strong style={{ color: '#0284c7', fontFamily: 'monospace' }}>{paymentSuccess.paymentId}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Date & Time:</span>
                  <strong style={{ color: '#1e293b' }}>{paymentSuccess.date}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Amount Paid:</span>
                  <strong style={{ color: '#16a34a', fontSize: '1.25rem' }}>₹{paymentSuccess.amount.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  background: '#0d3b66',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <i className="fas fa-print"></i> {isMr ? 'पावती प्रिंट करा' : 'Print Receipt'}
              </button>
              <button
                type="button"
                onClick={() => setPaymentSuccess(null)}
                style={{
                  background: '#f1f5f9',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {isMr ? 'दुसरे पेमेंट करा' : 'Make Another Payment'}
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT FORM & CALCULATOR */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '30px',
              alignItems: 'start',
            }}
          >
            {/* Left: Details & Purpose selection */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '36px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0',
              }}
            >
              <h3 style={{ color: '#0d3b66', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '20px' }}>
                {isMr ? '१. विद्यार्थी व पेमेंट तपशील' : '1. Applicant & Payment Details'}
              </h3>

              {errorMessage && (
                <div
                  style={{
                    background: '#fee2e2',
                    color: '#991b1b',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid #fca5a5',
                  }}
                >
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handlePayment}>
                {/* Full Name */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.92rem', color: '#1e293b' }}>
                    {isMr ? 'विद्यार्थ्याचे पूर्ण नाव *' : 'Student Full Name *'}
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder={isMr ? 'उदा. राहुल रमेश शिंदे' : 'e.g. John Doe'}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.98rem',
                    }}
                  />
                </div>

                {/* Phone & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.92rem', color: '#1e293b' }}>
                      {isMr ? 'मोबाईल नंबर *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.98rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.92rem', color: '#1e293b' }}>
                      {isMr ? 'ई-मेल (पावतीसाठी)' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@gmail.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.98rem',
                      }}
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.92rem', color: '#1e293b' }}>
                    {isMr ? 'अभ्यासक्रम *' : 'Select Nursing / Paramedical Course *'}
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.98rem',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="GNM">GNM – General Nursing & Midwifery (3 Years • MSBNPE)</option>
                    <option value="ANM">ANM – Auxiliary Nursing & Midwifery (2 Years • MSBNPE)</option>
                    <option value="ADMLT">ADMLT – Medical Lab Technician (1.5 Years • MSBTE)</option>
                  </select>
                </div>

                {/* Payment Purpose Selection */}
                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', fontSize: '0.95rem', color: '#0d3b66' }}>
                    {isMr ? '२. शुल्काचा प्रकार निवडा (Fee Purpose)' : '2. Select Payment Category'}
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {Object.entries(feePresets).map(([key, item]) => {
                      const isSelected = selectedPurpose === key;
                      return (
                        <label
                          key={key}
                          onClick={() => setSelectedPurpose(key)}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            border: `2px solid ${isSelected ? '#ffb703' : '#e2e8f0'}`,
                            background: isSelected ? '#fffdf5' : '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                              type="radio"
                              name="feeType"
                              checked={isSelected}
                              onChange={() => setSelectedPurpose(key)}
                              style={{ accentColor: '#d97706', width: '18px', height: '18px' }}
                            />
                            <div>
                              <strong style={{ display: 'block', color: '#1e293b', fontSize: '0.95rem' }}>
                                {isMr ? item.titleMr : item.titleEn}
                              </strong>
                            </div>
                          </div>
                          {key !== 'custom' && (
                            <strong style={{ color: '#0d3b66', fontSize: '1.05rem', fontWeight: '800' }}>
                              ₹{item.amount.toLocaleString('en-IN')}
                            </strong>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount Field (if custom selected) */}
                {selectedPurpose === 'custom' && (
                  <div style={{ marginBottom: '22px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.92rem', color: '#1e293b' }}>
                      {isMr ? 'भरणा करावयाची रक्कम (INR ₹) *' : 'Enter Amount to Pay (INR ₹) *'}
                    </label>
                    <input
                      type="number"
                      name="customAmount"
                      min="1"
                      value={formData.customAmount}
                      onChange={handleInputChange}
                      placeholder="e.g. 10000"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #94a3b8',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                      }}
                    />
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading || getEffectiveAmount() <= 0}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: loading ? '#94a3b8' : 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                    color: '#0d3b66',
                    fontSize: '1.1rem',
                    fontWeight: '800',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 25px rgba(251, 133, 0, 0.35)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>{isMr ? 'सुरक्षित गेटवे उघडत आहे...' : 'Connecting to Razorpay...'}</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock"></i>
                      <span>
                        {isMr
                          ? `₹${getEffectiveAmount().toLocaleString('en-IN')} सुरक्षित भरा (Razorpay)`
                          : `Pay Securely ₹${getEffectiveAmount().toLocaleString('en-IN')} with Razorpay`}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Payment Summary & Security Assurance */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                }}
              >
                <h4 style={{ color: '#0d3b66', fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', marginBottom: '18px' }}>
                  {isMr ? 'पेमेंट सारांश (Summary)' : 'Payment Summary'}
                </h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.92rem', color: '#64748b' }}>
                  <span>Course:</span>
                  <strong style={{ color: '#1e293b' }}>{formData.course}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.92rem', color: '#64748b' }}>
                  <span>Purpose:</span>
                  <strong style={{ color: '#1e293b' }}>{feePresets[selectedPurpose].titleEn}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.92rem', color: '#64748b' }}>
                  <span>Gateway Fee:</span>
                  <span style={{ color: '#16a34a', fontWeight: '700' }}>₹0 (Free)</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '2px dashed #e2e8f0',
                    paddingTop: '16px',
                    marginBottom: '20px',
                  }}
                >
                  <strong style={{ fontSize: '1.1rem', color: '#0d3b66' }}>Total Payable:</strong>
                  <strong style={{ fontSize: '1.6rem', color: '#d97706', fontWeight: '900' }}>
                    ₹{getEffectiveAmount().toLocaleString('en-IN')}
                  </strong>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                    Supported Payment Modes:
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '1.2rem', color: '#0d3b66' }}>
                    <i className="fab fa-google-pay" title="Google Pay"></i>
                    <i className="fas fa-mobile-alt" title="UPI & PhonePe"></i>
                    <i className="fab fa-cc-visa" title="Visa"></i>
                    <i className="fab fa-cc-mastercard" title="Mastercard"></i>
                    <i className="fas fa-university" title="Net Banking"></i>
                  </div>
                </div>
              </div>

              {/* Security Badge Card */}
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <i className="fas fa-shield-check" style={{ color: '#16a34a', fontSize: '1.5rem', marginTop: '2px' }}></i>
                <div>
                  <strong style={{ color: '#166534', fontSize: '0.92rem', display: 'block', marginBottom: '4px' }}>
                    100% Secure & RBI Regulated
                  </strong>
                  <p style={{ color: '#15803d', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>
                    Payments are encrypted with 256-bit SSL via Razorpay India. Instant digital receipt issued upon successful payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
