import { useState, useCallback } from 'react';
import { submitFeedback, type SubmitFeedbackRequest, type Feedback } from '../services/resortService';
import { getToken } from '../services/authService';

interface UseFeedbackReturn {
  isLoggedIn: boolean;
  submitting: boolean;
  error: string | null;
  submitReview: (data: SubmitFeedbackRequest) => Promise<Feedback | null>;
  clearError: () => void;
}

export const useFeedback = (resortId: number): UseFeedbackReturn => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = !!getToken();

  const submitReview = useCallback(
    async (data: SubmitFeedbackRequest): Promise<Feedback | null> => {
      const token = getToken();
      if (!token) {
        setError('Vui lòng đăng nhập để đánh giá');
        return null;
      }

      setSubmitting(true);
      setError(null);

      try {
        const feedback = await submitFeedback(resortId, data, token);
        return feedback;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Có lỗi xảy ra';
        setError(message);
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [resortId]
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    isLoggedIn,
    submitting,
    error,
    submitReview,
    clearError,
  };
};

export default useFeedback;
