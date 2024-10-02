import React from 'react';
import delet from '../assets/images/delete.svg';

const ContactCard = ({ contact }) => {
  return (
    <div className="bg-very-dark-grey w-full p-4 rounded-lg">
      <div className="profile-container flex items-center mb-4">
        <div className="profile bg-very-dark-ash flex justify-center items-center rounded-full w-[50px] h-[50px]">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <p className="ml-4 font-bold">{contact.name}</p>
      </div>
      <ul className='text-[12px] font-bold mb-[20px]'>
        <li>{contact.product_category}</li>
        <li>{contact.product}</li>
        <li>{contact.message}</li>
      </ul>
      <div className="flex justify-between">
        <button className="bg-very-dark-ash text-white text-[12px] py-[5px] px-[20px] rounded-[20px]">View details</button>
        <button><img src={delet} alt="Delete" /></button>
      </div>
    </div>
  );
};

export default ContactCard;
