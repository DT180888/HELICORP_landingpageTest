# Helicorp Landing Page - Smart Home Hub Controller

Dự án Landing Page giới thiệu sản phẩm Bộ Điều Khiển Trung Tâm Nhà Thông Minh **Helicorp Hub**, được thiết kế và tối ưu hóa chuẩn UI/UX hiện đại, hiệu năng cao và sẵn sàng triển khai lên môi trường Cloud.

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

- **Framework:** ReactJS (React 19) + Vite + TypeScript (TS 5.x)
- **Styling:** Tailwind CSS v4 (Cấu hình Class-based Dark Mode mới nhất)
- **Chuyển động (Animations):** Framer Motion (`motion/react`) cho hiệu ứng mượt mà (spring physics).
- **Icons:** Phosphor Icons (`@phosphor-icons/react`).
- **Linter:** Oxlint (Tốc độ quét nhanh vượt trội so với ESLint truyền thống).
- **Quản lý trạng thái:** React Hooks + Local Storage để đồng bộ giỏ hàng và chế độ tối (Dark Mode).

---

## ✨ Các Tính Năng Đã Hoàn Thiện

1. **Giao diện Ethereal Glass (Dark Tech):**
   - Tối ưu màu sắc sâu (`#050505`) kết hợp với Electric Teal/Blue làm điểm nhấn.
   - Các lớp cấu trúc dạng **Double-Bezel** lồng nhau tạo chiều sâu cơ học cao cấp.
   - Làm mượt quá trình chuyển đổi giao diện Dark/Light bằng CSS variables và hoạt ảnh xoay icon Sun/Moon mượt mà.
2. **Hero Section tương tác:**
   - Hoạt ảnh xuất hiện chữ (Blur & Fade reveal) và mô hình thiết bị trung tâm bay lơ lửng tự nhiên.
   - Nút kêu gọi hành động (CTA) dạng **button-in-button** hỗ trợ thêm nhanh sản phẩm vào giỏ hàng.
3. **Bảng điều khiển IoT ảo (`SmartDashboard`):**
   - Cho phép bật/tắt đèn (hiệu ứng tỏa sáng), tăng/giảm nhiệt độ điều hòa (đổi màu tiến trình động), chuyển chế độ an ninh (báo động đỏ) và phát nhạc (hoạt ảnh sóng nhạc Equalizer động).
4. **Thông số kỹ thuật (`TechSpecs`):**
   - Trực quan hóa phần cứng bằng **Asymmetric Bento Grid** (Lưới Bento bất đối xứng) tỉ lệ 2-1 và 1-2 cân đối.
5. **Biểu mẫu đăng ký nhận tin (`SubscribeForm`):**
   - Xác thực email hợp lệ (Regex) và tích hợp gửi dữ liệu lên API Webhook thực tế (`https://httpbin.org/post`).
   - Hiển thị trạng thái xoay Spinner khi đang gửi thông tin.
6. **Giỏ hàng thu nhỏ Drawer (`MiniCart`):**
   - Sidebar trượt từ bên phải có lớp phủ mờ nền, cho phép tùy chỉnh số lượng (+/-) và xóa sản phẩm.
   - Đồng bộ hóa toàn bộ dữ liệu tự động với **Local Storage**.

---

## 💻 Hướng Dẫn Chạy Dưới Local

### 1. Cài đặt các gói phụ thuộc:
```bash
npm install
```

### 2. Khởi chạy máy chủ phát triển (Development Server):
```bash
npm run dev
```
Trang web sẽ chạy tại địa chỉ mặc định `http://localhost:5173`.

### 3. Kiểm tra lỗi cú pháp (Linter):
```bash
npm run lint
```

### 4. Đóng gói sản phẩm (Build):
```bash
npm run build
```

---

## ☁️ Hướng Dẫn Triển Khai Lên Cloud (Vercel & Netlify)

Dự án sử dụng Vite và đã được cấu hình tối ưu, sẵn sàng cho việc deploy tự động (CI/CD) thông qua GitHub.

### 🌟 Triển khai lên Vercel (Khuyên dùng):
Vercel tự động nhận diện dự án Vite và tối ưu hóa hình ảnh ở lớp CDN:
1. Đăng nhập vào trang quản trị [Vercel](https://vercel.com).
2. Nhấn nút **Add New** -> **Project**.
3. Kết nối với tài khoản GitHub của bạn và chọn repository `HELICORP_landingpageTest`.
4. Nhấn nút **Deploy** (Vercel sẽ tự động cấu hình Build Command là `npm run build` và Output Directory là `dist`).
5. **Tự động tối ưu hóa ảnh:** Lớp CDN của Vercel sẽ tự động nén ảnh `.webp` thành các kích thước phù hợp với thiết bị di động, giúp tối ưu dung lượng tệp tin (từ 638 KB ban đầu xuống dưới 100 KB) giúp điểm số **Google PageSpeed Insights đạt trên 85**.

### 🌟 Triển khai lên Netlify:
1. Đăng nhập vào [Netlify](https://netlify.com).
2. Chọn **Add new site** -> **Import an existing project**.
3. Chọn Git provider là GitHub và kết nối với repository của bạn.
4. Ở phần build settings, đảm bảo các thông số:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Nhấn **Deploy site** để hoàn tất.
