const API_BASE_URL = '/api/v1';

// Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_at: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface CustomerInfo {
  id: number;
  fullname: string | null;
  email: string | null;
  phone_number: string | null;
  id_number: string | null;
}

export interface PartnerInfo {
  id: number;
  name: string;
  phone_number: string | null;
  address: string | null;
  banking_number: string | null;
  bank: string | null;
  balance: number;
}

export interface Account {
  account_id: number;
  username: string;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'INACTIVE' | 'BANNED';
  created_at: string;
  roles: string[];
  customer?: CustomerInfo;
  partner?: PartnerInfo;
}

export interface RegisterResponse {
  message: string;
  account: Account;
}

export interface PartnerRegisterRequest {
  username: string;
  password: string;
  name: string;
  phone_number: string;
  address: string;
  banking_number: string;
  bank: string;
}

export interface Partner {
  id: number;
  account_id: number;
  name: string;
  phone_number: string;
  address: string;
  banking_number: string;
  bank: string;
  account_status: string;
}

export interface PartnerRegisterResponse {
  message: string;
  partner: Partner;
}

// Token management
const TOKEN_KEY = 'access_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// API calls
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Sai tên đăng nhập hoặc mật khẩu');
  }

  const result = await response.json();
  setToken(result.access_token);
  return result;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Username đã tồn tại');
  }

  return response.json();
};

export const registerPartner = async (data: PartnerRegisterRequest): Promise<PartnerRegisterResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register/partner`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Đăng ký thất bại');
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  const token = getToken();
  if (token) {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }
  removeToken();
};

export const getCurrentUser = async (): Promise<Account> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    // Chỉ xóa token nếu là lỗi 401 (Unauthorized)
    if (response.status === 401) {
      removeToken();
      throw new Error('Phiên đăng nhập hết hạn');
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || 'Không thể lấy thông tin người dùng');
  }

  return response.json();
};


// ==================== ADMIN APIs ====================

export interface PendingPartner {
  id: number;
  account_id: number;
  name: string;
  phone_number: string;
  address: string;
  banking_number: string;
  bank: string;
  account_status: string;
}

export interface ApprovePartnerRequest {
  account_id: number;
  approved: boolean;
}

export interface ApprovePartnerResponse {
  message: string;
  account_id: number;
  status: string;
}

// Lấy danh sách đối tác chờ duyệt
export const getPendingPartners = async (): Promise<PendingPartner[]> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/admin/partners/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Không thể lấy danh sách đối tác');
  }

  return response.json();
};

// Duyệt hoặc từ chối đối tác
export const approvePartner = async (data: ApprovePartnerRequest): Promise<ApprovePartnerResponse> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/admin/partners/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Thao tác thất bại');
  }

  return response.json();
};

// Helper: Kiểm tra đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  return !!getToken();
};


