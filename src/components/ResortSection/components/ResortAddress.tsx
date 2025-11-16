import React from 'react'
import { MapPin } from "lucide-react";

interface ResortAddressProps {
  address: string;
}
function ResortAddress({address}: ResortAddressProps) {
  return (
    <div className="flex items-center gap-1 text-gray-600 text-[13px] mt-1 hover:text-[#0071c2]">
      <MapPin size={14} />
      <span>{address}</span>
    </div>
  );
};

export default ResortAddress
