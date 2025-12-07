interface PriceProps {
  price: number
  className?: string
}

function Price({ price, className = '' }: PriceProps) {
  return (
    <div className={`text-right ${className}`}>
      <p className="text-2xl font-bold text-orange-500">
        {price?.toLocaleString() ?? 0} VND
      </p>
    </div>
  )
}

export default Price
