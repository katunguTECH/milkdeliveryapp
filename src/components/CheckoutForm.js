import React from 'react';

const CheckoutForm = () => {
  return (
    <form
      action="https://formsubmit.co/dearmamamilkdelivery@gmail.com"
      method="POST"
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Delivery & Payment</h2>

      <input type="hidden" name="_subject" value="New Milk Delivery Order!" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="Customer Name"
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <label className="block mb-2">
        Address:
        <textarea
          name="Delivery Address"
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <label className="block mb-2">
        Phone:
        <input
          type="tel"
          name="Phone Number"
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <label className="block mb-4">
        Payment Method:
        <select
          name="Payment Method"
          className="w-full p-2 border rounded mt-1"
          required
        >
          <option value="M-Pesa">M-Pesa</option>
          <option value="Pay on Delivery">Pay on Delivery</option>
        </select>
      </label>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Submit Order
      </button>
    </form>
  );
};

export default CheckoutForm;

