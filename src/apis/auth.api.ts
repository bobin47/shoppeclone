import { AuthResponsive } from '../types/auth.type'
import http from '../utils/http'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponsive>('/register', body),
  loginAccount: (body: { email: string; password: string }) => http.post<AuthResponsive>('/login', body),
  logoutAccount: () => http.post<AuthResponsive>('/logout')
}

export default authApi
