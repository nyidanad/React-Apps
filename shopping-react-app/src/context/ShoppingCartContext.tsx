import React, { useContext, createContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContextProps = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(curItem => {
      if (curItem.find(item => item.id === id) == null) {
        return [...curItem, {id, quantity: 1}];
      }
      else {
        return curItem.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1};
          }
          else {
            return item;
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(curItem => {
      if (curItem.find(item => item.id === id)?.quantity === 1) {
        return curItem.filter(item => item.id !== id);
      }
      else {
        return curItem.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1};
          }
          else {
            return item;
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(curItem => {
      return curItem.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider value={{ openCart, closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity }}> 
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
