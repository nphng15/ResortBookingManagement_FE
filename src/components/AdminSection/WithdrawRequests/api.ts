import type { WithdrawListResponse, WithdrawFilters } from './types';

// Mock data matching API structure
const mockApiResponse: WithdrawListResponse = {
  page: 1,
  page_size: 10,
  total: 42,
  data: [
    { id: 15, partner_id: 3, partner_name: 'Resort ABC', transaction_amount: 5000000.0, status: 'PENDING', created_at: '2025-11-09T14:00:00', finished_at: null },
    { id: 14, partner_id: 2, partner_name: 'Villa Ocean View', transaction_amount: 3000000.0, status: 'APPROVED', created_at: '2025-11-08T09:30:00', finished_at: '2025-11-09T12:15:00' },
    { id: 13, partner_id: 5, partner_name: 'Mountain Resort', transaction_amount: 7500000.0, status: 'PENDING', created_at: '2025-11-07T16:45:00', finished_at: null },
    { id: 12, partner_id: 1, partner_name: 'Beach Hotel', transaction_amount: 2000000.0, status: 'REJECTED', created_at: '2025-11-06T11:20:00', finished_at: '2025-11-07T08:00:00' },
    { id: 11, partner_id: 4, partner_name: 'Cozy Homestay', transaction_amount: 1500000.0, status: 'APPROVED', created_at: '2025-11-05T10:00:00', finished_at: '2025-11-06T14:30:00' },
    { id: 10, partner_id: 3, partner_name: 'Resort ABC', transaction_amount: 4000000.0, status: 'PENDING', created_at: '2025-11-04T09:15:00', finished_at: null },
    { id: 9, partner_id: 6, partner_name: 'Sunset Villa', transaction_amount: 2500000.0, status: 'APPROVED', created_at: '2025-11-03T08:00:00', finished_at: '2025-11-04T10:00:00' },
    { id: 8, partner_id: 7, partner_name: 'Garden Hotel', transaction_amount: 6000000.0, status: 'PENDING', created_at: '2025-11-02T15:30:00', finished_at: null },
  ],
};

/**
 * Fetch withdraw requests from API
 * TODO: Replace mock implementation with actual API call
 * 
 * Example API call:
 * const response = await fetch(`/api/admin/withdraws?page=${filters.page}&page_size=${filters.pageSize}&status=${filters.status}&search=${filters.search}`);
 * return response.json();
 */
export async function fetchWithdrawRequests(filters: WithdrawFilters): Promise<WithdrawListResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  let filteredData = [...mockApiResponse.data];
  
  if (filters.search) {
    filteredData = filteredData.filter((w) => 
      w.partner_name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  if (filters.status && filters.status !== 'ALL') {
    filteredData = filteredData.filter((w) => w.status === filters.status);
  }
  
  const startIndex = (filters.page - 1) * filters.pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + filters.pageSize);
  
  return {
    page: filters.page,
    page_size: filters.pageSize,
    total: filteredData.length,
    data: paginatedData,
  };
}

/**
 * Approve or reject a withdraw request
 * TODO: Replace mock implementation with actual API call
 * 
 * Example API call:
 * await fetch(`/api/admin/withdraws/${id}`, { 
 *   method: 'PATCH', 
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ status }) 
 * });
 */
export async function updateWithdrawStatus(id: number, status: 'APPROVED' | 'REJECTED'): Promise<void> {
  console.log(`Updating withdraw ${id} to ${status}`);
  await new Promise((resolve) => setTimeout(resolve, 300));
}
