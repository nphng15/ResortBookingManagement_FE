function ResortCardSkeleton() {
  return (
    <div className="flex bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-pulse">
      {/* Left: Image Skeleton */}
      <div className="w-[280px] h-[200px] bg-gradient-to-br from-slate-200 to-slate-100 flex-shrink-0" />

      {/* Middle: Info Skeleton */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              {/* Resort Name */}
              <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-3" />
              
              {/* Stars */}
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-slate-200 rounded" />
                ))}
              </div>

              {/* Address */}
              <div className="h-4 bg-slate-200 rounded-lg w-2/3 mt-3" />
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end gap-1">
                <div className="h-3 bg-slate-200 rounded w-14" />
                <div className="h-3 bg-slate-200 rounded w-16" />
              </div>
              <div className="w-11 h-11 bg-slate-200 rounded-xl" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-4">
            <div className="h-7 bg-slate-200 rounded-lg w-32" />
            <div className="h-7 bg-slate-200 rounded-lg w-28" />
          </div>
        </div>
      </div>

      {/* Right: Price Skeleton */}
      <div className="w-[200px] p-5 bg-slate-50 border-l border-slate-100 flex flex-col justify-center items-end">
        <div className="h-3 bg-slate-200 rounded w-20 mb-2" />
        <div className="h-8 bg-slate-200 rounded-lg w-28 mb-4" />
        <div className="h-10 bg-slate-200 rounded-xl w-full" />
      </div>
    </div>
  );
}

export default ResortCardSkeleton;
