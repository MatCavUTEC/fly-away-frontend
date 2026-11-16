import type { Booking } from '../types'
import { formatDate } from '../utils'

interface BookingCardProps {
  booking: Booking
}

function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-sky-600">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">
          {booking.flightNumber} · {booking.airlineName}
        </h3>
        <span className="text-sm bg-sky-100 text-sky-700 rounded-full px-3 py-1">
          Reserva #{booking.id}
        </span>
      </div>
      <p><span className="font-semibold">Salida:</span> {formatDate(booking.estDepartureTime)}</p>
      <p><span className="font-semibold">Llegada:</span> {formatDate(booking.estArrivalTime)}</p>
      <p><span className="font-semibold">Pasajero:</span> {booking.customerFirstName} {booking.customerLastName}</p>
      <p className="text-sm text-gray-500 mt-2">Reservado el {formatDate(booking.bookingDate)}</p>
    </div>
  )
}

export default BookingCard
