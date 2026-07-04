import { CartProvider } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { SmartFeaturesHub } from './sections/SmartFeaturesHub';
import { TechSpecs } from './sections/TechSpecs';
import { SubscribeForm } from './sections/SubscribeForm';
import { MiniCart } from './components/MiniCart';
import { ChatbotWidget } from './components/ChatbotWidget';

/**
 * Component App chính của hệ thống.
 * Tích hợp ngữ cảnh giỏ hàng toàn cục CartProvider và thiết lập cấu trúc bố cục chính của trang.
 * 
 * @returns {JSX.Element} Giao diện bố cục gốc của Landing Page.
 */
function App() {
  return (
    <CartProvider>
      <div className="relative min-h-screen flex flex-col bg-zinc-50 dark:bg-oled-black text-zinc-900 dark:text-zinc-100 selection:bg-accent-teal/30 selection:text-accent-teal transition-colors duration-500">
        {/* 
          Ambient Glow Layer toàn trang — fixed, không di chuyển khi scroll.
          Tạo nền màu sắc liên tục, mượt mà xuyên suốt mọi section.
          Các orbs phân tán theo đường chéo (Diagonal Flow):
            Top-Left  → Teal  (Hero)
            Center-Right → Blue  (SmartFeaturesHub / TechSpecs)
            Bottom-Left  → Teal  (SubscribeForm / Footer)
        */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div className="absolute top-[-5%] left-[-5%] w-[55%] h-[45%] rounded-full bg-accent-teal/5 dark:bg-accent-teal/8 blur-[140px]" />
          <div className="absolute top-[35%] right-[-8%] w-[45%] h-[40%] rounded-full bg-accent-blue/4 dark:bg-accent-blue/7 blur-[130px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[40%] rounded-full bg-accent-teal/4 dark:bg-accent-teal/6 blur-[140px]" />
        </div>

        {/* Global sticky navigation bar */}
        <Navbar />

        {/* Giỏ hàng mini (MiniCart Drawer) */}
        <MiniCart />

        {/* Cửa sổ Chatbot AI (Chatbot Widget) */}
        <ChatbotWidget />

        {/* Main page content sections */}
        <main className="flex-grow">
          <Hero />
          <SmartFeaturesHub />
          <TechSpecs />
          <SubscribeForm />
        </main>

        {/* Chân trang */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
