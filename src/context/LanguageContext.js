'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => key,
});

export const translations = {
  en: {
    // Top Bar
    phone: '+91 96894 86570',
    email: 'samarthnursing41@gmail.com',
    location: 'Sangamner, Ahilyanagar, Maharashtra',
    studentLogin: 'Student Login',
    alumni: 'Alumni',
    adminPortal: 'Staff / Admin Portal',

    // Brand
    collegeName: 'SAMARTH COLLEGE',
    collegeCity: 'SANGAMNER',
    collegeTagline: 'Quality Education | Bright Future',
    trustName: 'Swami Samarth V Om Gagangiri Foundation',

    // Nav Menu
    navHome: 'Home',
    navAbout: 'About Us',
    navAboutTrust: 'About the Trust',
    navVisionMission: 'Vision & Mission',
    navPrincipalGnm: "Principal's Desk (GNM)",
    navPrincipalAnm: "Principal's Desk (ANM)",
    navManagement: 'Management Message',
    navCourses: 'Courses',
    navGnm: 'GNM – General Nursing & Midwifery (3 Yrs)',
    navAnm: 'ANM – Auxiliary Nursing & Midwifery (2 Yrs)',
    navAdmlt: 'ADMLT – Medical Lab Technician (1.5 Yrs)',
    navAdmission: 'Admission',
    navAdmissionProcess: 'Admission Process & Form',
    navEligibility: 'Eligibility Criteria',
    navScholarshipSchemes: 'Scholarship Schemes',
    navFacilities: 'Facilities',
    navHostel: 'Hostel Facility',
    navScholarship: 'Scholarship Guidance',
    navClinicalTraining: 'Clinical Experience & Rotations',
    navAchievements: 'Achievements & Activities',
    navStudentCorner: 'Student Corner',
    navGallery: 'Gallery',
    navNotices: 'Notices & Circulars',
    navContact: 'Contact Us',

    // Hero Section
    heroPill: 'LEARN | GROW | ACHIEVE',
    heroWelcome: 'Welcome to',
    heroCollege: 'Samarth College,',
    heroCity: 'Sangamner',
    heroSubtitle: 'Empowering Young Minds for a Brighter Tomorrow',
    heroDescription:
      'We provide high-quality education, modern medical infrastructure, and a supportive learning environment to help you build an honorable, rewarding career in healthcare.',
    heroExploreCourses: 'Explore Courses',
    heroWatchVideo: 'Watch Campus Video',
    heroBuildFuture: 'Build Your Future With Us...',
    heroAdmissionsOpen: 'Admissions Open 2026-27',
    heroAdmissionsSub: 'GNM • ANM • ADMLT • PGDMLT',

    // Feature Ribbon
    featQualityEdu: 'Quality Education',
    featQualityEduSub: 'Academic Excellence',
    featFaculty: 'Experienced Faculty',
    featFacultySub: 'Guiding Your Success',
    featInfra: 'Modern Infrastructure',
    featInfraSub: 'For Holistic Development',
    featCareer: 'Career Guidance',
    featCareerSub: 'Build Your Future',
    featSafe: 'Safe & Supportive',
    featSafeSub: 'Learning Environment',

    // About Section
    aboutPill: 'ABOUT US',
    aboutHeading: 'A Legacy of Education and Excellence',
    aboutBody:
      'Samarth College, Sangamner is committed to providing high-quality healthcare education and creating responsible healthcare professionals for a better tomorrow. Our institute focuses on academic excellence, hands-on clinical hospital exposure, and value-based compassionate discipline.',
    aboutStatYears: 'Years of Excellence',
    aboutStatStudents: 'Happy Students',
    aboutStatFaculty: 'Experienced Faculty',
    aboutStatCourses: 'Specialized Courses',
    aboutKnowMore: 'Know More About Us',
    aboutGateMarathi: 'समर्थ कॉलेज, संगमनेर',
    aboutBadgeLives: 'Education Changes Lives',
    visionTitle: 'Our Vision',
    visionDesc:
      'To emerge as a leading and trusted educational institution dedicated to excellence in nursing, paramedical education, skill development, and community healthcare.',
    missionTitle: 'Our Mission',
    missionDesc:
      'To provide high-quality practical education, clinical skills, and ethical values that empower students to become competent, empathetic, and dedicated caregivers.',
    valuesTitle: 'Our Values',
    valuesDesc:
      'Integrity | Discipline | Compassion | Professional Excellence | Selfless Service to Humanity',

    // Courses Section
    coursesPill: 'OUR COURSES',
    coursesHeading: 'Choose Your Path',
    coursesSub:
      'We offer government, MSBNPE and MSBTE recognized nursing and paramedical programs designed to build professional excellence, hands-on clinical skills, and career success.',
    coursesViewAll: 'View All Courses',
    gnmName: 'General Nursing & Midwifery (GNM)',
    gnmDuration: 'Duration: 3 Years • Since 2024',
    anmName: 'Auxiliary Nursing & Midwifery (ANM)',
    anmDuration: 'Duration: 2 Years • Since 2024',
    admltName: 'Adv. Diploma in Medical Lab Tech (ADMLT)',
    admltDuration: 'Duration: 1.5 Years • Since 2021',
    clinicalName: 'Hands-on Hospital Rotations & ICU',
    clinicalDuration: 'Comprehensive Clinical Exposure',
    dreamsSupport: 'Your Dreams,\nOur Support',

    // Leadership
    leadershipPill: 'COLLEGE LEADERSHIP',
    leadershipHeading: "Principal's Desk",
    leadershipSub:
      'Meet our distinguished academic leaders guiding the future of nursing and midwifery with extensive clinical experience.',
    gnmPrincipalName: 'Mrs. Sayyed Firdosh Gulab',
    gnmPrincipalDesig: 'Principal — GNM Course',
    gnmPrincipalQuote:
      'Nursing education is not merely about completing a curriculum; it is a meaningful combination of knowledge, skills, discipline, compassion, and service to humanity.',
    anmPrincipalName: 'Raghatate Pooja Tarachand',
    anmPrincipalDesig: 'Principal — ANM Course',
    anmPrincipalQuote:
      'Preparing empathetic, skilled healthcare professionals who serve rural and urban communities with dedication, maternal care, and preventive health expertise.',
    readFullMessage: 'Read Full Message',

    // Updates
    noticesTitle: 'Latest Notices',
    eventsTitle: 'Upcoming Events',
    galleryTitle: 'Campus Gallery',
    viewAll: 'View All',
    newBadge: 'New',

    // Stats Ribbon
    togetherWeGrow: '"Together We Grow"',
    statBatches: 'Batches Passed',
    statLabs: 'Clinical Labs',
    statPlacement: 'Placement Support',
    joinUsToday: 'Join Us Today',
    joinUsSub: 'Be a Part of Something Noble & Great',

    // Footer
    footerDesc:
      'Run by Swami Samarth V Om Gagangiri Foundation, committed to delivering excellence in nursing, paramedical education, skill training, and community healthcare.',
    footerAffiliation: 'Affiliated to State Government, MSBNPE & MSBTE Mumbai',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    copyright: 'Samarth College, Sangamner. All Rights Reserved.',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
  },

  mr: {
    // Top Bar
    phone: '+९१ ९६८९४ ८६५७०',
    email: 'samarthnursing41@gmail.com',
    location: 'संगमनेर, अहिल्यानगर, महाराष्ट्र',
    studentLogin: 'विद्यार्थी लॉगिन',
    alumni: 'माजी विद्यार्थी',
    adminPortal: 'कर्मचारी / ॲडमिन पोर्टल',

    // Brand
    collegeName: 'समर्थ कॉलेज ऑफ नर्सिंग',
    collegeCity: 'संगमनेर, अहिल्यानगर',
    collegeTagline: 'गुणवत्तापूर्ण शिक्षण | उज्ज्वल भविष्य',
    trustName: 'स्वामी समर्थ व ॐ गगनगिरी फाउंडेशन',

    // Nav Menu
    navHome: 'मुख्यपृष्ठ',
    navAbout: 'आमच्याविषयी',
    navAboutTrust: 'संस्थेविषयी माहिती',
    navVisionMission: 'ध्येय व उद्दिष्टे (Vision & Mission)',
    navPrincipalGnm: 'प्राचार्यांचे मनोगत (GNM)',
    navPrincipalAnm: 'प्राचार्यांचे मनोगत (ANM)',
    navManagement: 'व्यवस्थापनाचा संदेश',
    navCourses: 'अभ्यासक्रम',
    navGnm: 'जी.एन.एम. – जनरल नर्सिंग (३ वर्षे)',
    navAnm: 'ए.एन.एम. – ऑक्सिलरी नर्सिंग (२ वर्षे)',
    navAdmlt: 'ए.डी.एम.एल.टी. – लॅब टेक्निशियन (१.५ वर्षे)',
    navAdmission: 'प्रवेश प्रक्रिया',
    navAdmissionProcess: 'प्रवेश प्रक्रिया व अर्ज',
    navEligibility: 'पात्रता निकष',
    navScholarshipSchemes: 'शासकीय शिष्यवृत्ती योजना',
    navFacilities: 'सुविधा',
    navHostel: 'वसतिगृह सुविधा',
    navScholarship: 'शिष्यवृत्ती मार्गदर्शन',
    navClinicalTraining: 'क्लिनिकल अनुभव व सुविधा',
    navAchievements: 'उपलब्धी व विविध उपक्रम',
    navStudentCorner: 'विद्यार्थी कक्ष',
    navGallery: 'छायाचित्रे / गॅलरी',
    navNotices: 'सूचना व परिपत्रके',
    navContact: 'संपर्क',

    // Hero Section
    heroPill: 'शिका | घडा | नेतृत्व करा',
    heroWelcome: 'हार्दिक स्वागत',
    heroCollege: 'समर्थ कॉलेज ऑफ नर्सिंग,',
    heroCity: 'संगमनेर',
    heroSubtitle: 'आजच्या विद्यार्थ्यांमध्ये उद्याच्या आरोग्यसेवेची ताकद घडविणे',
    heroDescription:
      'आरोग्यसेवा क्षेत्रात सक्षम, आत्मविश्वासू आणि जबाबदार नर्सिंग व्यावसायिक घडविणारी अग्रगण्य संस्था. आधुनिक लॅब्ज, अनुभवी प्राध्यापक आणि प्रत्यक्ष रुग्णालय प्रशिक्षण.',
    heroExploreCourses: 'अभ्यासक्रम पहा',
    heroWatchVideo: 'कॅम्पस व्हिडिओ पहा',
    heroBuildFuture: 'आपले भविष्य घडवा\nआमच्यासोबत...',
    heroAdmissionsOpen: 'प्रवेश सुरू शैक्षणिक वर्ष २०२६-२७',
    heroAdmissionsSub: 'GNM • ANM • ADMLT • PGDMLT',

    // Feature Ribbon
    featQualityEdu: 'गुणवत्तापूर्ण शिक्षण',
    featQualityEduSub: 'शैक्षणिक उत्कृष्टता',
    featFaculty: 'अनुभवी प्राध्यापक वर्ग',
    featFacultySub: 'उत्कृष्ट मार्गदर्शन',
    featInfra: 'अद्ययावत पायाभूत सुविधा',
    featInfraSub: 'सर्वांगीण विकासासाठी',
    featCareer: 'करिअर मार्गदर्शन',
    featCareerSub: 'उज्ज्वल भविष्यासाठी',
    featSafe: 'सुरक्षित व शिस्तबद्ध',
    featSafeSub: 'विद्यार्थीपूरक वातावरण',

    // About Section
    aboutPill: 'आमच्याविषयी',
    aboutHeading: 'शिक्षण, सेवा आणि संस्कारांची परंपरा',
    aboutBody:
      'समर्थ फाउंडेशन ही गुणवत्तापूर्ण शिक्षण, आरोग्यविषयक जनजागृती आणि कुशल मनुष्यबळाच्या विकासासाठी सामाजिक बांधिलकीने कार्य करणारी संस्था आहे. नर्सिंग, पॅरामेडिकल शिक्षण, कौशल्यविकास आणि सामुदायिक आरोग्यसेवा या क्षेत्रांवर विशेष भर देत सक्षम शैक्षणिक वातावरण निर्माण करणे हे आमचे ध्येय आहे.',
    aboutStatYears: 'वर्षांची अखंड परंपरा',
    aboutStatStudents: 'यशस्वी विद्यार्थी',
    aboutStatFaculty: 'तज्ज्ञ प्राध्यापक',
    aboutStatCourses: 'विशेष अभ्यासक्रम',
    aboutKnowMore: 'अधिक माहिती वाचा',
    aboutGateMarathi: 'समर्थ कॉलेज, संगमनेर',
    aboutBadgeLives: 'शिक्षणातून जीवन समृद्धी',
    visionTitle: 'आमची दृष्टी (Vision)',
    visionDesc:
      'नर्सिंग, पॅरामेडिकल शिक्षण, कौशल्य विकास आणि समाजाभिमुख आरोग्यसेवेमध्ये उत्कृष्टता साधणारी, विश्वासार्ह आणि अग्रगण्य संस्था म्हणून विकसित होणे आणि सक्षम, संवेदनशील व जबाबदार आरोग्यसेवा व्यावसायिक घडविणे.',
    missionTitle: 'आमचे ध्येय (Mission)',
    missionDesc:
      'विद्यार्थ्यांना ज्ञान, कौशल्ये, नैतिक मूल्ये आणि आत्मविश्वास प्रदान करणारे गुणवत्तापूर्ण शिक्षण व रुग्णालय प्रात्यक्षिक प्रशिक्षण देणे, ज्यामुळे ते यशस्वी करिअर घडवून समाजाच्या आरोग्यात योगदान देतील.',
    valuesTitle: 'आमची मूल्ये (Values)',
    valuesDesc:
      'गुणवत्ता • प्रामाणिकपणा • शिस्त • सेवाभाव • उत्कृष्टता • संवेदनशीलता • सामाजिक बांधिलकी',

    // Courses Section
    coursesPill: 'आमचे अभ्यासक्रम',
    coursesHeading: 'आपला करिअर मार्ग निवडा',
    coursesSub:
      'महाराष्ट्र शासन, MSBNPE आणि MSBTE मुंबई मान्यताप्राप्त नर्सिंग व पॅरामेडिकल कोर्सेस, ज्याद्वारे विद्यार्थ्यांना थेट आरोग्य क्षेत्रात रोजगाराच्या अमर्याद संधी मिळतात.',
    coursesViewAll: 'सर्व अभ्यासक्रम पहा',
    gnmName: 'जनरल नर्सिंग अँड मिडवायफ्री (GNM)',
    gnmDuration: 'कालावधी: ३ वर्षे • २०२४ पासून',
    anmName: 'ऑक्सिलरी नर्सिंग अँड मिडवायफ्री (ANM)',
    anmDuration: 'कालावधी: २ वर्षे • २०२४ पासून',
    admltName: 'अ‍ॅडव्हान्स डिप्लोमा इन मेडिकल लॅब (ADMLT)',
    admltDuration: 'कालावधी: १.५ वर्षे • २०२१ पासून',
    clinicalName: 'थेट रुग्णालय क्लिनिकल ट्रेनिंग व आयसीयू',
    clinicalDuration: 'प्रत्यक्ष रुग्णसेवा अनुभव',
    dreamsSupport: 'तुमची स्वप्ने,\nआमचे मार्गदर्शन',

    // Leadership
    leadershipPill: 'महाविद्यालयीन नेतृत्व',
    leadershipHeading: 'प्राचार्यांचे मनोगत',
    leadershipSub:
      'दीर्घ क्लिनिकल आणि अध्यापन अनुभवासह नर्सिंग शिक्षणाला नवी दिशा देणारे आमचे प्रमुख मार्गदर्शक.',
    gnmPrincipalName: 'सौ. सय्यद फिरदौश गुलाब',
    gnmPrincipalDesig: 'प्राचार्य — जी.एन.एम. नर्सिंग',
    gnmPrincipalQuote:
      'नर्सिंग शिक्षण म्हणजे केवळ पाठ्यक्रम आणि परीक्षा नव्हे, तर ज्ञान, कौशल्य, शिस्त, संवेदनशीलता आणि मानवसेवा यांचा सुंदर संगम आहे. आरोग्यसेवा क्षेत्रात सक्षम, आत्मविश्वासू आणि जबाबदार व्यावसायिक घडविणे हे आमचे उद्दिष्ट आहे.',
    anmPrincipalName: 'राघटाटे पूजा ताराचंद',
    anmPrincipalDesig: 'प्राचार्य — ए.एन.एम. नर्सिंग',
    anmPrincipalQuote:
      'विद्यार्थ्यांना दर्जेदार प्रशिक्षण देऊन ग्रामीण व शहरी भागातील मातृ व बाल आरोग्यसेवा तसेच प्रतिबंधात्मक आरोग्य क्षेत्रात समर्पण भावाने कार्य करणारे सक्षम आरोग्यसेवक घडविणे ही आमची बांधिलकी आहे.',
    readFullMessage: 'संपूर्ण मनोगत वाचा',

    // Updates
    noticesTitle: 'महत्त्वाच्या सूचना',
    eventsTitle: 'आगामी कार्यक्रम',
    galleryTitle: 'कॅम्पस छायाचित्रे',
    viewAll: 'सर्व पहा',
    newBadge: 'नवीन',

    // Stats Ribbon
    togetherWeGrow: '"एकत्रित विकास, उज्ज्वल भविष्य"',
    statBatches: 'उत्तीर्ण तुकड्या',
    statLabs: 'आधुनिक प्रयोगशाळा',
    statPlacement: 'नोकरी मार्गदर्शन सहाय्य',
    joinUsToday: 'आजच प्रवेश घ्या',
    joinUsSub: 'आरोग्यसेवेच्या पवित्र कार्यात सहभागी व्हा',

    // Footer
    footerDesc:
      'स्वामी समर्थ व ॐ गगनगिरी फाउंडेशन संचालित, नर्सिंग व पॅरामेडिकल शिक्षणातील विश्वासार्ह नाव. गुणवत्ता, शिस्त आणि रुग्णसेवेचे परिपूर्ण संस्कार.',
    footerAffiliation: 'महाराष्ट्र शासन, MSBNPE व MSBTE मुंबई संलग्नित',
    quickLinks: 'महत्त्वाच्या लिंक्स',
    followUs: 'सोशल मीडियावर जुडा',
    copyright: 'समर्थ कॉलेज ऑफ नर्सिंग, संगमनेर. सर्व हक्क सुरक्षित.',
    privacyPolicy: 'गोपनीयता धोरण',
    termsConditions: 'नियम व अटी',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('samarth_lang');
      if (savedLang === 'en' || savedLang === 'mr') {
        setLanguageState(savedLang);
      }
    } catch (e) {
      // localStorage may be unavailable in some browser settings
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('samarth_lang', lang);
    } catch (e) {}
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'mr' : 'en';
    setLanguage(nextLang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
