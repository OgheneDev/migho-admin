import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="grid grid-cols-2 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i}>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-16 bg-gray-200 rounded"></div>
    </div>
    <div className="mt-6 h-10 bg-gray-200 rounded w-1/4"></div>
  </div>
);

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

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 py-[100px]">
      <div className="md:max-w-2xl w-[90%] mx-auto p-6 bg-white rounded-lg shadow-md">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
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
                <p className="font-semibold">Address:</p>
                <p>{contact.address}</p>
              </div>
              <div>
                <p className="font-semibold">State:</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ViewContactDetails;