import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

// ─────────────────────────────────────────────────────────────────────────────
// Fonts
// ─────────────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

// ─────────────────────────────────────────────────────────────────────────────
// TODO: METADATA — replace with your own name, description, URL, OG image
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Muhammad Qasim | DevOps · Web · Flutter',
  description:
    'Full-stack developer and DevOps engineer specialising in cloud infrastructure, modern web applications, and cross-platform mobile development.',
  keywords: ['DevOps', 'Web Developer', 'Flutter', 'Azure', 'IBM Cloud', 'CI/CD', 'Portfolio'],
  authors: [{ name: 'Muhammad Qasim' }], // TODO: YOUR NAME
  openGraph: {
    title: 'Your Name | DevOps · Web · Flutter',
    description: 'Developer portfolio showcasing cloud, web, and mobile projects.',
    url: 'https://yourportfolio.dev', // TODO: YOUR DOMAIN
    siteName: 'Muhammad Qasim Portfolio',
    type: 'website',
    // images: [{ url: '/og-image.png', width: 1200, height: 630 }], // TODO: Add OG image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Qasim | DevOps · Web · Flutter',
    description: 'Developer portfolio showcasing cloud, web, and mobile projects.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0A0A0A',
};

// ─────────────────────────────────────────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-background text-text-primary antialiased overflow-x-hidden">
        {/* Subtle ambient background orbs */}
        <div className="bg-orb bg-orb-1" aria-hidden="true" />
        <div className="bg-orb bg-orb-2" aria-hidden="true" />
        <div className="bg-orb bg-orb-3" aria-hidden="true" />
        {/* Grid overlay */}
        <div className="grid-overlay" aria-hidden="true" />
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}