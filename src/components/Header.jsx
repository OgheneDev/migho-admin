import React from 'react'
import { Link } from 'react-router-dom'
import settings from '../assets/images/settings.svg'
import logo from '../assets/images/logo.svg'
import searchIcon from '../assets/images/search.svg'

const Header = ({ isVisible, toggleVisibility, searchQuery, setSearchQuery, handleSearchSubmit, selectedOption,handleSelectChange  }) => {
  return (
    <header className="p-5 font-sans border-very-dark-grey border-b-[1px]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Link to='/dashboard'><img src={logo} alt="Logo" className="w-9" /></Link>
          <div className='flex gap-[10px]'>
          <h1 className="text-lg font-bold text-custom-orange">Admin Dashboard/</h1>
          <Link to='/settings'><button><img src={settings} alt="" /></button></Link>
          </div>
        </div>

        <button className="md:hidden" onClick={toggleVisibility}>
          <img src={searchIcon} alt="Search" className="w-5" />
        </button>

        <form className="search-form hidden bg-very-light-blue md:flex items-center px-5 py-2 rounded-[20px]" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none placeholder:text-custom-orange"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <img src={searchIcon} alt="Search" className="w-4" />
          </button>
        </form>
      </div>

      {isVisible && (
        <form className="mt-5 flex bg-very-light-blue px-5 py-3 rounded-lg md:hidden w-[250px] mx-auto" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <img src={searchIcon} alt="Search" className="w-5" />
          </button>
        </form>
      )}
    </header>
  )
}

export default Header
