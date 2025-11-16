import React, { useEffect, useState } from 'react'

interface ResortNameProps {
  name: string;
}

function ResortName({name}: ResortNameProps) {
 
  return (
    <h3 className="text-[18px] font-semibold text-gray-800 hover:text-[#0071c2] cursor-pointer">
      {name}
    </h3>
  );
}

export default ResortName
