import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Lightbulb, Thermometer, ShieldCheck, SpeakerHigh } from '@phosphor-icons/react';
import { useCart } from '../hooks/useCart';
import hubDeviceImg from '../assets/hub_device.webp';

/**
 * Component Hero đại diện cho phần đầu trang giới thiệu sản phẩm.
 * Hiển thị tiêu đề chính, mô tả ngắn gọn dưới 20 từ, các nút kêu gọi hành động (CTAs) 
 * và mô hình 3D của thiết bị trung tâm được tạo tự động.
 * Sử dụng thư viện Framer Motion để tạo hiệu ứng xuất hiện mượt mà.
 * 
 * @returns {JSX.Element} Giao diện khối Hero.
 */
export const Hero = React.memo(function Hero() {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  /**
   * Cuộn mượt mà xuống phần tính năng (Bảng điều khiển).
   */
  const handleLearnMore = () => {
    const element = document.getElementById('dashboard');
    if (element) {
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
    <section 
      id="hero" 
      className="relative min-h-[90dvh] flex items-center justify-center pt-24 md:pt-32 pb-16 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">
        
        {/* Khối nội dung bên trái (Left Side Copy) */}
        <div className="flex flex-col items-start text-left gap-6">
          
          {/* Eyebrow Tag (Chỉ dùng tối đa 1 chiếc cho toàn bộ phần đầu trang) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center px-3.5 py-1 rounded-full border border-zinc-200/50 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 backdrop-blur-md"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-600 dark:text-zinc-400 font-sans">
              BỘ ĐIỀU KHIỂN THẾ HỆ MỚI
            </span>
          </motion.div>

          {/* Tiêu đề chính (Headline) */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] text-zinc-900 dark:text-white font-display"
          >
            Một chạm kết nối.<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-teal to-accent-blue">
              Vạn thiết bị thông minh.
            </span>
          </motion.h1>

          {/* Mô tả ngắn gọn (Đúng 18 từ theo quy chuẩn hiệu năng) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[45ch] font-sans"
          >
            Trải nghiệm sống thông minh và tối ưu năng lượng tức thì cùng bộ điều khiển trung tâm Helicorp OS.
          </motion.p>

          {/* Cặp nút CTAs (Nút chính sử dụng định dạng Button-in-Button) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row items-center gap-4 mt-2"
          >
            
            {/* CTA chính với cấu trúc lồng vòng tròn icon */}
            <button
              onClick={() => addToCart({ id: 'helicorp-hub-01', name: 'Bộ Điều Khiển Helicorp Hub', price: 4890000, image: hubDeviceImg })}
              className="group pl-6 pr-2.5 py-2.5 rounded-full bg-linear-to-r from-accent-teal to-accent-blue text-zinc-950 font-bold text-sm flex items-center gap-3.5 hover:shadow-lg hover:shadow-accent-teal/20 transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              <span>Mua ngay</span>
              <span className="w-8 h-8 rounded-full bg-white/25 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </button>

            {/* CTA phụ */}
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900/50 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              Xem tính năng
            </button>

          </motion.div>

        </div>

        {/* Khối hình ảnh bên phải (Right Side mockup với hiệu ứng bay lơ lửng & mạng lưới IoT) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center w-full max-w-[500px] aspect-square"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Vòng hào quang sáng phía sau (Glow Background) */}
          <div className={`absolute w-72 h-72 rounded-full blur-[80px] -z-10 transition-colors duration-500 ${
            isHovered ? 'bg-accent-teal/20' : 'bg-accent-teal/10'
          } animate-pulse`} />
          
          {/* Mạng lưới kết nối SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.line 
              x1="50" y1="50" x2="12" y2="12" 
              stroke={isHovered ? '#00f2fe' : '#3f3f46'} 
              strokeWidth="0.8" 
              strokeDasharray="3 3"
              animate={{ strokeDashoffset: isHovered ? [0, -20] : [0, -10] }}
              transition={{ repeat: Infinity, ease: "linear", duration: isHovered ? 1.5 : 3 }}
            />
            <motion.line 
              x1="50" y1="50" x2="88" y2="17" 
              stroke={isHovered ? '#00f2fe' : '#3f3f46'} 
              strokeWidth="0.8" 
              strokeDasharray="3 3"
              animate={{ strokeDashoffset: isHovered ? [0, -20] : [0, -10] }}
              transition={{ repeat: Infinity, ease: "linear", duration: isHovered ? 1.5 : 3 }}
            />
            <motion.line 
              x1="50" y1="50" x2="10" y2="85" 
              stroke={isHovered ? '#00f2fe' : '#3f3f46'} 
              strokeWidth="0.8" 
              strokeDasharray="3 3"
              animate={{ strokeDashoffset: isHovered ? [0, -20] : [0, -10] }}
              transition={{ repeat: Infinity, ease: "linear", duration: isHovered ? 1.5 : 3 }}
            />
            <motion.line 
              x1="50" y1="50" x2="90" y2="88" 
              stroke={isHovered ? '#00f2fe' : '#3f3f46'} 
              strokeWidth="0.8" 
              strokeDasharray="3 3"
              animate={{ strokeDashoffset: isHovered ? [0, -20] : [0, -10] }}
              transition={{ repeat: Infinity, ease: "linear", duration: isHovered ? 1.5 : 3 }}
            />
          </svg>

          {/* 4 Node thiết bị lơ lửng */}
          
          {/* Node 1: Đèn thông minh (Top-Left) */}
          <motion.div
            className="absolute top-[8%] left-[8%] hidden sm:flex items-center justify-center p-3 rounded-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md shadow-lg text-zinc-700 dark:text-zinc-300 pointer-events-auto hover:scale-115 hover:border-accent-teal/50 hover:shadow-accent-teal/10 transition-all duration-300"
            animate={{ 
              y: [0, -8, 0],
              scale: isHovered ? 1.08 : 1
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 },
              scale: { duration: 0.3 }
            }}
          >
            <Lightbulb size={20} className={isHovered ? "text-amber-500 transition-colors duration-300" : "transition-colors duration-300"} />
          </motion.div>

          {/* Node 2: Điều hòa/Khí hậu (Top-Right) */}
          <motion.div
            className="absolute top-[13%] right-[5%] hidden sm:flex items-center justify-center p-3 rounded-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md shadow-lg text-zinc-700 dark:text-zinc-300 pointer-events-auto hover:scale-115 hover:border-accent-teal/50 hover:shadow-accent-teal/10 transition-all duration-300"
            animate={{ 
              y: [0, -8, 0],
              scale: isHovered ? 1.08 : 1
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
              scale: { duration: 0.3 }
            }}
          >
            <Thermometer size={20} className={isHovered ? "text-cyan-500 transition-colors duration-300" : "transition-colors duration-300"} />
          </motion.div>

          {/* Node 3: An ninh/Khóa cửa (Bottom-Left) */}
          <motion.div
            className="absolute bottom-[13%] left-[5%] hidden sm:flex items-center justify-center p-3 rounded-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md shadow-lg text-zinc-700 dark:text-zinc-300 pointer-events-auto hover:scale-115 hover:border-accent-teal/50 hover:shadow-accent-teal/10 transition-all duration-300"
            animate={{ 
              y: [0, -8, 0],
              scale: isHovered ? 1.08 : 1
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              scale: { duration: 0.3 }
            }}
          >
            <ShieldCheck size={20} className={isHovered ? "text-emerald-500 transition-colors duration-300" : "transition-colors duration-300"} />
          </motion.div>

          {/* Node 4: Loa/Âm thanh (Bottom-Right) */}
          <motion.div
            className="absolute bottom-[10%] right-[7%] hidden sm:flex items-center justify-center p-3 rounded-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md shadow-lg text-zinc-700 dark:text-zinc-300 pointer-events-auto hover:scale-115 hover:border-accent-teal/50 hover:shadow-accent-teal/10 transition-all duration-300"
            animate={{ 
              y: [0, -8, 0],
              scale: isHovered ? 1.08 : 1
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              scale: { duration: 0.3 }
            }}
          >
            <SpeakerHigh size={20} className={isHovered ? "text-violet-500 transition-colors duration-300" : "transition-colors duration-300"} />
          </motion.div>
          
          {/* Thùng chứa kép Double-Bezel cho ảnh thiết bị */}
          <div className="p-2 rounded-2xl bg-zinc-200/40 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 shadow-2xl z-10">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="rounded-xl overflow-hidden border border-zinc-300/40 dark:border-white/10"
            >
              <img 
                src={hubDeviceImg} 
                alt="Bộ điều khiển thông minh Helicorp Hub" 
                className="w-full max-w-[480px] h-auto object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
});
