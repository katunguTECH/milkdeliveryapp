import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartView = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="p-4 bg-yellow-100 rounded text-yellow-800">
        Your cart is empty.
      </div>
    );
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b pb-2 mb-2">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>Kshs {item.price.toLocaleString()}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center font-bold text-lg">
        <span>Total:</span>
        <span>Kshs {totalAmount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CartView;
