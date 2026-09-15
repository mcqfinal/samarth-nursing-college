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
          background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)',
          color: '#ffffff',
          padding: '60px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 209, 102, 0.2)',
              border: '1px solid #ffd166',
              color: '#ffd166',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            <i className="fas fa-book-open"></i> {isMarathi ? 'अधिकृत अभ्यासक्रम' : 'Official Academic Curriculum'}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 12px', color: '#ffffff' }}>
            {isMarathi ? 'कोर्सनिहाय अभ्यासक्रम व गुणदान पद्धती' : 'Course Syllabus & Curriculum Structure'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '750px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            {isMarathi
              ? 'भारतीय नर्सिंग परिषद (INC), MSBNPE व MSBTE नियमावलीनुसार सर्व विषयांचे सविस्तर थियरी, प्रॅक्टिकल आणि क्लिनिकल तास.'
              : 'Detailed breakdown of academic theory, clinical hours, laboratory subjects, and examination marks prescribed by INC, MSBNPE, and MSBTE.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/admission/fees-structure"
              style={{
                background: '#ffd166',
                color: '#0d3b66',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
              }}
            >
              <i className="fas fa-file-invoice-dollar"></i> {isMarathi ? 'फी रचना पहा' : 'View Fees Structure'}
            </Link>
            <Link
              href="/facilities/question-papers"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
              }}
            >
              <i className="fas fa-download"></i> {isMarathi ? 'मागील वर्षांचे प्रश्नसंच' : 'Download Old Question Papers'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. COURSE SELECTOR TABS */}
      <section style={{ maxWidth: '1100px', margin: '-28px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px',
            background: '#ffffff',
            padding: '12px',
            borderRadius: '16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e2e8f0',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveCourse('gnm');
              setActiveYear(1);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeCourse === 'gnm' ? 'linear-gradient(135deg, #0d3b66, #1e3a8a)' : '#f8fafc',
              color: activeCourse === 'gnm' ? '#ffffff' : '#334155',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
          >
            <i
              className="fas fa-user-nurse"
              style={{
                fontSize: '1.6rem',
                color: activeCourse === 'gnm' ? '#ffd166' : '#0284c7',
              }}
            ></i>
            <div>
              <div>GNM Nursing</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 500, opacity: 0.85 }}>{isMarathi ? '३ वर्षे • डिप्लोमा' : '3 Years • Diploma'}</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCourse('anm');
              setActiveYear(1);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeCourse === 'anm' ? 'linear-gradient(135deg, #0d3b66, #1e3a8a)' : '#f8fafc',
              color: activeCourse === 'anm' ? '#ffffff' : '#334155',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
          >
            <i
              className="fas fa-hand-holding-medical"
              style={{
                fontSize: '1.6rem',
                color: activeCourse === 'anm' ? '#ffd166' : '#16a34a',
              }}
            ></i>
            <div>
              <div>ANM Nursing</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 500, opacity: 0.85 }}>{isMarathi ? '२ वर्षे • नर्सिंग' : '2 Years • Nursing'}</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCourse('admlt');
              setActiveYear(1);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeCourse === 'admlt' ? 'linear-gradient(135deg, #0d3b66, #1e3a8a)' : '#f8fafc',
              color: activeCourse === 'admlt' ? '#ffffff' : '#334155',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
          >
            <i
              className="fas fa-microscope"
              style={{
                fontSize: '1.6rem',
                color: activeCourse === 'admlt' ? '#ffd166' : '#7c3aed',
              }}
            ></i>
            <div>
              <div>ADMLT / Lab Tech</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 500, opacity: 0.85 }}>{isMarathi ? '१.५ वर्षे • MSBTE' : '1.5 Years • MSBTE'}</div>
            </div>
          </button>
        </div>
      </section>

      {/* 3. SYLLABUS CONTENT CONTAINER */}
      <section style={{ maxWidth: '1100px', margin: '40px auto 60px', padding: '0 20px' }}>
        {/* Course Header Banner */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#0284c7',
                background: '#e0f2fe',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              {currentCourse.council}
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '10px 0 4px', color: '#0d3b66' }}>
              {currentCourse.name}
            </h2>
            <div style={{ fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="far fa-clock" style={{ color: '#0d3b66' }}></i>
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
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.88rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <i className="fas fa-file-pdf" style={{ color: '#ffd166' }}></i> {isMarathi ? 'संपूर्ण अभ्यासक्रम PDF' : 'Download Full PDF'}
          </a>
        </div>

        {/* Year Tabs (For multi-year courses) */}
        {currentCourse.years.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {currentCourse.years.map((y) => (
              <button
                key={y.year}
                type="button"
                onClick={() => setActiveYear(y.year)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  background: activeYear === y.year ? '#0d3b66' : '#ffffff',
                  color: activeYear === y.year ? '#ffffff' : '#64748b',
                  boxShadow: activeYear === y.year ? '0 4px 12px rgba(13, 59, 102, 0.2)' : 'none',
                  border: activeYear === y.year ? '1px solid #0d3b66' : '1px solid #e2e8f0',
                  transition: 'all 0.2s ease',
                }}
              >
                {y.title}
              </button>
            ))}
          </div>
        )}

        {/* Subjects Table Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              padding: '18px 24px',
              borderBottom: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0d3b66' }}>
              <i className="fas fa-list-check" style={{ marginRight: '8px', color: '#0284c7' }}></i>
              {currentYearData.title} – {isMarathi ? 'विषय व तास तपशील' : 'Subjects & Hours Breakdown'}
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
              {isMarathi ? `एकूण ${currentYearData.subjects.length} विषय` : `Total ${currentYearData.subjects.length} Subjects`}
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#334155', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 18px', fontWeight: 700 }}>{isMarathi ? 'विषय कोड' : 'Subject Code'}</th>
                  <th style={{ padding: '12px 18px', fontWeight: 700 }}>{isMarathi ? 'विषयाचे नाव (Subject Name)' : 'Subject Name'}</th>
                  <th style={{ padding: '12px 18px', fontWeight: 700, textAlign: 'center' }}>{isMarathi ? 'थियरी तास' : 'Theory Hrs'}</th>
                  <th style={{ padding: '12px 18px', fontWeight: 700, textAlign: 'center' }}>{isMarathi ? 'प्रॅक्टिकल / क्लिनिकल' : 'Clinical Hrs'}</th>
                  <th style={{ padding: '12px 18px', fontWeight: 700, textAlign: 'center' }}>{isMarathi ? 'बोर्ड गुण' : 'Total Marks'}</th>
                </tr>
              </thead>
              <tbody>
                {currentYearData.subjects.map((sub, idx) => (
                  <tr
                    key={sub.code}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                    }}
                  >
                    <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0284c7', whiteSpace: 'nowrap' }}>
                      {sub.code}
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600, color: '#1e293b' }}>
                      {sub.name}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'center', color: '#475569', fontWeight: 500 }}>
                      {sub.theory > 0 ? `${sub.theory} hrs` : '-'}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'center', color: '#475569', fontWeight: 500 }}>
                      {sub.practical > 0 ? `${sub.practical} hrs` : '-'}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'center', fontWeight: 700, color: '#0d3b66' }}>
                      {sub.totalMarks} {isMarathi ? 'गुण' : 'Marks'}
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
            border: '1px solid #86efac',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#16a34a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
              }}
            >
              <i className="fas fa-hospital-user"></i>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#14532d' }}>
                {isMarathi ? 'क्लिनिकल पोस्टिंग्ज व हॉस्पिटल रोटेशन' : 'Clinical Postings & Hospital Rotations'}
              </h4>
              <span style={{ fontSize: '0.82rem', color: '#166534' }}>
                {isMarathi ? 'प्रत्यक्ष शासकीय व मल्टीस्पेशालिटी हॉस्पिटल प्रशिक्षण' : 'Mandatory bedside clinical rotations in partner hospitals'}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {currentYearData.clinicalPostings.map((post, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #bbf7d0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#166534',
                }}
              >
                <i className="fas fa-check-circle" style={{ color: '#16a34a' }}></i>
                <span>{post}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links & CTA Bar */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800, color: '#0d3b66' }}>
            {isMarathi ? 'प्रवेशासाठी अधिक माहिती हवी आहे?' : 'Need Detailed Syllabus Guidance or Admission Info?'}
          </h4>
          <p style={{ margin: '0 0 18px', color: '#64748b', fontSize: '0.92rem' }}>
            {isMarathi
              ? 'आमच्या शैक्षणिक सल्लागारांशी संपर्क साधा किंवा थेट कॉलेज कार्यालयाला भेट द्या.'
              : 'Feel free to contact our academic counselors or visit the college admission desk.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/admission/criteria"
              style={{
                background: '#0d3b66',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-graduation-cap" style={{ marginRight: '6px', color: '#ffd166' }}></i>
              {isMarathi ? 'पात्रता व निकष पहा' : 'View Admission Criteria'}
            </Link>
            <Link
              href="/contact"
              style={{
                background: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-envelope" style={{ marginRight: '6px' }}></i>
              {isMarathi ? 'संपर्क साधा' : 'Contact Helpdesk'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
