import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-sky-700 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        ✈️ Fly Away
      </Link>

      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/search" className="hover:underline">Buscar vuelos</Link>
        </li>

        {token ? (
          // Con sesión: Mis reservas + nombre + Logout
          <>
            <li>
              <Link to="/bookings" className="hover:underline">Mis reservas</Link>
            </li>
            {user && <li className="font-semibold">Hola, {user.firstName} {user.lastName}</li>}
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-sky-700 font-semibold rounded-lg px-3 py-1 hover:bg-sky-100"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          // Sin sesión: Login + Registro
          <>
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:underline">Registro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
