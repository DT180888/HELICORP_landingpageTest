/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Đại diện cho một sản phẩm trong giỏ hàng.
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/**
 * Đại diện cho thông tin sản phẩm thô để thêm vào giỏ hàng hoặc danh sách yêu thích.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

/**
 * Định nghĩa cấu trúc kiểu dữ liệu của Cart Context.
 */
interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provider quản lý trạng thái giỏ hàng và danh sách yêu thích toàn cục.
 * 
 * @param {React.ReactNode} props.children Các component con.
 * @returns {JSX.Element} Provider cung cấp state giỏ hàng.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Khởi tạo giỏ hàng từ Local Storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('helicorp_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Khởi tạo danh sách yêu thích từ Local Storage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const savedWishlist = localStorage.getItem('helicorp_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Trạng thái đóng/mở của Giỏ hàng Mini (MiniCart)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Đồng bộ giỏ hàng với Local Storage
  useEffect(() => {
    localStorage.setItem('helicorp_cart', JSON.stringify(cart));
  }, [cart]);

  // Đồng bộ danh sách yêu thích với Local Storage
  useEffect(() => {
    localStorage.setItem('helicorp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  /**
   * Thêm sản phẩm vào giỏ hàng. Nếu sản phẩm đã tồn tại, tăng số lượng thêm 1.
   * 
   * @param {Product} product Đối tượng sản phẩm muốn thêm.
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
    // Tự động mở giỏ hàng khi thêm thành công để tăng tương tác người dùng
    setIsCartOpen(true);
  };

  /**
   * Xóa sản phẩm khỏi giỏ hàng.
   * 
   * @param {string} productId ID của sản phẩm cần xóa.
   */
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Cập nhật số lượng của một sản phẩm trong giỏ hàng.
   * 
   * @param {string} productId ID của sản phẩm.
   * @param {number} quantity Số lượng mới (bắt buộc phải >= 1).
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
   * Làm trống toàn bộ giỏ hàng.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Thêm/Bỏ sản phẩm khỏi danh sách yêu thích.
   * 
   * @param {string} productId ID của sản phẩm.
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
   * Kiểm tra xem sản phẩm có nằm trong danh sách yêu thích không.
   * 
   * @param {string} productId ID của sản phẩm.
   * @returns {boolean} True nếu nằm trong danh sách yêu thích.
   */
  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
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
 * Hook tùy chỉnh để sử dụng nhanh giỏ hàng từ bất kỳ component con nào.
 * 
 * @returns {CartContextType} Tập hợp các biến trạng thái và hành động giỏ hàng.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart phải được bọc trong một CartProvider');
  }
  return context;
}
