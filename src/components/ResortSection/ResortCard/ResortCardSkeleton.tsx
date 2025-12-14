function ResortCardSkeleton() {
  return (
    <div className="flex justify-between gap-5 p-4 border border-gray-200 rounded-xl shadow-sm bg-white w-full max-w-[1000px] animate-pulse">
      {/* Left: Image Skeleton */}
      <div className="w-[200px] h-[150px] bg-gray-200 rounded-lg flex-shrink-0" />

      {/* Middle: Info Skeleton */}
      <div className="flex flex-col justify-between flex-[1.8] min-w-[45%]">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Resort Name */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            
            {/* Stars */}
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
              ))}
            </div>

            {/* Address */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />

            {/* Tags */}
            <div className="flex gap-2 mt-3">
              <div className="h-6 bg-gray-200 rounded-full w-28" />
              <div className="h-6 bg-gray-200 rounded-full w-32" />
            </div>
          </div>

          {/* Rating Skeleton */}
          <div className="flex flex-col items-end gap-1">
            <div className="h-5 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>

      {/* Right: Price Skeleton */}
      <div className="w-[25%] p-4 border-l border-gray-200 flex flex-col justify-center items-end">
        <div className="h-6 bg-gray-200 rounded w-28 mb-3" />
        <div className="h-9 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
}

export default ResortCardSkeleton;
