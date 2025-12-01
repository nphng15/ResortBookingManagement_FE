import React from 'react'
import styles from './RoomDetails.module.css';

// --- BỘ ICON SVG ---
const ICONS: { [key: string]: React.ReactNode } = {
  bed: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
  ),
  gift: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
  ),
  cancel: ( // Dùng icon checkmark cho "Miễn phí hủy"
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  breakfast: ( // Icon cho "Bữa sáng"
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"/><path d="M4 8h16"/><path d="M16 8h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"/><path d="M6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1"/><path d="M6 14v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"/></svg>
  ),
  default: ( // Icon chấm tròn mặc định
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
  ),
};

// --- KIỂU DỮ LIỆU (TYPESCRIPT) ---
interface RoomDetailItem {
  text: string;
  icon: string; // Tên icon trong bộ ICONS
  theme?: 'default' | 'highlight' | 'success'; // Kiểu màu
}

interface RoomDetailProps {
  options?: readonly RoomDetailItem[];
}

// --- COMPONENT ---
function RoomOptions({ options }: RoomDetailProps) {
  
  // Dữ liệu giả lập để test (giống hệt ảnh bạn gửi)
  const testOptions = options || [
    { text: "1 giường cỡ queen", icon: "bed", theme: 'default' },
    { text: "Miễn phí Nâng hạng phòng (tùy vào tình trạng phòng)", icon: "gift", theme: 'highlight' },
    { text: "Miễn phí hủy phòng trước 20 thg 11 22:58", icon: "cancel", theme: 'success' }
  ];

  // Helper function để lấy icon
  const getIcon = (iconName: string | undefined) => {
    if (iconName && ICONS[iconName]) {
      return ICONS[iconName];
    }
    return ICONS.default; // Icon mặc định nếu không tìm thấy
  };

  // Helper function để lấy class CSS cho màu
  const getThemeClass = (theme: RoomDetailItem['theme']) => {
    if (theme === 'highlight') return styles.themeHighlight;
    if (theme === 'success') return styles.themeSuccess;
    return styles.themeDefault;
  };

  return (
    <div className={styles.container}>
      {testOptions.map((option, index) => (
        <div key={index} className={`${styles.item} ${getThemeClass(option.theme)}`}>
          <span className={styles.icon}>
            {getIcon(option.icon)}
          </span>
          <span className={styles.text}>
            {option.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RoomOptions
