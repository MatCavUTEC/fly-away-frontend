// Forma de los datos que devuelve el backend

// GET /users/current
export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}

// Cada elemento de GET /flights/search → { items: Flight[] }
export interface Flight {
  id: number
  flightNumber: string
  airlineName: string
  estDepartureTime: string
  estArrivalTime: string
  availableSeats: number
}

// GET /flights/book/{id}
export interface Booking {
  id: number
  bookingDate: string
  flightId: number
  flightNumber: string
  airlineName: string
  estDepartureTime: string
  estArrivalTime: string
  customerId: number
  customerFirstName: string
  customerLastName: string
}
