import { SuccessResponseApi } from 'src/types/utils.type'
import { ProductListConfig, ProductList, Product } from '../types/product.type'
import http from '../utils/http'

const URL = 'products'
const productApi = {
  getProducts: (params: ProductListConfig) => {
    return http.get<SuccessResponseApi<ProductList>>(URL, {
      params
    })
  },
  getDetailProduct: (productId: string) => {
    return http.get<SuccessResponseApi<Product>>(`${URL}/${productId}`)
  }
}

export default productApi
