interface ResortNameProps {
  name: string
  className?: string
}

function ResortName({ name, className = '' }: ResortNameProps) {
  return (
    <h3
      className={`text-[18px] font-semibold text-gray-800 hover:text-[#0071c2] cursor-pointer ${className}`}
    >
      {name}
    </h3>
  )
}

export default ResortName
