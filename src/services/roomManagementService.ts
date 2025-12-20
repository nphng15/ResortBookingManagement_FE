import { getToken } from './authService';
import { API_BASE_URL } from '../config/api';

// Service interface
export interface ResortService {
  id: number;
  name: string;
  description?: string;
}

// Room Type interfaces
export interface RoomType {
  id: number;
  resort_id: number;
  name: string;
  area: number;
  bed_amount: number;
  people_amount: number;
  price: number;
  image_urls?: string[];
  offers?: Offer[];
}

export interface OfferInput {
  name: string;
  cost: number;
  service_ids: number[];
}

export interface CreateRoomTypeRequest {
  resort_id: number;
  name: string;
  area: number;
  bed_amount: number;
  people_amount: number;
  price: number;
  image_urls?: string[];
  offer: OfferInput;
}

export interface UpdateRoomTypeRequest {
  name?: string;
  area?: number;
  bed_amount?: number;
  people_amount?: number;
  price?: number;
}

// Offer interfaces
export interface Offer {
  id: number;
  room_type_id: number;
  name: string;
  cost: number;
  service_ids?: number[];
  services?: ResortService[];
  room_type_name?: string;
}

export interface CreateOfferRequest {
  room_type_id: number;
  name: string;
  cost: number;
  service_ids: number[];
}

export interface UpdateOfferRequest {
  name?: string;
  cost?: number;
  service_ids?: number[];
}

// Helper function
const getAuthHeaders = () => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// ============ RESORT SERVICES APIs ============

export const getResortServices = async (resortId: number): Promise<ResortService[]> => {
  const response = await fetch(`${API_BASE_URL}/partner/resorts/${resortId}/services`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tải danh sách dịch vụ');
  }
  return response.json();
};

// ============ ROOM TYPE APIs ============

export const getRoomTypes = async (resortId?: number): Promise<RoomType[]> => {
  const params = resortId ? `?resort_id=${resortId}` : '';
  const response = await fetch(`${API_BASE_URL}/partner/room-types${params}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tải danh sách loại phòng');
  }
  return response.json();
};

export const createRoomType = async (data: CreateRoomTypeRequest): Promise<RoomType> => {
  const response = await fetch(`${API_BASE_URL}/partner/room-types`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tạo loại phòng');
  }
  return response.json();
};

export const updateRoomType = async (id: number, data: UpdateRoomTypeRequest): Promise<RoomType> => {
  const response = await fetch(`${API_BASE_URL}/partner/room-types/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể cập nhật loại phòng');
  }
  return response.json();
};

export const deleteRoomType = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/partner/room-types/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể xóa loại phòng');
  }
};


// ============ OFFER APIs ============

export const getOffers = async (): Promise<Offer[]> => {
  const response = await fetch(`${API_BASE_URL}/partner/offers`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tải danh sách gói đặt phòng');
  }
  return response.json();
};

export const createOffer = async (data: CreateOfferRequest): Promise<Offer> => {
  const response = await fetch(`${API_BASE_URL}/partner/offers`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tạo gói đặt phòng');
  }
  return response.json();
};

export const updateOffer = async (id: number, data: UpdateOfferRequest): Promise<Offer> => {
  const response = await fetch(`${API_BASE_URL}/partner/offers/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể cập nhật gói đặt phòng');
  }
  return response.json();
};

export const deleteOffer = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/partner/offers/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể xóa gói đặt phòng');
  }
};

// ============ ROOM TYPE IMAGE APIs ============

export const addRoomTypeImage = async (roomTypeId: number, imageUrl: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/partner/room-types/${roomTypeId}/images`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ url: imageUrl }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể thêm ảnh');
  }
};

export const deleteRoomTypeImage = async (roomTypeId: number, imageId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/partner/room-types/${roomTypeId}/images/${imageId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể xóa ảnh');
  }
};
