---
trigger: always_on
---

# PROJECT OVERVIEW
Project Name: Helicorp Landing Page Test - IT Website Developer Intern
Product Theme: Smart Home Hub Controller (Hệ thống điều khiển nhà thông minh)
Goal: Xây dựng một Landing Page hiện đại, chuẩn UI/UX, tối ưu hiệu năng (PageSpeed > 85) và có khả năng deploy lên Cloud.

# TECHNOLOGY STACK
- Framework: ReactJS + Vite (TypeScript)
- Styling: Tailwind CSS
- State Management: React Hooks (useState, useEffect, useContext) + Local Storage
- Animation (Bonus): Framer Motion (cho hiệu ứng Scrollytelling và Micro-interactions)

# DIRECTORY STRUCTURE
Bắt buộc tuân thủ cấu trúc thư mục sau khi tạo file/component mới:
/src
  /assets      # Chứa hình ảnh định dạng WebP, icons
  /components  # UI components tái sử dụng (Button, Input, Card)
  /sections    # Các phần chính (Hero, Features, TechSpecs, Cart/Fav, ContactForm)
  /hooks       # Custom hooks (useCart, useDarkMode, useIntersectionObserver)
  /utils       # Helper functions (formatCurrency, validation)
  /data        # Mock data (thông số kỹ thuật, danh sách tính năng)

# CORE DIRECTIVES (MUST-HAVE)
1. **Performance First:** 
   - Đảm bảo điểm Google PageSpeed Insights (Mobile) >= 85[cite: 1].
   - TẤT CẢ hình ảnh phải dùng định dạng `.webp`.
   - Implement Lazy Loading cho hình ảnh và các component không nằm trong viewport ban đầu.
   - KHÔNG cài đặt các thư viện bên thứ 3 quá nặng nếu không thực sự cần thiết.

2. **Responsive & UI/UX:**
   - Áp dụng phương pháp tiếp cận Mobile-First[cite: 1].
   - Giao diện không được vỡ khung trên bất kỳ kích thước màn hình nào (Desktop, Tablet, Mobile)[cite: 1].
   - Đảm bảo spacing và typography đồng nhất, sạch sẽ theo chuẩn thiết kế hiện đại[cite: 1].

3. **SEO Technical:**
   - Tích hợp đầy đủ các thẻ Meta cơ bản vào thẻ `<head>` của `index.html`: `Title`, `Description`, `Open Graph` (og:title, og:image, og:description)[cite: 1].
   - Sử dụng Semantic HTML (ví dụ: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).

4. **Git Commit Standard:**
   - Sinh code kết hợp với thông báo commit rõ ràng (vd: `feat: add hero section`, `fix: mobile layout`, `chore: setup tailwind`)[cite: 1].

# BONUS DIRECTIVES (NICE-TO-HAVE)
Agent cần ưu tiên tích hợp các tính năng sau nếu được yêu cầu:
1. **Dark Mode:** Tích hợp tính năng chuyển đổi Light/Dark mode sử dụng cấu hình của Tailwind CSS[cite: 1].
2. **Mini E-commerce:** Xây dựng logic lưu sản phẩm vào Giỏ hàng (Cart) và Danh sách yêu thích (Wishlist) bằng Local Storage[cite: 1].
3. **Scrollytelling:** Sử dụng Framer Motion để tạo hiệu ứng cuộn trang mượt mà (Fade in, Slide up) và Parallax cho các section[cite: 1].

# BEHAVIORAL RULES FOR AGENT
- Không tự ý giải thích dài dòng, chỉ output ra code hoặc câu lệnh cần thiết.
- Khi tạo component, luôn bọc trong `React.memo` nếu component đó có khả năng re-render nhiều.
- Luôn sử dụng TypeScript interfaces/types để định nghĩa props và state rõ ràng.
- Tự động bóc tách các hàm logic phức tạp ra file riêng trong thư mục `/utils` hoặc `/hooks`.