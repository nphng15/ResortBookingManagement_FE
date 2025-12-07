import Container from '@mui/material/Container';
import ResortCard from '../../components/ResortSection/ResortCard';
import ResortFilter from '../../components/ResortSection/Filter';
import SearchBar from '../../components/ResortSection/SearchBar';

// Sample data - bạn có thể thay thế bằng data từ API hoặc search results
const sampleResorts = [
  {
    id: 1,
    name: "Vinpearl Resort & Spa Nha Trang Bay",
    address: "Hon Tre Island, Vinh Nguyen, Nha Trang",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    rating: 9.2,
    reviews: "1.2K",
    priceOriginal: 3500000,
    priceDiscounted: 2800000
  },
  {
    id: 2,
    name: "InterContinental Danang Sun Peninsula Resort",
    address: "Bai Bac, Son Tra Peninsula, Da Nang",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
    ],
    rating: 9.5,
    reviews: "2.5K",
    priceOriginal: 5000000,
    priceDiscounted: 4200000
  },
  {
    id: 3,
    name: "JW Marriott Phu Quoc Emerald Bay Resort & Spa",
    address: "Khem Beach, An Thoi, Phu Quoc",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
    ],
    rating: 9.0,
    reviews: "980",
    priceOriginal: 4500000,
    priceDiscounted: 3600000
  }
];

function ResortList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Search Bar */}
      <SearchBar />

      <Container maxWidth="lg" sx={{ padding: '0 !important', py: 4 }}>
        <div className="mt-8"></div>
        
        <div className="flex gap-6">
          {/* Filter Section - Left */}
          <ResortFilter />

          {/* Resort Cards - Right */}
          <div className="flex-1 flex flex-col gap-4">
            {sampleResorts.map((resort) => (
              <ResortCard
                key={resort.id}
                name={resort.name}
                address={resort.address}
                images={resort.images}
                rating={resort.rating}
                reviews={resort.reviews}
                priceOriginal={resort.priceOriginal}
                priceDiscounted={resort.priceDiscounted}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ResortList;
