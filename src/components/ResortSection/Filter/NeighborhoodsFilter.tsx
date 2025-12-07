import { useState } from 'react';
import { ChevronUp } from 'lucide-react';

interface NeighborhoodsFilterProps {
  onNeighborhoodChange?: (neighborhoods: string[]) => void;
}

function NeighborhoodsFilter({ onNeighborhoodChange }: NeighborhoodsFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

  const neighborhoods = [
    { id: 'nha-trang', name: 'Nha Trang', count: 1357, tags: ['Beaches', 'Wellness', 'Water Sports'] },
    { id: 'loc-tho', name: 'Lộc Thọ', count: 637 },
    { id: 'tan-lap', name: 'Tân Lập Ward', count: 135 },
    { id: 'vinh-hai', name: 'Vĩnh Hải Ward', count: 94 },
    { id: 'cam-ranh', name: 'Cam Ranh City', count: 91 }
  ];

  const handleNeighborhoodToggle = (neighborhoodId: string) => {
    const newNeighborhoods = selectedNeighborhoods.includes(neighborhoodId)
      ? selectedNeighborhoods.filter(n => n !== neighborhoodId)
      : [...selectedNeighborhoods, neighborhoodId];
    
    setSelectedNeighborhoods(newNeighborhoods);
    onNeighborhoodChange?.(newNeighborhoods);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-bold text-gray-900 text-lg">Neighborhoods</h3>
        <ChevronUp 
          size={20} 
          className={`text-blue-500 transition-transform ${isExpanded ? '' : 'rotate-180'}`}
        />
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {neighborhoods.map((neighborhood) => (
            <div key={neighborhood.id}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedNeighborhoods.includes(neighborhood.id)}
                  onChange={() => handleNeighborhoodToggle(neighborhood.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium group-hover:text-gray-900">
                  {neighborhood.name} <span className="text-gray-500">({neighborhood.count})</span>
                </span>
              </label>
              {neighborhood.tags && (
                <div className="ml-8 mt-1 flex gap-2 flex-wrap">
                  {neighborhood.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <button className="text-blue-500 text-sm font-medium hover:text-blue-600 mt-2">
            See All
          </button>
        </div>
      )}
    </div>
  );
}

export default NeighborhoodsFilter;
