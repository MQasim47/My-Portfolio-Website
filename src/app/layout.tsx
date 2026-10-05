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
export const metadata: Metadata = {
  title: 'Muhammad Qasim | Senior DevOps Engineer & Full-Stack Architect',
  description:
    'Engineering high-scale cloud infrastructure, zero-downtime CI/CD pipelines, modern web applications, and cross-platform mobile architectures on Azure and IBM Cloud.',
  keywords: [
    'Muhammad Qasim',
    'DevOps Engineer',
    'Cloud Architect',
    'Full-Stack Developer',
    'Next.js 14',
    'TypeScript',
    'Flutter',
    'Azure',
    'IBM Cloud',
    'Kubernetes',
    'Docker',
    'CI/CD Pipelines',
    'Terraform',
    'Software Engineer Portfolio',
  ],
  authors: [{ name: 'Muhammad Qasim' }],
  openGraph: {
    title: 'Muhammad Qasim | Senior DevOps Engineer & Full-Stack Architect',
    description:
      'Engineering high-scale cloud infrastructure, zero-downtime CI/CD pipelines, and high-velocity digital products.',
    url: 'https://flacronenterprises.com/',
    siteName: 'Muhammad Qasim — Engineering Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Qasim | Senior DevOps Engineer & Full-Stack Architect',
    description:
      'Cloud infrastructure, automated CI/CD pipelines, modern web applications, and Flutter mobile systems.',
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