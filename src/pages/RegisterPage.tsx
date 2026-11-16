import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { errorMessage } from '../api'
import FormInput from '../components/FormInput'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    // 1. Validar campos vacíos ANTES de llamar al backend
    if (!email || !firstName || !lastName || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    // 2. Llamar al backend
    try {
      await api.post('/users/register', { email, firstName, lastName, password })
      setSuccess('¡Cuenta creada! Redirigiendo al login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput label="Email" type="email" value={email} onChange={setEmail} />
        <FormInput label="Nombre" value={firstName} onChange={setFirstName} />
        <FormInput label="Apellido" value={lastName} onChange={setLastName} />
        <FormInput label="Contraseña" type="password" value={password} onChange={setPassword} />

        {error && <p className="bg-red-100 text-red-700 rounded-lg p-3">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 rounded-lg p-3">{success}</p>}

        <button
          type="submit"
          className="bg-sky-600 text-white font-semibold rounded-lg py-2 hover:bg-sky-700"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
