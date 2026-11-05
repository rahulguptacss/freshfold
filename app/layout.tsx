import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { pages } from '../components/types';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
  icons: {
    icon: '/logo/logo.webp',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white font-sans antialiased text-[#0b2545]">{children}</body>
    </html>
  );
}
