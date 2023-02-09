import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: { value: true, message: 'Email là bắt buộc' },
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không đúng định dạng' },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 đến 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 đến 160 ký tự'
    }
  },
  password: {
    required: { value: true, message: 'Mật khẩu là bắt buộc' },
    minLength: {
      value: 6,
      message: 'Độ dài từ 5 đến 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 đến 160 ký tự'
    }
  },
  confirm_password: {
    required: { value: true, message: 'Mật khẩu là bắt buộc' },
    minLength: {
      value: 6,
      message: 'Độ dài từ 5 đến 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 đến 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
        : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('email Khong dung dinh dang')
    .min(5, 'Độ dài từ 5 đến 160 ký tự')
    .max(160, 'Độ dài từ 5 đến 160 ký tự'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Độ dài từ 5 đến 160 ký tự')
    .max(160, 'Độ dài từ 5 đến 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 5 đến 160 ký tự')
    .max(160, 'Độ dài từ 5 đến 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhap lai pass khong dung'),
  name: yup.string().required('ten sp la bat buoc').trim()
})

export type Schema = yup.InferType<typeof schema>
