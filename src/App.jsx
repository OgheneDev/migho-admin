import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import Dashboard from './pages/Dashboard'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<SignInPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App

