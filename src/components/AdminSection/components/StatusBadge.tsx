interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  ACTIVE: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Hoạt động' },
  INACTIVE: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Không hoạt động' },
  BLOCKED: { bg: 'bg-red-100', text: 'text-red-700', label: 'Đã khóa' },
  PENDING: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Chờ duyệt' },
  APPROVED: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Đã duyệt' },
  REJECTED: { bg: 'bg-red-100', text: 'text-red-700', label: 'Từ chối' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
