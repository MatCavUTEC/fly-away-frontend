import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { errorMessage } from '../api'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/FormInput'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Ingresa tu email y contraseña')
      return
    }

    try {
      const { data } = await api.post('/auth/login', { email, password })
      login(data.token)        // guarda el token (localStorage + contexto)
      navigate('/search')
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput label="Email" type="email" value={email} onChange={setEmail} />
        <FormInput label="Contraseña" type="password" value={password} onChange={setPassword} />

        {error && <p className="bg-red-100 text-red-700 rounded-lg p-3">{error}</p>}

        <button
          type="submit"
          className="bg-sky-600 text-white font-semibold rounded-lg py-2 hover:bg-sky-700"
        >
          Entrar
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-sky-600 hover:underline">Regístrate</Link>
      </p>
    </div>
  )
}

export default LoginPage
