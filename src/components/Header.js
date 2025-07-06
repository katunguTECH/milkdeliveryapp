import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-green-600 p-4 text-white flex justify-between">
    <h1>Milk Delivery App</h1>
    <nav>
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/cart" className="mr-4">Cart</Link>
      <Link to="/checkout">Checkout</Link>
    </nav>
  </header>
);

export default Header;
