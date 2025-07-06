import React from 'react';

const Checkout = () => (
  <div className="p-4">
    <h2 className="text-xl mb-4">Checkout</h2>
    <form className="flex flex-col max-w-md">
      <input className="mb-2 p-2 border" placeholder="Your Address" />
      <input className="mb-2 p-2 border" placeholder="Payment Info" />
      <button className="bg-green-500 text-white px-4 py-2">
        Place Order
      </button>
    </form>
  </div>
);

export default Checkout;
