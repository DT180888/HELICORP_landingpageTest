import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ShieldCheck, LockKey, LockKeyOpen, Broadcast, Bell, WarningCircle } from '@phosphor-icons/react';
import { useCart } from '../../hooks/useCart';

/**
 * Interface cho dòng nhật ký bảo mật.
 */
interface SecurityLog {
  time: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'danger';
}

/**
 * Component SmartSecurity mô phỏng phân hệ an ninh thông minh.
 * Tích hợp kịch bản an ninh, nhật ký thời gian thực và tương tác giả lập đột nhập.
 */
export const SmartSecurity = React.memo(function SmartSecurity() {
  const { addToCart } = useCart();
  
  // Trạng thái an ninh nghiêm ngặt (Armed Mode)
  const [isArmed, setIsArmed] = useState<boolean>(false);
  
  // Trạng thái giả lập đột nhập (Intrusion Detected)
  const [isIntrusion, setIsIntrusion] = useState<boolean>(false);
  
  // Trạng thái cửa (true = đóng, false = mở)
  const [isDoorClosed, setIsDoorClosed] = useState<boolean>(true);
  
  // Nhật ký sự kiện
  const [logs, setLogs] = useState<SecurityLog[]>([
    { time: '14:50:12', message: 'Hệ thống an ninh khởi động thành công.', type: 'success' },
    { time: '14:51:00', message: 'Cảm biến chuyển động phòng khách: Sẵn sàng.', type: 'info' },
    { time: '14:52:05', message: 'Cửa ban công: Đã khóa.', type: 'info' }
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);

  // Cuộn tự động nhật ký sự kiện xuống cuối khi có log mới
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  /**
   * Thêm log mới vào màn hình console
   */
  const addLog = (message: string, type: 'info' | 'warning' | 'success' | 'danger' = 'info') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs((prev) => [...prev, { time: timeStr, message, type }]);
  };

  /**
   * Chuyển đổi trạng thái chế độ an ninh nghiêm ngặt
   */
  const handleToggleArmed = () => {
    const nextState = !isArmed;
    setIsArmed(nextState);
    if (nextState) {
      addLog('Đã KÍCH HOẠT chế độ bảo vệ nghiêm ngặt.', 'warning');
      addLog('Cảnh báo đột nhập AI: Hoạt động tối đa.', 'info');
      addLog('Đã chốt khóa cửa chính tự động.', 'success');
      setIsDoorClosed(true);
    } else {
      addLog('Đã TẮT chế độ bảo vệ nghiêm ngặt. Hệ thống chuyển về giám sát thường.', 'info');
      setIsIntrusion(false);
    }
  };

  /**
   * Giả lập đột nhập (mở cửa / phát hiện chuyển động lạ)
   */
  const handleSimulateIntrusion = () => {
    if (isArmed) {
      setIsIntrusion(true);
      setIsDoorClosed(false);
      addLog('PHÁT HIỆN ĐỘT NHẬP: Cửa chính bị mở bất thường!', 'danger');
      addLog('Đã kích hoạt còi báo động khẩn cấp.', 'danger');
      addLog('Đang gửi thông báo khẩn cấp đến thiết bị di động của chủ nhà...', 'warning');
    } else {
      setIsDoorClosed((prev) => !prev);
      const nextDoorState = !isDoorClosed;
      addLog(
        nextDoorState ? 'Cửa chính: Đã đóng (Bình thường).' : 'Cửa chính: Đã mở (Bình thường).',
        'info'
      );
    }
  };

  /**
   * Đặt lại báo động
   */
  const handleResetAlarm = () => {
    setIsIntrusion(false);
    setIsDoorClosed(true);
    addLog('Đã tắt còi báo động và khôi phục trạng thái an toàn.', 'success');
  };

  return (
    <div className="py-12 relative overflow-hidden">
      {/* Vòng hào quang sáng nền */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-rose-500/2 dark:bg-rose-500/4 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* KHỐI NỘI DUNG (LEFT SIDE) */}
        <div className="md:col-span-5 flex flex-col gap-6 text-left items-start order-2 md:order-1">
          
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold font-sans">
              Phân Hệ An Ninh AI
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white font-display">
            Bảo vệ chủ động.<br />An tâm tuyệt đối.
          </h2>

          <div className="grid grid-cols-1 gap-4 mt-2 w-full">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                <Shield size={16} weight="bold" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">AI Camera nhận diện 0.5s</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Phân tích chuyển động và nhận dạng khuôn mặt cục bộ bảo mật.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                <LockKey size={16} weight="bold" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Tự động chốt khóa vật lý</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Tự động khóa toàn bộ hệ thống cửa khi phát hiện xâm nhập.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                <Bell size={16} weight="bold" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">Báo động đa kênh</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Phát còi hú tại chỗ và gửi thông báo đẩy lập tức về điện thoại của bạn.</p>
              </div>
            </div>
          </div>

          {/* Hộp sản phẩm phụ trợ (Accessory Showcase Card) - Bản Desktop */}
          <div className="hidden md:flex mt-2 w-full p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center border border-rose-200/30">
                <Broadcast size={24} weight="duotone" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Cảm Biến Cửa Helicorp</h4>
                <p className="text-[10px] text-zinc-500">Phát hiện đột nhập & đóng mở cửa</p>
                <p className="text-xs font-bold text-rose-500 mt-0.5">450.000đ</p>
              </div>
            </div>

            <button
              onClick={() => addToCart({
                id: 'helicorp-door-02',
                name: 'Cảm Biến Cửa Helicorp Door',
                price: 450000,
                image: 'door-sensor'
              })}
              className="px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-sm flex items-center gap-1.5 transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-zinc-950/10 dark:shadow-white/5"
            >
              <span>Mua ngay</span>
            </button>
          </div>

        </div>

        {/* KHỐI GIẢ LẬP MÔ PHỎNG (RIGHT SIDE - WIDGET) */}
        <div className="md:col-span-7 w-full flex justify-center order-1 md:order-2">
          <div className="w-full p-3.5 rounded-3xl bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/40 dark:border-white/10 shadow-2xl">
            <div className={`rounded-xl bg-zinc-100 dark:bg-[#070709] p-5 relative overflow-hidden transition-all duration-500 border ${
              isIntrusion 
                ? 'border-rose-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)] bg-rose-500/5 dark:bg-rose-950/10' 
                : 'border-zinc-200/50 dark:border-zinc-900/50'
            }`}>
              
              {/* Radar pulse khi ở trạng thái bảo vệ nghiêm ngặt */}
              {isArmed && !isIntrusion && (
                <div className="absolute top-2 right-2 w-3 h-3 flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </div>
              )}

              {/* Panel Header */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800/80 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-200 tracking-wider uppercase font-sans">
                    Helicorp Secure OS
                  </h3>
                  <p className="text-[10px] text-zinc-500">Node: Phòng Khách</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isArmed 
                      ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-500' 
                      : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500'
                  }`}>
                    {isArmed ? 'Chế độ: Nghiêm ngặt' : 'Chế độ: Bình thường'}
                  </span>
                </div>
              </div>

              {/* Console logs screen */}
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wide">
                  Nhật ký bảo mật thời gian thực
                </p>
                <div 
                  ref={logContainerRef}
                  className="h-28 rounded-lg bg-zinc-950 p-3 font-mono text-[10px] overflow-y-auto flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-zinc-800 border border-zinc-800/50"
                >
                  {logs.map((log, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="text-zinc-600 shrink-0">{log.time}</span>
                      <span className={
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'warning' ? 'text-amber-400' :
                        log.type === 'danger' ? 'text-rose-400 font-semibold animate-pulse' :
                        'text-zinc-300'
                      }>
                        {log.type === 'danger' ? '⚠️ ' : log.type === 'warning' ? '⚡ ' : '• '}
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Indicator & Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                
                {/* Thiết bị 1: Cửa chính */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isDoorClosed 
                      ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-500' 
                      : 'bg-rose-100 dark:bg-rose-950/30 text-rose-500'
                  }`}>
                    {isDoorClosed ? <LockKey size={18} /> : <LockKeyOpen size={18} />}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-zinc-500 font-sans">Cửa chính</p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {isDoorClosed ? 'Đang Khóa' : 'Đang Mở'}
                    </p>
                  </div>
                </div>

                {/* Thiết bị 2: Trạng thái còi hú */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isIntrusion 
                      ? 'bg-rose-500 text-white animate-bounce' 
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500'
                  }`}>
                    <Bell size={18} weight={isIntrusion ? 'fill' : 'regular'} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-zinc-500 font-sans">Hệ thống báo động</p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {isIntrusion ? 'ĐANG BÁO ĐỘNG' : 'Sẵn sàng'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Interactive Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                
                {/* Button toggle armed state */}
                <button
                  onClick={handleToggleArmed}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                    isArmed 
                      ? 'bg-rose-500 hover:bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-500/20' 
                      : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 border-transparent shadow-md shadow-zinc-900/10'
                  }`}
                >
                  {isArmed ? (
                    <>
                      <Shield size={16} weight="fill" />
                      <span>Hạ xuống bảo vệ thường</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} weight="bold" />
                      <span>Bật bảo vệ nghiêm ngặt</span>
                    </>
                  )}
                </button>

                {/* Intrusion Simulation Trigger Button */}
                <button
                  onClick={isIntrusion ? handleResetAlarm : handleSimulateIntrusion}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs border cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${
                    isIntrusion 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20' 
                      : 'bg-white hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  {isIntrusion ? (
                    <>
                      <ShieldCheck size={16} weight="bold" />
                      <span>Tắt báo động</span>
                    </>
                  ) : (
                    <>
                      <WarningCircle size={16} weight="bold" />
                      <span>{isArmed ? 'Giả lập đột nhập' : 'Giả lập đóng/mở cửa'}</span>
                    </>
                  )}
                </button>

              </div>

              {/* Fullscreen Overlay Alarm Effect for visual wow factor */}
              <AnimatePresence>
                {isIntrusion && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-rose-500/10 pointer-events-none flex items-center justify-center border-2 border-rose-500 animate-pulse"
                  />
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Hộp sản phẩm phụ trợ (Accessory Showcase Card) - Bản Mobile */}
        <div className="flex md:hidden mt-2 w-full p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md items-center justify-between gap-4 order-3 md:hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center border border-rose-200/30">
              <Broadcast size={24} weight="duotone" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Cảm Biến Cửa Helicorp</h4>
              <p className="text-[10px] text-zinc-500">Phát hiện đột nhập & đóng mở cửa</p>
              <p className="text-xs font-bold text-rose-500 mt-0.5">450.000đ</p>
            </div>
          </div>

          <button
            onClick={() => addToCart({
              id: 'helicorp-door-02',
              name: 'Cảm Biến Cửa Helicorp Door',
              price: 450000,
              image: 'door-sensor'
            })}
            className="px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-sm flex items-center gap-1.5 transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-zinc-950/10 dark:shadow-white/5"
          >
            <span>Mua ngay</span>
          </button>
        </div>

      </div>
    </div>
  );
});
