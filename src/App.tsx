import { CartProvider } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { SmartDashboard } from './sections/SmartDashboard';
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
        {/* Subtle background glow effect (Ethereal Glass theme) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-teal/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />

        {/* Global sticky navigation bar */}
        <Navbar />

        {/* Giỏ hàng mini (MiniCart Drawer) */}
        <MiniCart />

        {/* Cửa sổ Chatbot AI (Chatbot Widget) */}
        <ChatbotWidget />

        {/* Main page content sections */}
        <main className="flex-grow">
          <Hero />
          <SmartDashboard />
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
