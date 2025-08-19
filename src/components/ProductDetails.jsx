// components/ProductDetails.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Image from "next/image";
import SizeSelector from "./SizeSelector";
import Header from "./Header";

const ProductDetails = ({
  product,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
  onAddToCart,
  availableSizesForColor,
}) => {
  // BUG 3: Missing prop validation (removed null check)

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor
  );

  const { cartItems } = useContext(CartContext);
  
  return (
    
    <div>
      <Header />
      <div className="flex flex-col md:flex-row gap-8">
      
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden shadow-md">
        {/* BUG 4: Non-optimized image with missing alt text */}
        <Image
          src={product.imageUrl}
          alt="product image"
          width={600}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* Product Info  i want the add cart button to show the global */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description}
        </p>
        {/* BUG 8: Missing decimal places in price */}
        <p className="text-5xl font-bold text-blue-600">
          ${Number(product.price).toFixed(2)}
        </p>

        {/* Color Selector */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Color: {selectedColor}
          </h3>
          <div className="flex gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.color}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === variant.color
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-300"
                } focus:outline-none transition-all duration-200`}
                style={{ backgroundColor: variant.hex }}
                onClick={() => onColorSelect(variant.color)}
                title={variant.color}
              ></button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <SizeSelector
          availableSizes={availableSizesForColor}
          selectedSize={selectedSize}
          onSizeSelect={onSizeSelect}
        />

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          // BUG 7: Missing focus styles
          className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-2 focus:outline-blue-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
