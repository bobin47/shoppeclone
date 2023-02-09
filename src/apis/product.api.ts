import { SuccessResponse } from './../types/utils.type'
import { ProductListConfig, ProductList, Product } from './../types/product.type'
import http from '../utils/http'
const URL = '/products'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },

  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
