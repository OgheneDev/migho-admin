import React from 'react'
import logo from '../assets/images/logo.svg'
import search from '../assets/images/search.svg'

const Header = () => {
  return (
    <header className='flex justify-between p-5 font-sans border-very-dark-grey border-b-[1px]'>
      <div className='flex gap-2 items-center'>
        <img src={logo} alt="" className='w-9' />
        <h1 className='text-lg font-bold text-custom-orange'>Admin Dashboard</h1>
      </div>

      <form className='w-fi flex md:bg-very-light-blue px-[20px] md:rounded-[15px]'>
        <input type="text" placeholder='Search' className='bg-transparent outline-none px-3 py-2 hidden md:block  placeholder:text-custom-orange' />
        <button><img src={search} alt="" className='w-5' /></button>
      </form>
    </header>
  )
}

export default Header
