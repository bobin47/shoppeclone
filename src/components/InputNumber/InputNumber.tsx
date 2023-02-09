import React, { InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

export default function InputNumber({
  type,
  errorMessage,
  placeholder,
  className,
  autoComplete,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:shadow-sm',
  classNameError = 'min-h-[1.25rem] text-sm text-red-600',
  onChange,
  ...rest
}: InputNumberProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input
        onChange={(event) => handleChange(event)}
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...rest}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
