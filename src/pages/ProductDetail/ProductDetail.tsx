import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '../../utils/utils'
import InputNumber from '../../components/InputNumber'
import { Product } from '../../types/product.type'
import QuatityControler from '../../components/QuatityControler/QuatityControler'
import pruchaseApi from '../../apis/purchases.api'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const { nameId } = useParams()
  const [buyCount, setBuyCount] = useState(1)
  const id = getIdFromNameId(nameId as string)

  const { data: productDetail } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const addToCartMutation = useMutation(pruchaseApi.addToCart)

  const product = productDetail?.data.data
  const [currentIndexImg, setCurrentIndexImg] = useState([0, 5])
  const [activeImg, setActiveImg] = useState('')
  const currentImg = useMemo(
    () => (product ? product?.images.slice(...currentIndexImg) : []),
    [product, currentIndexImg]
  )

  useEffect(() => {
    if (product) {
      setActiveImg(product.images[0])
    }
  }, [product])

  const chooseActive = (img: string) => {
    setActiveImg(img)
  }

  const next = () => {
    if (currentIndexImg[1] < (product as Product).images.length) {
      setCurrentIndexImg((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImg[0] > 0) {
      setCurrentIndexImg((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
        }
      }
    )
  }

  if (!product) return null

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img src={activeImg} alt='' className='absolute top-0 left-0 h-full w-full object-cover' />
              </div>

              <div className='relative mt-4 grid -translate-y-1/2 grid-cols-5 gap-1'>
                <button
                  onClick={() => prev()}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/40'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5 text-white'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImg.map((img, index) => {
                  const isActive = img === activeImg
                  return (
                    <div key={index} className='relative w-full pt-[100%]' onMouseEnter={() => chooseActive(img)}>
                      <img src={img} alt='' className='absolute top-0 left-0 h-full w-full object-cover' />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  onClick={() => next()}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/40'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5 text-white'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl'>{product.name}</h1>
              <div className='flex'>
                <span className='mr-1 border-b-orange text-orange'>{product.rating}</span>

                <ProductRating rating={5} />

                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>

                <div>
                  <span className='text-gray uppercase'>{formatNumberToSocialStyle(product.sold)} đã bán</span>
                </div>
              </div>

              <div className='mt-10 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>

              <QuatityControler
                value={buyCount}
                onDecrease={handleBuyCount}
                onIncrease={handleBuyCount}
                onType={handleBuyCount}
                max={product.quantity}
              />

              <div className='mt-10 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex items-center rounded-sm border border-orange bg-orange/20 p-4 capitalize text-orange'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-2 h-5 w-5 capitalize'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-4 flex items-center rounded-sm border border border-orange bg-orange p-4 px-8 capitalize text-white'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-200 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4  text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      </div>
    </div>
  )
}
