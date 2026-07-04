import React from 'react';
import { motion } from 'motion/react';
import { Cpu, WifiHigh, Monitor, BatteryCharging } from '@phosphor-icons/react';

/**
 * Component TechSpecs hiển thị các thông số kỹ thuật của bộ điều khiển thông minh.
 * Thiết kế theo cấu trúc Asymmetric Bento Grid (Lưới Bento bất đối xứng) 3 cột trên desktop.
 * Áp dụng phong cách Ethereal Glass (Dark Tech) kết hợp nền màu kẽm mờ.
 * 
 * @returns {JSX.Element} Khối thông số kỹ thuật hoàn chỉnh.
 */
export const TechSpecs = React.memo(function TechSpecs() {
  return (
    <section 
      id="specs" 
      className="py-24 px-6 bg-zinc-50 dark:bg-oled-black relative overflow-hidden"
    >

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 relative z-10">
        
        {/* Tiêu đề phần (Section Header) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col gap-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white font-display">
            Công Nghệ Dẫn Đầu. Thiết Kế Vượt Trội.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Khám phá những thông số kỹ thuật cao cấp giúp Helicorp Hub dẫn đầu trong việc quản lý và kết nối hệ sinh thái nhà thông minh.
          </p>
        </motion.div>

        {/* Lưới Bento bất đối xứng (Asymmetric Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Ô 1: Vi xử lý AI Core (Chiếm 2 cột trên desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="md:col-span-2 p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md flex flex-col justify-between gap-8 hover:border-accent-teal/50 hover:shadow-lg hover:shadow-accent-teal/5 dark:hover:shadow-accent-teal/2 transition-colors duration-300 relative overflow-hidden group"
          >
            {/* Vòng hào quang sáng góc (Ambient glow) */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-teal/5 blur-2xl group-hover:bg-accent-teal/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 flex items-center justify-center border border-zinc-200/40 dark:border-zinc-800/40">
                <Cpu size={28} weight="regular" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-teal px-3 py-1 rounded-full bg-accent-teal/10">
                AI NEURAL SYSTEM
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mb-2">
                Bộ Xử Lý AI Core Độc Lập
              </h3>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-xl">
                Tích hợp chip AI Neural Core thế hệ mới có tốc độ phản hồi tính bằng mili-giây. Hỗ trợ nhận diện và dịch lệnh giọng nói ngoại tuyến (offline) 100%, bảo mật dữ liệu tuyệt đối và tự động tối ưu thói quen sinh hoạt của gia chủ.
              </p>
            </div>
          </motion.div>

          {/* Ô 2: Kết nối không dây Zigbee & Wi-Fi (Chiếm 1 cột trên desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="md:col-span-1 p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md flex flex-col justify-between gap-12 hover:border-accent-teal/50 hover:shadow-lg hover:shadow-accent-teal/5 dark:hover:shadow-accent-teal/2 transition-colors duration-300 relative overflow-hidden group"
          >
            {/* Vòng hào quang sáng góc (Ambient glow) */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-teal/5 blur-2xl group-hover:bg-accent-teal/10 transition-colors duration-500 pointer-events-none" />

            <div className="p-3.5 w-max rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 flex items-center justify-center border border-zinc-200/40 dark:border-zinc-800/40 z-10">
              <WifiHigh size={28} weight="regular" />
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mb-2">
                Zigbee 3.0 & Wi-Fi 6
              </h3>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                Hỗ trợ kết nối đồng thời hơn 200 thiết bị không trễ. Hoạt động như một router trung tâm cho cả hệ thống nhà.
              </p>
            </div>
          </motion.div>

          {/* Ô 3: Màn hình hiển thị (Chiếm 1 cột trên desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="md:col-span-1 p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md flex flex-col justify-between gap-12 hover:border-accent-blue/50 hover:shadow-lg hover:shadow-accent-blue/5 dark:hover:shadow-accent-blue/2 transition-colors duration-300 relative overflow-hidden group"
          >
            {/* Vòng hào quang sáng góc (Ambient glow) */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-blue/5 blur-2xl group-hover:bg-accent-blue/10 transition-colors duration-500 pointer-events-none" />

            <div className="p-3.5 w-max rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 flex items-center justify-center border border-zinc-200/40 dark:border-zinc-800/40 z-10">
              <Monitor size={28} weight="regular" />
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mb-2">
                Màn Hình AMOLED 8-inch
              </h3>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                Độ phân giải 2K sắc nét, tấm nền AMOLED 1000 nits hiển thị rõ nét dưới ánh đèn phòng. Bo cong nhẹ 2.5D sang trọng.
              </p>
            </div>
          </motion.div>

          {/* Ô 4: Nguồn điện & Pin sạc (Chiếm 2 cột trên desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="md:col-span-2 p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md flex flex-col justify-between gap-8 hover:border-accent-blue/50 hover:shadow-lg hover:shadow-accent-blue/5 dark:hover:shadow-accent-blue/2 transition-colors duration-300 relative overflow-hidden group"
          >
            {/* Vòng hào quang sáng góc (Ambient glow) */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-blue/5 blur-2xl group-hover:bg-accent-blue/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 flex items-center justify-center border border-zinc-200/40 dark:border-zinc-800/40">
                <BatteryCharging size={28} weight="regular" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue px-3 py-1 rounded-full bg-accent-blue/10">
                12-HOUR BATTERY LIFE
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mb-2">
                Cổng Sạc USB-C & Pin Dự Phòng Tích Hợp
              </h3>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-xl">
                Cổng sạc Type-C tương thích với các nguồn cấp điện tiêu chuẩn toàn cầu. Tích hợp module pin Lithium Polymer dung lượng cao, cho phép thiết bị duy trì hoạt động và kết nối an ninh khẩn cấp liên tục trong 12 giờ ngay cả khi căn hộ gặp sự cố mất điện.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
});
