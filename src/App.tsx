import { CartProvider } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { SmartDashboard } from './sections/SmartDashboard';
import { TechSpecs } from './sections/TechSpecs';
import { SubscribeForm } from './sections/SubscribeForm';

/**
 * Main App component.
 * Integrates the global CartProvider context and structured layout.
 * 
 * @returns {JSX.Element} The rendered root layout.
 */
function App() {
  return (
    <CartProvider>
      <div className="relative min-h-screen flex flex-col bg-oled-black text-zinc-100 selection:bg-accent-teal/30 selection:text-accent-teal">
        {/* Subtle background glow effect (Ethereal Glass theme) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-teal/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />

        {/* Global sticky navigation bar */}
        <Navbar />

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
