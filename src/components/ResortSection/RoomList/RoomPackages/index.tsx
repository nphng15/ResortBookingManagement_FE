import React from 'react'
import styles from './index.module.css'
import RoomOptions from './RoomOptions';
import RoomDetails from './RoomDetails';
import GuestIcon from './GuestIcon';
import AddBtn from './AddBtn';
import Price from '../../components/Price';


const mockPackagesData = [
  {
    id: 'pkg1',
    optionsData: ["Không gồm bữa sáng", "Miễn phí Nâng hạng phòng", "Miễn phí Trả phòng trễ (tùy tình trạng)"],
    detailsData: [
      { text: "1 giường cỡ queen", icon: "bed", theme: 'default' },
      { text: "Miễn phí Nâng hạng phòng", icon: "gift", theme: 'highlight' },
      { text: "Miễn phí hủy phòng trước 21 thg 11 22:58", icon: "cancel", theme: 'success' }
    ],
    guestData: { guestCount: 2, allowsChildren: true },
    // Sửa: Dùng cấu trúc mới
    priceData: {
      original: 564214,
      discounted: 423160,
      note: "Chưa bao gồm thuế và phí"
    }
  },
  {
    id: 'pkg2',
    optionsData: ["Bữa sáng cho 2 người"],
    detailsData: [
      { text: "1 giường cỡ queen", icon: "bed", theme: 'default' },
      { text: "Miễn phí Nâng hạng phòng", icon: "gift", theme: 'highlight' },
      { text: "Thanh toán tại Khách Sạn", icon: "default", theme: 'highlight' }, // 'default' icon cho "Thanh toán"
      { text: "Áp dụng chính sách hủy phòng", icon: "default", theme: 'success' } // 'default' icon cho "Áp dụng"
    ],
    guestData: { guestCount: 2, allowsChildren: false },
    // Sửa: Dùng cấu trúc mới
    priceData: {
      original: 691197,
      discounted: 518398,
      note: "Chưa bao gồm thuế và phí"
    }
  },
  {
    id: 'pkg3',
    optionsData: ["Bữa sáng cho 2 người (VIP)"],
    detailsData: [
      { text: "1 giường King", icon: "bed", theme: 'default' },
      { text: "Bao gồm bữa sáng", icon: "breakfast", theme: 'success' }
    ],
    guestData: { guestCount: 2, allowsChildren: true },
    // Sửa: Dùng cấu trúc mới (không có 'original')
    priceData: {
      original: 691197,
      discounted: 650000,
      note: "Chưa bao gồm thuế và phí"
    }
  }
] as const;

function RoomPackages() {
  function handleSelect(id: string): void {
    throw new Error('Function not implemented.');
  }

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

        {/* Nội dung bảng (lặp qua data) */}
        <tbody>
          {mockPackagesData.map((pkg) => (
            <tr key={pkg.id}>
              {/* Cột 1: Lựa chọn phòng */}
              <td className={styles.colRoom}>
                <RoomOptions options={pkg.optionsData} />
                <RoomDetails options={pkg.detailsData} />
              </td>

              {/* Cột 2: Khách */}
              <td className={styles.colGuest}>
                <GuestIcon {...pkg.guestData} />
              </td>

              {/* Cột 3: Giá */}
              <td className={styles.colPrice}>
                <Price price={pkg.priceData.discounted} />
              </td>

              {/* Cột 4: Nút Add */}
              <td className={styles.colAction}>
                <AddBtn 
                  onClick={() => handleSelect(pkg.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoomPackages
