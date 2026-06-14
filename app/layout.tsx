import type { Metadata } from 'next';
import { Space_Grotesk, Montserrat, JetBrains_Mono } from 'next/font/google';
import LoadingScreen from '@/app/components/LoadingScreen';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-head-next',
  display: 'swap',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body-next',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-next',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Rafa Inamdar — Developer',
  description: 'Portfolio of Rafa Inamdar — full-stack developer and computer engineering student.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
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
      <body className={`${spaceGrotesk.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
