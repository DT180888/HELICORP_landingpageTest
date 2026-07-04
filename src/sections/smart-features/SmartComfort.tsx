import React, { useState, useEffect } from 'react';
import { Play, Pause, Lightbulb, Sliders, MusicNote, Sparkle } from '@phosphor-icons/react';
import { useCart } from '../../hooks/useCart';

type SceneType = 'relax' | 'work' | 'cinema';

interface SceneDetail {
  songTitle: string;
  artist: string;
  lightColor: string; // Tailwind color class for bulb
  bgGlowClass: string; // Tailwind glow classes
  lightText: string;
  description: string;
}

const SCENE_DETAILS: Record<SceneType, SceneDetail> = {
  relax: {
    songTitle: 'Lofi Coffee Shop',
    artist: 'Chillhop Beats',
    lightColor: 'text-amber-500 bg-amber-100 dark:bg-amber-950/45',
    bgGlowClass: 'shadow-[0_0_30px_rgba(245,158,11,0.08)] border-amber-500/20 bg-amber-500/3 dark:bg-amber-950/5',
    lightText: 'Vàng Ấm (2700K)',
    description: 'Ánh sáng ấm dịu, nhạc lofi nhẹ nhàng.'
  },
  work: {
    songTitle: 'Alpha Brainwaves',
    artist: 'Focus Laboratory',
    lightColor: 'text-cyan-500 bg-cyan-105 dark:bg-cyan-950/45',
    bgGlowClass: 'shadow-[0_0_30px_rgba(6,182,212,0.08)] border-cyan-500/20 bg-cyan-500/3 dark:bg-cyan-950/5',
    lightText: 'Trắng Sáng (6500K)',
    description: 'Ánh sáng tập trung, âm thanh sóng não.'
  },
  cinema: {
    songTitle: 'Interstellar Soundtrack',
    artist: 'Hans Zimmer Cover',
    lightColor: 'text-violet-500 bg-violet-100 dark:bg-violet-950/45',
    bgGlowClass: 'shadow-[0_0_30px_rgba(139,92,246,0.08)] border-violet-500/20 bg-violet-500/3 dark:bg-violet-950/5',
    lightText: 'Tím Neon & Indigo',
    description: 'Ánh sáng tối, âm thanh rạp phim đa vùng.'
  }
};

/**
 * Component SmartComfort mô phỏng kịch bản tiện nghi ánh sáng và âm thanh giải trí.
 * Cho phép người dùng chuyển kịch bản không gian, bật tắt nhạc và điều chỉnh độ sáng đèn.
 */
