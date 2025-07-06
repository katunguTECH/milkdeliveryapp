import React from 'react';
import ProductList from './components/ProductList';
import CheckoutForm from './components/CheckoutForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Milk Delivery App</h1>
      <ProductList />
      <CheckoutForm />
    </div>
  );
}

export default App;


