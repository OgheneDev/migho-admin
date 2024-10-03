import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import trash from '../assets/images/bin.svg';
import settings from '../assets/images/settings.svg'

const SettingsPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://migho-backend.onrender.com/v1/api/admin/users', {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      
      // Log the entire response for debugging
      console.log('API Response:', response);
  
      // Access users from the results array inside data
      const userData = response.data?.data?.results;
  
      if (userData && Array.isArray(userData)) {
        setUsers(userData);
      } else {
        throw new Error('Unable to extract user data from API response');
      }
    } catch (err) {
      setError('Failed to fetch users: ' + (err.response?.data?.message || err.message));
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://migho-backend.onrender.com/v1/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user: ' + (err.response?.data?.message || err.message));
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-custom-orange">Admin Dashboard</span>
          </Link>
          <Link to="/settings">
            <img src={settings} alt="Settings" className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Access Control</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            {users.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Username</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                         {user.last_login}
                        </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <img src={trash} alt="Delete" className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-4">No users found</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SettingsPage;
