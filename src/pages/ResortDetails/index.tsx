import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GalleryPreview from '../../components/ResortSection/GalleryPreview'
import { Container, CircularProgress } from '@mui/material'
import SearchBar from '../../components/ResortSection/SearchBar'
import ResortDescription from '../../components/ResortSection/ResortDescription'
import RoomList from '../../components/ResortSection/RoomList'
import ResortReview from '../../components/ResortSection/ResortReview'
import { getResortById, type ResortDetail as ResortDetailType } from '../../services/resortService'

const DESCRIPTIONS = [
  'Khu nghỉ dưỡng sang trọng với view biển tuyệt đẹp, mang đến trải nghiệm nghỉ dưỡng đẳng cấp 5 sao. Các tiện nghi hiện đại kết hợp với kiến trúc truyền thống tạo nên không gian thư giãn hoàn hảo.',
  'Resort được thiết kế hài hòa với thiên nhiên, sở hữu bãi biển riêng và hồ bơi vô cực. Đội ngũ nhân viên chuyên nghiệp sẵn sàng phục vụ 24/7 để đảm bảo kỳ nghỉ của bạn trọn vẹn nhất.',
  'Nằm giữa thiên nhiên hoang sơ, resort mang đến không gian yên bình và riêng tư. Các villa được trang bị đầy đủ tiện nghi cao cấp, phù hợp cho cả gia đình và các cặp đôi.',
]

function ResortDetail() {
  const { id } = useParams<{ id: string }>()
  const [resort, setResort] = useState<ResortDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResort = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        setError(null)
        const data = await getResortById(parseInt(id))
        setResort(data)
      } catch (err) {
        setError('Không thể tải thông tin resort. Vui lòng thử lại.')
        console.error('Fetch resort error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResort()
  }, [id])

  if (loading) {
    return (
      <>
        <SearchBar />
        <Container maxWidth="lg">
          <div className="py-8 flex justify-center">
            <CircularProgress />
          </div>
        </Container>
      </>
    )
  }

  if (error || !resort) {
    return (
      <>
        <SearchBar />
        <Container maxWidth="lg">
          <div className="py-8 text-center text-red-500">
            {error || 'Resort không tồn tại'}
          </div>
        </Container>
      </>
    )
  }

  const minPrice = resort.room_types.length > 0 
    ? Math.min(...resort.room_types.map(r => r.price)) 
    : 0
  const randomDescription = DESCRIPTIONS[resort.id % DESCRIPTIONS.length]

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
              reviewCount={0}
              price={minPrice}
              description={randomDescription}
            />

            {/* Room List */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Các phòng khả dụng
              </h2>
              <RoomList rooms={resort.room_types} />
            </div>

            {/* Reviews */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Trải nghiệm của các người dùng
              </h2>
              <ResortReview resortId={resort.id} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ResortDetail
