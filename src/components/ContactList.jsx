import React from 'react';
import ContactCard from './ContactCard';

const ContactList = ({ contacts }) => {
  return (
    <div className="contacts-container flex flex-wrap gap-4 py-5">
      {contacts.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;

