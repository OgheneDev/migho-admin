import React from 'react';
import ContactCard from './ContactCard';

const ContactList = ({ contacts }) => {
  return (
    <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5">
      {contacts.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;

