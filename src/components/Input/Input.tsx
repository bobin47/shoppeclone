import React, { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  register?: UseFormRegister<any>
  rule?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rule,
  autoComplete,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:shadow-sm',
  classNameError = 'min-h-[1.25rem] text-sm text-red-600'
}: Props) {
  const registerResult = register && name ? register(name, rule) : null
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
