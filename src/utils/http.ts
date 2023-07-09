import axios, { type AxiosInstance, AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.emum'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from '../types/auth.type'
import {
  saveRefreshTokenToLS,
  saveAccessTokenToLS,
  clearLS,
  getRefreshTokenToLS,
  getAccessTokenToLS,
  setProfileToLS
} from '../utils/auth'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '../api/auth.api'
import { isAxiosUnauthorizedError, isAxiosExpiredTokenError } from '../utils/utils'
class Http {
  instance: AxiosInstance
  private access_token = getAccessTokenToLS()
  private refresh_token = getRefreshTokenToLS()
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.access_token = getAccessTokenToLS()
    this.refresh_token = getRefreshTokenToLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers && this.access_token) {
          config.headers.authorization = this.access_token
          return config
        }
        return config
      },
      (err) => {
        console.log(err)
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const user = (response.data as AuthResponse).data.user
          this.access_token = (response.data as AuthResponse).data.access_token
          this.refresh_token = (response.data as AuthResponse).data.refresh_token
          saveRefreshTokenToLS(this.refresh_token)
          saveAccessTokenToLS(this.access_token)
          setProfileToLS(user)
        } else if (url === URL_LOGOUT) {
          this.access_token = ''
          this.refresh_token = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        const url = error.response?.config.url || {}
        const config = error.response?.config
        if (isAxiosUnauthorizedError(error)) {
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  this.refreshTokenRequest = null
                })
            return this.refreshTokenRequest
              .then((access_token) => {
                if (config?.headers) config.headers.authorization = access_token
                return this.instance({ ...config, headers: { ...config?.headers, authorization: access_token } })
              })
              .catch()
          }
          clearLS()
          this.access_token = ''
          this.refresh_token = ''
          // window.location.reload()
        }
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }

        return Promise.reject(error)
      }
    )
  }
  private async handleRefreshToken() {
    const res = this.instance.post<RefreshTokenResponse>(URL_REFRESH_TOKEN, { refresh_token: this.refresh_token })
    try {
      const { access_token } = (await res).data.data
      saveAccessTokenToLS(access_token)
      this.access_token = access_token
      return access_token
    } catch (error) {
      clearLS()
      this.access_token = ''
      this.refresh_token = ''
      throw error
    }
  }
}

const http = new Http().instance

export default http
