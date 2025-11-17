import React, { useState } from 'react';

interface CardImagePreviewProps {
  images: string[];
  alt?: string;
}

function CardImagePreview({ images, alt }: CardImagePreviewProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col w-[320px] gap-1">
        <div className="w-full h-[180px] bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
          No image available
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[320px] gap-1">
      {/* Ảnh chính */}
      <img
        src={images[0]}
        alt={alt || 'main image'}
        className="w-full h-[180px] object-cover rounded-md cursor-pointer"
        onClick={() => setSelectedImage(images[0])}
      />

      {/* Ảnh nhỏ */}
      <div className="flex gap-1">
        {images.slice(1, 4).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${alt || 'preview'}-${i}`}
            className="w-1/3 h-[60px] object-cover rounded-sm hover:opacity-90 cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Overlay phóng to */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="zoomed"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default CardImagePreview;
