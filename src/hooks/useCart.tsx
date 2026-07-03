/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';


/**
 * Interface representing a product item in the shopping cart.
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/**
 * Interface representing a product item details for adding/wishlisting.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

/**
 * Interface representing the cart context value.
 */
interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // List of product IDs
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provider component for managing cart and wishlist state globally.
 * 
 * @param {React.ReactNode} props.children The child components.
 * @returns {JSX.Element} The rendered Provider component.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from Local Storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('helicorp_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const savedWishlist = localStorage.getItem('helicorp_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Sync state to Local Storage
  useEffect(() => {
    localStorage.setItem('helicorp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('helicorp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  /**
   * Adds a product to the shopping cart. If already present, increments quantity.
   * 
   * @param {Product} product The product object to add.
   */
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Removes a product from the shopping cart.
   * 
   * @param {string} productId The ID of the product to remove.
   */
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Updates the quantity of a product in the cart.
   * 
   * @param {string} productId The ID of the product.
   * @param {number} quantity The new quantity (must be >= 1).
   */
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Empties all items in the shopping cart.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Toggles a product in the wishlist (adds if not present, removes if present).
   * 
   * @param {string} productId The ID of the product.
   */
  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      }
      return [...prevWishlist, productId];
    });
  };

  /**
   * Helper function to check if a product is in the wishlist.
   * 
   * @param {string} productId The ID of the product.
   * @returns {boolean} True if the product is wishlisted.
   */
  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to consume the CartContext state and actions.
 * Throws an error if used outside a CartProvider.
 * 
 * @returns {CartContextType} The cart context state and actions.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
