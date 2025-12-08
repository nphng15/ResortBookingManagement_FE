interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number; isPositive: boolean };
  color?: 'blue' | 'green' | 'orange' | 'purple';
}

const colorClasses = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', trend: 'text-blue-600' },
  green: { bg: 'bg-emerald-50', icon: 'text-emerald-600', trend: 'text-emerald-600' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', trend: 'text-orange-600' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', trend: 'text-purple-600' },
};

export default function StatCard({ title, value, icon: Icon, trend, color = 'blue' }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% so với tháng trước
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}
