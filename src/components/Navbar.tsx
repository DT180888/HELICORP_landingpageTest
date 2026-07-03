import React, { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useCart } from '../hooks/useCart';
import { Sun, Moon, ShoppingCart } from '@phosphor-icons/react';

/**
 * Navbar component for global navigation.
 * Renders a sticky floating glass pill with logo, nav links, 
 * dark mode toggle, and cart badge. Fully responsive on mobile.
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 */
export const Navbar = React.memo(function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate total number of items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  /**
   * Toggles the mobile menu open/closed state.
   */
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  /**
   * Scroll smoothly to a specific section on the page.
   * 
   * @param {string} sectionId The ID of the target section.
   */
  const handleScrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky header
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav className="sticky top-4 z-50 w-[calc(100%-2rem)] max-w-6xl mx-auto px-6 py-3 rounded-full border border-zinc-200/40 dark:border-white/10 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center justify-between transition-colors duration-300">
        
        {/* Monogram Logo */}
        <div 
          onClick={() => handleScrollToSection('hero')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-linear-to-tr from-accent-teal to-accent-blue p-[1px] flex items-center justify-center shadow-md shadow-accent-teal/10">
            <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
              <span className="text-sm font-bold tracking-tighter text-zinc-900 dark:text-white group-hover:scale-105 transition-transform duration-300">
                H
              </span>
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-display">
            HELICORP
          </span>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Trang chủ', id: 'hero' },
            { label: 'Tính năng', id: 'dashboard' },
            { label: 'Thông số', id: 'specs' },
            { label: 'Đăng ký', id: 'subscribe' }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollToSection(link.id)}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Controls (Cart, Theme, Hamburger) */}
        <div className="flex items-center gap-3">
          
          {/* Shopping Cart Button */}
          <button 
            type="button"
            className="relative p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-[0.95] transition-all duration-200 cursor-pointer"
            aria-label="Xem giỏ hàng"
          >
            <ShoppingCart size={18} weight="regular" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent-teal text-[10px] font-bold text-zinc-950 flex items-center justify-center shadow-md animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-[0.95] transition-all duration-200 cursor-pointer"
            aria-label="Chuyển chế độ giao diện"
          >
            {isDarkMode ? (
              <Sun size={18} weight="regular" />
            ) : (
              <Moon size={18} weight="regular" />
            )}
          </button>

          {/* Morphing Hamburger Menu Button (Mobile) */}
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="flex md:hidden relative w-9 h-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
            aria-label="Mở menu"
          >
            <div className="w-4 h-4 flex flex-col justify-between items-center relative">
              <span className={`w-4 h-[1.5px] bg-zinc-700 dark:bg-zinc-300 rounded transition-all duration-300 ease-out origin-center ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[7.25px]' : ''
              }`} />
              <span className={`w-4 h-[1.5px] bg-zinc-700 dark:bg-zinc-300 rounded transition-all duration-200 ease-out ${
                isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
              }`} />
              <span className={`w-4 h-[1.5px] bg-zinc-700 dark:bg-zinc-300 rounded transition-all duration-300 ease-out origin-center ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[7.25px]' : ''
              }`} />
            </div>
          </button>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {[
            { label: 'Trang chủ', id: 'hero' },
            { label: 'Tính năng', id: 'dashboard' },
            { label: 'Thông số', id: 'specs' },
            { label: 'Đăng ký', id: 'subscribe' }
          ].map((link, index) => (
            <button
              key={link.id}
              onClick={() => handleScrollToSection(link.id)}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 80 + 100}ms` : '0ms'
              }}
              className={`text-2xl font-bold tracking-tight text-zinc-400 hover:text-white transition-all duration-300 transform cursor-pointer ${
                isMobileMenuOpen 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
});
