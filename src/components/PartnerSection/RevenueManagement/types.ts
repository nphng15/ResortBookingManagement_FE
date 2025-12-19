// Response từ API /api/v1/partner/statistics
export interface PartnerStatistics {
  new_bookings_today: number;
  monthly_revenue: number;
  total_bookings: number;
  current_balance: number;
  balance_movements: {
    revenues: RevenueItem[];
    withdrawals: WithdrawalItem[];
  };
}

// Khoản thu từ booking
export interface RevenueItem {
  invoice_id: number;
  booking_detail_id: number;
  amount: number;
  time: string;
  type: 'REVENUE';
}

// Lịch sử rút tiền
export interface WithdrawalItem {
  id: number;
  amount: number;
  time: string;
  type: 'WITHDRAW';
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// Response từ API /api/v1/partner/withdraw
export interface WithdrawResponse {
  message: string;
  withdraw_id: number;
  partner_id: number;
  requested_amount: number;
  remaining_balance: number;
  status: string;
  created_at: string;
}
