import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import ContactList from './ContactList';
import filter from '../assets/images/filter.svg';
import add from '../assets/images/add.svg';

const AdminPanel = ({
  activeSection,
  products,
  contacts,
  isDropdownVisible,
  toggleDropdownVisibility,
  isCategoryVisible,
  toggleCategoryVisibility,
  filterProductsByCategory,
  activeCategory,
  onDeleteProduct,
  onUpdateProduct,
  onEditProduct,
  onDeleteContact
}) => {
  const navigate = useNavigate();

  const handleDropdownClick = (category) => {
    navigate(`/add-product/${category}`);
  };

  const categories = ['agriculture', 'transportation', 'real_estate'];

  return (
    <div className="flex flex-col w-full">
      <div className="sort-container w-full bg-white md:bg-very-dark-grey">
        <div className="sort flex justify-between p-6 md:py-[15px] items-center max-w-screen-xl mx-auto w-full">
          <p className="text-custom-orange">Admin Panel</p>
          <div className="flex gap-3">
            <button onClick={toggleCategoryVisibility} className="flex items-center gap-2 p-2">
              <img src={filter} alt="Filter icon" className="w-5" />
              Filter
            </button>
            <button onClick={toggleDropdownVisibility} className="flex items-center gap-2 text-white bg-custom-orange p-2 rounded-lg">
              <img src={add} alt="Add icon" className="w-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="content-container md:p-5 border-very-dark-grey border-l-[1px] max-w-screen-xl mx-auto w-full">
        {isDropdownVisible && (
          <div className='dropdown bg-white p-[20px] w-fit md:ml-auto ml-0 mx-auto'>
            <ul className='flex flex-col gap-[10px]'>
              <li className='text-custom-grey hover:text-custom-orange cursor-pointer' onClick={() => handleDropdownClick('agriculture')}>AGRICULTURE</li>
              <li className='text-custom-grey hover:text-custom-orange cursor-pointer' onClick={() => handleDropdownClick('transportation')}>TRANSPORTATION</li>
              <li className='text-custom-grey hover:text-custom-orange cursor-pointer' onClick={() => handleDropdownClick('real_estate')}>REAL ESTATE</li>
            </ul>
          </div>
        )}

        {isCategoryVisible && (
          <div className="category-dropdown bg-white p-[20px] w-fit md:ml-[70%] ml-0">
            <ul className='flex flex-col gap-[10px]'>
              {categories.map((category) => (
                <li
                  key={category}
                  className={`text-custom-grey hover:text-custom-orange cursor-pointer uppercase ${activeCategory === category ? 'text-custom-orange font-bold' : ''}`}
                  onClick={() => filterProductsByCategory(category)}
                >
                  {category.replace('_', ' ')}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="container">
          {activeSection === 1 ? (
            <ProductList
              products={products}
              onDeleteProduct={onDeleteProduct}
              onUpdateProduct={onUpdateProduct}
              onEditProduct={onEditProduct}
            />
          ) : (
            <ContactList 
              contacts={contacts} 
              onDeleteContact={onDeleteContact} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;












