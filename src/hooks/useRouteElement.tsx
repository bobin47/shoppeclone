import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { useContext } from 'react'
import { AppContext } from '../contexts/App.context'
import { path } from '../constants/path'

import Login from '../pages/Login'
import ProductList from '../pages/ProductList'
import Register from '../pages/Register'
import RegisterLayout from '../layouts/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
import Profile from '../pages/User/pages/Profile'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import UserLayout from '../pages/User/layout/UserLayout'
import Password from '../pages/User/pages/Password'
import HistoryPurchase from '../pages/User/pages/HistoryPurchase'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='login' />
}

function RejectedRout() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.PRODUCTDETAIL,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.CART,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        },
        {
          path: path.USER,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.PROFILE,
              element: <Profile />
            },
            {
              path: path.PASSWORD,
              element: <Password />
            },
            {
              path: path.PURCHASE,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRout />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElement
}
