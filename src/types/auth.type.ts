import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponsive = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
