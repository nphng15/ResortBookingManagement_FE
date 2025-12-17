import { getToken } from './authService';

const API_BASE_URL = '/api/v1';

// Response từ API GET /cart
export interface CartItemResponse {
  id: number;
  offer_id: number;
  room_type_name: string;
  resort_name: string;
  number_of_rooms: number;
  price_per_room: number;
  cost: number;
  started_at: string;
  finished_at: string;
  status: string;
}

export interface CartResponse {
  id: number;
  customer_id: number;
  created_at: string;
  status: string;
  total_cost: number;
  items: CartItemResponse[];
}

// Lấy giỏ hàng
export const getCart = async (): Promise<CartResponse | null> => {
  const token = getToken();
  if (!token) return null;

  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    return null; // Chưa có giỏ hàng
  }

  if (!response.ok) {
    throw new Error('Không thể lấy giỏ hàng');
  }

  return response.json();
};

// Request thêm vào giỏ hàng
export interface AddToCartRequest {
  offer_id: number;
  number_of_rooms: number;
  started_at: string;
  finished_at: string;
}

// Thêm vào giỏ hàng
export const addToCart = async (data: AddToCartRequest): Promise<{ message: string }> => {
  const token = getToken();
  if (!token) throw new Error('Vui lòng đăng nhập để thêm vào giỏ hàng');

  const response = await fetch(`${API_BASE_URL}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể thêm vào giỏ hàng');
  }

  return response.json();
};

// Xóa item khỏi giỏ hàng
export const deleteBookingDetail = async (bookingDetailId: number): Promise<{ message: string }> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/booking-detail/${bookingDetailId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể xóa item khỏi giỏ hàng');
  }

  return response.json();
};
