import { useState, useCallback } from 'react';
import { register, registerPartner } from '../services/authService';

export type AccountType = 'customer' | 'partner';

export interface SignupFormData {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone_number: string;
  address: string;
  banking_number: string;
  bank: string;
}

const initialForm: SignupFormData = {
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone_number: '',
  address: '',
  banking_number: '',
  bank: '',
};

export function useSignupForm(onSuccess?: (message: string) => void) {
  const [accountType, setAccountType] = useState<AccountType>('customer');
  const [form, setForm] = useState<SignupFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = useCallback((field: keyof SignupFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    setLoading(true);
    try {
      if (accountType === 'customer') {
        await register({ username: form.username, password: form.password });
        onSuccess?.('Đăng ký thành công! Vui lòng đăng nhập.');
      } else {
        const { confirmPassword, ...partnerData } = form;
        await registerPartner(partnerData);
        onSuccess?.('Đăng ký đối tác thành công! Vui lòng chờ admin duyệt.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  }, [form, accountType, onSuccess]);

  return {
    accountType,
    setAccountType,
    form,
    loading,
    error,
    updateField,
    handleSubmit,
  };
}
