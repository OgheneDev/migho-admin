import React, { useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import plusIcon from '../assets/images/plus-icon.svg';

// Function to get the auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');

const UpdateProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`https://migho-backend.onrender.com/v1/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      const product = response.data.data;
      setProductName(product.name);
      setProductDescription(product.description);
      setProductCategory(product.category);
      setProductPrice(product.price.toString());
      // Set existing images as files with preview
      setFiles(product.image.map((url) => ({
        name: url.split('/').pop(),
        preview: url,
      })));
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to fetch product data. Please try again.');
    }
  };

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  // Initialize the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  // Capitalize first letter of a string
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productDescription || files.length === 0) {
      setError('Please fill all fields and have at least one image.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const authToken = getAuthToken();
      let imageUrls = files.filter(file => file.preview.startsWith('http')).map(file => file.preview);

      // Upload new images if any
      const newFiles = files.filter(file => !file.preview.startsWith('http'));
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => {
          formData.append('image', file);
        });

        const imageUploadResponse = await axios.post(
          'https://migho-backend.onrender.com/v1/api/products/upload-image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        imageUrls = [...imageUrls, ...imageUploadResponse.data.data.images];
      }

      // Prepare product data
      const productData = {
        name: productName,
        description: productDescription,
        category: productCategory,
        price: parseFloat(productPrice),
        image: imageUrls,
      };

      // Update product
      await axios.put(
        `https://migho-backend.onrender.com/v1/api/products/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      alert('Product updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      handleError(error);
    }
  };

  // Handle error
  const handleError = (error) => {
    setUploading(false);
    console.error('Full error object:', error);

    if (error.response) {
      console.error('Error response:', error.response.data);
      setError(`Update failed: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      setError('No response from the server. Please try again.');
    } else {
      console.error('Error message:', error.message);
      setError(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="bg-very-dark-grey md:py-[100px]">
      <form onSubmit={handleSubmit} className="p-[30px] md:w-[600px] md:mx-auto bg-white rounded-[15px]">
        <h1 className="text-2xl mb-4 text-custom-orange font-bold">
          Update {capitalizeFirstLetter(productCategory)} Product
        </h1>

        {/* Product Name Input */}
        <div className="form-group mb-4">
          <label htmlFor="product-name" className="block mb-2 text-[13px] text-custom-grey uppercase">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Product name"
            className="w-full border border-gray-300 px-[15px] py-[5px] rounded-[25px] placeholder:text-[12px]"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* Product Description Input */}
        <div className="form-group mb-4">
          <label htmlFor="product-description" className="block mb-2 text-[13px] text-custom-grey uppercase">
            Product Description
          </label>
          <textarea
            id="product-description"
            placeholder="Product description"
            className="w-full border border-gray-300 px-[15px] py-[10px] rounded-[15px] placeholder:text-[12px]"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>

        {/* Product Price Input */}
        <div className="form-group mb-4">
          <label htmlFor="product-price" className="block mb-2 text-[13px] text-custom-grey uppercase">
            Product Price
          </label>
          <input
            id="product-price"
            type="number"
            placeholder="Product price"
            className="w-full border border-gray-300 px-[15px] py-[5px] rounded-[25px] placeholder:text-[12px]"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div className="md:flex md:items-end md:justify-between">
          {/* Drag-and-Drop Area */}
          <div
            {...getRootProps()}
            className={`relative w-[80%] cursor-pointer md:w-[300px] h-[300px] border-2 border-dashed rounded-[15px] flex items-center justify-center ${
              isDragActive ? 'border-green-500' : 'border-gray-300'
            }`}
            style={{ backgroundColor: '#D3D3D3' }}
          >
            <input {...getInputProps()} />
            <div className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <img src={plusIcon} alt="Plus Icon" className="w-6" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-custom-orange text-white py-[5px] px-[25px] uppercase rounded-[25px]"
            disabled={uploading}
          >
            {uploading ? 'Updating...' : 'Update'}
          </button>
        </div>

        {/* Display error if any */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* File Previews */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {files.map((file) => (
            <div key={file.name} className="relative w-full h-32 border rounded-md overflow-hidden">
              <img
                src={file.preview}
                alt={file.name}
                className="object-cover w-full h-full"
                onLoad={() => {
                  if (!file.preview.startsWith('http')) {
                    URL.revokeObjectURL(file.preview);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;