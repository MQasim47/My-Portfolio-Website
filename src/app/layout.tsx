import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030712',
};

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const TITLE = 'Muhammad Qasim | Full-stack & Mobile Engineer';
const DESCRIPTION =
  'Full-stack and mobile engineer building web apps and Flutter mobile apps, and shipping them to production.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: 'Muhammad Qasim' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: 'Muhammad Qasim',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
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
    <html lang="en" className={`${inter.variable} ${poppins.variable} dark`}>
      <body className="bg-background text-text-primary antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-cyan-400">
        {/* Subtle ambient background luminous orbs */}
        <div className="bg-orb bg-orb-1" aria-hidden="true" />
        <div className="bg-orb bg-orb-2" aria-hidden="true" />
        <div className="bg-orb bg-orb-3" aria-hidden="true" />

        {/* Precision grid overlay */}
        <div className="grid-overlay" aria-hidden="true" />

        {/* Fine-grain noise texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}