import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import settings from '../assets/images/settings.svg'

const SettingsPage = () => {
  return (
    <div>
       <header className='p-5 font-sans border-very-dark-grey border-b-[1px]'>
       <div className="flex gap-2 items-center">
         <Link to='/dashboard'><img src={logo} alt="Logo" className="w-9" /></Link>
          <div className='flex gap-[10px]'>
          <h1 className="text-lg font-bold text-custom-orange">Admin Dashboard/</h1>
          <Link to='/settings'><button><img src={settings} alt="" /></button></Link>
          </div>
        </div>
       </header>
    </div>
  )
}

export default SettingsPage
