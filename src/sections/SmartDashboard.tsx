import React, { useState, useEffect } from 'react';
import { Lightbulb, Thermometer, Shield, ShieldCheck, Play, Pause, Plus, Minus, SpeakerHigh } from '@phosphor-icons/react';


/**
 * Component SmartDashboard mô phỏng bảng điều khiển thiết bị IoT thông minh trong nhà.
 * Cung cấp khả năng tương tác trực tiếp với các thiết bị: đèn, điều hòa, an ninh và âm nhạc.
 * Áp dụng cấu trúc Enclosure kép (Double-Bezel) và phong cách Ethereal Glass (Dark Tech).
 * 
 * @returns {JSX.Element} Bảng điều khiển IoT hoàn chỉnh.
 */
export const SmartDashboard = React.memo(function SmartDashboard() {
  // Trạng thái của Hệ thống đèn (Bật/Tắt)
  const [isLightOn, setIsLightOn] = useState<boolean>(true);
  
  // Trạng thái nhiệt độ của Điều hòa (°C)
  const [temperature, setTemperature] = useState<number>(22);
  
  // Trạng thái chế độ an ninh (true: Nghiêm ngặt, false: Bình thường)
  const [isStrictSecurity, setIsStrictSecurity] = useState<boolean>(false);
  
  // Trạng thái chơi nhạc (Play/Pause)
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Chiều cao mô phỏng của các thanh equalizer sóng nhạc
  const [equalizerHeights, setEqualizerHeights] = useState<number[]>([12, 24, 16, 32, 20]);

  // Cập nhật hiệu ứng sóng nhạc chuyển động ngẫu nhiên khi đang phát nhạc
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingMusic) {
      interval = setInterval(() => {
        setEqualizerHeights(
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 24) + 8)
        );
      }, 150);
    } else {
      setEqualizerHeights([12, 12, 12, 12, 12]);
    }
    return () => clearInterval(interval);
  }, [isPlayingMusic]);

  /**
   * Tăng nhiệt độ điều hòa (Giới hạn tối đa 30°C).
   */
  const handleIncreaseTemp = () => {
    setTemperature((prev) => (prev < 30 ? prev + 1 : prev));
  };

  /**
   * Giảm nhiệt độ điều hòa (Giới hạn tối thiểu 16°C).
   */
  const handleDecreaseTemp = () => {
    setTemperature((prev) => (prev > 16 ? prev - 1 : prev));
  };

  return (
    <section 
      id="dashboard" 
      className="py-24 px-6 bg-zinc-950/20 relative"
    >
      {/* Vòng hào quang sáng nền */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent-teal/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">
        
        {/* Tiêu đề phần (Section Header) */}
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white font-display">
            Trải Nghiệm Hệ Điều Hành Nhà Thông Minh
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Mô phỏng bảng điều khiển thiết bị ảo thời gian thực. Hãy tương tác trực tiếp với các nút bấm để cảm nhận phản hồi haptic trực quan.
          </p>
        </div>

        {/* Thiết kế Double-Bezel: Khung tray cơ khí bên ngoài */}
        <div className="p-3.5 rounded-3xl bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/40 dark:border-white/10 shadow-2xl">
          
          {/* Lõi Tray bên trong chứa lưới các Card thiết bị */}
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-100 dark:bg-[#070709] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-colors duration-300">
            
            {/* THẺ 1: HỆ THỐNG ĐÈN */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              isLightOn 
                ? 'bg-white dark:bg-zinc-900/60 border-accent-teal/30 shadow-[0_0_20px_rgba(0,242,254,0.05)]' 
                : 'bg-white/40 dark:bg-zinc-950/40 border-zinc-200/60 dark:border-zinc-800/60'
            }`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  isLightOn 
                    ? 'bg-amber-100 text-amber-500 shadow-md shadow-amber-500/10' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500'
                }`}>
                  <Lightbulb size={24} weight={isLightOn ? 'fill' : 'regular'} />
                </div>
                {/* Nút Toggle Switch */}
                <button
                  onClick={() => setIsLightOn((prev) => !prev)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    isLightOn ? 'bg-accent-teal' : 'bg-zinc-300 dark:bg-zinc-800'
                  }`}
                  aria-label="Bật tắt đèn"
                >
                  <div className={`w-5 h-5 rounded-full bg-white dark:bg-zinc-950 shadow-sm transition-transform duration-300 transform ${
                    isLightOn ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Đèn Phòng Khách</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                Trạng thái: <span className={isLightOn ? 'text-amber-500 font-semibold' : 'text-zinc-400'}>
                  {isLightOn ? 'Đang bật' : 'Đang tắt'}
                </span>
              </p>
            </div>

            {/* THẺ 2: ĐIỀU HÒA KHÔNG KHÍ */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 text-cyan-500">
                  <Thermometer size={24} weight="regular" />
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
                    {temperature}°C
                  </span>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Điều hòa trung tâm</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Nhiệt Độ Phòng</h3>
                {/* Nút điều khiển tăng giảm */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handleDecreaseTemp}
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                    aria-label="Giảm nhiệt độ"
                  >
                    <Minus size={14} weight="bold" />
                  </button>
                  <div className="flex-1 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-cyan-400 to-amber-400 transition-all duration-300"
                      style={{ width: `${((temperature - 16) / 14) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={handleIncreaseTemp}
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                    aria-label="Tăng nhiệt độ"
                  >
                    <Plus size={14} weight="bold" />
                  </button>
                </div>
              </div>
            </div>

            {/* THẺ 3: HỆ THỐNG AN NINH */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              isStrictSecurity 
                ? 'bg-white dark:bg-zinc-900/60 border-rose-500/30 shadow-[0_0_20px_rgba(239,68,68,0.05)]' 
                : 'bg-white dark:bg-zinc-900/60 border-zinc-200/60 dark:border-zinc-800/60'
            }`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  isStrictSecurity 
                    ? 'bg-rose-100 text-rose-500 shadow-md shadow-rose-500/10' 
                    : 'bg-emerald-100 text-emerald-500 shadow-md shadow-emerald-500/10'
                }`}>
                  {isStrictSecurity ? (
                    <Shield size={24} weight="fill" />
                  ) : (
                    <ShieldCheck size={24} weight="regular" />
                  )}
                </div>
                {/* Nút Toggle Switch */}
                <button
                  onClick={() => setIsStrictSecurity((prev) => !prev)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    isStrictSecurity ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  aria-label="Bật tắt chế độ an ninh nghiêm ngặt"
                >
                  <div className={`w-5 h-5 rounded-full bg-white dark:bg-zinc-950 shadow-sm transition-transform duration-300 transform ${
                    isStrictSecurity ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">An Ninh Căn Hộ</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                Chế độ: <span className={isStrictSecurity ? 'text-rose-500 font-semibold' : 'text-emerald-500 font-semibold'}>
                  {isStrictSecurity ? 'Nghiêm ngặt' : 'Bình thường'}
                </span>
              </p>
            </div>

            {/* THẺ 4: HỆ THỐNG ÂM THANH */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/30 text-violet-500">
                  <SpeakerHigh size={24} weight="regular" />
                </div>
                {/* Bộ chỉnh phát nhạc */}
                <button
                  onClick={() => setIsPlayingMusic((prev) => !prev)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer transition-colors duration-300 ${
                    isPlayingMusic ? 'bg-violet-600 hover:bg-violet-700' : 'bg-accent-teal hover:bg-accent-teal/80 text-zinc-950'
                  }`}
                  aria-label={isPlayingMusic ? 'Tạm dừng nhạc' : 'Phát nhạc'}
                >
                  {isPlayingMusic ? <Pause size={14} weight="bold" /> : <Play size={14} weight="bold" />}
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="overflow-hidden max-w-[70%]">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display truncate">Deep Focus</h3>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-500 truncate">Chill Beats</p>
                  </div>
                  {/* Cột sóng nhạc động */}
                  <div className="flex items-end gap-[2px] h-8 shrink-0">
                    {equalizerHeights.map((h, i) => (
                      <div 
                        key={i} 
                        className="w-[3px] bg-violet-500 rounded-xs transition-all duration-150"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
});
