import React from 'react'

interface ServiceTagProps {
  label: string;
  color?: string;
}

function ServiceTag({label, color}: ServiceTagProps) {
  const bg =
    color ||
    (label.toLowerCase().includes("free")
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700");
  return (
    <div className="flex gap-2">
      <span className={`text-xs font-medium px-2 py-[2px] rounded-md ${bg}`}>
      {label}
    </span>
    </div>
  )
}

export default ServiceTag;
