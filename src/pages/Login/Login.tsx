import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { isAxiosUnprocessableEntity } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import authApi from '../../apis/auth.api'
import Input from '../../components/Input/Input'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    // loginAccountMutation.mutate(data, {
    //   onSuccess: (data) => {
    //     console.log(data)
    //     setIsAuthenticated(true)
    //     setProfile(data.data.data.user)
    //     navigate('/')
    //   },
    //   onError: (err) => {
    //     if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(err)) {
    //       const formError = err.response?.data.data
    //       if (formError?.email) {
    //         setError('email', {
    //           message: formError.email,
    //           type: 'Server'
    //         })
    //       }
    //       if (formError?.password) {
    //         setError('email', {
    //           message: formError.password,
    //           type: 'Server'
    //         })
    //       }
    //     }
    //   }
    // })
  })

  const hh = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 p-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='p0 lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={hh} noValidate>
              <div className='text-2xl'>Đăng Nhâp</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-6'
                errorMessage={errors.email?.message}
                placeholder='email'
              />

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='password'
              />

              <div className='mt-6'>
                <Button
                  type='submit'
                  className=' flex w-full justify-center bg-red-500 py-4 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng Nhập
                </Button>
              </div>

              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoảng?</span>
                  <Link to='/register' className='ml-2 text-red-400'>
                    Đăng Ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
