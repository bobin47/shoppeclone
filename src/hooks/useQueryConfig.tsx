import React from 'react'
import useQueryParams from './useQueryParams'
import { omitBy, isUndefined } from 'lodash'
import { ProductListConfig } from '../types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
