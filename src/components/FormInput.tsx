interface FormInputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
}

function FormInput({ label, type = 'text', value, onChange }: FormInputProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </label>
  )
}

export default FormInput
