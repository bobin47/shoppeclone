import { useState } from 'react'
import './App.css'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const RouteElement = useRouteElement()

  return (
    <div>
      {RouteElement}
      <ToastContainer />
    </div>
  )
}

export default App
