import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BalanceMovement {
  date: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface WithdrawalChartProps {
  withdrawals: BalanceMovement[];
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`;
  }
  return value.toLocaleString('vi-VN');
};

const formatFullCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

interface ChartDataPoint {
  month: string;
  amount: number;
  fullMonth: string;
}

const processChartData = (withdrawals: BalanceMovement[]): ChartDataPoint[] => {
  // Only count APPROVED withdrawals
  const approvedWithdrawals = withdrawals.filter((w) => w.status === 'APPROVED');

  // Group by month
  const monthlyData: Record<string, number> = {};

  approvedWithdrawals.forEach((w) => {
    const date = new Date(w.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + w.amount;
  });

  // Sort by month and convert to array
  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => {
      const [year, m] = month.split('-');
      const date = new Date(parseInt(year), parseInt(m) - 1);
      return {
        month: date.toLocaleDateString('vi-VN', { month: 'short' }),
        fullMonth: date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }),
        amount,
      };
    });
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: ChartDataPoint }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm text-gray-500">{payload[0].payload.fullMonth}</p>
        <p className="text-lg font-semibold text-orange-600">{formatFullCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function WithdrawalChart({ withdrawals }: WithdrawalChartProps) {
  const chartData = processChartData(withdrawals);

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Thống kê rút tiền theo tháng</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chưa có dữ liệu rút tiền
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-semibold text-gray-900 mb-4">Thống kê rút tiền đã duyệt theo tháng</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWithdraw" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={2} fill="url(#colorWithdraw)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
