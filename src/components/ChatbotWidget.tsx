import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatTeardropText, PaperPlaneRight, X, CircleNotch, Robot, User, Sparkle } from '@phosphor-icons/react';

/**
 * Định nghĩa cấu trúc của một tin nhắn trong đoạn chat.
 */
interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

// Danh sách các câu hỏi gợi ý nhanh (Quick replies)
const QUICK_QUESTIONS = [
  'Helicorp Hub là gì?',
  'Giá bán bao nhiêu?',
  'Hỗ trợ bao nhiêu thiết bị?',
  'Chính sách bảo hành thế nào?'
];

// Khóa API Gemini đọc từ biến môi trường của Vite
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Tạo câu trả lời cục bộ dự phòng (Fallback) khi không có khóa API hoặc gọi API lỗi.
 * 
 * @param {string} query Tin nhắn của người dùng.
 * @returns {string} Câu trả lời tự động được chuẩn bị sẵn.
 */
const getLocalFallbackResponse = (query: string): string => {
  const q = query.toLowerCase();
  if (q.includes('giá') || q.includes('bao nhiêu') || q.includes('đắt') || q.includes('tiền')) {
    return 'Bộ điều khiển trung tâm Helicorp Hub hiện đang có giá bán chính hãng là 4.890.000đ. Đang áp dụng chương trình trả góp 0% và miễn phí lắp đặt tại nhà.';
  }
  if (q.includes('là gì') || q.includes('helicorp') || q.includes('hub') || q.includes('giới thiệu')) {
    return 'Helicorp Hub là bộ não quản lý nhà thông minh chạy trên hệ điều hành Helicorp OS. Thiết bị sở hữu màn hình AMOLED 2K, chip AI offline bảo mật và kết nối đa thức.';
  }
  if (q.includes('thiết bị') || q.includes('kết nối') || q.includes('tương thích') || q.includes('zigbee')) {
    return 'Thiết bị tích hợp Wifi 6 và Zigbee 3.0 cho phép kết nối cùng lúc hơn 200 thiết bị ngoại vi, tương thích tốt với Apple HomeKit, Google Home, Alexa và Tuya.';
  }
  if (q.includes('bảo hành') || q.includes('lắp đặt') || q.includes('sửa')) {
    return 'Helicorp Hub được bảo hành chính hãng 2 năm (1 đổi 1 trong vòng 30 ngày) và được hỗ trợ lắp đặt, cấu hình miễn phí từ đội ngũ kỹ thuật của chúng tôi.';
  }
  if (q.includes('chào') || q.includes('hello') || q.includes('hi')) {
    return 'Xin chào! Tôi là trợ lý ảo Helicorp Assistant. Tôi có thể hỗ trợ giải đáp mọi thông tin liên quan đến bộ điều khiển trung tâm Helicorp Hub của bạn!';
  }
  return 'Cảm ơn bạn đã hỏi. Helicorp Hub là giải pháp quản trị nhà thông minh bảo mật tối đa, hoạt động ổn định không cần internet liên tục. Bạn có thể hỏi về giá bán, thông số kỹ thuật hoặc bảo hành nhé!';
};

/**
 * Component ChatbotWidget đại diện cho cửa sổ chatbot ở góc màn hình.
 * Hỗ trợ giao tiếp trực tiếp với mô hình ngôn ngữ lớn Google Gemini 1.5 Flash.
 * Có kịch bản trả lời cục bộ nếu không có cấu hình khóa API (Fallback mode).
 * 
 * @returns {JSX.Element} Bong bóng chat và khung chat tương tác.
 */
