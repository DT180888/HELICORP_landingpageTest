# PROJECT RULES & DESIGN GUIDELINES

Dự án: **HELICORP Landing Page Test - Smart Home Hub Controller**
Quy định này là bắt buộc đối với tất cả các thao tác sinh mã nguồn, phát triển component và logic.

---

## 1. QUY TẮC PHÁT TRIỂN & VIẾT CODE

* **Chú thích bắt buộc (Function Comments):** 
  * TẤT CẢ các hàm, custom hooks, helper functions, và các React components bắt buộc phải có mô tả/chú thích chi tiết (JSDoc hoặc block comments) giải thích rõ: mục đích, tham số (props/arguments) và giá trị trả về.
* **Tối ưu hóa Re-render:** 
  * Bọc các component trong `React.memo` nếu component đó có khả năng re-render nhiều hoặc nhận props ổn định từ cha.
* **TypeScript:** 
  * Định nghĩa rõ ràng kiểu dữ liệu (types/interfaces) cho mọi props, state và giá trị trả về. Không dùng `any`.
* **Cấu trúc thư mục:**
  * `/src/components`: Các component UI nhỏ, tái sử dụng (Button, Input, Card).
  * `/src/sections`: Các khối nội dung lớn của trang (Hero, SmartDashboard, TechSpecs, SubscribeForm, MiniCart).
  * `/src/hooks`: Custom hooks (useCart, useDarkMode, useIntersectionObserver).
  * `/src/utils`: Hàm xử lý logic chung (formatCurrency, validation).
  * `/src/data`: Dữ liệu tĩnh hoặc mock data.

---

## 2. HIỆU NĂNG & SEO (PERFORMANCE FIRST)

* **PageSpeed Insights (Mobile):** Đảm bảo điểm số tối thiểu từ **85/100 trở lên**.
* **Định dạng ảnh:** TẤT CẢ các ảnh sử dụng trong dự án bắt buộc phải là định dạng `.webp`.
* **Lazy Loading:** Áp dụng lazy loading cho toàn bộ hình ảnh và các component nằm ngoài màn hình hiển thị đầu tiên (viewport).
* **SEO Technical:** Sử dụng Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`). Tích hợp thẻ Title, Meta Description và Open Graph đầy đủ vào `<head>` của `index.html`.

---

## 3. THẨM MỸ DỰ ÁN & ĐỊNH HƯỚNG THIẾT KẾ

* **Aesthetic Family:** **Ethereal Glass (Dark Tech)**
  * Nền: Màu tối sâu OLED (`#050505` hoặc `bg-oled-black`).
  * Layer: Glassmorphism (`glass-panel`) với viền mờ 1px phản chiếu, backdrop blur cường độ cao và hiệu ứng ánh sáng dịu.
  * Màu nhấn (Accent): Electric Teal (`#00f2fe`) kết hợp Electric Blue (`#4facfe`).
  * Chỉ số thiết kế (Dials):
    * `DESIGN_VARIANCE: 7` (Bố cục bất đối xứng, lưới bento hiện đại, không đơn điệu).
    * `MOTION_INTENSITY: 7` (Chuyển động mượt mà, sử dụng spring physics, hỗ trợ prefers-reduced-motion).
    * `VISUAL_DENSITY: 4` (Bố cục thoáng, khoảng cách tối thiểu `py-24` cho các section).
* **Typography:**
  * Font tiêu đề (Display/Headline): **Plus Jakarta Sans** (`font-display`).
  * Font nội dung (Body/UI): **Geist** (`font-sans`).
* **Định dạng nút bấm (CTAs):**
  * CTA chính phải bo tròn hoàn toàn (`rounded-full`) và có icon đi kèm dạng "button-in-button" (icon bọc trong vòng tròn riêng biệt).
  * Kiểm tra độ tương phản (a11y) tối thiểu 4.5:1. Không cho phép nút bấm bị wrap chữ xuống dòng trên desktop.

---

## 4. QUY CHUẨN GIT COMMIT

* Mọi thay đổi mã nguồn phải đi kèm với commit rõ ràng:
  * `feat: ...` (thêm tính năng mới)
  * `fix: ...` (sửa lỗi)
  * `chore: ...` (cập nhật cấu hình, cài đặt thư viện)
  * `docs: ...` (thay đổi tài liệu)
