'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function SyllabusPage() {
  const { language } = useLanguage();
  const isMarathi = language === 'mr';

  const [activeCourse, setActiveCourse] = useState('gnm');
  const [activeYear, setActiveYear] = useState(1);

  const syllabusData = {
    gnm: {
      name: isMarathi ? 'जी.एन.एम. (जनरल नर्सिंग व मिडव्हायफरी - ३ वर्षे)' : 'GNM (General Nursing & Midwifery - 3 Years)',
      council: isMarathi ? 'महाराष्ट्र राज्य नर्सिंग व पॅरामेडिकल शिक्षण मंडळ (MSBNPE) व INC मान्यताप्राप्त' : 'Recognized by INC & MSBNPE (Govt. of Maharashtra)',
      totalHours: isMarathi ? '५,८६० तास (थियरी + क्लिनिकल प्रशिक्षण)' : '5,860 Total Hours (Theory + Clinical Training)',
      years: [
        {
          year: 1,
          title: isMarathi ? 'प्रथम वर्ष (First Year)' : 'First Year',
          subjects: [
            {
              code: '1',
              name: isMarathi ? 'बायो सायन्सेस' : 'Bio Sciences',
              theory: 120,
              practical: 0,
              totalMarks: 100,
            },
            {
              code: '2',
              name: isMarathi ? 'बिहेवियरल सायन्सेस' : 'Behavioral Sciences',
              theory: 90,
              practical: 0,
              totalMarks: 100,
            },
            {
              code: '3',
              name: isMarathi ? 'फंडामेंटल्स ऑफ नर्सिंग' : 'Fundamentals of Nursing',
              theory: 210,
              practical: 200,
              totalMarks: 150,
            },
            {
              code: '4',
              name: isMarathi ? 'कम्युनिटी हेल्थ नर्सिंग - भाग १' : 'Community Health Nursing-I',
              theory: 180,
              practical: 100,
              totalMarks: 100,
            },
          ],
          clinicalPostings: isMarathi
            ? ['जनरल मेडिकल व सर्जिकल वॉर्ड', 'फाउंडेशन लॅब प्रॅक्टिकल', 'कम्युनिटी हेल्थ प्राथमिक आरोग्य केंद्र (PHC)']
            : ['General Medical & Surgical Wards', 'Nursing Foundation Skill Lab', 'Rural & Urban Community PHC Postings'],
        },
        {
          year: 2,
          title: isMarathi ? 'द्वितीय वर्ष (Second Year)' : 'Second Year',
          subjects: [
            {
              code: '1',
              name: isMarathi ? 'मेडिकल सर्जिकल नर्सिंग - भाग १' : 'Medical Surgical Nursing-I',
              theory: 140,
              practical: 800,
              totalMarks: 100,
            },
            {
              code: '2',
              name: isMarathi ? 'मेडिकल सर्जिकल नर्सिंग - भाग २' : 'Medical Surgical Nursing-II',
              theory: 140,
              practical: 800,
              totalMarks: 100,
            },
            {
              code: '3',
              name: isMarathi ? 'मेंटल हेल्थ नर्सिंग' : 'Mental Health Nursing',
              theory: 90,
              practical: 320,
              totalMarks: 100,
            },
            {
              code: '4',
              name: isMarathi ? 'चाइल्ड हेल्थ नर्सिंग' : 'Child Health Nursing',
              theory: 90,
              practical: 320,
              totalMarks: 100,
            },
          ],
          clinicalPostings: isMarathi
            ? ['ICU / NICU / Casualty', 'ऑपरेशन थिएटर (OT)', 'मानसिक आरोग्य रुग्णालय', 'बालरोग विभाग (Pediatrics)']
            : ['ICU / NICU / Casualty', 'Operation Theatre (OT)', 'Psychiatric Hospital', 'Pediatric Wards & Special Care'],
        },
        {
          year: 3,
          title: isMarathi ? 'तृतीय वर्ष (Third Year)' : 'Third Year',
          subjects: [
            {
              code: '1',
              name: isMarathi ? 'मिडव्हायफरी व गायनॅकॉलॉजिकल नर्सिंग' : 'Midwifery & Gynaecological Nursing',
              theory: 140,
              practical: 560,
              totalMarks: 100,
            },
            {
              code: '2',
              name: isMarathi ? 'कम्युनिटी हेल्थ नर्सिंग - भाग २' : 'Community Health Nursing-II',
              theory: 90,
              practical: 160,
              totalMarks: 100,
            },
            {
              code: '3',
              name: isMarathi
                ? 'नर्सिंग एज्युकेशन, संशोधन परिचय व सांख्यिकी, व्यावसायिक ट्रेंड्स व ऍडजस्टमेंट, नर्सिंग प्रशासन व वॉर्ड व्यवस्थापन'
                : 'Nursing Education, Introduction to Research & Statistics, Professional Trends & Adjustment, Nursing Administration & Ward Management',
              theory: 90,
              practical: 0,
              totalMarks: 100,
            },
          ],
          clinicalPostings: isMarathi
            ? ['प्रसूती गृह (Labor Room & Antenatal/Postnatal)', 'ग्रामीण व शहरी सार्वजनिक आरोग्य केंद्र', 'सुपर स्पेशालिटी हॉस्पिटल रोटेशन']
            : ['Maternity Wards & Labor Room', 'Rural Community Health Centre (CHC/PHC)', 'Super-specialty Hospital Rotations'],
        },
      ],
    },
    anm: {
      name: isMarathi ? 'ए.एन.एम. (ऑक्सिलरी नर्सिंग व मिडव्हायफरी - २ वर्षे)' : 'ANM (Auxiliary Nurse Midwife - 2 Years)',
      council: isMarathi ? 'महाराष्ट्र राज्य नर्सिंग मंडळ (MSBNPE) व INC मान्यताप्राप्त' : 'Recognized by INC & MSBNPE (Govt. of Maharashtra)',
      totalHours: isMarathi ? '३,५२० तास (थियरी + क्लिनिकल फील्डवर्क)' : '3,520 Total Hours (Theory + Clinical Fieldwork)',
      years: [
        {
          year: 1,
          title: isMarathi ? 'प्रथम वर्ष (First Year)' : 'First Year',
          subjects: [
            {
              code: 'ANM-101',
              name: isMarathi ? 'कम्युनिटी हेल्थ नर्सिंग (Community Health Nursing)' : 'Community Health Nursing & Environmental Sanitation',
              theory: 120,
              practical: 400,
              totalMarks: 100,
            },
            {
              code: 'ANM-102',
              name: isMarathi ? 'आरोग्य संवर्धन (Health Promotion - Nutrition, Mental Health)' : 'Health Promotion (Nutrition, Hygiene, Mental Health)',
              theory: 120,
              practical: 200,
              totalMarks: 100,
            },
            {
              code: 'ANM-103',
              name: isMarathi ? 'प्राथमिक आरोग्य परिचर्या (Primary Health Care Nursing)' : 'Primary Health Care Nursing (Infection, First Aid)',
              theory: 150,
              practical: 600,
              totalMarks: 100,
            },
            {
              code: 'ANM-104',
              name: isMarathi ? 'बाल आरोग्य नर्सिंग (Child Health Nursing)' : 'Child Health Nursing (Immunization, Growth & Dev)',
              theory: 120,
              practical: 400,
              totalMarks: 100,
            },
          ],
          clinicalPostings: isMarathi
            ? ['प्राथमिक आरोग्य केंद्र (PHC)', 'उपकेंद्र (Sub-centre)', 'ग्रामीण रुग्णालय', 'लसीकरण व पोषण कक्ष']
            : ['Primary Health Centre (PHC)', 'Sub-Centres', 'Rural Hospitals', 'Immunization & Well-baby Clinics'],
        },
        {
          year: 2,
          title: isMarathi ? 'द्वितीय वर्ष (Second Year & Internship)' : 'Second Year & Internship',
          subjects: [
            {
              code: 'ANM-201',
              name: isMarathi ? 'मिडव्हायफरी (Midwifery & Antenatal/Postnatal Care)' : 'Midwifery (Normal Labor, Antenatal & Postnatal Care)',
              theory: 200,
              practical: 600,
              totalMarks: 100,
            },
            {
              code: 'ANM-202',
              name: isMarathi ? 'आरोग्य केंद्र व्यवस्थापन (Health Centre Management)' : 'Health Centre Management & Records',
              theory: 80,
              practical: 160,
              totalMarks: 100,
            },
            {
              code: 'ANM-INT',
              name: isMarathi ? '६ महिने ग्रामीण आरोग्य केंद्र इंटर्नशिप (Internship)' : '6 Months Rural Health Post Internship',
              theory: 0,
              practical: 960,
              totalMarks: 100,
            },
          ],
          clinicalPostings: isMarathi
            ? ['प्रसूती कक्ष (Labor Room)', 'महिला व नवजात बालरोग विभाग', 'उपकेंद्र गृहभेटी (Home Visits)']
            : ['Labor Room & Delivery Suite', 'Antenatal Postnatal Wards', 'Sub-Centre Domiciliary Care'],
        },
      ],
    },
    admlt: {
      name: isMarathi ? 'ए.डी.एम.एल.टी. (Advanced Diploma in Medical Lab Technology - १.५ वर्षे)' : 'ADMLT (Adv. Diploma in Medical Lab Tech - 1.5 Yrs)',
      council: isMarathi ? 'महाराष्ट्र राज्य तंत्र शिक्षण मंडळ (MSBTE) संलग्न' : 'Affiliated to MSBTE, Mumbai (Govt. of Maharashtra)',
      totalHours: isMarathi ? '२,४०० तास (थियरी + आधुनिक पॅथॉलॉजी लॅब प्रशिक्षण)' : '2,400 Total Hours (Theory + Diagnostic Lab Practical)',
      years: [
        {
          year: 1,
          title: isMarathi ? 'थियरी व लॅब प्रशिक्षण (Theory & Laboratory Practice)' : 'Comprehensive Curriculum & Laboratory Practice',
          subjects: [
            {
              code: 'MLT-101',
              name: isMarathi ? 'क्लिनिकल बायोकेमिस्ट्री (Clinical Biochemistry)' : 'Clinical Biochemistry & Instrumentation',
              theory: 100,
              practical: 200,
              totalMarks: 100,
            },
            {
              code: 'MLT-102',
              name: isMarathi ? 'क्लिनिकल पॅथॉलॉजी व हेमॅटॉलॉजी (Clinical Pathology & Hematology)' : 'Clinical Pathology & Hematology (Blood Cell Analysis)',
              theory: 100,
              practical: 200,
              totalMarks: 100,
            },
            {
              code: 'MLT-103',
              name: isMarathi ? 'मायक्रोबायोलॉजी, पॅरासिटॉलॉजी व व्हायरॉलॉजी' : 'Medical Microbiology, Parasitology & Virology',
              theory: 100,
              practical: 200,
              totalMarks: 100,
            },
            {
              code: 'MLT-104',
              name: isMarathi ? 'हिस्टोपॅथॉलॉजी, सायटोलॉजी व ब्लड बँकिंग' : 'Histopathology, Cytology & Blood Banking Techniques',
              theory: 80,
              practical: 160,
              totalMarks: 100,
            },
            {
              code: 'MLT-INT',
              name: isMarathi ? '६ महिने संलग्न हॉस्पिटल पॅथॉलॉजी लॅब इंटर्नशिप' : '6 Months Full-time Hospital Pathology Lab Internship',
              theory: 0,
              practical: 600,
              totalMarks: 100,
            },
          ],
          clinicalPostings: isMarathi
            ? ['संस्थेची स्वमालकीची अत्याधुनिक बायोकेमिस्ट्री लॅब', 'हेमॅटॉलॉजी व मायक्रोस्कोपी विभाग', 'ब्लड बँक व हॉस्पिटल पॅथॉलॉजी सेंटर']
            : ['Institutional Fully Automated Biochemistry Lab', 'Hematology & Cell Counter Room', 'Blood Bank & Hospital Diagnostics'],
        },
      ],
    },
  };

  const currentCourse = syllabusData[activeCourse];
  const currentYearData = currentCourse.years.find((y) => y.year === activeYear) || currentCourse.years[0];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      {/* 1. HERO HEADER */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #0d3b66 60%, #1e3a8a 100%)',
          color: '#ffffff',
          padding: '60px 20px 56px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(10, 37, 64, 0.15)',
        }}
      >
        {/* Subtle decorative glow circles */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,183,3,0.12) 0%, rgba(255,183,3,0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 209, 102, 0.15)',
              border: '1px solid rgba(255, 209, 102, 0.5)',
              color: '#ffd166',
              padding: '6px 18px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            }}
          >
            <i className="fas fa-book-open"></i>{' '}
            <span>{isMarathi ? 'अधिकृत शैक्षणिक अभ्यासक्रम' : 'Official Academic Curriculum'}</span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 2.85rem)',
              fontWeight: 800,
              margin: '0 0 14px',
              color: '#ffffff',
              lineHeight: 1.25,
            }}
          >
            {isMarathi ? (
              'कोर्सनिहाय अभ्यासक्रम व गुणदान पद्धती'
            ) : (
              <>
                Course Syllabus <span style={{ color: '#ffd166', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, padding: '0 4px', fontStyle: 'normal' }}>&</span> Curriculum Structure
              </>
            )}
          </h1>

          <p style={{ fontSize: '1.02rem', color: '#cbd5e1', maxWidth: '720px', margin: '0 auto 24px', lineHeight: 1.65 }}>
            {isMarathi
              ? 'भारतीय नर्सिंग परिषद (INC), MSBNPE व MSBTE नियमावलीनुसार सर्व विषयांचे सविस्तर थियरी, प्रॅक्टिकल आणि क्लिनिकल तास.'
              : 'Detailed breakdown of academic theory, clinical hours, laboratory subjects, and examination marks prescribed by INC, MSBNPE, and MSBTE.'}
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/admission/fees-structure"
              style={{
                background: 'linear-gradient(135deg, #ffd166 0%, #ffb703 100%)',
                color: '#0d3b66',
                padding: '11px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.92rem',
                boxShadow: '0 4px 15px rgba(255, 183, 3, 0.3)',
              }}
            >
              <i className="fas fa-file-invoice-dollar"></i> {isMarathi ? 'फी रचना पहा' : 'View Fees Structure'}
            </Link>
            <Link
              href="/facilities/question-papers"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                padding: '11px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.92rem',
              }}
            >
              <i className="fas fa-download"></i> {isMarathi ? 'मागील वर्षांचे प्रश्नसंच' : 'Download Old Question Papers'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. COURSE SELECTOR TABS */}
      <section style={{ maxWidth: '1200px', margin: '-32px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '14px',
            background: '#ffffff',
            padding: '12px',
            borderRadius: '18px',
            boxShadow: '0 12px 30px rgba(13, 59, 102, 0.08)',
            border: '1.5px solid #e2e8f0',
          }}
        >
          {/* GNM TAB */}
          <button
            type="button"
            onClick={() => {
              setActiveCourse('gnm');
              setActiveYear(1);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 22px',
              borderRadius: '12px',
              border: activeCourse === 'gnm' ? '1.5px solid #0284c7' : '1.5px solid transparent',
              background: activeCourse === 'gnm' ? 'linear-gradient(135deg, #0d3b66, #0369a1)' : '#f8fafc',
              color: activeCourse === 'gnm' ? '#ffffff' : '#334155',
              fontWeight: 700,
              fontSize: '1.02rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.25s ease',
              boxShadow: activeCourse === 'gnm' ? '0 6px 18px rgba(3, 105, 161, 0.25)' : 'none',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: activeCourse === 'gnm' ? 'rgba(255,255,255,0.15)' : '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                color: activeCourse === 'gnm' ? '#ffd166' : '#0284c7',
                flexShrink: 0,
              }}
            >
              <i className="fas fa-user-nurse"></i>
            </div>
            <div>
              <div style={{ fontWeight: 800 }}>GNM Nursing</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500, opacity: activeCourse === 'gnm' ? 0.9 : 0.7 }}>
                {isMarathi ? '३ वर्षे • डिप्लोमा' : '3 Years • Diploma (MSBNPE)'}
              </div>
            </div>
          </button>

          {/* ANM TAB */}
          <button
            type="button"
            onClick={() => {
              setActiveCourse('anm');
              setActiveYear(1);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 22px',
              borderRadius: '12px',
              border: activeCourse === 'anm' ? '1.5px solid #16a34a' : '1.5px solid transparent',
              background: activeCourse === 'anm' ? 'linear-gradient(135deg, #064e3b, #15803d)' : '#f8fafc',
              color: activeCourse === 'anm' ? '#ffffff' : '#334155',
              fontWeight: 700,
              fontSize: '1.02rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.25s ease',
              boxShadow: activeCourse === 'anm' ? '0 6px 18px rgba(22, 163, 74, 0.25)' : 'none',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: activeCourse === 'anm' ? 'rgba(255,255,255,0.15)' : '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                color: activeCourse === 'anm' ? '#ffd166' : '#16a34a',
                flexShrink: 0,
              }}
            >
              <i className="fas fa-hand-holding-medical"></i>
            </div>
            <div>
              <div style={{ fontWeight: 800 }}>ANM Nursing</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500, opacity: activeCourse === 'anm' ? 0.9 : 0.7 }}>
                {isMarathi ? '२ वर्षे • नर्सिंग' : '2 Years • Diploma (MSBNPE)'}
              </div>
            </div>
          </button>

          {/* ADMLT TAB */}
          <button
            type="button"
            onClick={() => {
              setActiveCourse('admlt');
              setActiveYear(1);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 22px',
              borderRadius: '12px',
              border: activeCourse === 'admlt' ? '1.5px solid #b45309' : '1.5px solid transparent',
              background: activeCourse === 'admlt' ? 'linear-gradient(135deg, #78350f, #d97706)' : '#f8fafc',
              color: activeCourse === 'admlt' ? '#ffffff' : '#334155',
              fontWeight: 700,
              fontSize: '1.02rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.25s ease',
              boxShadow: activeCourse === 'admlt' ? '0 6px 18px rgba(217, 119, 6, 0.25)' : 'none',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: activeCourse === 'admlt' ? 'rgba(255,255,255,0.15)' : '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                color: activeCourse === 'admlt' ? '#ffffff' : '#d97706',
                flexShrink: 0,
              }}
            >
              <i className="fas fa-microscope"></i>
            </div>
            <div>
              <div style={{ fontWeight: 800 }}>ADMLT / Lab Tech</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500, opacity: activeCourse === 'admlt' ? 0.9 : 0.7 }}>
                {isMarathi ? '१.५ वर्षे • MSBTE' : '1.5 Years • MSBTE Mumbai'}
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* 3. SYLLABUS CONTENT CONTAINER */}
      <section style={{ maxWidth: '1200px', margin: '40px auto 70px', padding: '0 20px' }}>
        {/* Course Header Banner */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            padding: '28px 32px',
            border: '1px solid #e2e8f0',
            marginBottom: '26px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '18px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#0284c7',
                background: '#e0f2fe',
                padding: '5px 12px',
                borderRadius: '6px',
                display: 'inline-block',
                marginBottom: '8px',
              }}
            >
              {currentCourse.council}
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#0d3b66' }}>
              {currentCourse.name}
            </h2>
            <div style={{ fontSize: '0.92rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="far fa-clock" style={{ color: '#0284c7' }}></i>
              <span>{currentCourse.totalHours}</span>
            </div>
          </div>

          <a
            href="/admissions/fee-structure.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#0d3b66',
              color: '#ffffff',
              padding: '11px 22px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 14px rgba(13, 59, 102, 0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fas fa-file-pdf" style={{ color: '#ffd166', fontSize: '1.1rem' }}></i>{' '}
            <span>{isMarathi ? 'संपूर्ण अभ्यासक्रम PDF' : 'Download Full Curriculum PDF'}</span>
          </a>
        </div>

        {/* Year Tabs (For multi-year courses) */}
        {currentCourse.years.length > 1 && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
            {currentCourse.years.map((y) => (
              <button
                key={y.year}
                type="button"
                onClick={() => setActiveYear(y.year)}
                style={{
                  padding: '11px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  background: activeYear === y.year ? '#0d3b66' : '#ffffff',
                  color: activeYear === y.year ? '#ffffff' : '#475569',
                  boxShadow: activeYear === y.year ? '0 6px 16px rgba(13, 59, 102, 0.22)' : 'none',
                  border: activeYear === y.year ? '1.5px solid #0d3b66' : '1.5px solid #cbd5e1',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <i className="fas fa-calendar-alt" style={{ color: activeYear === y.year ? '#ffd166' : '#94a3b8' }}></i>
                <span>{y.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Subjects Table Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1.5px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              padding: '20px 28px',
              borderBottom: '1.5px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0d3b66' }}>
              <i className="fas fa-list-check" style={{ marginRight: '10px', color: '#0284c7' }}></i>
              {currentYearData.title} – {isMarathi ? 'विषय, तास व गुणदान तपशील' : 'Subjects, Hours & Marks Breakdown'}
            </h3>
            <span
              style={{
                fontSize: '0.85rem',
                color: '#0284c7',
                background: '#e0f2fe',
                fontWeight: 700,
                padding: '5px 14px',
                borderRadius: '20px',
              }}
            >
              {isMarathi ? `एकूण ${currentYearData.subjects.length} विषय` : `Total ${currentYearData.subjects.length} Subjects`}
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                  <th style={{ padding: '14px 22px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isMarathi ? 'विषय कोड' : 'Subject Code'}
                  </th>
                  <th style={{ padding: '14px 22px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isMarathi ? 'विषयाचे नाव (Subject Name)' : 'Subject Name'}
                  </th>
                  <th style={{ padding: '14px 22px', fontWeight: 700, textAlign: 'center', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isMarathi ? 'थियरी तास' : 'Theory Hrs'}
                  </th>
                  <th style={{ padding: '14px 22px', fontWeight: 700, textAlign: 'center', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isMarathi ? 'प्रॅक्टिकल / क्लिनिकल' : 'Clinical / Lab Hrs'}
                  </th>
                  <th style={{ padding: '14px 22px', fontWeight: 700, textAlign: 'center', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isMarathi ? 'बोर्ड गुण' : 'Total Marks'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentYearData.subjects.map((sub, idx) => (
                  <tr
                    key={sub.code}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '16px 22px', fontWeight: 800, color: '#0284c7', whiteSpace: 'nowrap' }}>
                      <span style={{ background: '#e0f2fe', padding: '4px 10px', borderRadius: '6px' }}>
                        {sub.code}
                      </span>
                    </td>
                    <td style={{ padding: '16px 22px', fontWeight: 700, color: '#1e293b' }}>
                      {sub.name}
                    </td>
                    <td style={{ padding: '16px 22px', textAlign: 'center' }}>
                      {sub.theory > 0 ? (
                        <span style={{ background: '#f1f5f9', color: '#334155', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                          {sub.theory} hrs
                        </span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 22px', textAlign: 'center' }}>
                      {sub.practical > 0 ? (
                        <span style={{ background: '#ecfdf5', color: '#047857', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
                          {sub.practical} hrs
                        </span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 22px', textAlign: 'center' }}>
                      <span style={{ background: '#fef3c7', color: '#92400e', padding: '5px 12px', borderRadius: '20px', fontWeight: 800, fontSize: '0.9rem' }}>
                        {sub.totalMarks} {isMarathi ? 'गुण' : 'Marks'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Postings Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '1.5px solid #86efac',
            borderRadius: '18px',
            padding: '28px 32px',
            marginBottom: '32px',
            boxShadow: '0 6px 20px rgba(22, 163, 74, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#16a34a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(22, 163, 74, 0.25)',
              }}
            >
              <i className="fas fa-hospital-user"></i>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#14532d' }}>
                {isMarathi ? 'क्लिनिकल पोस्टिंग्ज व हॉस्पिटल रोटेशन' : 'Clinical Postings & Hospital Rotations'}
              </h4>
              <span style={{ fontSize: '0.88rem', color: '#166534', fontWeight: 500 }}>
                {isMarathi ? 'प्रत्यक्ष शासकीय व मल्टीस्पेशालिटी हॉस्पिटल प्रत्यक्ष अनुभव' : 'Mandatory bedside clinical rotations in partner multispecialty hospitals'}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {currentYearData.clinicalPostings.map((post, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1.5px solid #bbf7d0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#166534',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <i className="fas fa-check-circle" style={{ color: '#16a34a', fontSize: '1.1rem' }}></i>
                <span>{post}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links & CTA Bar */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1.5px solid #e2e8f0',
            padding: '28px 32px',
            textAlign: 'center',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h4 style={{ margin: '0 0 8px', fontSize: '1.3rem', fontWeight: 800, color: '#0d3b66' }}>
            {isMarathi ? 'प्रवेशासाठी अधिक माहिती हवी आहे?' : 'Need Detailed Syllabus Guidance or Admission Info?'}
          </h4>
          <p style={{ margin: '0 0 20px', color: '#64748b', fontSize: '0.95rem' }}>
            {isMarathi
              ? 'आमच्या शैक्षणिक सल्लागारांशी संपर्क साधा किंवा थेट कॉलेज कार्यालयाला भेट द्या.'
              : 'Feel free to contact our academic counselors or visit the college admission desk.'}
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/admission/criteria"
              style={{
                background: '#0d3b66',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(13, 59, 102, 0.2)',
              }}
            >
              <i className="fas fa-graduation-cap" style={{ color: '#ffd166' }}></i>
              <span>{isMarathi ? 'पात्रता व निकष पहा' : 'View Admission Criteria'}</span>
            </Link>
            <Link
              href="/contact"
              style={{
                background: '#f8fafc',
                color: '#334155',
                border: '1.5px solid #cbd5e1',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fas fa-envelope"></i>
              <span>{isMarathi ? 'संपर्क साधा' : 'Contact Helpdesk'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
