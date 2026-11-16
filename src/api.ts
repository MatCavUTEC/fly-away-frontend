import axios from 'axios'

// 1. Instancia de Axios con la URL del backend
const api = axios.create({ baseURL: 'http://localhost:8080' })

// 2. Antes de CADA petición: si hay token, lo agrega al header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 3. Después de CADA respuesta: si el backend responde 403, el token no sirve
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

// 4. Saca el mensaje de error que manda el backend (ProblemDetail → detail)
export function errorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.detail ?? 'Error de conexión con el servidor'
  }
  return 'Error inesperado'
}

export default api
