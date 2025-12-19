/* 
  Date format - YYYY-MM-DD
*/

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function fromISODate(value: string): Date {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function formatHumanDate(value: string): string {
  const date = fromISODate(value)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}
