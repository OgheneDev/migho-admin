import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import Dashboard from './pages/Dashboard'
import AddProductForm from './pages/AddProductForm'
import UpdateProductForm from './pages/updateProductForm'
import SettingsPage from './pages/SettingsPage'
import ViewContactDetails from './pages/ViewContactDetails'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<SignInPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-product/:category' element={<AddProductForm />} />
        <Route path="/update-product/:productId" element={<UpdateProductForm />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path="/contact-details/:contactId" element={<ViewContactDetails />} />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App

