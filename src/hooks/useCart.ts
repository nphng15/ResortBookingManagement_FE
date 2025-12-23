import { useState, useCallback, useEffect } from 'react';
import {
  deleteBookingDetail,
  getCart,
  updateBookingDetail,
  type CartItemResponse,
} from '../services/cartService';

export interface CartItem {
  id: number; // booking_detail_id
  offerId: number;
  roomName: string;
  resortName: string;
  price: number;
  numNights: number;
  quantity: number;
  cost: number;
  startedAt: string;
  finishedAt: string;
  partnerId?: number;
  availableRooms?: number;
}

export interface ToastState {
  show: boolean;
  message: string;
  type: 'error' | 'success';
}

// Map API response to CartItem
const mapCartItem = (item: CartItemResponse): CartItem => ({
  id: item.id,
  offerId: item.offer_id,
  roomName: item.room_type_name,
  resortName: item.resort_name,
  price: item.price_per_room,
  numNights: item.num_nights,
  quantity: item.number_of_rooms,
  cost: item.cost,
  startedAt: item.started_at,
  finishedAt: item.finished_at,
  partnerId: item.partner_id,
  availableRooms: item.available_rooms,
});

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null); // Track which item is updating
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'error' });

  // Fetch cart on mount
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const cart = await getCart();
      if (cart && cart.items) {
        setCartId(cart.id);
        setItems(cart.items.map(mapCartItem));
      } else {
        setCartId(null);
        setItems([]);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCartId(null);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const totalPrice = items.reduce((sum, item) => sum + item.cost, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = useCallback((message: string, type: 'error' | 'success' = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 3000);
  }, []);

  const closeToast = useCallback(() => {
    setToast({ show: false, message: '', type: 'error' });
  }, []);

  const increaseQuantity = useCallback(
    async (itemId: number) => {
      const item = items.find((i) => i.id === itemId);
      if (!item) return;

      // Check available rooms
      if (item.availableRooms !== undefined && item.quantity >= item.availableRooms) {
        showToast(`Chỉ còn ${item.availableRooms} phòng khả dụng`, 'error');
        return;
      }

      const newQuantity = item.quantity + 1;

      try {
        setUpdating(itemId);
        await updateBookingDetail(itemId, { number_of_rooms: newQuantity });
        // Refetch to get updated cost
        await fetchCart();
        showToast('Đã cập nhật số lượng', 'success');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Không thể cập nhật';
        showToast(message, 'error');
      } finally {
        setUpdating(null);
      }
    },
    [items, showToast, fetchCart]
  );

  const decreaseQuantity = useCallback(
    async (itemId: number) => {
      const item = items.find((i) => i.id === itemId);
      if (!item || item.quantity <= 1) return;

      const newQuantity = item.quantity - 1;

      try {
        setUpdating(itemId);
        await updateBookingDetail(itemId, { number_of_rooms: newQuantity });
        // Refetch to get updated cost
        await fetchCart();
        showToast('Đã cập nhật số lượng', 'success');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Không thể cập nhật';
        showToast(message, 'error');
      } finally {
        setUpdating(null);
      }
    },
    [items, showToast, fetchCart]
  );

  const removeItem = useCallback(
    async (bookingDetailId: number) => {
      try {
        await deleteBookingDetail(bookingDetailId);
        setItems((prev) => prev.filter((item) => item.id !== bookingDetailId));
        showToast('Đã xóa phòng khỏi giỏ hàng', 'success');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Không thể xóa item';
        showToast(message, 'error');
      }
    },
    [showToast]
  );

  return {
    items,
    cartId,
    loading,
    updating,
    totalPrice,
    totalItems,
    toast,
    showToast,
    closeToast,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    refetch: fetchCart,
  };
}
