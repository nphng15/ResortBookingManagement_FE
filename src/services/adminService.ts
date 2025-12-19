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
