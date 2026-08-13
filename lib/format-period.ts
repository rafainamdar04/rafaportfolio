export function formatPeriod(startDate: string, endDate: string | null): string {
  const fmt = (d: string) => {
    const [y, m] = d.split('-').map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const start = startDate ? fmt(startDate) : '';
  const end = endDate ? fmt(endDate) : 'Present';
  if (!start) return end;
  if (start === end) return start;
  return `${start} – ${end}`;
}
