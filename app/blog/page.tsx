import { redirect } from 'next/navigation';

// The blog list now lives as the "Writing" section on the one-page site — keep
// this route alive as a redirect so old links/bookmarks still land somewhere.
export default function BlogPage() {
  redirect('/#writing');
}
