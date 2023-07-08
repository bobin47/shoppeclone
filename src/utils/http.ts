import axios, { type AxiosInstance, AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.emum'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { saveAccessTokenToLS, clearLS, getAccessTokenToLS, setProfileToLS } from '../utils/auth'
import { path } from '../constants/path'
class Http {
  instance: AxiosInstance
  private access_token: string
  constructor() {
    this.access_token = getAccessTokenToLS()
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
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === `/${path.LOGIN}` || url === `/${path.REGISTER}`) {
          const user = (response.data as AuthResponse).data.user
          this.access_token = (response.data as AuthResponse).data.access_token
          saveAccessTokenToLS(this.access_token)
          setProfileToLS(user)
        } else if (url === `/${path.LOGOUT}`) {
          this.access_token = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
          window.location.reload()
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
}

const http = new Http().instance

export default http
