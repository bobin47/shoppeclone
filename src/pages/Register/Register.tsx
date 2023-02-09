import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { schema, Schema } from '../../utils/rules'
import Input from '../../components/Input/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import _ from 'lodash'
import { isAxiosUnprocessableEntity } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'
type FormData = Schema

export default function Register() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = _.omit(data, ['confirm_password'])
    console.log(body)
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate
      },
      onError: (err) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(err)) {
          const formError = err.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('email', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 p-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='p0 lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
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

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm-password'
              />

              <div className='mt-6'>
                <Button
                  className=' flex w-full justify-center bg-red-500 py-4 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng Ký
                </Button>
              </div>

              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoảng?</span>
                  <Link to='/login' className='ml-2 text-red-400'>
                    Đăng Nhập
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
