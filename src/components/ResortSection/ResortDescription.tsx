import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ResortName from './components/ResortName'
import ResortAddress from './components/ResortAddress'
import ResortRating from './components/ResortRating'
import Price from './components/Price'

interface ResortDescriptionProps {
  name: string
  address: string
  rating: number
  reviewCount: number
  price: number
  description: string
  maxLength?: number
}

function ResortDescription({
  name,
  address,
  rating,
  reviewCount,
  price,
  description,
  maxLength = 300,
}: ResortDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const shouldTruncate = description.length > maxLength
  const displayText =
    shouldTruncate && !isExpanded
      ? description.slice(0, maxLength) + '...'
      : description

  return (
    <div className="py-6">
      {/* Resort Info Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <ResortName name={name} className="!text-3xl" />
          <ResortRating
            score={rating}
            reviews={reviewCount.toString()}
            className="!text-base"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="text-gray-500 text-sm">Giá chỉ từ</div>
            <Price price={price} className="[&>p:last-child]:!text-3xl" />
          </div>
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
            Chọn phòng
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <ResortAddress address={address} className="!text-base" />
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line text-md">
          {displayText}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            {isExpanded ? (
              <>
                Thu gọn <ChevronUp size={16} />
              </>
            ) : (
              <>
                Xem thêm <ChevronDown size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default ResortDescription
