import { SuccessResponseApi } from './utils.type'
import { User } from './user.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  expires: number
  expires_refresh_token: number
  refresh_token: string
  user: User
}>

export type RefreshTokenResponse = SuccessResponseApi<{ access_token: string }>
