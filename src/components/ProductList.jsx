import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onDeleteProduct }) => {
  return (
    <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
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

