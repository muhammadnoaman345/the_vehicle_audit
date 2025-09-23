"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePayment from "@/components/StripePayment";

// Load Stripe public key (from .env.local)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    billingAddress: "",
    packageName: "Basic Package",
  });

  const [amount, setAmount] = useState(10); // 💰 Default amount (can be dynamic)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted ✅ (user data saved, now proceed with payment)");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* ✅ Your old form */}
      <form
        onSubmit={handleFormSubmit}
        className="space-y-4 p-4 border rounded-lg shadow"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
          value={formData.billingAddress}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Amount input (dynamic) */}
        <input
          type="number"
          name="amount"
          placeholder="Enter Amount ($)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-2 border rounded w-full"
          min="1"
        />

        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          Save Details
        </button>
      </form>

      {/* ✅ Stripe Card Payment */}
      <Elements stripe={stripePromise}>
        <StripePayment amount={amount} userData={formData} />
      </Elements>
    </div>
  );
}