export const SmartComfort = React.memo(function SmartComfort() {
  const { addToCart } = useCart();
  
  // Kịch bản hiện tại
  const [activeScene, setActiveScene] = useState<SceneType>('relax');
  
  // Trạng thái phát nhạc
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // Độ sáng đèn (%)
  const [brightness, setBrightness] = useState<number>(70);
  
  // Chiều cao cột sóng nhạc equalizer
  const [eqHeights, setEqHeights] = useState<number[]>([8, 12, 10, 16, 14]);

  // Hiệu ứng equalizer chuyển động khi đang phát nhạc
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setEqHeights(
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 24) + 6)
        );
      }, 150);
    } else {
      setEqHeights([8, 8, 8, 8, 8]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const scene = SCENE_DETAILS[activeScene];

  return (
    <div className="py-12 relative overflow-hidden">
      {/* Vòng hào quang sáng nền */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/2 dark:bg-violet-500/4 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* KHỐI NỘI DUNG (LEFT SIDE) */}
        <div className="md:col-span-5 flex flex-col gap-6 text-left items-start order-2 md:order-1">
          
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold font-sans">
              Phân Hệ Tiện Nghi & Giải Trí
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white font-display">
            Không gian cảm xúc.<br />Chạm là thăng hoa.
          </h2>

          <div className="grid grid-cols-1 gap-4 mt-2 w-full">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500 shrink-0 mt-0.5">
                <Sparkle size={16} weight="bold" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Đồng bộ ánh sáng & âm nhạc</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Hệ thống đèn ambient tự động đổi màu theo nhịp nhạc của từng kịch bản.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500 shrink-0 mt-0.5">
                <MusicNote size={16} weight="bold" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Kịch bản không gian 1 chạm</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Chuyển đổi tức thì 3 chế độ Thư giãn, Làm việc, Rạp phim nhanh chóng.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500 shrink-0 mt-0.5">
                <Sliders size={16} weight="bold" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Tùy biến độ sáng vô cấp</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Thanh trượt điều khiển độ sáng từ 10% - 100% cực kỳ mịn màng.</p>
              </div>
            </div>
          </div>

          {/* Hộp bán phụ kiện (Accessory Showcase Card) - Bản Desktop */}
          <div className="hidden md:flex mt-2 w-full p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-950/30 text-violet-500 flex items-center justify-center border border-violet-200/30">
                <MusicNote size={24} weight="duotone" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Ổ Cắm Thông Minh Helicorp</h4>
                <p className="text-[10px] text-zinc-500">Đo điện năng, hẹn giờ bật tắt</p>
                <p className="text-xs font-bold text-violet-500 mt-0.5">390.000đ</p>
              </div>
            </div>

            <button
              onClick={() => addToCart({
                id: 'helicorp-plug-05',
                name: 'Ổ Cắm Thông Minh Helicorp Plug',
                price: 390000,
                image: 'smart-plug'
              })}
              className="px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-zinc-950/10 dark:shadow-white/5"
            >
              <span>Mua ngay</span>
            </button>
          </div>

        </div>

        {/* KHỐI GIẢ LẬP MÔ PHỎNG (RIGHT SIDE - WIDGET) */}
        <div className="md:col-span-7 w-full flex justify-center order-1 md:order-2">
          <div className="w-full p-3.5 rounded-3xl bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/40 dark:border-white/10 shadow-2xl">
            <div className={`rounded-xl bg-zinc-100 dark:bg-[#070709] p-5 relative overflow-hidden transition-all duration-500 border ${scene.bgGlowClass}`}>
              
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800/80 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-200 tracking-wider uppercase font-sans">
                    Helicorp Media OS
                  </h3>
                  <p className="text-[10px] text-zinc-500">Node: Phòng Khách</p>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-200/60 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-300/20">
                  <Sparkle size={14} className="text-violet-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">Đồng bộ tự động: Bật</span>
                </div>
              </div>

              {/* 1. Phần điều khiển kịch bản ánh sáng */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                
                {/* Đèn thông minh */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-3">
                    <div className={`p-2.5 rounded-lg transition-all duration-300 ${scene.lightColor}`}>
                      <Lightbulb size={20} weight="fill" style={{ opacity: brightness / 100 }} />
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{brightness}%</span>
                      <p className="text-[9px] text-zinc-400">Độ sáng</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Đèn Ambient</h4>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate mt-0.5">{scene.lightText}</p>
                  </div>
                </div>

                {/* Chọn Kịch bản nhanh */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Kịch bản</span>
                    <Sliders size={14} className="text-zinc-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {(['relax', 'work', 'cinema'] as SceneType[]).map((sc) => (
                      <button
                        key={sc}
                        onClick={() => setActiveScene(sc)}
                        className={`py-1.5 px-2.5 rounded-md text-[10px] font-bold text-left cursor-pointer transition-all duration-200 ${
                          activeScene === sc
                            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-black'
                            : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {sc === 'relax' ? '☕ Thư giãn' : sc === 'work' ? '💻 Làm việc' : '🎬 Rạp phim'}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Slider điều chỉnh độ sáng trực quan */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 mb-5">
                <div className="flex justify-between items-center mb-2 text-[10px] text-zinc-500 font-medium">
                  <span>Điều chỉnh độ sáng đèn thủ công</span>
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">{brightness}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-zinc-400">Min</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                  <span className="text-[10px] text-zinc-400">Max</span>
                </div>
              </div>

              {/* 2. Trình âm thanh Media Player */}
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between gap-4">
                
                {/* Thông tin đĩa nhạc */}
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`w-11 h-11 rounded-full bg-zinc-950 border border-zinc-800/80 flex items-center justify-center relative shrink-0 overflow-hidden ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
                    <div className="w-3.5 h-3.5 rounded-full bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-zinc-950" />
                    </div>
                  </div>
                  <div className="text-left overflow-hidden">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{scene.songTitle}</h4>
                    <p className="text-[10px] text-zinc-500 truncate">{scene.artist}</p>
                  </div>
                </div>

                {/* Sóng nhạc & Nút Điều khiển */}
                <div className="flex items-center gap-3 shrink-0">
                  
                  {/* Cột sóng nhạc */}
                  <div className="flex items-end gap-[2px] h-6">
                    {eqHeights.map((h, i) => (
                      <div 
                        key={i} 
                        className="w-[2.5px] bg-violet-500 dark:bg-violet-400 rounded-sm transition-all duration-150"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>

                  {/* Nút Play/Pause */}
                  <button
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white cursor-pointer transition-colors duration-300 ${
                      isPlaying 
                        ? 'bg-violet-600 hover:bg-violet-750' 
                        : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950'
                    }`}
                    aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
                  >
                    {isPlaying ? <Pause size={16} weight="bold" /> : <Play size={16} weight="bold" className="ml-0.5" />}
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Hộp bán phụ kiện (Accessory Showcase Card) - Bản Mobile */}
        <div className="flex md:hidden mt-2 w-full p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md items-center justify-between gap-4 order-3 md:hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-950/30 text-violet-500 flex items-center justify-center border border-violet-200/30">
              <MusicNote size={24} weight="duotone" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Ổ Cắm Thông Minh Helicorp</h4>
              <p className="text-[10px] text-zinc-500">Đo điện năng, hẹn giờ bật tắt</p>
              <p className="text-xs font-bold text-violet-500 mt-0.5">390.000đ</p>
            </div>
          </div>

          <button
            onClick={() => addToCart({
              id: 'helicorp-plug-05',
              name: 'Ổ Cắm Thông Minh Helicorp Plug',
              price: 390000,
              image: 'smart-plug'
            })}
            className="px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-zinc-950/10 dark:shadow-white/5"
          >
            <span>Mua ngay</span>
          </button>
        </div>

      </div>
    </div>
  );
});
