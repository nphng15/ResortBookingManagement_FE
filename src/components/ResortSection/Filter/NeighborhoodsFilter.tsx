import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';

interface NeighborhoodsFilterProps {
  onNeighborhoodChange?: (neighborhoods: string[]) => void;
}

function NeighborhoodsFilter({ onNeighborhoodChange }: NeighborhoodsFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

  const neighborhoods = [
    { id: 'nha-trang', name: 'Nha Trang', count: 1357, tags: ['Biển', 'Spa', 'Thể thao nước'] },
    { id: 'loc-tho', name: 'Lộc Thọ', count: 637 },
    { id: 'tan-lap', name: 'Tân Lập', count: 135 },
    { id: 'vinh-hai', name: 'Vĩnh Hải', count: 94 },
    { id: 'cam-ranh', name: 'Cam Ranh', count: 91 }
  ];

  const handleNeighborhoodToggle = (neighborhoodId: string) => {
    const newNeighborhoods = selectedNeighborhoods.includes(neighborhoodId)
      ? selectedNeighborhoods.filter(n => n !== neighborhoodId)
      : [...selectedNeighborhoods, neighborhoodId];
    
    setSelectedNeighborhoods(newNeighborhoods);
    onNeighborhoodChange?.(newNeighborhoods);
  };

  return (
    <div className="p-4">
      <div 
        className="flex items-center justify-between cursor-pointer mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="font-medium text-slate-800">Khu vực</h4>
        <ChevronDown 
          size={16} 
          className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {neighborhoods.map((neighborhood) => (
            <div key={neighborhood.id}>
              <label 
                className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
                  selectedNeighborhoods.includes(neighborhood.id) 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedNeighborhoods.includes(neighborhood.id)}
                  onChange={() => handleNeighborhoodToggle(neighborhood.id)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{neighborhood.name}</span>
                    <span className="text-xs text-slate-400">{neighborhood.count}</span>
                  </div>
                  {neighborhood.tags && (
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {neighborhood.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            </div>
          ))}
          
          <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-700 mt-2 py-2 hover:bg-blue-50 rounded-xl transition-colors">
            Xem tất cả
          </button>
        </div>
      )}
    </div>
  );
}

export default NeighborhoodsFilter;
