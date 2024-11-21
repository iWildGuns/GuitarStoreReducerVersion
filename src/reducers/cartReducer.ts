import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
  | { type: "addToCart"; payload: { item: Guitar } }
  | { type: "removeFromCart"; payload: { id: Guitar["id"] } }
  | { type: "increaseQuantity"; payload: { id: Guitar["id"] } }
  | { type: "decreaseQuantity"; payload: { id: Guitar["id"] } }
  | { type: "clearCart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

export const initialstate: CartState = {
  data: db,
  cart: [],
};

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export const cartReducer = (
  state: CartState = initialstate,
  action: CartActions
) => {
  if (action.type === "addToCart") {
    const itemExist = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );
    let updateCart: CartItem[] = [];

    if (itemExist) {
      updateCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updateCart = [...state.cart, newItem];
    }
    return {
      ...state,
      cart: updateCart,
    };
  }

  if (action.type === "increaseQuantity") {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart,
    };
  }

  if (action.type === "decreaseQuantity") {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart,
    };
  }

  if (action.type === "removeFromCart") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id),
    };
  }

  if (action.type === "clearCart") {
    return {
      ...state,
      cart: [],
    };
  }

  return;
};
