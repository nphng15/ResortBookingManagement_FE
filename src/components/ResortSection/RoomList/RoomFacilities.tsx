import React from 'react'
import styles from './RoomFacilities.module.css'

// --- BỘ ICON SVG (Đóng gói sẵn, không cần file bên ngoài) ---
// Bạn có thể thêm/sửa icon tại đây
const ICONS: { [key: string]: React.ReactNode } = {
  area: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.5m0 4.5h-4.5"/><path d="M3 3v4.5m0-4.5h4.5"/><path d="m3 21 6-6m-6 6v-4.5m0 4.5h4.5"/><path d="m21 3-6 6m6-6v4.5m0-4.5h-4.5"/></svg>
  ),
  shower: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 4 1 1"/><path d="m21 21-1-1"/><path d="M3 11v-1a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"/><path d="M5 15a2 2 0 0 0-2 2v2"/><path d="M21 15a2 2 0 0 1 2 2v2"/><path d="M17 15v6"/><path d="M13 15v6"/><path d="M9 15v6"/></svg>
  ),
  fridge: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12z"/><path d="M5 10h14"/><path d="M8 6v-1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1"/><path d="M8 14v-2"/></svg>
  ),
  default: (
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/></svg>
  ),
};

// --- KIỂU DỮ LIỆU (TYPESCRIPT) ---
interface FacilityItem {
  text: string;
  icon?: string; // Tên icon trong bộ ICONS ở trên
}

interface RoomFacilitiesProps {
  mainFacility?: FacilityItem;
  facilities?: FacilityItem[];
}

// --- COMPONENT ---
function RoomFacilities({ mainFacility, facilities }: RoomFacilitiesProps) {

  // Dữ liệu giả lập để test
  const testMain = mainFacility || { text: "20.0 m²", icon: "area" };
  const testFacilities = facilities || [
    { text: "Vòi tắm đứng", icon: "shower" },
    { text: "Tủ lạnh", icon: "fridge" },
  ];

  // Helper function để lấy icon
  const getIcon = (iconName: string | undefined) => {
    if (iconName && ICONS[iconName]) {
      return ICONS[iconName];
    }
    return ICONS.default; // Trả về icon mặc định nếu không tìm thấy
  };

  return (
    <div className={styles.container}>
      {/* 1. Tiện nghi chính (Diện tích) */}
      <div className={`${styles.item} ${styles.mainFacility}`}>
        <span className={styles.icon}>{getIcon(testMain.icon)}</span>
        <span className={styles.text}>{testMain.text}</span>
      </div>

      {/* 2. Danh sách tiện nghi phụ */}
      <div className={styles.list}>
        {testFacilities.map((fac, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.icon}>{getIcon(fac.icon)}</span>
            <span className={styles.text}>{fac.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomFacilities
