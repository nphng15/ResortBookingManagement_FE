import { useState, useEffect, useCallback } from 'react';
import { type BookingHistory, getBookingHistories } from '../services/bookingHistoryService';

interface UseBookingHistoryReturn {
  histories: BookingHistory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBookingHistory = (customerId: number | null): UseBookingHistoryReturn => {
  const [histories, setHistories] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistories = useCallback(async () => {
    if (!customerId) {
      setHistories([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getBookingHistories(customerId);
      setHistories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      setHistories([]);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    let ignore = false;
    
    const fetch = async () => {
      if (!customerId) {
        setHistories([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getBookingHistories(customerId);
        if (!ignore) {
          setHistories(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
          setHistories([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetch();

    return () => {
      ignore = true;
    };
  }, [customerId]);

  return {
    histories,
    loading,
    error,
    refetch: fetchHistories,
  };
};

export default useBookingHistory;
