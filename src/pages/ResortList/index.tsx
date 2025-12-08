import Container from '@mui/material/Container';
import ResortCard from '../../components/ResortSection/ResortCard';
import ResortFilter from '../../components/ResortSection/Filter';
import SearchBar from '../../components/ResortSection/SearchBar';
import { useEffect, useState } from 'react';

// Sample data - bạn có thể thay thế bằng data từ API hoặc search results

function ResortList() {
  const [resorts, setResorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fullUrl = 'https://automatic-space-invention-wrrgjg9wjxqxf5w55-8080.app.github.dev/api/v1/search';

    const fetchResorts = async () => {
      try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
          // Xử lý lỗi HTTP (ví dụ: 404, 500)
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResorts(data.Resort); // Giả sử dữ liệu trả về có key là "Resort"
      } catch (e) {
        // Xử lý lỗi mạng hoặc lỗi parse JSON
        {/*setError(e.message);*/}
      } finally {
        setIsLoading(false);
      }
    };

    fetchResorts();
  }, []); // Mảng rỗng đảm bảo fetch chỉ chạy 1 lần sau khi component mount

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu: {error}</p>;
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
            {resorts.map((resort) => (
              <ResortCard
                key={resort.index}
                name={resort.name}
                address={resort.address}
                images={resort.images}
                rating={resort.rating}
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
