import { useState } from 'react';
import { Grid } from 'lucide-react';
import GalleryModal from './GalleryModal.tsx';

interface GalleryPreviewProps {
  images: string[];
  resortName?: string;
}

const GalleryPreview = ({ images, resortName = 'Resort' }: GalleryPreviewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const displayImages = images.slice(0, 5);
  const remainingCount = images.length - 5;

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-xl overflow-hidden">
        {/* Main large image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => handleImageClick(0)}
        >
          <img
            src={displayImages[0]}
            alt={`${resortName} - 1`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Top right images */}
        {displayImages.slice(1, 3).map((image, idx) => (
          <div
            key={idx + 1}
            className="relative cursor-pointer group"
            onClick={() => handleImageClick(idx + 1)}
          >
            <img
              src={image}
              alt={`${resortName} - ${idx + 2}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}

        {/* Bottom right images */}
        {displayImages.slice(3, 5).map((image, idx) => (
          <div
            key={idx + 3}
            className="relative cursor-pointer group"
            onClick={() => handleImageClick(idx + 3)}
          >
            <img
              src={image}
              alt={`${resortName} - ${idx + 4}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            
            {/* Show "See All Photos" button on last image */}
            {idx === 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(0);
                  setIsModalOpen(true);
                }}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-md hover:bg-gray-50 transition-colors"
              >
                <Grid size={16} />
                <span>Xem tất cả ảnh {remainingCount > 0 && `(+${remainingCount})`}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        initialIndex={selectedIndex}
        resortName={resortName}
      />
    </>
  );
};

export default GalleryPreview;
