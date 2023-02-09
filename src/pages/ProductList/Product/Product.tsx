import React from 'react'
import { Link } from 'react-router-dom'
import path from '../../../constants/path'
import { Product as ProduceType } from '../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '../../../utils/utils'
import ProductRating from '../../../components/ProductRating'

interface Props {
  product: ProduceType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className=' rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[0.0625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          ></img>
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[1.75rem] line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              {formatCurrency(product.price_before_discount)}
              <span></span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span> {formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-4 flex justify-end'>
            <div>
              <ProductRating rating={product.rating} />
            </div>
            {formatNumberToSocialStyle(product.sold)} da ban dc
          </div>
        </div>
      </div>
    </Link>
  )
}
