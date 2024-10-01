import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import Dashboard from './pages/Dashboard'
import AddProductForm from './pages/AddProductForm'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<SignInPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-product/:category' element={<AddProductForm />} />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App

