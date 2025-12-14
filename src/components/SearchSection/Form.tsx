import DateRangePicker from './DateRangePicker'
import GuestPicker from './GuestPicker'
import { useState, useDeferredValue } from 'react'

function Form() {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [destination, setDestination] = useState('');
  const deferredDestination = useDeferredValue(destination);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      name: deferredDestination,
      checkin: formatDate(selectedStartDate),
      checkout: formatDate(selectedEndDate),
      number: guests.toString(),
    });
    window.open(`/search?${params.toString()}`, '_blank');
  }

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-cyan-500 to-pink-500 rounded-3xl blur-lg opacity-30" />
      
      {/* Form Card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* Destination Input */}
          <div className="lg:col-span-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Điểm đến
            </label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Tìm kiếm resort, địa điểm..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Guest Picker */}
          <div className="lg:col-span-3">
            <GuestPicker guests={guests} setGuests={setGuests} />
          </div>

          {/* Search Button */}
          <div className="lg:col-span-4 flex items-end">
            <button
              onClick={handleSearch}
              className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:from-violet-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tìm Kiếm
            </button>
          </div>
        </div>

        {/* Date Range Picker - Full Width */}
        <div className="mt-6">
          <DateRangePicker
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
          />
        </div>
      </div>
    </div>
  )
}

export default Form
