import RoomFacilities from "./RoomFacilities";
import RoomPackage from "./././RoomPackages";
import styles from "./index.module.css";
import RoomImagePreview from './RoomImagePreview';
import type { RoomType } from '../../../services/resortService';

interface RoomListProps {
  rooms: RoomType[];
}

function RoomList({ rooms }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Không có phòng khả dụng
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {rooms.map((room) => (
        <section key={room.id} className={styles.roomSection}>
          {/* HEADER: TRÊN CÙNG, TRÀN FULL */}
          <div className={styles.roomHeader}>
            <span>{room.name} - {room.area}m² - {room.bed_amount} giường - {room.people_amount} người</span>
            {room.available_rooms !== undefined && (
              <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
                room.available_rooms > 0 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {room.available_rooms > 0 
                  ? `Còn ${room.available_rooms} phòng` 
                  : 'Hết phòng'}
              </span>
            )}
          </div>

          {/* NỘI DUNG: ẢNH + BẢNG GÓI */}
          <div className={styles.roomContent}>
            {/* TRÁI: ẢNH + TIỆN ÍCH */}
            <div className={styles.roomLeft}>
              <RoomImagePreview images={[]} />
              <RoomFacilities />
            </div>

            {/* PHẢI: BẢNG GÓI PHÒNG */}
            <div className={styles.roomRight}>
              <RoomPackage room={room} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default RoomList
