import { useState, useCallback } from 'react';
import { register, registerPartner } from '../services/authService';

export type AccountType = 'customer' | 'partner';

export interface SignupFormData {
  username: string;
  password: string;
  confirmPassword: string;
  // Customer fields
  fullname: string;
  email: string;
  phone_number: string;
  id_number: string;
  // Partner fields
  name: string;
  address: string;
  banking_number: string;
  bank: string;
}

export interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  fullname?: string;
  email?: string;
  phone_number?: string;
  id_number?: string;
  name?: string;
  address?: string;
  banking_number?: string;
  bank?: string;
}

const initialForm: SignupFormData = {
  username: '',
  password: '',
  confirmPassword: '',
  fullname: '',
  email: '',
  phone_number: '',
  id_number: '',
  name: '',
  address: '',
  banking_number: '',
  bank: '',
};

// Validation helpers
const validateEmail = (email: string): string | null => {
  if (!email) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email không hợp lệ';
  return null;
};

const validatePhone = (phone: string): string | null => {
  if (!phone) return null;
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Số điện thoại không hợp lệ';
  return null;
};

const validateIdNumber = (idNumber: string): string | null => {
  if (!idNumber) return null;
  if (!/^[0-9]{12}$/.test(idNumber)) return 'CCCD phải có đúng 12 số';
  return null;
};

const validateFullname = (name: string): string | null => {
  if (!name) return null;
  if (name.length < 2) return 'Họ tên phải có ít nhất 2 ký tự';
  if (name.length > 100) return 'Họ tên không được quá 100 ký tự';
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!nameRegex.test(name)) return 'Họ tên không được chứa số hoặc ký tự đặc biệt';
  return null;
};

export function useSignupForm(onSuccess?: (message: string) => void) {
  const [accountType, setAccountType] = useState<AccountType>('customer');
  const [form, setForm] = useState<SignupFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  const updateField = useCallback((field: keyof SignupFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user types
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [fieldErrors]);

  const validateCustomerForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    if (!form.username.trim()) errors.username = 'Vui lòng nhập tên đăng nhập';
    else if (form.username.length < 3) errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';

    if (!form.password) errors.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 6) errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';

    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Mật khẩu không khớp';

    const fullnameError = validateFullname(form.fullname);
    if (fullnameError) errors.fullname = fullnameError;

    const emailError = validateEmail(form.email);
    if (emailError) errors.email = emailError;

    const phoneError = validatePhone(form.phone_number);
    if (phoneError) errors.phone_number = phoneError;

    const idError = validateIdNumber(form.id_number);
    if (idError) errors.id_number = idError;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  const validatePartnerForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    if (!form.username.trim()) errors.username = 'Vui lòng nhập tên đăng nhập';
    else if (form.username.length < 3) errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';

    if (!form.password) errors.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 6) errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';

    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Mật khẩu không khớp';

    if (!form.name.trim()) errors.name = 'Vui lòng nhập tên doanh nghiệp';

    const phoneError = validatePhone(form.phone_number);
    if (phoneError) errors.phone_number = phoneError;

    if (form.banking_number && !/^[0-9]{6,20}$/.test(form.banking_number)) {
      errors.banking_number = 'Số tài khoản không hợp lệ';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      // Validate based on account type
      const isValid = accountType === 'customer' ? validateCustomerForm() : validatePartnerForm();
      if (!isValid) return;

      setLoading(true);
      try {
        if (accountType === 'customer') {
          await register({
            username: form.username,
            password: form.password,
            fullname: form.fullname || undefined,
            email: form.email || undefined,
            phone_number: form.phone_number || undefined,
            id_number: form.id_number || undefined,
          });
          onSuccess?.('Đăng ký thành công! Vui lòng đăng nhập.');
        } else {
          await registerPartner({
            username: form.username,
            password: form.password,
            name: form.name,
            phone_number: form.phone_number,
            address: form.address,
            banking_number: form.banking_number,
            bank: form.bank,
          });
          onSuccess?.('Đăng ký đối tác thành công! Vui lòng chờ admin duyệt.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đăng ký thất bại');
      } finally {
        setLoading(false);
      }
    },
    [form, accountType, onSuccess, validateCustomerForm, validatePartnerForm]
  );

  return {
    accountType,
    setAccountType,
    form,
    loading,
    error,
    fieldErrors,
    updateField,
    handleSubmit,
  };
}
