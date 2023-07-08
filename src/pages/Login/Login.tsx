import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Schema, schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../api/auth.api'
import { isAxiosUnprocessableEntityError } from '../..//utils/utils'
import { ErrorResponseApi } from '../../types/utils.type'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../../contexts/App.context'
import Button from '../../components/Button'
import { path } from '../../constants/path'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })

  // const rules = getRules()

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        const message = data.data.message
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
        toast.success(message)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
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
                <div className='text-2xl'>Đăng Nhâp</div>
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

                <div className='mt-2'>
                  <Button
                    isLoading={loginAccountMutation.isLoading}
                    disabled={loginAccountMutation.isLoading}
                    className=' flex w-full items-center justify-center bg-red-500 py-4 text-sm uppercase text-white hover:bg-red-600'
                  >
                    Đăng Nhập
                  </Button>
                  {/* <button className=' flex w-full justify-center bg-red-500 py-4 text-sm uppercase text-white hover:bg-red-600'>
                    Đăng Nhập
                  </button> */}
                </div>
                <div className='mt-8 text-center'>
                  <div className='flex items-center justify-center'>
                    <span className='text-gray-400'>Bạn đã có tài khoảng?</span>
                    <Link to={`/${path.REGISTER}`} className='ml-2 text-red-400'>
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
