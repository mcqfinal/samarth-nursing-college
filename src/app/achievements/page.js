'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function AchievementsPage() {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const studentAchievements = [
    {
      titleEn: 'Academic Excellence and Meritorious Performance',
      titleMr: 'शैक्षणिक गुणवत्तेसाठी प्रोत्साहन व गौरव',
      descEn: 'Consistent high pass percentage in board examinations, university rank holders, and merit scholarships awarded to top performing nursing and paramedical students.',
      descMr: 'बोर्ड व मंडळ परीक्षांमध्ये सातत्यपूर्ण १००% निकाल, गुणवत्ता यादीतील अव्वल क्रमांक आणि गुणवंत विद्यार्थ्यांना विशेष शिष्यवृत्ती व गौरव पुरस्कार.',
      icon: 'fa-medal', color: '#ffb703', bgLight: '#fef3c7',
    },
    {
      titleEn: 'Clinical Skill and Practical Bedside Performance',
      titleMr: 'उत्कृष्ट क्लिनिकल कामगिरी व रुग्णसेवा',
      descEn: 'Rigorous bedside nursing excellence praised by hospital administrations, ICUs, emergency departments, and patient care supervisors.',
      descMr: 'मल्टी-स्पेशालिटी रुग्णालये, अतिदक्षता विभाग (ICU) आणि शस्त्रक्रिया गृहांमध्ये विद्यार्थ्यांनी बजावलेली उल्लेखनीय व संवेदनशील रुग्णसेवा.',
      icon: 'fa-heartbeat', color: '#dc2626', bgLight: '#fee2e2',
    },
    {
      titleEn: 'Nursing Skill and Simulation Competitions',
      titleMr: 'नर्सिंग कौशल्य व प्रात्यक्षिक स्पर्धा',
      descEn: 'Active participation and winning prizes in state-level OSCE, clinical simulation challenges, bandaging, and vital assessment skills.',
      descMr: 'राज्यस्तरीय नर्सिंग कौशल्य प्रात्यक्षिक, सिम्युलेशन चॅलेंज आणि अत्यावश्यक रुग्ण तपासणी स्पर्धांमध्ये विद्यार्थ्यांचा दैदिप्यमान सहभाग व पारितोषिके.',
      icon: 'fa-user-nurse', color: '#0284c7', bgLight: '#e0f2fe',
    },
    {
      titleEn: 'Quiz, Poster Presentation and Elocution',
      titleMr: 'प्रश्नमंजुषा, पोस्टर, निबंध व वक्तृत्व स्पर्धा',
      descEn: 'Securing accolades in inter-college health quizzes, scientific poster presentations, public health debates, and medical essay contests.',
      descMr: 'आरोग्यविषयक प्रश्नमंजुषा, वैज्ञानिक पोस्टर सादरीकरण, वक्तृत्व आणि राज्यस्तरीय निबंध स्पर्धांमध्ये प्रथम व द्वितीय क्रमांकाचे यश.',
      icon: 'fa-trophy', color: '#16a34a', bgLight: '#dcfce7',
    },
    {
      titleEn: 'Seminars and Scientific Research Presentations',
      titleMr: 'सेमिनार व पेपर/पोस्टर सादरीकरण',
      descEn: 'Students and faculty presenting evidence-based nursing case studies, healthcare research papers, and posters at state seminars.',
      descMr: 'राज्यस्तरीय व राष्ट्रीय आरोग्य परिषदांमध्ये विद्यार्थ्यांनी केलेले शास्त्रीय संशोधन सादरीकरण आणि क्लिनिकल केस स्टडीजचे वाचन.',
      icon: 'fa-chalkboard-teacher', color: '#9333ea', bgLight: '#f3e8ff',
    },
    {
      titleEn: 'Sports and Cultural Fest Participations',
      titleMr: 'क्रीडा व सांस्कृतिक स्पर्धांमध्ये सहभाग',
      descEn: 'Vibrant participation in annual sports meets, athletics, indoor tournaments, traditional dance, drama, and youth cultural festivals.',
      descMr: 'वार्षिक क्रीडा महोत्सव, मैदानी खेळ, बॅडमिंटन, वक्तृत्व, नाटक आणि पारंपारिक सांस्कृतिक महोत्सवांमध्ये विद्यार्थ्यांचे कलागुण व क्रीडा प्राविण्य.',
      icon: 'fa-running', color: '#ea580c', bgLight: '#ffedd5',
    },
    {
      titleEn: 'Inter-Collegiate Competitions and Honors',
      titleMr: 'आंतरमहाविद्यालयीन स्पर्धांमध्ये यश',
      descEn: 'Representing Samarth College of Nursing at district and state inter-collegiate fests, bagging champion trophies and distinction certificates.',
      descMr: 'अहिल्यानगर जिल्हा व महाराष्ट्र पातळीवरील विविध आंतरमहाविद्यालयीन स्पर्धांमध्ये कॉलेजचे प्रतिनिधीत्व करून पटकावलेली मानाची पारितोषिके.',
      icon: 'fa-award', color: '#0d3b66', bgLight: '#e2e8f0',
    },
    {
      titleEn: 'Student Council Leadership and Governance',
      titleMr: 'नेतृत्व व विद्यार्थी प्रतिनिधी उपक्रम',
      descEn: 'Empowering future nursing managers through the Student Nurses Association (SNA), organising campus assemblies, and peer tutoring initiatives.',
      descMr: 'स्टुडंट नर्सेस असोसिएशन (SNA) आणि विद्यार्थी परिषदेच्या माध्यमातून विद्यार्थ्यांमध्ये नेतृत्वगुण, संघभावना आणि व्यवस्थापकीय कौशल्य संवर्धन.',
      icon: 'fa-users-cog', color: '#059669', bgLight: '#d1fae5',
    },
  ];

  const communityActivities = [
    {
      titleEn: 'Free Rural Health Camps in Sangamner',
      titleMr: 'मोफत ग्रामीण आरोग्य तपासणी शिबिरे',
      descEn: 'Regular village camps offering free blood sugar, BP monitoring, BMI calculation, doctor consultations, and health hygiene education.',
      descMr: 'संगमनेर व परिसरातील ग्रामीण भागात मोफत आरोग्य तपासणी, रक्तदाब व मधुमेह चाचणी आणि औषध वाटप शिबिरांचे यशस्वी आयोजन.',
      icon: 'fa-stethoscope',
    },
    {
      titleEn: 'Pulse Polio and Universal Immunization Support',
      titleMr: 'पल्स पोलिओ व लसीकरण मोहिमांमध्ये सहभाग',
      descEn: 'Assisting Primary Health Centers (PHCs) and municipal dispensaries during national pulse polio days and infant immunization drives.',
      descMr: 'शासकीय प्राथमिक आरोग्य केंद्र (PHC) आणि ग्रामीण रुग्णालयांसोबत राष्ट्रीय पल्स पोलिओ व लहान मुलांच्या लसीकरण मोहिमेत सक्रिय सहकार्य.',
      icon: 'fa-syringe',
    },
    {
      titleEn: 'Mega Blood Donation Camps and Donor Directory',
      titleMr: 'भव्य रक्तदान शिबिरे व आपत्कालीन रक्तदाता संघ',
      descEn: 'Annual voluntary blood donation drives in association with government blood banks, building a lifesaver registry for emergency patients.',
      descMr: 'शासकीय रक्तपेढ्यांच्या सहकार्याने भव्य रक्तदान शिबिरांचे आयोजन आणि आपत्कालीन गरजू रुग्णांसाठी विद्यार्थी रक्तदात्यांची २४ तास उपलब्धता.',
      icon: 'fa-tint',
    },
    {
      titleEn: 'National Health Awareness Rallies and Street Plays',
      titleMr: 'आरोग्य जनजागृती रॅली व पथनाट्ये',
      descEn: 'Street plays (Pathnatya) and awareness rallies on World AIDS Day, World Health Day, Anti-Tobacco Day, and Breastfeeding Awareness Week.',
      descMr: 'जागतिक आरोग्य दिन, एड्स निर्मूलन दिन, स्तनपान सप्ताह व तंबाखू मुक्ती दिनानिमित्त संगमनेर शहरात भव्य प्रभातफेरी व जनजागृती पथनाट्ये.',
      icon: 'fa-bullhorn',
    },
  ];

  return (
    <main>
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0d3b66 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '50px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,209,102,0.2)', border: '1px solid #ffd166',
            color: '#ffd166', padding: '5px 14px', borderRadius: '999px',
            fontSize: '0.82rem', fontWeight: 700, marginBottom: '14px',
          }}>
            <i className="fas fa-trophy"></i> {isMr ? 'उत्कृष्टता व समाजसेवा' : 'ACHIEVEMENTS'}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            {isMr ? '🏆 उपलब्धी व विविध उपक्रम' : '🏆 Achievements and Activities'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: 0 }}>
            {isMr
              ? 'उत्कृष्टतेचा गौरव • कौशल्याचा विकास • समाजसेवेची बांधिलकी'
              : 'Celebrating Excellence, Talent and Continuous Growth'}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ background: '#f8fafc', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

          {/* Intro */}
          <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 50px' }}>
            <div style={{ display: 'inline-block', background: '#fef3c7', color: '#d97706', padding: '4px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px' }}>
              {isMr ? 'उत्कृष्टतेचा गौरव • कौशल्याचा विकास • समाजसेवेची बांधिलकी' : 'EXCELLENCE • SKILLS • SOCIAL COMMITMENT'}
            </div>
            <h2 style={{ fontSize: '2.3rem', color: '#0d3b66', margin: '0 0 16px' }}>
              {isMr
                ? 'उत्कृष्टतेचा गौरव • कौशल्याचा विकास • समाजसेवेची बांधिलकी'
                : 'Celebrating Excellence, Talent and Continuous Growth'}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.8' }}>
              {isMr ? (
                <>
                  <strong>समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर</strong> येथे शिक्षण हे केवळ वर्गखोलीपुरते मर्यादित न ठेवता विद्यार्थ्यांच्या <em>शैक्षणिक, क्लिनिकल, व्यावसायिक, सांस्कृतिक, क्रीडा आणि सामाजिक विकासाला</em> प्रोत्साहन दिले जाते. विविध उपक्रमांच्या माध्यमातून विद्यार्थ्यांमध्ये आत्मविश्वास, नेतृत्वगुण, संघभावना, सामाजिक जाणीव आणि व्यावसायिक कौशल्य विकसित करण्यावर भर दिला जातो.
                </>
              ) : (
                <>
                  At <strong>Samarth College of Nursing, Sangamner</strong>, we believe that education extends beyond the classroom. Our students and faculty are encouraged to participate in <em>academic, clinical, professional, cultural, community and skill-development activities</em> that nurture confidence, leadership and excellence.
                </>
              )}
            </p>
          </div>

          {/* 1. STUDENT ACHIEVEMENTS */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ color: '#0d3b66', fontSize: '1.75rem', margin: 0 }}>
                  <i className="fas fa-graduation-cap" style={{ color: '#0284c7', marginRight: '10px' }}></i>
                  {isMr ? '🎓 विद्यार्थी उपलब्धी (Student Achievements)' : '🎓 Student Achievements'}
                </h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.96rem' }}>
                  {isMr
                    ? 'विद्यार्थ्यांना त्यांच्या शैक्षणिक, क्लिनिकल, सांस्कृतिक, क्रीडा आणि सामाजिक कौशल्यांना प्रोत्साहन देण्यासाठी विविध उपक्रमांमध्ये सहभागी होण्याची संधी.'
                    : 'Empowering students across academics, clinical skills, sports, and co-curricular domains.'}
                </p>
              </div>
              <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem' }}>
                {isMr ? '८ प्रमुख यशोगाथा' : '8 Highlight Areas'}
              </span>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px',
            }}>
              {studentAchievements.map((item, idx) => (
                <div key={idx} style={{
                  background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0',
                  padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{
                      width: '46px', height: '46px', borderRadius: '12px',
                      backgroundColor: item.bgLight, color: item.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.25rem', flexShrink: 0,
                    }}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>
                        {isMr ? 'यश' : 'ACHIEVEMENT'} #{idx + 1}
                      </span>
                      <h4 style={{ color: '#0d3b66', fontSize: '1.05rem', margin: 0, lineHeight: '1.3' }}>
                        {isMr ? item.titleMr : item.titleEn}
                      </h4>
                    </div>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.65', margin: 0, flexGrow: 1 }}>
                    {isMr ? item.descMr : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. COMMUNITY HEALTH and SOCIAL OUTREACH */}
          <div style={{
            background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px', overflow: 'hidden',
          }}>
            <div style={{
              padding: '28px 36px', backgroundColor: '#1a9988', color: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '14px',
            }}>
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.65rem', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fas fa-hand-holding-heart" style={{ color: '#ffb703' }}></i>
                  {isMr ? 'सामाजिक आरोग्य उपक्रम व जनजागृती' : 'Community Health and Social Initiatives'}
                </h3>
                <p style={{ margin: 0, color: '#e6f7f4', fontSize: '0.98rem' }}>
                  {isMr ? 'रुग्णसेवेची शिकवण केवळ पुस्तकांत नाही तर प्रत्यक्ष समाजसेवेत आहे!' : 'Serving rural communities and promoting preventive wellness in Sangamner'}
                </p>
              </div>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem' }}>
                {isMr ? 'समाजसेवा बांधिलकी' : 'OUTREACH IN ACTION'}
              </span>
            </div>

            <div style={{ padding: '36px' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px',
              }}>
                {communityActivities.map((act, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#f8fafc', borderRadius: '12px',
                    border: '1px solid #e2e8f0', padding: '20px', borderLeft: '4px solid #1a9988',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        backgroundColor: '#e6f7f4', color: '#1a9988',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', flexShrink: 0,
                      }}>
                        <i className={`fas ${act.icon}`}></i>
                      </div>
                      <h4 style={{ color: '#0d3b66', fontSize: '1.02rem', margin: 0 }}>
                        {isMr ? act.titleMr : act.titleEn}
                      </h4>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                      {isMr ? act.descMr : act.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. PHOTO HIGHLIGHTS FROM CAMPUS LIFE */}
          <div style={{
            background: '#ffffff', borderRadius: '16px', padding: '32px',
            border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ color: '#0d3b66', fontSize: '1.6rem', margin: 0 }}>
                <i className="fas fa-camera" style={{ color: '#0284c7', marginRight: '10px' }}></i>
                {isMr ? 'उपक्रमांची काही छायाचित्रे' : 'Campus Activities in Action'}
              </h3>
              <Link href="/gallery" style={{
                background: '#0d3b66', color: '#ffffff', padding: '8px 18px',
                borderRadius: '8px', fontWeight: 700, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem',
              }}>
                <i className="fas fa-images"></i>
                {isMr ? 'संपूर्ण गॅलरी पहा' : 'View Full Gallery'} →
              </Link>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px',
            }}>
              {['/gallery/gallery-2.jpg', '/gallery/gallery-3.jpg', '/gallery/gallery-7.jpg', '/gallery/gallery-8.jpg'].map((imgSrc, idx) => (
                <div key={idx} style={{
                  position: 'relative', height: '200px', borderRadius: '12px',
                  overflow: 'hidden', border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}>
                  <Image
                    src={imgSrc}
                    alt={`Activity photo ${idx + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{
            background: 'linear-gradient(135deg, #0d3b66, #1e3a8a)',
            borderRadius: '16px', padding: '40px', color: '#ffffff', textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '1.8rem', color: '#ffffff', margin: '0 0 12px' }}>
              {isMr ? 'आपल्या सुप्त गुणांना द्या नवे व्यासपीठ!' : 'Unleash Your Potential with Samarth'}
            </h3>
            <p style={{ color: '#93c5fd', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 24px' }}>
              {isMr
                ? 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर येथे गुणवत्तापूर्ण शिक्षण, क्लिनिकल प्राविण्य आणि सर्वांगीण विकासाची परिपूर्ण संधी आजच मिळवा.'
                : 'Join Samarth College of Nursing, Sangamner, where your dedication and talent meet boundless learning opportunities.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                background: '#ffb703', color: '#0d3b66', padding: '11px 24px',
                borderRadius: '8px', fontWeight: 700, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem',
              }}>
                <i className="fas fa-user-plus"></i>
                {isMr ? 'प्रवेशासाठी संपर्क साधा' : 'Apply for Admission'}
              </Link>
              <Link href="/courses" style={{
                background: 'transparent', color: '#ffffff', padding: '11px 24px',
                borderRadius: '8px', fontWeight: 700, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem',
                border: '2px solid rgba(255,255,255,0.5)',
              }}>
                <i className="fas fa-book-reader"></i>
                {isMr ? 'अभ्यासक्रम पहा' : 'Explore Courses'}
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

