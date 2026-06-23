import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Sync cart from storage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem('tassar_cart_items');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const saveCart = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem('tassar_cart_items', JSON.stringify(newItems));
  };

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      const updated = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(updated);
    } else {
      saveCart([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + change;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0);
    saveCart(updated);
  };

  const removeFromCart = (id) => {
    saveCart(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => saveCart([]);

  const getCartTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);