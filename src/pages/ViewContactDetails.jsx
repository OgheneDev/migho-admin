import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewContactDetails = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contactId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(`https://migho-backend.onrender.com/v1/api/quotes/${contactId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setContact(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contact details. Please try again.');
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [contactId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!contact) return <div>No contact found</div>;

  return (
    <div className="md:max-w-2xl w-[90%] mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Name:</p>
          <p>{contact.name}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{contact.email}</p>
        </div>
        <div>
          <p className="font-semibold">Phone:</p>
          <p>{contact.phone_number}</p>
        </div>
        <div>
          <p className="font-semibold">Product Category:</p>
          <p>{contact.product_category}</p>
        </div>
        <div>
          <p className="font-semibold">Product:</p>
          <p>{contact.product}</p>
        </div>
        <div>
          <p className="font-semibold">Date:</p>
          <p>{new Date(contact.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
            <p>{contact.address}</p>
            <p>{contact.state}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Message:</p>
        <p>{contact.message}</p>
      </div>
      <button
        className="mt-6 bg-custom-orange text-white px-4 py-2 rounded hover:bg-orange-600"
        onClick={() => navigate(-1)}
      >
        Back to Contacts
      </button>
    </div>
  );
};

export default ViewContactDetails;