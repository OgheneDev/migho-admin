import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onDeleteProduct }) => {
  return (
    <div className="products flex flex-wrap gap-5 pt-5">
      {products.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product} 
          onDeleteProduct={() => onDeleteProduct(product._id)}
        />
      ))}
    </div>
  );
};

export default ProductList;

