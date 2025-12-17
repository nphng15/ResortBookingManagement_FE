import { useState, useCallback, useEffect } from 'react';
import { deleteBookingDetail, getCart, type CartItemResponse } from '../services/cartService';

export interface CartItem {
  id: number; // booking_detail_id
  offerId: number;
  roomName: string;
  resortName: string;
  price: number;
  quantity: number;
  cost: number;
  startedAt: string;
  finishedAt: string;
  partnerId?: number;
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
  quantity: item.number_of_rooms,
  cost: item.cost,
  startedAt: item.started_at,
  finishedAt: item.finished_at,
  partnerId: item.partner_id,
});

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
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

  // TODO: Implement với API PUT /booking-detail/{id}
  const increaseQuantity = useCallback((itemId: number) => {
    console.log('Increase quantity for item:', itemId);
    showToast('Chức năng đang phát triển', 'error');
  }, [showToast]);

  const decreaseQuantity = useCallback((itemId: number) => {
    console.log('Decrease quantity for item:', itemId);
    showToast('Chức năng đang phát triển', 'error');
  }, [showToast]);

  const removeItem = useCallback(async (bookingDetailId: number) => {
    try {
      await deleteBookingDetail(bookingDetailId);
      setItems(prev => prev.filter(item => item.id !== bookingDetailId));
      showToast('Đã xóa phòng khỏi giỏ hàng', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Không thể xóa item';
      showToast(message, 'error');
    }
  }, [showToast]);

  return {
    items,
    cartId,
    loading,
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
