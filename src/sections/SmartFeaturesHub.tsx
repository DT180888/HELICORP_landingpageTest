import React from 'react';
import { SmartSecurity } from './smart-features/SmartSecurity';
import { SmartClimate } from './smart-features/SmartClimate';
import { SmartComfort } from './smart-features/SmartComfort';

/**
 * Component SmartFeaturesHub hợp nhất 3 phân hệ mô phỏng (An ninh, Khí hậu, Tiện nghi)
 * vào chung một vùng không gian trải nghiệm thống nhất.
 * Giúp người dùng hiểu rõ sự đồng bộ của hệ điều hành Helicorp OS trong ngôi nhà.
 */
export const SmartFeaturesHub = React.memo(function SmartFeaturesHub() {
  return (
    <section 
      id="dashboard" 
      className="py-24 px-6 relative bg-zinc-50 dark:bg-oled-black transition-colors duration-500 overflow-hidden border-t border-zinc-200/50 dark:border-zinc-900/50"
    >
      {/* Vòng hào quang sáng nền chính */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-accent-teal/3 dark:bg-accent-teal/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-accent-blue/3 dark:bg-accent-blue/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* Tiêu đề chung cho toàn bộ Phân hệ Hệ điều hành */}
        <div className="text-center flex flex-col gap-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-teal/20 bg-accent-teal/5 text-accent-teal max-w-fit mx-auto">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-sans">
              TRẢI NGHIỆM ĐỒNG BỘ HÓA
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white font-display">
            Hệ Điều Hành Helicorp OS
          </h2>
          <p className="hidden md:block text-sm sm:text-base text-zinc-650 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Khám phá sức mạnh quản lý tập trung từ bộ não Helicorp Hub. Từng cảm biến và phân hệ hoạt động liền mạch dưới sự điều khiển tối ưu của hệ điều hành thời gian thực.
          </p>
        </div>

        {/* Danh sách các phân hệ xếp chồng dọc, giữ nguyên chiều cao và tương tác */}
        <div className="flex flex-col gap-12 md:gap-16">
          
          {/* Phân hệ 1: An ninh chủ động */}
          <div className="relative">
            <SmartSecurity />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-zinc-200/80 dark:via-zinc-800/80 to-transparent" />
          </div>

          {/* Phân hệ 2: Khí hậu & năng lượng */}
          <div className="relative">
            <SmartClimate />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-zinc-200/80 dark:via-zinc-800/80 to-transparent" />
          </div>

          {/* Phân hệ 3: Không gian tiện nghi */}
          <div className="relative">
            <SmartComfort />
          </div>

        </div>

      </div>
    </section>
  );
});
