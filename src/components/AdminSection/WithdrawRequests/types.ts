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
}
