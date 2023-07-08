import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rule = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rule => ({
  email: {
    required: {
      value: true,
      message: 'Email la bac buoc'
    },
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: 'Email khong dung dinh dang'
    }
  },
  password: {
    minLength: {
      value: 4,
      message: 'Pass 4 ky tu tro len'
    },
    maxLength: {
      value: 160,
      message: 'duoi 160 ky tu'
    },
    required: {
      value: true,
      message: 'Password la bac buoc'
    }
  },
  confirm_password: {
    minLength: {
      value: 4,
      message: 'tu 4 ky tu tro len'
    },
    maxLength: {
      value: 160,
      message: 'duoi 160 ky tu'
    },
    required: {
      value: true,
      message: 'confirm password la bac buoc'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhap password khong khop'
        : undefined
  }
})
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: handleConfirmPasswordYup('password'),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
