interface ActionButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'success' | 'danger' | 'ghost';
  children: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export default function ActionButton({ onClick, variant = 'ghost', children, disabled = false, size = 'sm' }: ActionButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
  };

  const variantClasses = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
