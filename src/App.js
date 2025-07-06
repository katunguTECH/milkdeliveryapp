import React from 'react';
import ProductList from './components/ProductList';
import CheckoutForm from './components/CheckoutForm';
import CartView from './components/CartView';
import OrderAssistant from './components/OrderAssistant'; // Import the new OrderAssistant component

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Dear Mama Milk Delivery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ProductList />
        </div>

        {/* Cart View */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CartView />
        </div>

        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CheckoutForm />
        </div>

        {/* AI Order Assistant - New Component */}
        <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg shadow-md h-[500px] flex flex-col">
          <OrderAssistant />
        </div>
      </div>
    </div>
  );
}

export default App;



