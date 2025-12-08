import type { PartnerStatistics } from './types';

// Mock data
const mockStatistics: PartnerStatistics = {
  new_bookings_today: 5,
  monthly_revenue: 125000000,
  total_bookings: 156,
  current_balance: 45000000,
  balance_movements: {
    revenues: [
      { id: 1, amount: 5000000, date: '2025-12-08T10:00:00', description: 'Đặt phòng #1234' },
      { id: 2, amount: 3500000, date: '2025-12-07T14:30:00', description: 'Đặt phòng #1233' },
      { id: 3, amount: 7500000, date: '2025-12-06T09:15:00', description: 'Đặt phòng #1232' },
      { id: 4, amount: 4200000, date: '2025-12-05T16:45:00', description: 'Đặt phòng #1231' },
      { id: 5, amount: 6000000, date: '2025-12-04T11:20:00', description: 'Đặt phòng #1230' },
    ],
    withdrawals: [
      { id: 1, amount: 20000000, date: '2025-12-01T10:00:00', status: 'APPROVED' },
      { id: 2, amount: 15000000, date: '2025-11-15T14:30:00', status: 'APPROVED' },
      { id: 3, amount: 10000000, date: '2025-11-01T09:15:00', status: 'APPROVED' },
      { id: 4, amount: 25000000, date: '2025-10-15T11:00:00', status: 'APPROVED' },
      { id: 5, amount: 18000000, date: '2025-10-01T09:00:00', status: 'APPROVED' },
      { id: 6, amount: 12000000, date: '2025-09-15T14:00:00', status: 'APPROVED' },
      { id: 7, amount: 30000000, date: '2025-09-01T10:30:00', status: 'APPROVED' },
      { id: 8, amount: 22000000, date: '2025-08-15T16:00:00', status: 'APPROVED' },
      { id: 9, amount: 8000000, date: '2025-08-01T11:00:00', status: 'APPROVED' },
      { id: 10, amount: 35000000, date: '2025-07-15T09:30:00', status: 'APPROVED' },
    ],
  },
};

/**
 * Fetch partner statistics from API
 * TODO: Replace mock implementation with actual API call
 * 
 * Example API call:
 * const response = await fetch(`/api/v1/partner/${partnerId}/statistics`);
 * return response.json();
 */
export async function fetchPartnerStatistics(partnerId: number): Promise<PartnerStatistics> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockStatistics;
}

/**
 * Request withdrawal
 * TODO: Replace mock implementation with actual API call
 * 
 * Example API call:
 * const response = await fetch(`/api/v1/partner/${partnerId}/withdraw?amount=${amount}`, { method: 'POST' });
 * return response.json();
 */
export async function requestWithdrawal(partnerId: number, amount: number): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  if (amount > mockStatistics.current_balance) {
    return { success: false, message: 'Số dư không đủ để thực hiện yêu cầu rút tiền' };
  }
  
  if (amount < 1000000) {
    return { success: false, message: 'Số tiền rút tối thiểu là 1.000.000 VND' };
  }
  
  console.log(`Withdrawal request: Partner ${partnerId}, Amount: ${amount}`);
  return { success: true, message: 'Yêu cầu rút tiền đã được gửi thành công' };
}
