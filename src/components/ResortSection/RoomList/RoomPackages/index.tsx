import styles from './index.module.css'
import RoomOptions from './RoomOptions';
import RoomDetails from './RoomDetails';
import GuestIcon from './GuestIcon';
import AddBtn from './AddBtn';
import Price from '../../components/Price';
import type { RoomType } from '../../../../services/resortService';

interface RoomPackagesProps {
  room: RoomType;
}

function RoomPackages({ room }: RoomPackagesProps) {
  const optionsData = ["Không gồm bữa sáng", "Miễn phí hủy phòng"];
  
  const detailsData = [
    { text: `${room.bed_amount} giường`, icon: "bed", theme: 'default' as const },
    { text: `Diện tích ${room.area}m²`, icon: "default", theme: 'default' as const },
    { text: "Miễn phí hủy phòng", icon: "cancel", theme: 'success' as const }
  ];

  const handleSelect = () => {
    console.log('Selected room:', room.id);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.roomTable}>
        {/* Tiêu đề bảng */}
        <thead>
          <tr>
            <th className={styles.colRoom}>Lựa chọn phòng</th>
            <th className={styles.colGuest}>Khách</th>
            <th className={styles.colPrice}>Giá/phòng/đêm</th>
            <th className={styles.colAction}>{/* Cột trống cho nút */}</th>
          </tr>
        </thead>

        {/* Nội dung bảng */}
        <tbody>
          <tr>
            {/* Cột 1: Lựa chọn phòng */}
            <td className={styles.colRoom}>
              <RoomOptions options={optionsData} />
              <RoomDetails options={detailsData} />
            </td>

            {/* Cột 2: Khách */}
            <td className={styles.colGuest}>
              <GuestIcon guestCount={room.people_amount} allowsChildren={true} />
            </td>

            {/* Cột 3: Giá */}
            <td className={styles.colPrice}>
              <Price price={room.price} />
            </td>

            {/* Cột 4: Nút Add */}
            <td className={styles.colAction}>
              <AddBtn onClick={handleSelect} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RoomPackages
