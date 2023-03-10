import axios, { AxiosError, AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.emun'
import { toast } from 'react-toastify'
import { AuthResponsive } from '../types/auth.type'
import { clearLS, saveAccessTokenToLS, getAccessToken, saveProfileLS } from './auth'
import path from '../constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        console.log(response)
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponsive
          this.accessToken = data.data.access_token
          saveAccessTokenToLS(this.accessToken)
          saveProfileLS(data.data.user)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
