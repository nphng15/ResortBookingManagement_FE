import { getToken } from './authService';

const API_BASE_URL = '/api/v1';

// ==================== Types ====================

export interface WithdrawRequest {
  id: number;
  partner_id: number;
  partner_name: string;
  transaction_amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
  finished_at: string | null;
}

export interface WithdrawListResponse {
  page: number;
  page_size: number;
  total: number;
  data: WithdrawRequest[];
}

export interface WithdrawFilters {
  page: number;
  pageSize: number;
  search: string;
  status: string;
  partnerId?: number;
  startDate?: string;
  endDate?: string;
}

// ==================== Withdraw APIs ====================

/**
 * Fetch withdraw requests
 * GET /api/v1/admin/withdraws
 */
export async function fetchWithdrawRequests(filters: WithdrawFilters): Promise<WithdrawListResponse> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const params = new URLSearchParams();
  params.append('page', filters.page.toString());
  params.append('page_size', filters.pageSize.toString());

  if (filters.status && filters.status !== 'ALL') {
    params.append('status', filters.status);
  }
  if (filters.startDate) {
    params.append('start_date', filters.startDate);
  }
  if (filters.endDate) {
    params.append('end_date', filters.endDate);
  }
  if (filters.partnerId) {
    params.append('partner_id', filters.partnerId.toString());
  }

  const response = await fetch(`${API_BASE_URL}/admin/withdraws?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 403) throw new Error('Bạn không có quyền truy cập');
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tải danh sách yêu cầu rút tiền');
  }

  return response.json();
}

/**
 * Update withdraw request status
 * PUT /api/v1/admin/withdraws/{id}?action=APPROVE|REJECT
 */
export async function updateWithdrawStatus(id: number, action: 'APPROVE' | 'REJECT'): Promise<void> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/admin/withdraws/${id}?action=${action}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 403) throw new Error('Bạn không có quyền thực hiện thao tác này');
    if (response.status === 404) throw new Error('Không tìm thấy yêu cầu rút tiền');
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || (action === 'APPROVE' ? 'Duyệt yêu cầu thất bại' : 'Từ chối yêu cầu thất bại'));
  }
}

// ==================== Account Management Types ====================

export interface AccountListItem {
  account_id: number;
  username: string;
  status: 'ACTIVE' | 'BANNED' | 'PENDING' | 'REJECTED';
  account_type: 'CUSTOMER' | 'PARTNER';
  name: string;
  phone_number: string;
}

export interface AccountFilters {
  account_type?: 'CUSTOMER' | 'PARTNER';
  status?: 'ACTIVE' | 'BANNED' | 'PENDING' | 'REJECTED';
  search?: string;
  page?: number;
  page_size?: number;
}

export interface CustomerDetail {
  id: number;
  fullname: string;
  email: string;
  phone_number: string;
  id_number: string;
}

export interface PartnerDetail {
  id: number;
  name: string;
  phone_number: string;
  address: string;
  banking_number: string;
  bank: string;
  balance: number;
}

export interface AccountDetail {
  account_id: number;
  username: string;
  status: string;
  created_at: string;
  roles: string[];
  customer?: CustomerDetail;
  partner?: PartnerDetail;
}

export interface BanUnbanRequest {
  account_id: number;
  reason?: string;
}

export interface BanUnbanResponse {
  message: string;
  account_id: number;
  status: string;
}

// ==================== Account Management APIs ====================

/**
 * Fetch accounts list
 * GET /api/v1/admin/accounts
 */
export async function fetchAccounts(filters: AccountFilters): Promise<AccountListItem[]> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const params = new URLSearchParams();
  if (filters.account_type) params.append('account_type', filters.account_type);
  if (filters.status) params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.page_size) params.append('page_size', filters.page_size.toString());

  const response = await fetch(`${API_BASE_URL}/admin/accounts?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 403) throw new Error('Bạn không có quyền truy cập');
    throw new Error('Không thể tải danh sách tài khoản');
  }

  return response.json();
}

/**
 * Fetch account detail
 * GET /api/v1/admin/accounts/{account_id}
 */
export async function fetchAccountDetail(accountId: number): Promise<AccountDetail> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/admin/accounts/${accountId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 404) throw new Error('Không tìm thấy tài khoản');
    throw new Error('Không thể tải thông tin tài khoản');
  }

  return response.json();
}

/**
 * Ban account
 * POST /api/v1/admin/accounts/ban
 */
export async function banAccount(data: BanUnbanRequest): Promise<BanUnbanResponse> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/admin/accounts/ban`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 403) throw new Error('Không thể cấm tài khoản admin');
    if (response.status === 404) throw new Error('Không tìm thấy tài khoản');
    if (response.status === 400) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Tài khoản đã bị cấm trước đó');
    }
    throw new Error('Cấm tài khoản thất bại');
  }

  return response.json();
}

/**
 * Unban account
 * POST /api/v1/admin/accounts/unban
 */
export async function unbanAccount(data: BanUnbanRequest): Promise<BanUnbanResponse> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/admin/accounts/unban`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Phiên đăng nhập hết hạn');
    if (response.status === 404) throw new Error('Không tìm thấy tài khoản');
    if (response.status === 400) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Tài khoản không ở trạng thái bị cấm');
    }
    throw new Error('Bỏ cấm tài khoản thất bại');
  }

  return response.json();
}
