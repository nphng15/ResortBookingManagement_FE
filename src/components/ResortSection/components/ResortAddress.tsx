import { MapPin } from 'lucide-react'

interface ResortAddressProps {
  address: string
  className?: string
}

function ResortAddress({ address, className = '' }: ResortAddressProps) {
  return (
    <div
      className={`flex items-center gap-1 text-gray-600 text-[13px] mt-1 hover:text-[#0071c2] ${className}`}
    >
      <MapPin size={14} />
      <span>{address}</span>
    </div>
  )
}

export default ResortAddress
