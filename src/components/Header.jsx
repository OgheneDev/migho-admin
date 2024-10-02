import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import searchIcon from '../assets/images/search.svg'

const Header = ({ isVisible, toggleVisibility, searchQuery, setSearchQuery, handleSearchSubmit, selectedOption,handleSelectChange  }) => {
  return (
    <header className="p-5 font-sans border-very-dark-grey border-b-[1px]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="Logo" className="w-9" />
          <div className='flex'>
          <h1 className="text-lg font-bold text-custom-orange">Admin Dashboard</h1>
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="/dashboard">Home</option>
            <option value="/settings">Settings</option>
          </select>
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
        <form className="mt-5 flex bg-very-light-blue px-5 py-3 rounded-lg md:hidden" onSubmit={handleSearchSubmit}>
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
