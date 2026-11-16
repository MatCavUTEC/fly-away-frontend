import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import type { Booking } from '../types'
import { useAuth } from '../context/AuthContext'
import { getBookingIds } from '../utils'
import BookingCard from '../components/BookingCard'

function MyBookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  // Cuando ya tenemos el usuario, pedir el detalle de cada reserva guardada
  useEffect(() => {
    if (!user) return

    async function loadBookings(email: string) {
      const ids = getBookingIds(email)

      // allSettled: espera TODAS las peticiones aunque alguna falle
      const results = await Promise.allSettled(
        ids.map((id) => api.get(`/flights/book/${id}`)),
      )

      const found: Booking[] = []
      results.forEach((result) => {
        if (result.status === 'fulfilled') found.push(result.value.data)
      })

      setBookings(found)
      setLoading(false)
    }
    loadBookings(user.email)
  }, [user])

  if (loading) {
    return <p className="text-gray-500">Cargando reservas...</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Mis reservas</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 bg-white rounded-xl shadow-md p-6">
          Aún no tienes reservas.{' '}
          <Link to="/search" className="text-sky-600 hover:underline">Buscar vuelos</Link>
        </p>
      ) : (
        bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
      )}
    </div>
  )
}

export default MyBookingsPage
