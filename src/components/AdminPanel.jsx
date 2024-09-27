import React, { useState, useEffect } from 'react';
import axios from 'axios';
import filter from '../assets/images/filter.svg';
import sort from '../assets/images/sort.svg';
import add from '../assets/images/add.svg';
import bin from '../assets/images/bin.svg';
import delet from '../assets/images/delete.svg';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState(1);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    
    axios
      .get('https://migho-backend.onrender.com/v1/api/products', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      })
      .then((response) => {
        if (response.data && response.data.data && Array.isArray(response.data.data.results)) {
          setProducts(response.data.data.results);
        } else {
          console.error('Unexpected response format', response.data);
        }
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    
    axios
      .get('https://migho-backend.onrender.com/v1/api/quotes', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      })
      .then((response) => {
        if (response.data && response.data.data && Array.isArray(response.data.data.results)) {
          setContacts(response.data.data.results);
        } else {
          console.error('Unexpected response format', response.data);
        }
      })
      .catch((err) => console.error('Error fetching contacts:', err));
  }, []);

  return (
    <div className='md:flex md:px-[20px] gap-[20px]'>
      <nav className='bg-very-dark-grey p-6 flex items-center md:my-[20px] justify-between md:w-[250px] md:flex-col md:justify-start md:gap-[20px] md:px-[10px] md:rounded-[15px] md:py-[45px]'>
        <button onClick={() => setActiveSection(1)} className={`font-bold w-fit ${activeSection === 1 ? 'bg-custom-orange text-white px-[20px] py-[5px] rounded-[15px]' : 'text-custom-orange bg-transparent'}`}>Manage Products</button>
        <button onClick={() => setActiveSection(2)} className={`font-bold w-fit ${activeSection === 2 ? 'bg-custom-orange text-white px-[20px] py-[5px] rounded-[15px]' : 'text-custom-orange bg-transparent'}`}>View Contacts</button>
      </nav>

      <div className='md:p-[20px] border-very-dark-grey border-l-[1px] flex flex-col'>
        <div className='sort bg-white w-[100%] flex justify-between p-6 md:px-[50px] md:py-[10px] items-center md:bg-very-dark-grey md:rounded-[20px]'>
          <p className='text-custom-orange'>5 Bedroom duplex</p>
          <div className='flex gap-3'>
            <button className='flex items-center gap-2 p-2'>
              <img src={filter} alt='filter icon' className='w-5 md:w-[15px]' />
              Filter
            </button>
            <button className='flex items-center gap-2 p-2'>
              <img src={sort} alt='sort icon' className='w-4 md:w-[13px]' />
              Sort
            </button>
            <button className='flex items-center gap-2 text-white bg-custom-orange p-2 justify-center rounded md:rounded-[20px] md:px-[25px]'>
              <img src={add} alt='add icon' className='w-4 md:w-[15px]' />
              Add
            </button>
          </div>
        </div>

        <div className="container">
          {activeSection === 1 ? (
            <div className='products flex flex-col items-start md:flex-row flex-wrap gap-[20px] pt-[30px] pb-[60px]'>
              {products.map((product, index) => (
                <div key={index} className='product bg-very-dark-grey w-[90%] md:w-[250px] mx-auto p-[20px] rounded-[15px]'>
                  <img src={product.image[0]} alt="" className='w-[100%] mx-auto h-[250px] rounded-[15px] mb-[20px] md:h-[180px]' />
                  <div className='flex justify-between mb-[20px]'>
                    <p className='text-custom-orange font-bold text-[14px]'>{product.name}</p>
                    <button><img src={bin} alt="" className='w-[10px]' /></button>
                  </div>
                  <button className='bg-custom-orange text-white px-[15px] py-[5px] rounded-[20px] text-[13px]'>View details</button>
                </div>
              ))}
            </div>
          ) : (
            <div className='contacts-container flex flex-wrap gap-4 justify-center py-[30px]'>
  {contacts.map((contact, index) => (
    <div key={index} className='bg-very-dark-grey flex flex-col p-[20px] rounded-[15px] w-[300px]'>
      <div className="profile-container flex items-center mb-4">
        <div className="profile bg-very-dark-ash flex justify-center items-center rounded-full w-[50px] h-[50px]">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <p className="ml-4">{contact.name}</p>
      </div>
      <ul>
        <li>{contact.product_category}</li>
        <li>{contact.product}</li>
        <li>{contact.message}</li>
      </ul>

      <div className='flex justify-between'>
        <button>View details</button>
        <button><img src={delet} alt="" /></button>
      </div>
    </div>
  ))}
</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;






