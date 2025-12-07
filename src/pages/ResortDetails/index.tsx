import GalleryPreview from '../../components/ResortSection/GalleryPreview'
import { Container } from '@mui/material'
import SearchBar from '../../components/ResortSection/SearchBar'
import ResortDescription from '../../components/ResortSection/ResortDescription'
import RoomList from '../../components/ResortSection/RoomList'
import ResortReview from '../../components/ResortSection/ResortReview'

function ResortDetail() {
  // Mock data - sau này sẽ lấy từ API
  const resort = {
    name: 'Six Senses Ninh Van Bay',
    address: 'Ninh Vân, Ninh Hòa, Khánh Hòa, Việt Nam',
    pricePerNight: 12500000,
    rating: 4.8,
    reviewCount: 256,
    description: `Six Senses Ninh Van Bay là khu nghỉ dưỡng sang trọng nằm trên bán đảo Ninh Vân, chỉ có thể đến bằng thuyền từ Nha Trang. Resort mang đến trải nghiệm nghỉ dưỡng độc đáo với các villa riêng biệt được xây dựng hài hòa với thiên nhiên.

Mỗi villa đều có hồ bơi riêng, tầm nhìn ra biển hoặc núi tuyệt đẹp. Kiến trúc sử dụng vật liệu tự nhiên như gỗ, đá và mái tranh, tạo nên không gian ấm cúng và gần gũi với thiên nhiên.

Resort cung cấp nhiều dịch vụ cao cấp bao gồm spa Six Senses nổi tiếng, các nhà hàng phục vụ ẩm thực Việt Nam và quốc tế, cùng nhiều hoạt động như lặn biển, yoga, và khám phá thiên nhiên.`,
    images: [
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/a9/99/ac.jpg',
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/a9/99/ac.jpg',
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/a9/99/ac.jpg',
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/a9/99/ac.jpg',
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/a9/99/ac.jpg',
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/a9/99/ac.jpg',
    ],
  }

  return (
    <>
      <SearchBar />
      <Container maxWidth="lg">
        <div className="py-8">
          {/* Gallery */}
          <GalleryPreview images={resort.images} resortName={resort.name} />

          {/* Content Card */}
          <div className="mt-6 border border-gray-200 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6 bg-white">
            {/* Resort Info & Description */}
            <ResortDescription
              name={resort.name}
              address={resort.address}
              rating={resort.rating}
              reviewCount={resort.reviewCount}
              price={resort.pricePerNight}
              description={resort.description}
            />

            {/* Room List */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Các phòng khả dụng
              </h2>
              <RoomList/>
            </div>

            {/* Reviews */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Trải nghiệm của các người dùng
              </h2>
              <ResortReview />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ResortDetail
