import { SuccessResponse } from './../types/utils.type'
import { Purchase, PurchaseListStatus } from './../types/purchase.type'
import http from '../utils/http'

const URL = 'purchases'

const pruchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },

  getPurchase(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, { params })
  }
}

export default pruchaseApi
