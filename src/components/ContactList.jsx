import React from 'react';
import ContactCard from './ContactCard';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
      {contacts.map((contact) => (
        <ContactCard key={contact._id} contact={contact} onDeleteContact={onDeleteContact} />
      ))}
    </div>
  );
};

export default ContactList

