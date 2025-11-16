import React from 'react'
import styles from './RoomOptions.module.css'

// Interface (hợp đồng) quy định component này nhận prop 'options'
// 'options?' (dấu ?) nghĩa là prop này không bắt buộc
interface RoomOptionsProps {
  options?: readonly string[];
}

/**
 * Hiển thị dòng tóm tắt các lựa chọn của phòng (ví dụ: Không gồm bữa sáng + Miễn phí...)
 */
function RoomOptions({ options }: RoomOptionsProps) {
  
  // Dữ liệu giả lập để test, phòng trường hợp không truyền prop
  const testOptions = options || [
    "Không gồm bữa sáng",
    "Miễn phí Nâng hạng phòng (tùy vào tình trạng phòng)",
    "Miễn phí Trả phòng trễ (tùy vào tình trạng phòng)"
  ];

  // Nối các lựa chọn trong mảng lại bằng dấu " + "
  const summaryText = testOptions.join(' + ');

  return (
    <div className={styles.container}>
      {/* Hiển thị dòng tóm tắt chữ đậm */}
      <p className={styles.summary}>{summaryText}</p>
    </div>
  );
}

export default RoomOptions