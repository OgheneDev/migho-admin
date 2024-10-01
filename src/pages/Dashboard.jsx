import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AdminPanel from '../components/AdminPanel'

const Dashboard = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeSection, setActiveSection] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState('agriculture');

  useEffect(() => {
    fetchAllProducts();
    fetchContacts();
  }, []);

  useEffect(() => {
    filterProductsByCategory(activeCategory);
  }, [products, activeCategory]);

  const getAuthToken = () => localStorage.getItem('authToken');

  const fetchAllProducts = async () => {
    try {
      let allProducts = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get(`https://migho-backend.onrender.com/v1/api/products?page=${page}&limit=100`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });

        const { results, totalPages } = response.data.data;
        allProducts = [...allProducts, ...results];

        if (page >= totalPages) {
          hasMore = false;
        }
        page++;
      }

      setProducts(allProducts);
      filterProductsByCategory('agriculture');
    } catch (err) {
      console.error('Error fetching products:', err);
    }
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

  const filterProductsByCategory = (category) => {
    setActiveCategory(category);
    const filtered = products.filter(product => product.category === category);
    setFilteredProducts(filtered);
    setIsSearching(true);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://migho-backend.onrender.com/v1/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      
      // Remove the product from the state
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      setFilteredProducts(prevFiltered => prevFiltered.filter(product => product._id !== productId));
      
      alert('Product has been deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <div>
      <Header
        isVisible={isVisible}
        toggleVisibility={() => setIsVisible(!isVisible)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
      />
      <div className='md:flex md:px-5 gap-5'>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <AdminPanel
          activeSection={activeSection}
          products={isSearching ? filteredProducts : products}
          contacts={contacts}
          isDropdownVisible={isDropdownVisible}
          toggleDropdownVisibility={() => setIsDropdownVisible(!isDropdownVisible)}
          isCategoryVisible={isCategoryVisible}
          toggleCategoryVisibility={() => setIsCategoryVisible(!isCategoryVisible)}
          filterProductsByCategory={filterProductsByCategory}
          activeCategory={activeCategory}
          onDeleteProduct={deleteProduct}
        />
      </div>
    </div>
  )
}

export default Dashboard

