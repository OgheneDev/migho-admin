import React from 'react';
import { useNavigate } from 'react-router-dom';
import bin from '../assets/images/bin.svg';

const ProductCard = ({ product, onDeleteProduct }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/update-product/${product._id}`);
  };

  return (
    <div className="product bg-very-light-blue w-full p-4 rounded-lg">
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-full h-[150px] object-cover rounded-lg mb-3"
      />
      <div className="flex justify-between mb-3">
        <p className="text-custom-orange font-bold text-sm">{product.name}</p>
        <button onClick={onDeleteProduct}>
          <img src={bin} alt="Delete" className="w-3 h-3" />
        </button>
      </div>
      <button 
        className="bg-custom-orange text-white px-4 py-2 rounded-lg text-sm w-full"
        onClick={handleEditClick}
      >
        Edit product
      </button>
    </div>
  );
};

export default ProductCard;
