"use client";

import { useState, useContext, useEffect } from "react";
import ProductDetails from "@/components/ProductDetails";
import RecentlyViewed from "@/components/RecentlyViewed";
import { CartContext } from "@/context/CartContext";

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  // BUG 1: No default color selected
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.color || ""
  );
  const [selectedSize, setSelectedSize] = useState("");

  // BUG 2: Always shows first variant's sizes regardless of selected color
  const selectedVariant = product.variants.find(
    (variant) => variant.color === selectedColor
  );
  const availableSizesForColor = selectedVariant?.sizes || [];

  // BUG 6: Empty dependency array - won't reset when color changes
  useEffect(() => {
    setSelectedSize("");
  }, [selectedColor]);

  // BUG 5: Only checks size, not color
  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  return (
    <>
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
      />
      <RecentlyViewed />
    </>
  );
}
