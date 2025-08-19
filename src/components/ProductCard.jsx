"use client";

import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : "Default"
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : "One Size"
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-gray-900 font-bold mb-4">${product.price}</p>
        {/* Color Selector */}
        {product.colors && (
          <div className="mb-2">
            <label className="mr-2 text-sm">Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {product.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Size Selector */}
        {product.sizes && (
          <div className="mb-4">
            <label className="mr-2 text-sm">Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex gap-2">
          {/* View Product */}
          <button
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            View Product
          </button>

          {/* Add to Cart */}
          <button
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={() =>
              addToCart(product, selectedColor, selectedSize)
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
