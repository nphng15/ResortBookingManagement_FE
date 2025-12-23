import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueItem {
  amount: number;
  time: string;
}

interface RevenueChartProps {
  revenues: RevenueItem[];
  year?: number;
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

const processChartData = (revenues: RevenueItem[], year: number): ChartDataPoint[] => {
  // Khởi tạo 12 tháng với giá trị 0
  const monthlyData: Record<number, number> = {};
  for (let i = 1; i <= 12; i++) {
    monthlyData[i] = 0;
  }

  // Tính tổng doanh thu theo tháng trong năm được chọn
  revenues.forEach((r) => {
    const date = new Date(r.time);
    if (date.getFullYear() === year) {
      const month = date.getMonth() + 1;
      monthlyData[month] += r.amount;
    }
  });

  // Convert sang array cho chart
  return Object.entries(monthlyData).map(([month, amount]) => {
    const monthNum = parseInt(month);
    const date = new Date(year, monthNum - 1);
    return {
      month: `T${monthNum}`,
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
        <p className="text-lg font-semibold text-emerald-600">{formatFullCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ revenues, year = new Date().getFullYear() }: RevenueChartProps) {
  const chartData = processChartData(revenues, year);
  const hasData = chartData.some((d) => d.amount > 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-semibold text-gray-900 mb-4">Doanh thu theo tháng - Năm {year}</h2>
      {!hasData ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chưa có dữ liệu doanh thu trong năm {year}
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
