import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Space_Grotesk, Space_Mono } from 'next/font/google';
import SiteChrome from '@/app/components/SiteChrome';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display-next',
  display: 'swap',
  weight: ['600', '700', '800'],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body-next',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono-next',
  display: 'swap',
  weight: ['400', '700'],
});

const DESCRIPTION =
  'Rafa Inamdar. Computer engineer working with data, machine learning, and intelligent systems.';

export const metadata: Metadata = {
  title: 'Rafa Inamdar',
  description: DESCRIPTION,
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'Rafa Inamdar',
    description: DESCRIPTION,
    type: 'website',
    siteName: 'Rafa Inamdar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafa Inamdar',
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#050507' },
    { media: '(prefers-color-scheme: light)', color: '#f2f0ea' },
  ],
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Prevent theme flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('pf-theme-v2');
                if (t) document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${bricolage.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
