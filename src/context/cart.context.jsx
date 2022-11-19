import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const itemIndex = cartItems.find((item) => productToAdd.id === item.id);
  if (itemIndex) {
    return cartItems.map((item) => {
      return productToAdd.id === item.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const itemIndex = cartItems.find((item) => productToRemove.id === item.id);
  if (itemIndex) {
    return cartItems
      .map((item) => {
        return productToRemove.id === item.id
          ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
          : item;
      })
      .filter((item) => item.quantity !== 0);
  }
  return [...cartItems];
};

const clearCartItem = (cartItems, productToClear) => {
  const itemIndex = cartItems.find((item) => productToClear.id === item.id);
  if (itemIndex) {
    return cartItems.filter((item) => item.id !== productToClear.id);
  }
  return [...cartItems];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const clearItemFromCart = (product) => {
    setCartItems(clearCartItem(cartItems, product));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
