import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import api, { errorMessage } from '../api'
import type { Booking, Flight } from '../types'
import { useAuth } from '../context/AuthContext'
import { saveBookingId } from '../utils'
import FormInput from '../components/FormInput'
import FlightTable from '../components/FlightTable'
import BookingCard from '../components/BookingCard'

function SearchPage() {
  const [flightNumber, setFlightNumber] = useState('')
  const [airlineName, setAirlineName] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [flights, setFlights] = useState<Flight[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [booking, setBooking] = useState<Booking | null>(null)
  const { token, user } = useAuth()

  async function searchFlights() {
    setError('')
    try {
      const { data } = await api.get('/flights/search', {
        params: {
          flightNumber: flightNumber || undefined,
          airlineName: airlineName || undefined,
          estDepartureTimeFrom: from ? new Date(from).toISOString() : undefined,
          estDepartureTimeTo: to ? new Date(to).toISOString() : undefined,
        },
      })
      setFlights(data.items) // la lista viene dentro de "items"
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  // Al entrar a la página: buscar sin filtros (muestra todos los vuelos)
  useEffect(() => {
    searchFlights()
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    searchFlights()
  }

  async function handleBook(flight: Flight) {
    setError('')
    setSuccess('')
    setBooking(null)
    try {
      // 1. Reservar → devuelve { id } (el ID de la reserva)
      const { data } = await api.post('/flights/book', { flightId: flight.id })
      setSuccess(`¡Reserva #${data.id} creada para el vuelo ${flight.flightNumber}!`)
      if (user) saveBookingId(user.email, data.id) // para "Mis reservas"

      // 2. Nice to have: traer el detalle de la reserva
      const detail = await api.get(`/flights/book/${data.id}`)
      setBooking(detail.data)

      // 3. Volver a buscar para actualizar los asientos disponibles
      searchFlights()
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Buscar vuelos</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Número de vuelo" value={flightNumber} onChange={setFlightNumber} />
        <FormInput label="Aerolínea" value={airlineName} onChange={setAirlineName} />
        <FormInput label="Salida desde" type="datetime-local" value={from} onChange={setFrom} />
        <FormInput label="Salida hasta" type="datetime-local" value={to} onChange={setTo} />

        <button
          type="submit"
          className="md:col-span-2 bg-sky-600 text-white font-semibold rounded-lg py-2 hover:bg-sky-700"
        >
          Buscar
        </button>
      </form>

      {error && <p className="bg-red-100 text-red-700 rounded-lg p-3">{error}</p>}
      {success && <p className="bg-green-100 text-green-700 rounded-lg p-3">{success}</p>}
      {booking && <BookingCard booking={booking} />}

      {!token && (
        <p className="bg-yellow-100 text-yellow-800 rounded-lg p-3">
          Inicia sesión para poder reservar vuelos.
        </p>
      )}

      {flights.length === 0 ? (
        <p className="text-center text-gray-500 bg-white rounded-xl shadow-md p-6">
          No se encontraron vuelos con esos filtros 😕
        </p>
      ) : (
        <FlightTable flights={flights} onBook={token ? handleBook : undefined} />
      )}
    </div>
  )
}

export default SearchPage
