import { useState } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import SimpleDatePicker from './SimpleDatePicker';

function SearchBar() {
  const [location, setLocation] = useState('Six Senses Ninh Van Bay');
  const [checkIn, setCheckIn] = useState(new Date('2024-12-08'));
  const [checkOut, setCheckOut] = useState(new Date('2024-12-09'));
  const [guests, setGuests] = useState(1);
  
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const locations = [
    'Six Senses Ninh Van Bay',
    'Vinpearl Resort & Spa Nha Trang Bay',
    'InterContinental Danang Sun Peninsula Resort',
    'JW Marriott Phu Quoc Emerald Bay',
    'Nha Trang',
    'Da Nang',
    'Phu Quoc'
  ];

  const handleSearch = () => {
    console.log({ location, checkIn, checkOut, guests });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  };

  const getNights = () => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isAnyDropdownOpen = showLocationDropdown || showDatePicker || showGuestsDropdown;

  const closeAllDropdowns = () => {
    setShowLocationDropdown(false);
    setShowDatePicker(false);
    setShowGuestsDropdown(false);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-10 ${
          isAnyDropdownOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeAllDropdowns}
      />
      <div className="bg-white shadow-sm border-b border-gray-200 py-4 sticky top-0 z-20">
        <div className="max-w-[1200px] mx-auto">
        <div className="flex items-stretch bg-white rounded-lg border border-gray-300">
          {/* Location */}
          <div className="flex items-center gap-3 px-5 py-4 flex-4 border-r border-gray-300 relative cursor-pointer hover:bg-gray-50"
               onClick={() => {
                 setShowLocationDropdown(!showLocationDropdown);
                 setShowDatePicker(false);
                 setShowGuestsDropdown(false);
               }}>
            <MapPin size={22} className="text-blue-500" />
            <div className="flex-1">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-base font-medium text-gray-800 bg-transparent border-none outline-none"
                placeholder="Where are you going?"
              />
            </div>
            
            {showLocationDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full z-30 max-h-60 overflow-y-auto">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{loc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Check-in / Check-out */}
          <div className="flex items-center gap-3 px-5 py-4 flex-6 border-r border-gray-300 relative cursor-pointer hover:bg-gray-50"
               onClick={() => {
                 setShowDatePicker(!showDatePicker);
                 setShowLocationDropdown(false);
                 setShowGuestsDropdown(false);
               }}>
            <Calendar size={22} className="text-blue-500" />
            <div className="flex-1">
              <p className="text-base font-medium text-gray-800">
                {formatDate(checkIn)} - {formatDate(checkOut)}, {getNights()} night(s)
              </p>
            </div>
            <ChevronDown size={18} className="text-gray-500" />

            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 z-50"
                   onClick={(e) => e.stopPropagation()}>
                <SimpleDatePicker
                  startDate={checkIn}
                  endDate={checkOut}
                  onStartDateChange={setCheckIn}
                  onEndDateChange={setCheckOut}
                  onClose={() => setShowDatePicker(false)}
                />
              </div>
            )}
          </div>

          {/* Guests */}
          <div className="flex items-center gap-3 px-5 py-4 flex-2 border-r border-gray-300 relative cursor-pointer hover:bg-gray-50"
               onClick={() => {
                 setShowGuestsDropdown(!showGuestsDropdown);
                 setShowLocationDropdown(false);
                 setShowDatePicker(false);
               }}>
            <Users size={22} className="text-blue-500" />
            <div className="flex-1">
              <p className="text-base font-medium text-gray-800">
                {guests} Guest(s)
              </p>
            </div>
            <ChevronDown size={18} className="text-gray-500" />

            {showGuestsDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg sh p-3 z-30"
                   onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-700">Guests</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-6 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center text-lg"
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
            className="bg-blue-600 text-white px-10 py-4 hover:bg-blue-700 transition flex items-center gap-2 font-medium text-base border border-blue-600 rounded-r-lg"
          >
            <Search size={22} />
            <span>Tìm kiếm</span>
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default SearchBar;
