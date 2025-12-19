import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getCurrentUser, getToken } from '../../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized' | 'forbidden'>('loading');
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        setStatus('unauthorized');
        return;
      }

      try {
        const user = await getCurrentUser();
        const hasRole = allowedRoles.some(role => user.roles.includes(role));
        setStatus(hasRole ? 'authorized' : 'forbidden');
      } catch (error) {
        // 401 - token hết hạn hoặc không hợp lệ
        setStatus('unauthorized');
      }
    };

    checkAuth();
  }, [allowedRoles]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status === 'unauthorized') {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (status === 'forbidden') {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
}
