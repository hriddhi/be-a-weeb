import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, product) => {
  const newCartItems = clearCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
