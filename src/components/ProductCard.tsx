import React from 'react';

type ProductProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const ProductCard: React.FC<ProductProps> = ({ id, title, price, thumbnail }) => {
  return (
    <div style={{ border: '3px solid #ccc', padding: '10px', width: '200px' }}>
      <img src={thumbnail} alt={title} style={{ width: '100%' }} />
      <h4>{title}</h4>
      <p>Price: ${price}</p>
    </div>
  );
};

export default ProductCard;
