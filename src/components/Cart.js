import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="border p-2 mb-2">
            {item.name} - Kshs {item.price.toLocaleString()}
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
