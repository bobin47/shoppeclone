type Rule = 'User' | 'Admin'

export interface User {
  _id: string
  roles: Rule[]
  email: string
  name: string
  date_of_birth: string
  address: string
  phone: string
  createdAt: string
  updatedAt: string
  avatar: string
}
