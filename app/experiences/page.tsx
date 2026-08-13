import { redirect } from 'next/navigation';

// The full experience list already renders on the one-page site (it was
// never truncated there) — keep this route alive as a redirect so old
// links/bookmarks still land somewhere.
export default function ExperiencesPage() {
  redirect('/#experience');
}
