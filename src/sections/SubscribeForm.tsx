import React, { useState } from 'react';
import { EnvelopeSimple, PaperPlaneRight, CircleNotch } from '@phosphor-icons/react';

/**
 * Component SubscribeForm đại diện cho biểu mẫu đăng ký nhận bản tin khuyến mãi/cập nhật.
 * Cung cấp chức năng xác thực email, gửi dữ liệu lên Webhook và hiển thị thông báo phản hồi.
 * Tuân thủ quy chuẩn thiết kế Ethereal Glass (Dark Tech) và thiết kế biểu mẫu tiêu chuẩn.
 * 
 * @returns {JSX.Element} Khối đăng ký nhận tin hoàn chỉnh.
 */
export const SubscribeForm = React.memo(function SubscribeForm() {
  const [email, setEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Xác thực định dạng email bằng Regular Expression.
   * 
   * @param {string} val Địa chỉ email cần kiểm tra.
   * @returns {boolean} True nếu định dạng email hợp lệ.
   */
  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  /**
   * Xử lý hành động gửi biểu mẫu.
   * Thực hiện validate email, gọi API Webhook qua fetch POST và hiển thị kết quả.
   * 
   * @param {React.FormEvent} e Sự kiện submit form.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Kiểm tra tính hợp lệ của email
    if (!email.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Định dạng email không hợp lệ. Ví dụ: name@example.com');
      return;
    }

    setIsLoading(true);

    try {
      // Gửi dữ liệu tới Webhook mock của httpbin.org
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: 'LandingPage_SubscribeForm',
        }),
      });

      if (response.ok) {
        setSuccessMsg('Đăng ký nhận tin thành công! Cảm ơn bạn đã quan tâm.');
        setEmail('');
      } else {
        throw new Error('Gửi dữ liệu không thành công.');
      }
    } catch {
      setErrorMsg('Có lỗi xảy ra trong quá trình gửi dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="subscribe" 
      className="py-24 px-6 bg-zinc-950/20 relative"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12">
        
        {/* Phần tiêu đề thông điệp */}
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white font-display">
            Đăng Ký Nhận Cập Nhật Mới Nhất
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Nhận thông tin cập nhật về các tính năng mới, tài liệu hướng dẫn và ưu đãi sớm nhất từ hệ sinh thái Helicorp.
          </p>
        </div>

        {/* Biểu mẫu thiết kế Double-Bezel lồng nhau (Ethereal Glass) */}
        <div className="p-3.5 rounded-3xl bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/40 dark:border-white/10 shadow-2xl max-w-xl mx-auto w-full">
          
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-100 dark:bg-[#070709] p-8 flex flex-col gap-6 transition-colors duration-300">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
              
              {/* Nhãn nhãn thông tin phía trên Input (Label above input) */}
              <div className="flex flex-col gap-2.5 text-left w-full">
                <label 
                  htmlFor="email-input" 
                  className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-sans"
                >
                  Địa chỉ Email của bạn
                </label>
                
                {/* Khối nhập liệu kèm icon phong cách mờ kính */}
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-zinc-400 dark:text-zinc-500 pointer-events-none">
                    <EnvelopeSimple size={20} weight="regular" />
                  </div>
                  
                  <input
                    id="email-input"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 font-sans text-sm focus:outline-hidden focus:border-accent-teal dark:focus:border-accent-teal focus:ring-2 focus:ring-accent-teal/20 transition-all duration-300 disabled:opacity-50"
                  />
                </div>
                
                {/* Thông báo lỗi ở phía dưới (Error message below input) */}
                {errorMsg && (
                  <p className="text-xs text-rose-500 font-medium mt-1">
                    {errorMsg}
                  </p>
                )}
                
                {/* Thông báo thành công ở phía dưới (Success message below input) */}
                {successMsg && (
                  <p className="text-xs text-emerald-500 font-medium mt-1">
                    {successMsg}
                  </p>
                )}
              </div>

              {/* Nút gửi (CTA) dạng Button-in-Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full pl-6 pr-2.5 py-2.5 rounded-xl bg-linear-to-r from-accent-teal to-accent-blue text-zinc-950 font-bold text-sm flex items-center justify-between hover:shadow-lg hover:shadow-accent-teal/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <span>Đăng ký nhận tin</span>
                <span className="w-8 h-8 rounded-lg bg-white/25 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  {isLoading ? (
                    <CircleNotch size={14} weight="bold" className="animate-spin" />
                  ) : (
                    <PaperPlaneRight size={14} weight="fill" />
                  )}
                </span>
              </button>

            </form>
            
          </div>
        </div>

      </div>
    </section>
  );
});
