import React from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuatityControler({
  max,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'mt-10 ',
  value,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valuee = Number(event.target.value)
    if (max !== undefined && valuee > max) {
      valuee = max
    } else if (valuee < 1) {
      valuee = 1
    }
    onType && onType(valuee)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }

  return (
    <div className={'flex items-center ' + classNameWrapper}>
      <div className='capitalize text-gray-500'>Số lượng</div>
      <div className='ml-10 mt-5 flex'>
        <button
          onClick={decrease}
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
          </svg>
        </button>
        <InputNumber
          value={value}
          classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
          onChange={handleChange}
        />
        <button
          onClick={increase}
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
      <div className='ml-6 text-sm text-gray-500'>{max} Có sẵn</div>
    </div>
  )
}
