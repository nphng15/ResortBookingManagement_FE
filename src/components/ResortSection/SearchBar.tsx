import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import SimpleDatePicker from './SimpleDatePicker';
import { useSearch } from '../../hooks/useSearch';

const LOCATIONS = [
  'Six Senses Ninh Van Bay',
  'Vinpearl Resort & Spa Nha Trang Bay',
  'InterContinental Danang Sun Peninsula Resort',
  'JW Marriott Phu Quoc Emerald Bay',
  'Nha Trang',
  'Da Nang',
  'Phu Quoc'
];

function SearchBar() {
  const {
    location,
    setLocation,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    incrementGuests,
    decrementGuests,
    showLocationDropdown,
    showDatePicker,
    showGuestsDropdown,
    isAnyDropdownOpen,
    openLocationDropdown,
    openDatePicker,
    openGuestsDropdown,
    closeAllDropdowns,
    handleSearch,
    formatDate,
    getNights,
  } = useSearch();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 z-10 ${
          isAnyDropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeAllDropdowns}
      />
      <div className="bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50 border-b border-slate-200/60 py-4 sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-stretch bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Location */}
            <div 
              className="flex items-center gap-3 px-5 py-4 flex-[4] border-r border-slate-200 relative cursor-pointer hover:bg-slate-50/80 rounded-l-2xl transition-colors"
              onClick={() => showLocationDropdown ? closeAllDropdowns() : openLocationDropdown()}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 mb-0.5">Địa điểm</p>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-sm font-medium text-slate-800 bg-transparent border-none outline-none placeholder:text-slate-400"
                  placeholder="Bạn muốn đi đâu?"
                />
              </div>
              
              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-3 bg-white border border-slate-200 rounded-2xl shadow-xl w-full z-30 max-h-72 overflow-y-auto">
                  <div className="p-2">
                    {LOCATIONS.map((loc) => (
                      <div
                        key={loc}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm rounded-xl transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocation(loc);
                          closeAllDropdowns();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <MapPin size={14} className="text-slate-500" />
                          </div>
                          <span className="text-slate-700">{loc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Check-in / Check-out */}
            <div 
              className="flex items-center gap-3 px-5 py-4 flex-[5] border-r border-slate-200 relative cursor-pointer hover:bg-slate-50/80 transition-colors"
              onClick={() => showDatePicker ? closeAllDropdowns() : openDatePicker()}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-0.5">Ngày nhận - trả phòng</p>
                <p className="text-sm font-medium text-slate-800">
                  {formatDate(checkIn)} - {formatDate(checkOut)} <span className="text-slate-400">({getNights()} đêm)</span>
                </p>
              </div>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />

              {showDatePicker && (
                <div className="absolute top-full left-0 mt-3 z-50" onClick={(e) => e.stopPropagation()}>
                  <SimpleDatePicker
                    startDate={checkIn}
                    endDate={checkOut}
                    onStartDateChange={setCheckIn}
                    onEndDateChange={setCheckOut}
                    onClose={closeAllDropdowns}
                  />
                </div>
              )}
            </div>

            {/* Guests */}
            <div 
              className="flex items-center gap-3 px-5 py-4 flex-[2] border-r border-slate-200 relative cursor-pointer hover:bg-slate-50/80 transition-colors"
              onClick={() => showGuestsDropdown ? closeAllDropdowns() : openGuestsDropdown()}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-0.5">Số khách</p>
                <p className="text-sm font-medium text-slate-800">{guests} khách</p>
              </div>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${showGuestsDropdown ? 'rotate-180' : ''}`} />

              {showGuestsDropdown && (
                <div 
                  className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Số khách</p>
                      <p className="text-xs text-slate-500">Người lớn & trẻ em</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={decrementGuests}
                        className="w-9 h-9 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-lg transition-colors"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold w-6 text-center text-slate-800">{guests}</span>
                      <button
                        onClick={incrementGuests}
                        className="w-9 h-9 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 font-semibold text-sm rounded-r-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              <Search size={20} />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
