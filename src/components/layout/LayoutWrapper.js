'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
