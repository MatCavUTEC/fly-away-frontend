// "2026-12-01T10:00:00.000Z" → "1/12/2026, 05:00:00"
export function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

// IDs de reservas guardados en localStorage, separados por usuario
// Ej: "bookings:ana.garcia@utec.edu.pe" → "[1,3]"
export function getBookingIds(email: string): number[] {
  return JSON.parse(localStorage.getItem(`bookings:${email}`) ?? '[]')
}

export function saveBookingId(email: string, id: number) {
  const ids = getBookingIds(email)
  localStorage.setItem(`bookings:${email}`, JSON.stringify([...ids, id]))
}
