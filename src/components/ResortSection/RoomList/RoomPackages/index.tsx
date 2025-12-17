import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import styles from './index.module.css'
import RoomOptions from './RoomOptions';
import RoomDetails from './RoomDetails';
import GuestIcon from './GuestIcon';
import AddBtn from './AddBtn';
import Price from '../../components/Price';
import type { RoomType } from '../../../../services/resortService';
import { addToCart } from '../../../../services/cartService';
import { getToken } from '../../../../services/authService';

interface RoomPackagesProps {
  room: RoomType;
}

function RoomPackages({ room }: RoomPackagesProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const optionsData = ["Không gồm bữa sáng", "Miễn phí hủy phòng"];
  
  const detailsData = [
    { text: `${room.bed_amount} giường`, icon: "bed", theme: 'default' as const },
    { text: `Diện tích ${room.area}m²`, icon: "default", theme: 'default' as const },
    { text: "Miễn phí hủy phòng", icon: "cancel", theme: 'success' as const }
  ];

  const handleSelect = async () => {
    // Kiểm tra đăng nhập
    const token = getToken();
    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      setLoading(true);
      
      // Lấy ngày từ URL params
      const checkin = searchParams.get('checkin') || new Date().toISOString().split('T')[0];
      const checkout = searchParams.get('checkout') || new Date(Date.now() + 86400000).toISOString().split('T')[0];

      await addToCart({
        offer_id: room.id,
        number_of_rooms: 1,
        started_at: `${checkin}T14:00:00`,
        finished_at: `${checkout}T12:00:00`,
      });

      alert('Đã thêm vào giỏ hàng!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Có lỗi xảy ra';
      alert(message);
    } finally {
      setLoading(false);
    }
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
              <AddBtn onClick={handleSelect} disabled={loading} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RoomPackages
