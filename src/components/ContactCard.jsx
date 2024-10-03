import React from 'react';
import { useNavigate } from 'react-router-dom';
import delet from '../assets/images/delete.svg';
import add from '../assets/images/address.svg'
import phone from '../assets/images/phone.svg'

const ContactCard = ({ contact, onDeleteContact }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDeleteContact(contact._id);
  };

  const handleViewDetails = () => {
    navigate(`/contact-details/${contact._id}`);
  };

  return (
    <div className="bg-very-dark-grey w-[80%] mx-auto md:mx-0 md:w-full p-4 rounded-lg">
      <div className="profile-container flex items-center mb-4">
        <div className="profile bg-very-dark-ash flex justify-center items-center rounded-full w-[50px] h-[50px]">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <p className="ml-4 font-bold">{contact.name}</p>
      </div>
      <ul className='text-[12px] font-bold mb-[20px] flex flex-col gap-[20px]'>
        <li className='flex gap-[20px]'><img src={phone} alt="" className='w-3' /><p>{contact.phone_number}</p></li>
        <li className='flex gap-[20px]'><img src={add} alt="" className='w-3' /> <p>{contact.address}</p></li>
      </ul>
      <div className="flex justify-between mb-[20px]">
        <button 
          className="bg-very-dark-ash text-white text-[12px] py-[5px] px-[20px] rounded-[20px]"
          onClick={handleViewDetails}
        >
          View details
        </button>
        <button className='btn-delete' onClick={handleDelete}>
          <img src={delet} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
