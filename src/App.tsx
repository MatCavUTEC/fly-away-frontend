import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import MyBookingsPage from './pages/MyBookingsPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-sky-50 text-gray-800">
          <Navbar />
          <main className="max-w-4xl mx-auto p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/search" />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <MyBookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<h1 className="text-2xl font-bold text-red-600">404 - Página no encontrada</h1>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
