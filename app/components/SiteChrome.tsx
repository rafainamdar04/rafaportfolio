'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/app/components/Nav';
import LoadingScreen from '@/app/components/LoadingScreen';

// Renders the site-wide chrome (loader + fixed header) once at the layout
// level so it persists across route changes — but stays out of the Sanity
// Studio admin routes, which have their own UI. The star field is no longer
// site-wide: it belongs to the hero and is mounted there.
export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith('/studio')) return null;

  return (
    <>
      <LoadingScreen />
      <Nav />
    </>
  );
}
