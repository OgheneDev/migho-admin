import React from 'react';
import delet from '../assets/images/delete.svg';

const ContactCard = ({ contact }) => {
  return (
    <div className="bg-very-dark-grey flex flex-col p-5 rounded-lg w-[300px]">
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
      <div className="flex justify-between">
        <button>View details</button>
        <button><img src={delet} alt="Delete" /></button>
      </div>
    </div>
  );
};

export default ContactCard;
