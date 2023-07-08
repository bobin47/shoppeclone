import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Schema, schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../api/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import Button from '../../components/Button'
import { path } from '../../constants/path'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../../contexts/App.context'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const navigate = useNavigate()
  const { setProfile, setIsAuthenticated } = useContext(AppContext)
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        const message = data.data.message
        toast.success(message)
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError?.email) {
            setError('email', {
              message: formError.email
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password
            })
          }
        }
      }
    })
  })

  return (
    <div>
      <div className='bg-orange'>
        <div className='container'>
          <div className='grid grid-cols-1 p-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
            <div className='p0 lg:col-span-2 lg:col-start-4'>
              <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
                <div className='text-2xl'>Đăng Ký</div>

                <Input
                  name='email'
                  className='mt-4'
                  placeholder='email'
                  type='text'
                  register={register}
                  errorMessage={errors.email?.message}
                />

                <Input
                  name='password'
                  className='mt-4'
                  placeholder='password'
                  type='password'
                  register={register}
                  errorMessage={errors.password?.message}
                />

                <Input
                  name='confirm_password'
                  className='mt-4'
                  placeholder='confirm password'
                  type='password'
                  register={register}
                  errorMessage={errors.confirm_password?.message}
                />

                <div className='mt-3'>
                  <Button
                    isLoading={registerAccountMutation.isLoading}
                    disabled={registerAccountMutation.isLoading}
                    className=' flex w-full items-center justify-center bg-red-500 py-4 text-sm uppercase text-white hover:bg-red-600'
                  >
                    Đăng Ký
                  </Button>
                </div>
                <div className='mt-8 text-center'>
                  <div className='flex items-center justify-center'>
                    <span className='text-gray-400'>Bạn đã có tài khoảng?</span>
                    <Link to={`/${path.LOGIN}`} className='ml-2 text-red-400'>
                      Đăng Ký
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
