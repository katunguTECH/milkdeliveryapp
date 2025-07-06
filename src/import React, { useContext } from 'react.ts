import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: '1 Box (12 pcs) Longlife Milk – 500 ml',
    price: 650,
  },
];

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Available Milk</h2>
      {products.map((product) => (
        <div key={product.id} className="border p-4 mb-2 rounded">
          <h3 className="font-semibold">{product.name}</h3>
          <p>Kshs {product.price.toLocaleString()}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
