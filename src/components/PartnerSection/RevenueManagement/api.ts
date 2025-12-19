import { getToken } from '../../../services/authService';
import type { PartnerStatistics, WithdrawResponse } from './types';

const API_BASE_URL = '/api/v1';

/**
 * Lấy thống kê doanh thu của partner
 * GET /api/v1/partner/statistics
 */
export async function fetchPartnerStatistics(): Promise<PartnerStatistics> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/partner/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Phiên đăng nhập hết hạn');
    }
    if (response.status === 403) {
      throw new Error('Tài khoản không phải là partner');
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tải thống kê');
  }

  return response.json();
}

/**
 * Yêu cầu rút tiền
 * POST /api/v1/partner/withdraw?amount={amount}
 */
export async function requestWithdrawal(amount: number): Promise<WithdrawResponse> {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/partner/withdraw?amount=${amount}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Phiên đăng nhập hết hạn');
    }
    if (response.status === 400) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Số dư không đủ để rút tiền');
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Yêu cầu rút tiền thất bại');
  }

  return response.json();
}
