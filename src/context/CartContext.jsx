import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item, cantidad) => {
    const itemExistente = cart.find((prod) => prod.id === item.id);

    if (itemExistente) {
      setCart(
        cart.map((prod) =>
          prod.id === item.id ? { ...prod, cantidad: prod.cantidad + cantidad } : prod
        )
      );
    } else {
      setCart([...cart, { ...item, cantidad }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((prod) => prod.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cantidadTotal = cart.reduce((acc, prod) => acc + prod.cantidad, 0);
  const precioTotal = cart.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cantidadTotal, precioTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
