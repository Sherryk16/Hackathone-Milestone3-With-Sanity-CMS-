"use client";

import { useCart } from "@/app/components/CartProvider";
import { urlFor } from "@/sanity/lib/client";

import Image from "next/image";

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    // Handle form submission logic here
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Contact Information and Shipping Address */}
      <div className="lg:col-span-2 bg-gray-50 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#1D3178]">Contact Information</h2>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Already have an account? Log in
              </a>
            </div>
            <input
              type="email"
              placeholder="Email or mobile phone number"
              required
              className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            />
            <div className="flex items-center mt-4">
              <input type="checkbox" id="newsletter" className="mr-2" />
              <label htmlFor="newsletter" className="text-sm text-gray-600">
                Keep me up to date on news and exclusive offers
              </label>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-[#1D3178]">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name (optional)"
                className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              required
              className="w-full mt-4 border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full mt-4 border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="City"
                required
                className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
              />
              <input
                type="text"
                placeholder="Postal Code"
                required
                className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
              />
            </div>
            <div className="mt-4">
              <select
                className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
              >
                <option value="Bangladesh">Bangladesh</option>
                {/* Add more country options as needed */}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600"
          >
            Continue Shipping
          </button>
        </form>
      </div>

      {/* Cart Summary Section */}
      <div>
        <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Your Order
          </h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.currentSlug}
                className="flex justify-between items-center"
              >
                {/* Product Details */}
                <div className="flex items-center gap-4">
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size || "N/A"} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                {/* Product Price */}
                <div className="text-gray-800 font-medium">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-gray-800 font-medium mb-2">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-800 font-medium mb-4">
            <span>Totals:</span>
            <span>${(calculateSubtotal() + 15).toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
