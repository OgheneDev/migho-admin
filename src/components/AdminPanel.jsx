import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductList from './ProductList'
import ContactList from './ContactList'
import filter from '../assets/images/filter.svg'
import sort from '../assets/images/sort.svg'
import add from '../assets/images/add.svg'

const AdminPanel = ({activeSection, products, contacts, isDropdownVisible, toggleDropdownVisibility}) => {

   const navigate = useNavigate();

   const handleDropdownClick = (category) => {
    navigate(`/add-product/${category}`)
   }

  return (
    <div className="md:p-5 border-very-dark-grey border-l-[1px]">
      <div className="sort bg-white md:bg-very-dark-grey flex justify-between p-6 md:py-[15px] items-center md:rounded-[25px]">
        <p className="text-custom-orange">5 Bedroom duplex</p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 p-2">
            <img src={filter} alt="Filter icon" className="w-5" />
            Filter
          </button>
          <button className="flex items-center gap-2 p-2">
            <img src={sort} alt="Sort icon" className="w-4" />
            Sort
          </button>
          <button onClick={toggleDropdownVisibility} className="flex items-center gap-2 text-white bg-custom-orange p-2 rounded-lg">
            <img src={add} alt="Add icon" className="w-4" />
            Add
          </button>
        </div>
      </div>

       {isDropdownVisible && (
        <div className='dropdown bg-white p-[20px] w-fit mx-auto'>
          <ul className='flex flex-col gap-[10px]'>
            <li className='text-custom-grey hover:text-custom-orange cursor-pointer' onClick={() => handleDropdownClick('agriculture')}>AGRICULTURE</li>
            <li className='text-custom-grey hover:text-custom-orange cursor-pointer' onClick={() => handleDropdownClick('transportation')}>TRANSPORTATION</li>
            <li className='text-custom-grey hover:text-custom-orange cursor-pointer' onClick={() => handleDropdownClick('real_estate')}>REAL ESTATE</li>
          </ul>
        </div>
       )}

      <div className="container">
        {activeSection === 1 ? (
          <ProductList products={products} />
        ) : (
          <ContactList contacts={contacts} />
        )}
      </div>
    </div>
  )
}

export default AdminPanel












