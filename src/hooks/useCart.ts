import { useState, useEffect } from "react";
import type { CartItem } from "../types";

const useCart = () => {
  const inicialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(inicialCart);

  useEffect(() => {
    localStorage.setItem(`cart`, JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    clearCart,
  };
};

export { useCart };
