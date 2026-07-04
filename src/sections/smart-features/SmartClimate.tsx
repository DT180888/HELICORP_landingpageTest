import React, { useState } from 'react';
import { Thermometer, Plus, Minus, Leaf, Wind, Lightning, Cpu } from '@phosphor-icons/react';
import { useCart } from '../../hooks/useCart';

/**
 * Component SmartClimate mô phỏng phân hệ điều khiển nhiệt độ và tối ưu năng lượng.
 * Cho phép tăng giảm nhiệt độ, chuyển chế độ vận hành và phản hồi lượng điện tiêu thụ trực quan.
 */
export const SmartClimate = React.memo(function SmartClimate() {
  const { addToCart } = useCart();
  
  // Trạng thái nhiệt độ phòng (°C)
  const [temperature, setTemperature] = useState<number>(24);
  
  // Chế độ đang chọn (eco, comfort, boost)
  const [mode, setMode] = useState<'eco' | 'comfort' | 'boost'>('eco');

  /**
   * Tính toán lượng điện tiêu thụ & màu sắc tương ứng
   */
  const getEnergyDetails = () => {
    if (mode === 'eco') {
      return {
        level: 'Thấp',
        percent: 28,
        colorClass: 'bg-emerald-500',
        textColor: 'text-emerald-500',
        desc: 'Tối ưu AI: Tiết kiệm 30% điện năng'
      };
    }
    
    if (temperature <= 19 || mode === 'boost') {
      return {
        level: 'Cực Cao',
        percent: 95,
        colorClass: 'bg-rose-500 animate-pulse',
        textColor: 'text-rose-500 font-bold',
        desc: 'Công suất tối đa (Hao phí cao)'
      };
    } else if (temperature <= 22) {
      return {
        level: 'Trung bình',
        percent: 65,
        colorClass: 'bg-amber-500',
        textColor: 'text-amber-500',
        desc: 'Vận hành tiêu chuẩn'
      };
    } else {
      return {
        level: 'Thấp',
        percent: 35,
        colorClass: 'bg-emerald-500',
        textColor: 'text-emerald-500',
        desc: 'Vận hành tiết kiệm điện'
      };
    }
  };

  const energy = getEnergyDetails();

  /**
   * Thay đổi chế độ hoạt động
   */
  const handleSelectMode = (newMode: 'eco' | 'comfort' | 'boost') => {
    setMode(newMode);
    if (newMode === 'eco') {
      setTemperature(25);
    } else if (newMode === 'comfort') {
      setTemperature(22);
    } else if (newMode === 'boost') {
      setTemperature(16);
    }
  };

  /**
   * Tăng nhiệt độ
   */
  const handleIncrease = () => {
    if (mode === 'eco') setMode('comfort'); // Thoát chế độ Eco tự động khi chỉnh tay
    if (mode === 'boost') setMode('comfort');
    setTemperature((prev) => (prev < 30 ? prev + 1 : prev));
  };

  /**
   * Giảm nhiệt độ
   */
  const handleDecrease = () => {
    if (mode === 'eco') setMode('comfort');
    if (mode === 'boost') setMode('comfort');
    setTemperature((prev) => (prev > 16 ? prev - 1 : prev));
  };

  return (
    <div className="py-12 relative overflow-hidden">
      {/* Vòng hào quang sáng nền */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-cyan-500/2 dark:bg-cyan-500/4 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* KHỐI GIẢ LẬP MÔ PHỎNG (LEFT SIDE - WIDGET) */}
        <div className="md:col-span-7 w-full flex justify-center order-1 md:order-1">
          <div className="w-full p-3.5 rounded-3xl bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/40 dark:border-white/10 shadow-2xl">
            <div className="rounded-xl bg-zinc-100 dark:bg-[#070709] p-5 relative overflow-hidden border border-zinc-200/50 dark:border-zinc-900/50">
              
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800/80 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-200 tracking-wider uppercase font-sans">
                    Helicorp Climate OS
                  </h3>
                  <p className="text-[10px] text-zinc-500">Thiết bị: Điều Hòa Trung Tâm</p>
                </div>
                <div className="flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-300/20">
                  <Wind size={14} className="text-cyan-500 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">Swing Mode: Bật</span>
                </div>
              </div>

              {/* Giao diện số hiển thị trung tâm */}
              <div className="flex flex-col items-center justify-center py-6 mb-4">
                <div className="relative w-36 h-36 rounded-full border-4 border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center bg-white dark:bg-zinc-900/20 shadow-inner">
                  
                  {/* Icon nhấp nháy theo chế độ */}
                  <div className="absolute top-4">
                    {mode === 'eco' ? (
                      <Leaf size={18} weight="fill" className="text-emerald-500" />
                    ) : mode === 'boost' ? (
                      <Lightning size={18} weight="fill" className="text-rose-500 animate-bounce" />
                    ) : (
                      <Thermometer size={18} className="text-cyan-500" />
                    )}
                  </div>

                  <span className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white font-display mt-2">
                    {temperature}°C
                  </span>
                  
                  <p className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase mt-1">
                    {mode === 'eco' ? 'Eco AI Active' : mode === 'boost' ? 'Turbo Boost' : 'Comfort Temp'}
                  </p>
                </div>

                {/* Các nút tinh chỉnh nhiệt độ */}
                <div className="flex gap-4 mt-5">
                  <button
                    onClick={handleDecrease}
                    className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/80 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm"
                    aria-label="Giảm nhiệt độ"
                  >
                    <Minus size={16} weight="bold" />
                  </button>
                  <button
                    onClick={handleIncrease}
                    className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/80 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm"
                    aria-label="Tăng nhiệt độ"
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Chế độ chạy nhanh */}
              <div className="mb-5">
                <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 mb-2.5 uppercase tracking-wide">
                  Chế độ tối ưu kịch bản
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSelectMode('eco')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      mode === 'eco'
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                        : 'bg-white hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/85 border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300'
                    }`}
                  >
                    <Leaf size={14} weight={mode === 'eco' ? 'fill' : 'regular'} />
                    <span>Eco AI (25°C)</span>
                  </button>
                  <button
                    onClick={() => handleSelectMode('comfort')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      mode === 'comfort'
                        ? 'bg-cyan-500 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-white hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/85 border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300'
                    }`}
                  >
                    <Thermometer size={14} weight={mode === 'comfort' ? 'fill' : 'regular'} />
                    <span>Tự động (22°C)</span>
                  </button>
                  <button
                    onClick={() => handleSelectMode('boost')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      mode === 'boost'
                        ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/10'
                        : 'bg-white hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/85 border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300'
                    }`}
                  >
                    <Lightning size={14} weight={mode === 'boost' ? 'fill' : 'regular'} />
                    <span>Turbo (16°C)</span>
                  </button>
                </div>
              </div>

              {/* Thanh hiển thị năng lượng tiêu hao */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1">
                    <Lightning size={14} className="text-amber-500" />
                    <span className="text-[10px] text-zinc-500 font-medium">Lượng điện năng tiêu thụ</span>
                  </div>
                  <span className={`text-[10px] font-bold ${energy.textColor}`}>
                    {energy.level} ({energy.percent}%)
                  </span>
                </div>
                {/* Thanh tiến trình */}
                <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${energy.colorClass}`}
                    style={{ width: `${energy.percent}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                  {energy.desc}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* KHỐI NỘI DUNG (RIGHT SIDE) */}
        <div className="md:col-span-5 flex flex-col gap-6 text-left items-start md:items-end md:text-right order-2 md:order-2">
          
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold font-sans">
              Phân Hệ Khí Hậu & Năng Lượng
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white font-display">
            Cân bằng nhiệt độ.<br />Tối ưu điện năng.
          </h2>

          <div className="grid grid-cols-1 gap-4 mt-2 w-full text-left md:text-right">
            <div className="flex md:flex-row-reverse items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0 mt-0.5">
                <Thermometer size={16} weight="bold" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Cảm biến môi trường AI</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Đo đạc độ ẩm và nhiệt độ phòng chuẩn xác theo thời gian thực.</p>
              </div>
            </div>
            <div className="flex md:flex-row-reverse items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0 mt-0.5">
                <Leaf size={16} weight="bold" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Chế độ Eco AI</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Tự động duy trì mức nhiệt độ tối ưu 25°C bảo vệ sức khỏe.</p>
              </div>
            </div>
            <div className="flex md:flex-row-reverse items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0 mt-0.5">
                <Lightning size={16} weight="bold" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Tiết kiệm 30% hóa đơn</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Giảm thiểu tối đa lượng điện hao phí của hệ điều hòa trung tâm.</p>
              </div>
            </div>
          </div>

          {/* Hộp bán phụ kiện (Accessory Showcase Card) */}
          <div className="mt-2 w-full p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/30 text-cyan-500 flex items-center justify-center border border-cyan-200/30">
                <Cpu size={24} weight="duotone" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Cảm Biến Khí Hậu Helicorp</h4>
                <p className="text-[10px] text-zinc-500">Đo nhiệt độ, độ ẩm chuẩn xác</p>
                <p className="text-xs font-bold text-cyan-500 mt-0.5">590.000đ</p>
              </div>
            </div>

            <button
              onClick={() => addToCart({
                id: 'helicorp-climate-04',
                name: 'Cảm Biến Khí Hậu Helicorp Climate',
                price: 590000,
                image: 'climate-sensor'
              })}
              className="px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-zinc-950/10 dark:shadow-white/5"
            >
              <span>Mua ngay</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
});
