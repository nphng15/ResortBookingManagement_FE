import { useState, useCallback } from 'react';

export interface CartItem {
  roomId: number;
  roomName: string;
  resortId: number;
  resortName: string;
  price: number;
  quantity: number;
  maxAvailable: number;
  area: number;
  bedAmount: number;
  peopleAmount: number;
  image?: string;
}

export interface ToastState {
  show: boolean;
  message: string;
  type: 'error' | 'success';
}

const mockCartItems: CartItem[] = [
  {
    roomId: 1,
    roomName: 'Deluxe Ocean View',
    resortId: 1,
    resortName: 'Six Senses Ninh Van Bay',
    price: 5500000,
    quantity: 1,
    maxAvailable: 5,
    area: 45,
    bedAmount: 1,
    peopleAmount: 2,
  },
  {
    roomId: 2,
    roomName: 'Premium Suite',
    resortId: 1,
    resortName: 'Six Senses Ninh Van Bay',
    price: 8200000,
    quantity: 2,
    maxAvailable: 3,
    area: 65,
    bedAmount: 2,
    peopleAmount: 4,
  },
];

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'error' });

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = useCallback((message: string, type: 'error' | 'success' = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 3000);
  }, []);

  const closeToast = useCallback(() => {
    setToast({ show: false, message: '', type: 'error' });
  }, []);

  const increaseQuantity = useCallback((roomId: number) => {
    setItems(prev => prev.map(item => {
      if (item.roomId === roomId) {
        if (item.quantity >= item.maxAvailable) {
          showToast(`Chỉ còn ${item.maxAvailable} phòng "${item.roomName}" khả dụng`, 'error');
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  }, [showToast]);

  const decreaseQuantity = useCallback((roomId: number) => {
    setItems(prev => prev.map(item => {
      if (item.roomId === roomId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  }, []);

  const removeItem = useCallback((roomId: number) => {
    setItems(prev => prev.filter(item => item.roomId !== roomId));
    showToast('Đã xóa phòng khỏi giỏ hàng', 'success');
  }, [showToast]);

  const handleCheckout = useCallback(() => {
    console.log('=== CHECKOUT ===');
    console.log('Tổng tiền:', totalPrice.toLocaleString('vi-VN'), 'đ');
    console.log('Chi tiết đơn hàng:', items);
    console.log('================');
    // TODO: navigate('/checkout', { state: { items, totalPrice } });
  }, [items, totalPrice]);

  const checkRoomAvailability = useCallback(async (roomId: number): Promise<number> => {
    const item = items.find(i => i.roomId === roomId);
    return item?.maxAvailable ?? 0;
  }, [items]);

  return {
    items,
    totalPrice,
    totalItems,
    toast,
    closeToast,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    handleCheckout,
    checkRoomAvailability,
  };
}
