import { getProfileToLS, saveAccessTokenToLS, getAccessTokenToLS, clearLS, setProfileToLS } from '../auth'
import { describe, it, expect } from 'vitest'

const accessToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTU3ODA5MWFmYzJlMWExZjk2YWQxMiIsImVtYWlsIjoibGVob2FuZ2NodW9uZy5sa0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTA4VDEzOjA1OjExLjk5NFoiLCJpYXQiOjE2ODg4MjE1MTEsImV4cCI6MTY4OTQyNjMxMX0.TLRbPJ3AcDPubB-YQy9R2emZ1gIT0ibs_v6DGo0qPmU'
const profile =
  '{"_id":"64a578091afc2e1a1f96ad12","roles":["User"],"email":"lehoangchuong.lk@gmail.com","createdAt":"2023-07-05T14:02:49.487Z","updatedAt":"2023-07-08T14:07:17.481Z","date_of_birth":"2004-11-16T17:00:00.000Z","address":"viet nam1","name":"chuonng1","phone":"01231231231","avatar":"03f06662-44f6-4df9-95df-5c2f9a5c7352.png"}'

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
