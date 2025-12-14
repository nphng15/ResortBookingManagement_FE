function SocialButtons() {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button 
        type="button"
        className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <span className="text-gray-600 text-sm font-medium">f</span>
      </button>
      <button 
        type="button"
        className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <span className="text-gray-600 text-sm font-medium">G+</span>
      </button>
      <button 
        type="button"
        className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <span className="text-gray-600 text-sm font-medium">in</span>
      </button>
    </div>
  );
}

export default SocialButtons;
