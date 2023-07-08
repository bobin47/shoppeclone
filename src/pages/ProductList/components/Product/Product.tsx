import { Link } from 'react-router-dom'
import { path } from '../../../../constants/path'
import { formatCurrency, formatNumberToSocialStyle } from '../../../../utils/utils'
import { Product as ProductType } from 'src/types/product.type'
import ProductRating from '../../../../components/ProductRating'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  const { name, images, price_before_discount, price, sold, rating } = product
  return (
    <Link to={`${path.HOME}${product._id}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={images[0]} alt='#' className='absolute left-0 top-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-xs'>{name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            {/* {Array(5)
              .fill(0)
              .map((_, index) => {
                return <ProductRating key={index} />
              })} */}
            <ProductRating rating={rating} />

            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
