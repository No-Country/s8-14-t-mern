export function formatDate(date: Date) {
  return date.toLocaleString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
