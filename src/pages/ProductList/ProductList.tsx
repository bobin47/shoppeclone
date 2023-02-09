import React, { useState } from 'react'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import productApi from '../../apis/product.api'
import Loading from '../../components/Loading'
import Paginate from '../../components/Paignate'
import { ProductListConfig } from '../../types/product.type'
import categoryApi from '../../apis/category.api'
import useQueryConfig from '../../hooks/useQueryConfig'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data, isLoading } = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12'>
            <div className='col-span-3'>
              <AsideFilter categoriesData={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>

            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              {isLoading && <Loading />}
              <div className='mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data?.data.data.products.map((product, index) => {
                  return (
                    <div className='col-span-1 ' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
