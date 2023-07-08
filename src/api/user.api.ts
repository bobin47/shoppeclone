import { SuccessResponseApi } from '../types/utils.type'
import http from '../utils/http'
import { User } from '../types/user.type'

export const userApi = {
  getProfile() {
    return http.get<SuccessResponseApi<User>>('me')
  },

  upDateProfile(body: User) {
    return http.put<SuccessResponseApi<User>>('user', body)
  },

  uploadAvatar(body: FormData) {
    return http.post<SuccessResponseApi<string>>('user/upload-avatar', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
