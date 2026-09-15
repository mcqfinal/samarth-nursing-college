'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMsg({
          type: 'success',
          text: isMr
            ? 'आपला प्रवेश चौकशी अर्ज यशस्वीरित्या प्राप्त झाला आहे! आमचे समुपदेशक लवकरच आपल्याशी संपर्क साधतील.'
            : data.message || 'Thank you for your enquiry! Our admissions counselor will contact you soon.',
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: '',
          message: '',
        });
      } else {
        setStatusMsg({
          type: 'error',
          text: isMr
            ? 'अर्ज पाठवण्यात अडचण आली. कृपया थेट ९६८९४ ८६५७० या क्रमांकावर कॉल करा.'
            : data.error || 'Failed to submit enquiry. Please call us at 9689486570.',
        });
      }
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: isMr
          ? 'नेटवर्क एरर आली. कृपया थेट ९६८९४ ८६५७० या क्रमांकावर संपर्क करा.'
          : 'Network error. Please call us directly at 9689486570.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)', color: '#ffffff', padding: '55px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,209,102,0.18)', border: '1px solid #ffd166', color: '#ffd166', padding: '5px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.06em' }}>
            <i className="fas fa-envelope"></i> {isMr ? 'संपर्क' : 'CONTACT US'}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? 'आमच्याशी संपर्क साधा' : 'Get In Touch With Us'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: '0 0 16px' }}>
            {isMr ? 'संगमनेर, अहिल्यानगर – महाराष्ट्र | ☎ +91 96894 86570' : 'Sangamner, Ahilyanagar – Maharashtra | ☎ +91 96894 86570'}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffd166', textDecoration: 'none' }}>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</Link>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>{isMr ? 'संपर्क' : 'Contact Us'}</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h4>{isMr ? 'कॅम्पस पत्ता' : 'Campus Address'}</h4>
              <p>
                {isMr
                  ? 'संगमनेर, तालुका: संगमनेर, जिल्हा: अहिल्यानगर, महाराष्ट्र - ४२२६०५'
                  : 'Sangamner, Taluka Sangamner, District Ahilyanagar, Maharashtra 422605'}
              </p>
            </div>
            <div className="contact-card">
              <div className="icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h4>{isMr ? 'संपर्क मोबाईल' : 'Contact Phone'}</h4>
              <p>
                <a href="tel:9689486570" style={{ color: '#0d3b66', fontWeight: '700', fontSize: '1.1rem' }}>
                  +91 96894 86570
                </a>
              </p>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {isMr ? '(सकाळी ९:०० ते संध्या. ६:००)' : '(Mon–Sat: 9:00 AM – 6:00 PM)'}
              </span>
            </div>
            <div className="contact-card">
              <div className="icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h4>{isMr ? 'अधिकृत ई-मेल' : 'Official Email'}</h4>
              <p>
                <a href="mailto:samarthnursing41@gmail.com" style={{ color: '#0d3b66', fontWeight: '600' }}>
                  samarthnursing41@gmail.com
                </a>
              </p>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {isMr ? '२४ तासांत उत्तर मिळेल' : 'Direct Admissions Desk'}
              </span>
            </div>
          </div>

          <div
            className="contact-form-section"
            style={{
              marginTop: '50px',
              maxWidth: '760px',
              margin: '50px auto 0',
              backgroundColor: '#ffffff',
              padding: '40px',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span className="section-pill-tag" style={{ marginBottom: '10px', display: 'inline-block' }}>
                {isMr ? 'प्रवेश व सामान्य चौकशी' : 'ADMISSIONS DESK'}
              </span>
              <h2 style={{ color: '#0d3b66', fontSize: '2rem', margin: '0 0 10px' }}>
                {isMr ? 'प्रवेश व माहिती चौकशी अर्ज' : 'Admission & Course Enquiry Form'}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.98rem', margin: 0 }}>
                {isMr
                  ? 'आपली माहिती भरा, आमचे प्रतिनिधी आपणास प्रवेश प्रक्रिया व शुल्काबाबत संपूर्ण माहिती देतील.'
                  : 'Submit your details below. Our admissions counselor will promptly assist you.'}
              </p>
            </div>

            {statusMsg && (
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '10px',
                  marginBottom: '24px',
                  backgroundColor: statusMsg.type === 'success' ? '#dcfce7' : '#fee2e2',
                  color: statusMsg.type === 'success' ? '#166534' : '#991b1b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.96rem',
                  border: `1px solid ${statusMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                }}
              >
                <i
                  className={`fas ${statusMsg.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                  {isMr ? 'विद्यार्थी किंवा पालकांचे पूर्ण नाव *' : 'Student / Parent Full Name *'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isMr ? 'उदा. राहुल रमेश शिंदे' : 'e.g. John Doe'}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                  marginBottom: '20px',
                }}
              >
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                    {isMr ? 'संपर्क मोबाईल क्रमांक *' : 'Contact Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={isMr ? '१० अंकी मोबाईल नंबर' : '10-digit mobile number'}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                    {isMr ? 'ई-मेल पत्ता (पर्यायी)' : 'Email Address (Optional)'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                  {isMr ? 'प्रवेश घ्यावयाचा अभ्यासक्रम *' : 'Course Interested In *'}
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <option value="">{isMr ? '-- अभ्यासक्रम निवडा --' : '-- Select Course --'}</option>
                  <option value="GNM">
                    {isMr ? 'जी.एन.एम. – जनरल नर्सिंग अँड मिडवायफ्री (३ वर्षे)' : 'GNM – General Nursing & Midwifery (3 Years)'}
                  </option>
                  <option value="ANM">
                    {isMr ? 'ए.एन.एम. – ऑक्सिलरी नर्सिंग अँड मिडवायफ्री (२ वर्षे)' : 'ANM – Auxiliary Nursing & Midwifery (2 Years)'}
                  </option>
                  <option value="ADMLT">
                    {isMr ? 'ए.डी.एम.एल.टी. – मेडिकल लॅबोरेटरी टेक्निशियन (१.५ वर्षे)' : 'ADMLT – Medical Lab Technician (1.5 Years)'}
                  </option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '26px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                  {isMr ? 'आपला संदेश / प्रश्न (फी, वसतिगृह, शिष्यवृत्ती इत्यादी)' : 'Message / Specific Query (Fees, Hostel, Scholarship)'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder={
                    isMr
                      ? 'फीस, पात्रता, वसतिगृह किंवा शिष्यवृत्तीबाबत आपले काही प्रश्न असल्यास येथे लिहा...'
                      : 'Any questions regarding fee structure, eligibility, hostel accommodation, or scholarships...'
                  }
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: '1.05rem',
                  borderRadius: '30px',
                }}
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                    {isMr ? 'माहिती पाठवत आहे...' : 'Submitting Enquiry...'}
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
                    {isMr ? 'चौकशी अर्ज पाठवा' : 'Send Admission Enquiry'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Google Maps Section */}
          <div className="map-section" style={{ marginTop: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span className="section-pill-tag" style={{ marginBottom: '10px', display: 'inline-block' }}>
                {isMr ? 'कॅम्पस लोकेशन' : 'CAMPUS NAVIGATION'}
              </span>
              <h2 style={{ color: '#0d3b66', fontSize: '1.9rem', margin: 0 }}>
                {isMr ? 'आमचे स्थान (संगमनेर कॅम्पस नकाशा)' : 'Our Location (Sangamner Campus Map)'}
              </h2>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60247.98!2d74.2!3d19.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcee328d0c3127%3A0x8e15ed7c80e5a082!2sSangamner%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="420"
              style={{ border: 0, borderRadius: 16, boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}
              allowFullScreen
              loading="lazy"
              title="Samarth Nursing Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
