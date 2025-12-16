import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../services/authService';

export function useLoginForm(onSuccess?: () => void) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = useCallback((field: 'username' | 'password', value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form);
      onSuccess?.();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  }, [form, navigate, onSuccess]);

  return {
    form,
    loading,
    error,
    updateField,
    handleSubmit,
  };
}
