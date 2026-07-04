import React from 'react';
import { FacebookLogo, GithubLogo, TwitterLogo, YoutubeLogo, Envelope, Phone, MapPin } from '@phosphor-icons/react';

/**
 * Component Footer đại diện cho chân trang của website.
 * Hiển thị thông tin bản quyền, các liên kết nhanh, thông tin liên hệ và liên kết mạng xã hội.
 * Áp dụng lưới bất đối xứng và phong cách thiết kế Ethereal Glass (Dark Tech).
 * 
 * @returns {JSX.Element} Giao diện chân trang hoàn chỉnh.
 */
export const Footer = React.memo(function Footer() {
  
  /**
   * Cuộn mượt mà đến một section cụ thể trên trang.
   * 
   * @param {string} sectionId ID của section đích.
   */
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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
    <footer className="w-full mt-auto border-t border-zinc-200/10 dark:border-white/5 bg-white/5 dark:bg-zinc-950/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        
        {/* Lưới phân bổ thông tin bất đối xứng */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Cột 1: Thông tin thương hiệu (Chiếm 5 cột trên desktop) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-accent-teal to-accent-blue p-[1px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">H</span>
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-display">
                HELICORP
              </span>
            </div>
            
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              Giải pháp tối ưu kết nối và điều khiển thiết bị thông minh cho ngôi nhà của bạn. Mang lại không gian sống hiện đại, an toàn và tiết kiệm năng lượng.
            </p>
            
            {/* Biểu tượng mạng xã hội (Social icons) */}
            <div className="flex items-center gap-4">
              {[
                { icon: <FacebookLogo size={18} />, url: 'https://facebook.com', label: 'Facebook' },
                { icon: <TwitterLogo size={18} />, url: 'https://twitter.com', label: 'Twitter/X' },
                { icon: <GithubLogo size={18} />, url: 'https://github.com', label: 'GitHub' },
                { icon: <YoutubeLogo size={18} />, url: 'https://youtube.com', label: 'YouTube' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-accent-teal hover:border-accent-teal/50 dark:hover:text-accent-teal dark:hover:border-accent-teal/30 flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Cột 2: Đường dẫn nhanh (Chiếm 3 cột trên desktop) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-display">
              Khám Phá
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Trang chủ', id: 'hero' },
                { label: 'Bảng điều khiển', id: 'dashboard' },
                { label: 'Thông số kỹ thuật', id: 'specs' },
                { label: 'Đăng ký nhận tin', id: 'subscribe' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollToSection(link.id)}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-accent-teal dark:hover:text-accent-teal transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Cột 3: Thông tin liên hệ (Chiếm 4 cột trên desktop) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-display">
              Liên Hệ
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-teal mt-0.5 shrink-0" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Tòa nhà HELICORP, Khu Công Nghệ Cao, Quận 9, TP. Hồ Chí Minh, Việt Nam.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Envelope size={18} className="text-accent-teal shrink-0" />
                <a 
                  href="mailto:tuyendung@helicorp.vn" 
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-accent-teal transition-colors duration-200"
                >
                  tuyendung@helicorp.vn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-teal shrink-0" />
                <a 
                  href="tel:19001234" 
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-accent-teal transition-colors duration-200"
                >
                  1900 1234 (8:00 - 17:30)
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
});
