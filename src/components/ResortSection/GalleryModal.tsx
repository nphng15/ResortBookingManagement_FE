import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  resortName?: string;
}

const GalleryModal = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  resortName = 'Resort',
}: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, goToPrevious, goToNext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        aria-label="Đóng"
      >
        <X size={28} />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-10 text-white text-lg font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Resort name */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white text-lg font-medium">
        {resortName}
      </div>

      {/* Previous button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 z-10 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
        aria-label="Ảnh trước"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Main image */}
      <div className="relative z-10 max-w-[90vw] max-h-[85vh]">
        <img
          src={images[currentIndex]}
          alt={`${resortName} - ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain"
        />
      </div>

      {/* Next button */}
      <button
        onClick={goToNext}
        className="absolute right-4 z-10 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
        aria-label="Ảnh tiếp theo"
      >
        <ChevronRight size={36} />
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              idx === currentIndex
                ? 'border-white opacity-100'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryModal;
