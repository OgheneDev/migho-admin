import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AdminPanel from '../components/AdminPanel'

const Dashboard = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeSection, setActiveSection] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    fetchContacts();
  }, []);

  const getAuthToken = () => localStorage.getItem('authToken');

  const fetchAllProducts = () => {
    axios.get('https://migho-backend.onrender.com/v1/api/products', {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    })
    .then(response => setProducts(response.data.data.results || []))
    .catch(err => console.error('Error fetching products:', err));
  };

  const fetchFilteredProducts = (query) => {
    axios.get(`https://migho-backend.onrender.com/v1/api/products?search=${query}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    })
    .then(response => setFilteredProducts(response.data.data.results || []))
    .catch(err => console.error('Error fetching filtered products:', err));
  };

  const fetchContacts = () => {
    axios.get('https://migho-backend.onrender.com/v1/api/quotes', {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    })
    .then(response => setContacts(response.data.data.results || []))
    .catch(err => console.error('Error fetching contacts:', err));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(Boolean(searchQuery));
    if (searchQuery) fetchFilteredProducts(searchQuery);
  };


  return (
    <div>
      <Header
       isVisible = {isVisible}
       toggleVisibility = {() => {setIsVisible(!isVisible)}}
       searchQuery = {searchQuery}
       setSearchQuery = {setSearchQuery}
       handleSearchSubmit = {handleSearchSubmit}
      />
      <div className='md:flex md:px-5 gap-5'>
         <Sidebar
          activeSection = {activeSection}
          setActiveSection = {setActiveSection}
         />
         <AdminPanel
           activeSection = {activeSection}
           products = {isSearching ? filteredProducts : products}
           contacts = {contacts}
           isDropdownVisible = {isDropdownVisible}
           toggleDropdownVisibility = {() => {setIsDropdownVisible(!isDropdownVisible)}}
         />
      </div>
    </div>
  )
}

export default Dashboard
