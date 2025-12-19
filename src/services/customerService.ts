import { getToken } from './authService';

const API_BASE_URL = '/api/v1';

export interface CustomerProfile {
  id: number;
  fullname: string | null;
  email: string | null;
  phone_number: string | null;
  id_number: string | null;
}

export interface UpdateCustomerRequest {
  fullname?: string;
  email?: string;
  phone_number?: string;
  id_number?: string;
}

export interface UpdateCustomerResponse {
  message: string;
  customer: CustomerProfile;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

/**
 * Cập nhật thông tin customer
 * PUT /api/v1/auth/me/customer
 */
export async function updateCustomerProfile(data: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/auth/me/customer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 400) throw new Error('Tài khoản không phải là customer');
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Cập nhật thất bại');
  }

  return response.json();
}

/**
 * Đổi mật khẩu
 * PUT /api/v1/auth/me/password
 */
export async function changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/auth/me/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 400) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Mật khẩu cũ không đúng');
    }
    throw new Error('Đổi mật khẩu thất bại');
  }

  return response.json();
}
