import type { Flight } from '../types'
import { formatDate } from '../utils'

interface FlightTableProps {
  flights: Flight[]
  onBook?: (flight: Flight) => void // opcional: si no llega, no hay botón
}

function FlightTable({ flights, onBook }: FlightTableProps) {
  return (
    <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <thead className="bg-sky-100 text-left">
        <tr>
          <th className="p-3">Vuelo</th>
          <th className="p-3">Aerolínea</th>
          <th className="p-3">Salida</th>
          <th className="p-3">Llegada</th>
          <th className="p-3">Asientos</th>
          {onBook && <th className="p-3"></th>}
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <tr key={flight.id} className="border-t border-gray-200 hover:bg-gray-50">
            <td className="p-3 font-semibold">{flight.flightNumber}</td>
            <td className="p-3">{flight.airlineName}</td>
            <td className="p-3">{formatDate(flight.estDepartureTime)}</td>
            <td className="p-3">{formatDate(flight.estArrivalTime)}</td>
            <td className="p-3">{flight.availableSeats}</td>
            {onBook && (
              <td className="p-3">
                <button
                  onClick={() => onBook(flight)}
                  className="bg-green-600 text-white text-sm font-semibold rounded-lg px-3 py-1 hover:bg-green-700"
                >
                  Reservar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FlightTable
