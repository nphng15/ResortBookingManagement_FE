interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

function FormInput({ type, placeholder, value, onChange, required = false, error }: FormInputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 placeholder-gray-400 ${
          error
            ? 'border-red-300 bg-red-50 focus:ring-red-400 focus:border-red-400'
            : 'border-gray-200 focus:ring-gray-400 focus:border-gray-400'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default FormInput;
