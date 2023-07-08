/* eslint-disable import/no-named-as-default-member */
import axios, { AxiosError } from 'axios'
import httpStatusCode from '../constants/httpStatusCode.emum'

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === httpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

export const handleNameProduct = (name: string) => {
  if (name.length > 30) {
    return name.substring(0, 29) + '...'
  }
}

const config = {
  baseUrl: 'https://api-ecom.duthanhduoc.com/'
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : 'hinh anh')
