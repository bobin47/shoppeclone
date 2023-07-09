import { saveAccessTokenToLS, getAccessTokenToLS, clearLS } from '../auth'
import { describe, it, expect } from 'vitest'

const accessToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTU3ODA5MWFmYzJlMWExZjk2YWQxMiIsImVtYWlsIjoibGVob2FuZ2NodW9uZy5sa0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTA4VDEzOjA1OjExLjk5NFoiLCJpYXQiOjE2ODg4MjE1MTEsImV4cCI6MTY4OTQyNjMxMX0.TLRbPJ3AcDPubB-YQy9R2emZ1gIT0ibs_v6DGo0qPmU'

describe('saveAccessTokenToLS', () => {
  it('set accessToken in LS', () => {
    saveAccessTokenToLS(accessToken)
    expect(localStorage.getItem('access_token')).toBe(accessToken)
  })
})

describe('clearLS', () => {
  it('Xóa hết access_token, refresh_token, profile', () => {
    saveAccessTokenToLS(accessToken)
    clearLS()
    expect(getAccessTokenToLS()).toBe('')
  })
})
