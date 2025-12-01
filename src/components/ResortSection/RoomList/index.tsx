import React from 'react'
import RoomFacilities from "./RoomFacilities";
import RoomPackage from "./././RoomPackages";
import styles from "./index.module.css";
import RoomImagePreview from './RoomImagePreview';

function RoomList() {
  return (
   <section className={styles.roomSection}>
      {/* HEADER: TRÊN CÙNG, TRÀN FULL */}
      <div className={styles.roomHeader}>
        Junior Suite Valley View
      </div>

      {/* NỘI DUNG: ẢNH + BẢNG GÓI */}
      <div className={styles.roomContent}>
        {/* TRÁI: ẢNH + TIỆN ÍCH */}
        <div className={styles.roomLeft}>
          <RoomImagePreview images={[]} />
          <RoomFacilities />
          <a href="#" className={styles.detailLink}>
            Xem chi tiết phòng
          </a>
        </div>

        {/* PHẢI: BẢNG GÓI PHÒNG */}
        <div className={styles.roomRight}>
          <RoomPackage />
        </div>
      </div>
    </section>
  )
}

export default RoomList
