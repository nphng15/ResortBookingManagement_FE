import { getToken } from './authService';

const API_BASE_URL = '/api/v1';

export interface UpdatePartnerRequest {
  name?: string;
  phone_number?: string;
  address?: string;
  banking_number?: string;
  bank?: string;
}

export interface PartnerProfile {
  id: number;
  name: string;
  phone_number: string | null;
  address: string | null;
  banking_number: string | null;
  bank: string | null;
}

export interface UpdatePartnerResponse {
  message: string;
  partner: PartnerProfile;
}

/**
 * Cập nhật thông tin partner
 * PUT /api/v1/auth/me/partner
 */
export async function updatePartnerProfile(data: UpdatePartnerRequest): Promise<UpdatePartnerResponse> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/auth/me/partner`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 400) throw new Error('Tài khoản không phải là partner');
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Cập nhật thất bại');
  }

  return response.json();
}
