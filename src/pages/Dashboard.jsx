import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AdminPanel from '../components/AdminPanel'

const Dashboard = () => {
  const navigate = useNavigate();
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
  const [selectedOption, setSelectedOption] = useState('');

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
      
      Swal.fire({
        title: 'Success!',
        text: 'Product deleted successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete product. Try again later!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  const updateProduct = async (productId, updatedFields) => {
    try {
      const response = await axios.put(
        `https://migho-backend.onrender.com/v1/api/products/${productId}`,
        updatedFields,
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );

      // Update the product in the state
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === productId ? { ...product, ...response.data.data } : product
        )
      );
      setFilteredProducts(prevFiltered =>
        prevFiltered.map(product =>
          product._id === productId ? { ...product, ...response.data.data } : product
        )
      );

      Swal.fire({
        title: 'Success!',
        text: 'Product has been updated successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update product. Please try again.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value) {
      // Navigate to the selected link
      navigate(value);
    }
  }

  return (
    <div>
      <Header
        isVisible={isVisible}
        toggleVisibility={() => setIsVisible(!isVisible)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
        selectedOption={selectedOption}
        handleSelectChange={handleSelectChange}
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
          onUpdateProduct={updateProduct}
          onEditProduct={handleEditProduct}
        />
      </div>
    </div>
  )
}

export default Dashboard

