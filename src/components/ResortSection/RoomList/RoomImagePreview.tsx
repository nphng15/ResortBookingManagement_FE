import React, { useState } from 'react'
import styles from './RoomImagePreview.module.css'
function RoomImagePreview({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Giả sử đây là danh sách ảnh bạn lấy được từ API hoặc fix cứng
  const roomImagesList = [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590490360182-f33fb0d41022?w=800&auto=format&fit=crop"
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? roomImagesList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev === roomImagesList.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={styles["room-image-preview"]}>
      {/* Ảnh hiện tại */}
      <div
        className={styles["image-slide"]}
        style={{ backgroundImage: `url(${roomImagesList[currentIndex]})` }}
      ></div>

      {/* Nút điều hướng */}
      {roomImagesList.length > 1 && (
        <>
          <button
            className={`${styles["nav-btn"]} ${styles["left-arrow"]}`}
            onClick={handlePrev}
          >
            ‹
          </button>
          <button
            className={`${styles["nav-btn"]} ${styles["right-arrow"]}`}
            onClick={handleNext}
          >
            ›
          </button>

          {/* Dots hiển thị trạng thái */}
          <div className={styles["dots-container"]}>
            {roomImagesList.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RoomImagePreview
