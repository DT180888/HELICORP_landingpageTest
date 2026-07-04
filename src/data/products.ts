/**
 * Đại diện cho một sản phẩm trong hệ sinh thái nhà thông minh Helicorp.
 */
export interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string; // Đường dẫn ảnh hoặc tên icon đại diện
}

/**
 * Danh sách sản phẩm mẫu (Mock Data) của Helicorp.
 * Bao gồm thiết bị trung tâm và các cảm biến/phụ kiện ngoại vi đi kèm.
 */
export const MOCK_PRODUCTS: ProductData[] = [
  {
    id: 'helicorp-hub-01',
    name: 'Bộ Điều Khiển Trung Tâm Helicorp Hub',
    price: 4890000,
    description: 'Bộ não điều hành toàn bộ hệ thống nhà thông minh qua AI cục bộ.',
    category: 'Trung tâm',
    image: '/src/assets/hub_device.webp'
  },
  {
    id: 'helicorp-door-02',
    name: 'Cảm Biến Cửa Thông Minh Helicorp Door',
    price: 450000,
    description: 'Cảnh báo đột nhập và tự động bật/tắt thiết bị khi mở cửa.',
    category: 'An ninh',
    image: 'door-sensor' // Sẽ render bằng icon chuyên biệt
  },
  {
    id: 'helicorp-motion-03',
    name: 'Cảm Biến Chuyển Động Helicorp Motion',
    price: 690000,
    description: 'Phát hiện chuyển động nhạy bén, góc quét 120 độ tiết kiệm năng lượng.',
    category: 'An ninh',
    image: 'motion-sensor'
  },
  {
    id: 'helicorp-climate-04',
    name: 'Cảm Biến Khí Hậu Helicorp Climate',
    price: 590000,
    description: 'Đo đạc nhiệt độ và độ ẩm thời gian thực để kích hoạt điều hòa tự động.',
    category: 'Môi trường',
    image: 'climate-sensor'
  },
  {
    id: 'helicorp-plug-05',
    name: 'Ổ Cắm Thông Minh Helicorp Plug',
    price: 390000,
    description: 'Hẹn giờ tắt mở, đo lượng điện tiêu thụ của các thiết bị ngoại vi.',
    category: 'Nguồn điện',
    image: 'smart-plug'
  }
];
