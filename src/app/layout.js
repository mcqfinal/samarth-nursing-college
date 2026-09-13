import '@/styles/globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export const metadata = {
  title: {
    default: 'Samarth College of Nursing, Ahilyanagar | GNM, ANM, ADMLT Courses',
    template: '%s | Samarth College of Nursing',
  },
  description:
    'Samarth College of Nursing, Ahilyanagar offers quality nursing and paramedical education – GNM, ANM & ADMLT courses. Affiliated to State Government & MSBTE Mumbai. Hostel & Scholarship facilities available.',
  keywords: [
    'Samarth College of Nursing',
    'Nursing college Ahilyanagar',
    'GNM course Ahilyanagar',
    'ANM course Ahilyanagar',
    'ADMLT course Sangamner',
    'Nursing college Sangamner',
    'Best nursing college Maharashtra',
    'MSBTE affiliated nursing college',
    'Samarth Nursing Sangamner',
    'Paramedical college Ahilyanagar',
  ],
  authors: [{ name: 'Samarth College of Nursing' }],
  creator: 'Samarth College of Nursing',
  publisher: 'Swami Samarth V Om Gagangiri Foundation',
  openGraph: {
    title: 'Samarth College of Nursing, Ahilyanagar',
    description: 'Quality nursing & paramedical education – GNM, ANM & ADMLT courses. Affiliated to State Government & MSBTE Mumbai.',
    siteName: 'Samarth College of Nursing',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  name: 'Samarth College of Nursing',
  description: 'Samarth College of Nursing, Ahilyanagar offers GNM, ANM and ADMLT courses affiliated to State Government & MSBTE Mumbai.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sangamner',
    addressRegion: 'Maharashtra',
    postalCode: '422605',
    addressCountry: 'IN',
  },
  telephone: '+91-9689486570',
  email: 'samarthnursing41@gmail.com',
  foundingDate: '2021',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Swami Samarth V Om Gagangiri Foundation',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
