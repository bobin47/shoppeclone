import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import path from '../../../constants/path'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button'
import { QueryConfig } from '../ProductList'
import { Category } from '../../../types/categoris.type'
import classNames from 'classnames'
import InputNumber from '../../../components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
interface Props {
  categoriesData: Category[]
  queryConfig: QueryConfig
}

type FromData = {
  price_min: string
  price_max: string
}

export default function AsideFilter({ categoriesData, queryConfig }: Props) {
  const { category } = queryConfig

  const { control, handleSubmit, watch } = useForm<FromData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    }
  })
  const valueForm = watch()
  console.log(valueForm)

  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-2 h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
          />
        </svg>
        Tất cả danh mục
      </Link>
      <ul>
        {categoriesData.map((item) => {
          const isActive = category === item._id
          return (
            <li className='py-2 pl-2' key={item._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: item._id
                  }).toString()
                }}
                className={classNames('px-2 text-black', {
                  'font-semibold text-orange': isActive
                })}
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className='my-3 h-[1px] w-52 bg-gray-300'></div>

      <Link to={path.home} className='flex items-center font-bold capitalize'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-3 h-3 w-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        bộ lọc tìm kiếm
      </Link>

      <div className='my-5'>
        <div>Khoản giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    onChange={field.onChange}
                    value={field.value}
                    type='text'
                    name='form'
                    placeholder='tu'
                    classNameInput='w-20 rounded-sm border border-gray-300 p-1 outline-none focus:shadow-sm'
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'></div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    onChange={(event) => field.onChange(event)}
                    value={field.value}
                    type='text'
                    name='form'
                    placeholder='den'
                    classNameInput='w-20 rounded-sm border border-gray-300 p-1 outline-none focus:shadow-sm'
                  />
                )
              }}
            />
          </div>
          <Button className='w-48 bg-orange p-2 text-white hover:bg-orange/80'>Ap Dung</Button>
        </form>
      </div>

      <div className='my-3 h-[1px] w-52 bg-gray-300'></div>

      <div className='font-bold capitalize'>Đánh Giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6 text-yellow-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                  />
                </svg>
              ))}
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  key={index}
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-6 w-6 text-yellow-500'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                    clipRule='evenodd'
                  />
                </svg>
              ))}
          </Link>
        </li>
      </ul>
      <Button className='w-48 bg-orange p-2 text-white hover:bg-orange/80'>Xoa Tat ca</Button>
    </div>
  )
}
