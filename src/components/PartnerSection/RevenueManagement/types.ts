export interface PartnerStatistics {
  new_bookings_today: number;
  monthly_revenue: number;
  total_bookings: number;
  current_balance: number;
  balance_movements: {
    revenues: BalanceMovement[];
    withdrawals: BalanceMovement[];
  };
}

export interface BalanceMovement {
  id: number;
  amount: number;
  date: string;
  description?: string;
  status?: string;
}
