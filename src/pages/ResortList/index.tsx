import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Container from '@mui/material/Container';
import ResortCard from '../../components/ResortSection/ResortCard';
import ResortCardSkeleton from '../../components/ResortSection/ResortCard/ResortCardSkeleton';
import ResortFilter from '../../components/ResortSection/Filter';
import SearchBar from '../../components/ResortSection/SearchBar';
import { searchResorts, type Resort } from '../../services/resortService';

function ResortList() {
  const [searchParams] = useSearchParams();
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          name: searchParams.get('name') || '',
          checkin: searchParams.get('checkin') || '',
          checkout: searchParams.get('checkout') || '',
          number: parseInt(searchParams.get('number') || '2'),
        };

        const data = await searchResorts(params);
        setResorts(data);
      } catch (err) {
        setError('Không thể tải danh sách resort. Vui lòng thử lại.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, [searchParams]);

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
            {loading && (
              <div className="flex flex-col gap-4">
                {[...Array(3)].map((_, i) => (
                  <ResortCardSkeleton key={i} />
                ))}
              </div>
            )}
            
            {error && (
              <div className="text-center py-8 text-red-500">
                {error}
              </div>
            )}
            
            {!loading && !error && resorts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không tìm thấy resort nào phù hợp.
              </div>
            )}
            
            {!loading && !error && resorts.map((resort) => (
              <ResortCard
                key={resort.id}
                id={resort.id}
                name={resort.name}
                address={resort.address}
                images={resort.images}
                rating={resort.rating}
                reviews=""
                priceOriginal={resort.min_price}
                priceDiscounted={resort.min_price}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ResortList;
