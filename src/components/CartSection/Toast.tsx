import { CheckCircle, XCircle, X } from 'lucide-react';
import type { ToastState } from '../../hooks/useCart';

interface ToastProps {
  toast: ToastState;
  onClose: () => void;
}

function Toast({ toast, onClose }: ToastProps) {
  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${
        toast.type === 'error' 
          ? 'bg-red-50 border border-red-200 text-red-700' 
          : 'bg-green-50 border border-green-200 text-green-700'
      }`}>
        {toast.type === 'error' ? (
          <XCircle size={20} className="text-red-500 flex-shrink-0" />
        ) : (
          <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
        )}
        <span className="text-sm font-medium">{toast.message}</span>
        <button 
          onClick={onClose}
          className="ml-2 p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