export const ChatbotWidget = React.memo(function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Xin chào! Tôi là trợ lý ảo Helicorp. Bạn có thắc mắc gì về Bộ điều khiển trung tâm Helicorp Hub cần tôi giải đáp không?',
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNotification, setHasNotification] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống cuối danh sách tin nhắn khi có tin mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  /**
   * Gọi API Gemini để sinh câu trả lời dựa trên lịch sử hội thoại.
   * 
   * @param {Message[]} history Lịch sử tin nhắn hiện tại.
   * @returns {Promise<string>} Câu trả lời sinh ra bởi Gemini.
   */
  const callGeminiAPI = async (history: Message[]): Promise<string> => {
    // Chỉ định vai trò và hướng dẫn hệ thống
    const systemPrompt = `Bạn là trợ lý ảo "Helicorp Assistant" đại diện cho Bộ điều khiển trung tâm Helicorp Hub (nhà thông minh).
Hãy trả lời ngắn gọn (dưới 3 câu), lịch sự, thân thiện bằng tiếng Việt.
Thông tin sản phẩm:
- Tên: Bộ Điều Khiển Trung Tâm Helicorp Hub
- Giá: 4.890.000 VND
- Phần cứng: Màn hình AMOLED 2K 8-inch cong 2.5D, Wifi 6 + Zigbee 3.0 kết nối hơn 200 thiết bị, Pin sạc 12 tiếng dự phòng.
- AI: Chip xử lý AI Core offline bảo mật, ra lệnh bằng giọng nói cục bộ (không cần internet vẫn chạy giọng nói).
- Tính năng khác: Có chế độ Dark Mode/Light Mode, đồng bộ giỏ hàng cục bộ.
- Bảo hành: 2 năm.
Nếu người dùng hỏi các vấn đề ngoài phạm vi nhà thông minh hoặc sản phẩm này, hãy khéo léo hướng họ quay lại chủ đề Helicorp Hub.`;

    // Chuyển đổi lịch sử chat sang định dạng API Gemini yêu cầu
    const contents = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Lỗi gọi API Gemini');
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) {
      throw new Error('Dữ liệu API rỗng');
    }

    return replyText.trim();
  };

  /**
   * Xử lý gửi tin nhắn.
   * 
   * @param {string} text Nội dung tin nhắn gửi đi.
   */
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputVal('');
    setIsLoading(true);

    try {
      let botReply = '';
      
      // Nếu có API Key thì gọi API thực tế, ngược lại tự động chuyển sang chế độ trả lời cục bộ
      if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
        botReply = await callGeminiAPI(newMessages);
      } else {
        // Giả lập trễ phản hồi của bot cục bộ
        await new Promise((resolve) => setTimeout(resolve, 1000));
        botReply = getLocalFallbackResponse(text);
      }

      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text: botReply,
          timestamp: new Date()
        }
      ]);
    } catch {
      // Trong trường hợp API Key bị lỗi hoặc mạng đứt, chuyển sang chế độ tự động cục bộ
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text: getLocalFallbackResponse(text),
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Khung chat hội thoại */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="w-[90vw] sm:w-[360px] h-[480px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#070709]/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between mb-4 overflow-hidden"
          >
            {/* Header khung chat */}
            <div className="p-4 bg-linear-to-r from-accent-teal/10 to-accent-blue/10 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-linear-to-tr from-accent-teal to-accent-blue p-[1px] flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center text-accent-teal">
                    <Robot size={16} weight="regular" />
                  </div>
                  {/* Dấu chấm báo trạng thái Online */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-zinc-950 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white font-display">
                    Helicorp Assistant
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-zinc-500">
                      {GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here' ? 'AI Pro Actived' : 'Offline Mode'}
                    </span>
                    <Sparkle size={8} weight="fill" className="text-amber-500 animate-spin" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full border border-zinc-250 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label="Đóng khung chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Thân hội thoại (Danh sách tin nhắn) */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-2.5 max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200' 
                      : 'bg-accent-teal/10 border-accent-teal/20 text-accent-teal'
                  }`}>
                    {msg.sender === 'user' ? <User size={14} /> : <Robot size={14} />}
                  </div>
                  
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-linear-to-r from-accent-teal to-accent-blue text-zinc-950 font-medium rounded-tr-none'
                      : 'bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-250 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Hoạt ảnh đang gõ tin nhắn (Typing Indicator) */}
              {isLoading && (
                <div className="flex gap-2.5 max-w-[85%] self-start">
                  <div className="w-7 h-7 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-accent-teal flex items-center justify-center shrink-0">
                    <Robot size={14} />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Khối gợi ý câu hỏi nhanh & Nhập liệu */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-850 bg-white dark:bg-[#070709]">
              
              {/* Câu hỏi nhanh */}
              {messages.length < 4 && !isLoading && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {QUICK_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-650 dark:text-zinc-400 hover:border-accent-teal/30 hover:text-accent-teal transition-all cursor-pointer font-sans"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Form nhập văn bản */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputVal);
                }} 
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Nhập câu hỏi của bạn..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-550 font-sans text-xs focus:outline-hidden focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/20 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputVal.trim()}
                  className="w-9 h-9 rounded-xl bg-linear-to-r from-accent-teal to-accent-blue text-zinc-950 flex items-center justify-center hover:shadow-md active:scale-95 disabled:opacity-40 transition-all shrink-0 cursor-pointer"
                  aria-label="Gửi tin nhắn"
                >
                  {isLoading ? (
                    <CircleNotch size={14} className="animate-spin" />
                  ) : (
                    <PaperPlaneRight size={14} weight="fill" />
                  )}
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút Bong bóng Chat tròn nhỏ phát sáng */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNotification(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-linear-to-r from-accent-teal to-accent-blue text-zinc-950 flex items-center justify-center shadow-lg shadow-accent-teal/20 cursor-pointer relative"
        aria-label="Mở trợ lý ảo tư vấn"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={20} weight="bold" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <ChatTeardropText size={20} weight="fill" />
              {/* Chấm đỏ thông báo nhấp nháy */}
              {hasNotification && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 border-2 border-zinc-50 dark:border-zinc-950 animate-ping" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
});
