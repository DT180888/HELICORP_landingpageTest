import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash, ShoppingBagOpen, CircleNotch } from '@phosphor-icons/react';
import { useCart } from '../hooks/useCart';

/**
 * Định dạng tiền tệ sang dạng đồng (VND) hiển thị trên giao diện.
 * 
 * @param {number} value Số tiền cần định dạng.
 * @returns {string} Chuỗi tiền tệ định dạng VND.
 */
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

/**
 * Component MiniCart đại diện cho giỏ hàng thu nhỏ hiển thị dưới dạng Sidebar trượt từ bên phải.
 * Kết nối trực tiếp với CartContext để thêm, bớt, cập nhật số lượng sản phẩm.
 * Lưu trữ trạng thái trong Local Storage và mô phỏng quá trình thanh toán bằng Webhook.
 * 
 * @returns {JSX.Element | null} Drawer Giỏ hàng thu nhỏ.
 */
export const MiniCart = React.memo(function MiniCart() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  // Tính tổng số lượng vật phẩm trong giỏ
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Tính tổng số tiền cần thanh toán
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  /**
   * Mô phỏng quá trình thanh toán gửi thông tin tới Webhook.
   * Hiển thị trạng thái Loading và thông báo thành công sau 2 giây.
   */
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutSuccess(false);

    try {
      // Gửi thông tin giỏ hàng tới API mô phỏng
      await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: subtotal,
          checkoutTime: new Date().toISOString(),
        }),
      });

      // Tạo trễ 1.5 giây để hiển thị hiệu ứng skeleton/spinner
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setCheckoutSuccess(true);
      clearCart();
    } catch {
      alert('Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại!');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Lớp phủ làm mờ nền phía sau (Backdrop Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Sidebar Drawer Giỏ hàng trượt từ bên phải */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-zinc-50 dark:bg-[#070709] border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between"
          >
            {/* Header của Giỏ hàng */}
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-850 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-zinc-900 dark:text-white font-display">
                  Giỏ Hàng Của Bạn
                </span>
                <span className="px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-400">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full border border-zinc-250 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label="Đóng giỏ hàng"
              >
                <X size={16} />
              </button>
            </div>

            {/* Thân Giỏ hàng (Danh sách sản phẩm) */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {checkoutSuccess ? (
                /* Giao diện Thanh toán Thành công */
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center shadow-md animate-bounce">
                    <ShoppingBagOpen size={32} weight="regular" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                    Đặt Hàng Thành Công!
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[26ch]">
                    Cảm ơn bạn đã lựa chọn Helicorp Hub. Đơn hàng của bạn đang được xử lý nhanh chóng.
                  </p>
                  <button
                    onClick={() => setCheckoutSuccess(false)}
                    className="mt-2 px-5 py-2.5 rounded-xl border border-zinc-250 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
                  >
                    Tiếp tục xem sản phẩm
                  </button>
                </div>
              ) : cart.length === 0 ? (
                /* Giao diện Giỏ hàng Trống */
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-650">
                    <ShoppingBagOpen size={40} />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-300 font-display">
                    Giỏ hàng đang trống
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-[24ch]">
                    Hiện chưa có sản phẩm nào trong giỏ hàng của bạn. Hãy chọn một sản phẩm để trải nghiệm.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-bold transition-all cursor-pointer"
                  >
                    Quay lại mua sắm
                  </button>
                </div>
              ) : (
                /* Danh sách các vật phẩm */
                cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-850 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md hover:border-zinc-350 dark:hover:border-zinc-800 transition-all"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash size={15} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2.5">
                        <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">
                          {formatCurrency(item.price)}
                        </span>
                        
                        {/* Bộ chỉnh số lượng */}
                        <div className="flex items-center border border-zinc-250 dark:border-zinc-800 rounded-lg p-0.5 gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-850 disabled:opacity-30 cursor-pointer"
                            aria-label="Giảm số lượng"
                          >
                            <Minus size={10} weight="bold" />
                          </button>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-850 cursor-pointer"
                            aria-label="Tăng số lượng"
                          >
                            <Plus size={10} weight="bold" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer của Giỏ hàng (Tổng tiền & Thanh toán) */}
            {cart.length > 0 && !checkoutSuccess && (
              <div className="p-6 border-t border-zinc-200 dark:border-zinc-850 bg-white/50 dark:bg-zinc-950/20 backdrop-blur-xl flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-zinc-550 dark:text-zinc-400">
                    Tổng tiền tạm tính:
                  </span>
                  <span className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                
                {/* Nút bấm Thanh toán */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="group w-full pl-6 pr-2.5 py-2.5 rounded-xl bg-linear-to-r from-accent-teal to-accent-blue text-zinc-950 font-bold text-sm flex items-center justify-between hover:shadow-lg hover:shadow-accent-teal/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  <span>Thanh toán ngay</span>
                  <span className="w-8 h-8 rounded-lg bg-white/25 dark:bg-black/10 flex items-center justify-center shrink-0">
                    {isCheckingOut ? (
                      <CircleNotch size={14} weight="bold" className="animate-spin" />
                    ) : (
                      <X size={14} weight="bold" className="rotate-45" />
                    )}
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
