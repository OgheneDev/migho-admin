import React from 'react';
import bin from '../assets/images/bin.svg';

const ProductCard = ({ product }) => {
  return (
    <div className="product bg-very-light-blue w-[85%] mx-auto md:w-[250px] p-5 rounded-lg">
      <img src={product.image[0]} alt={product.name} className="w-full h-[180px] rounded-lg mb-4" />
      <div className="flex justify-between mb-4">
        <p className="text-custom-orange font-bold">{product.name}</p>
        <button>
          <img src={bin} alt="Delete" className="w-4" />
        </button>
      </div>
      <button className="bg-custom-orange text-white px-5 py-2 rounded-lg">View details</button>
    </div>
  );
};

export default ProductCard;
