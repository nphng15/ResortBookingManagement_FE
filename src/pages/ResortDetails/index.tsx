import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import GalleryPreview from '../../components/ResortSection/GalleryPreview'
import { Container, CircularProgress } from '@mui/material'
import SearchBar from '../../components/ResortSection/SearchBar'
import ResortDescription from '../../components/ResortSection/ResortDescription'
import RoomList from '../../components/ResortSection/RoomList'
import ResortReview from '../../components/ResortSection/ResortReview'
import { getResortById, type ResortDetail as ResortDetailType } from '../../services/resortService'
import { useChristmasTheme } from '../../components/ChristmasTheme'

const DESCRIPTIONS = [
  'Khu nghỉ dưỡng sang trọng với view biển tuyệt đẹp, mang đến trải nghiệm nghỉ dưỡng đẳng cấp 5 sao. Các tiện nghi hiện đại kết hợp với kiến trúc truyền thống tạo nên không gian thư giãn hoàn hảo.',
  'Resort được thiết kế hài hòa với thiên nhiên, sở hữu bãi biển riêng và hồ bơi vô cực. Đội ngũ nhân viên chuyên nghiệp sẵn sàng phục vụ 24/7 để đảm bảo kỳ nghỉ của bạn trọn vẹn nhất.',
  'Nằm giữa thiên nhiên hoang sơ, resort mang đến không gian yên bình và riêng tư. Các villa được trang bị đầy đủ tiện nghi cao cấp, phù hợp cho cả gia đình và các cặp đôi.',
]

function ResortDetail() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const [resort, setResort] = useState<ResortDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isChristmasTheme } = useChristmasTheme()

  const checkin = searchParams.get('checkin') || undefined
  const checkout = searchParams.get('checkout') || undefined

  useEffect(() => {
    const fetchResort = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        setError(null)
        const data = await getResortById(parseInt(id), checkin, checkout)
        setResort(data)
      } catch (err) {
        setError('Không thể tải thông tin resort. Vui lòng thử lại.')
        console.error('Fetch resort error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResort()
  }, [id, checkin, checkout])

  if (loading) {
    return (
      <div className={`min-h-screen ${isChristmasTheme ? 'bg-gradient-to-b from-red-50 to-green-50/30' : ''}`}>
        <SearchBar />
        <Container maxWidth="lg">
          <div className="py-8 flex justify-center">
            <CircularProgress sx={{ color: isChristmasTheme ? '#C41E3A' : undefined }} />
          </div>
        </Container>
      </div>
    )
  }

  if (error || !resort) {
    return (
      <div className={`min-h-screen ${isChristmasTheme ? 'bg-gradient-to-b from-red-50 to-green-50/30' : ''}`}>
        <SearchBar />
        <Container maxWidth="lg">
          <div className={`py-8 text-center ${isChristmasTheme ? 'text-red-700' : 'text-red-500'}`}>
            {isChristmasTheme && '🎅 '}{error || 'Resort không tồn tại'}
          </div>
        </Container>
      </div>
    )
  }

  const minPrice = resort.room_types.length > 0 
    ? Math.min(...resort.room_types.map(r => r.price)) 
    : 0
  const randomDescription = DESCRIPTIONS[resort.id % DESCRIPTIONS.length]

  return (
    <div className={`min-h-screen ${isChristmasTheme ? 'bg-gradient-to-b from-red-50 via-white to-green-50/30' : ''}`}>
      <SearchBar />
      <Container maxWidth="lg">
        <div className="py-8">
          {/* Christmas Banner */}
          {isChristmasTheme && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-red-600 to-green-700 text-white text-center christmas-glow">
              <p className="text-lg font-semibold">
                 Ưu đãi Giáng sinh đặc biệt! Giảm đến 30% cho đặt phòng trong mùa lễ hội 
              </p>
            </div>
          )}

          {/* Gallery */}
          <GalleryPreview images={resort.images} resortName={resort.name} />

          {/* Content Card */}
          <div className={`mt-6 rounded-2xl p-6 ${
            isChristmasTheme 
              ? 'border-2 border-red-200 shadow-[0_0_20px_rgba(196,30,58,0.1)] bg-gradient-to-br from-white to-red-50/30'
              : 'border border-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-white'
          }`}>
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
            <div className={`mt-6 pt-6 border-t ${isChristmasTheme ? 'border-red-200' : 'border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${isChristmasTheme ? 'text-red-800' : 'text-gray-900'}`}>
                {isChristmasTheme ? ' Các phòng khả dụng' : 'Các phòng khả dụng'}
              </h2>
              <RoomList rooms={resort.room_types} />
            </div>

            {/* Reviews */}
            <div className={`mt-6 pt-6 border-t ${isChristmasTheme ? 'border-red-200' : 'border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${isChristmasTheme ? 'text-red-800' : 'text-gray-900'}`}>
                Trải nghiệm của các người dùng
              </h2>
              <ResortReview resortId={resort.id} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ResortDetail

