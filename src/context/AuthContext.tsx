import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import api from '../api'
import type { User } from '../types'

// 1. Qué datos y funciones comparte el contexto
interface AuthContextType {
  token: string | null
  user: User | null
  login: (token: string) => void
  logout: () => void
}

// 2. Crear el contexto (FUERA del componente)
const AuthContext = createContext<AuthContextType | null>(null)

// 3. Provider: guarda el estado y lo comparte con todos sus hijos
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)

  // Cada vez que cambia el token, pide los datos del usuario
  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }

    async function loadUser() {
      try {
        const { data } = await api.get('/users/current')
        setUser(data)
      } catch {
        setUser(null)
      }
    }
    loadUser()
  }, [token])

  function login(newToken: string) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 4. Custom hook: atajo para leer el contexto desde cualquier componente
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return context
}
