import React, { useState, useEffect } from "react";
import { getResortFeedbacks, type Feedback } from "../../../services/resortService";
import { useFeedback } from "../../../hooks/useFeedback";

interface CommentData {
  id: number;
  user: { name: string; avatar: string };
  rating: number;
  text: string;
  date: string;
}

const StarRating: React.FC<{
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}> = ({ rating, onRate, readonly = false, size = "md" }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          className={`${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition-transform duration-150`}
        >
          <svg
            className={`${sizeClasses[size]} transition-colors duration-150`}
            fill={(hoverRating || rating) >= star ? "#fbbf24" : "#e5e7eb"}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

interface ResortReviewProps {
  resortId: number;
}

const ResortReview: React.FC<ResortReviewProps> = ({ resortId }) => {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const { isLoggedIn, submitting, error, submitReview, clearError } = useFeedback(resortId);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const feedbacks = await getResortFeedbacks(resortId);
        const mapped: CommentData[] = feedbacks.map((fb: Feedback) => ({
          id: fb.id,
          user: { 
            name: `Khách hàng #${fb.customer_id}`, 
            avatar: `https://i.pravatar.cc/150?u=${fb.customer_id}` 
          },
          rating: fb.rating,
          text: fb.comment,
          date: new Date(fb.created_at).toLocaleDateString("vi-VN"),
        }));
        setComments(mapped);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [resortId]);

  const commentsPerPage = 4;
  const avgRating =
    comments.length > 0
      ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
      : 0;

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (page - 1) * commentsPerPage;
  const displayed = comments.slice(startIndex, startIndex + commentsPerPage);

  const handleAddComment = async () => {
    if (newComment.trim() === "" || newRating === 0) return;

    const feedback = await submitReview({
      rating: newRating,
      comment: newComment.trim(),
    });

    if (feedback) {
      const newReview: CommentData = {
        id: feedback.id,
        user: { 
          name: `Khách hàng #${feedback.customer_id}`, 
          avatar: `https://i.pravatar.cc/150?u=${feedback.customer_id}` 
        },
        rating: feedback.rating,
        text: feedback.comment,
        date: new Date(feedback.created_at).toLocaleDateString("vi-VN"),
      };
      setComments([newReview, ...comments]);
      setNewComment("");
      setNewRating(0);
      setPage(1);
      clearError();
    }
  };

  const renderReviewForm = () => {
    if (!isLoggedIn) {
      return (
        <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
          <p className="text-yellow-700 text-center">
            🔒 Vui lòng <a href="/auth" className="text-blue-600 underline font-medium">đăng nhập</a> để đánh giá resort này
          </p>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100 sticky top-4">
        <h4 className="font-semibold text-gray-900 mb-4">
          ✨ Viết đánh giá của bạn
        </h4>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-2">Đánh giá</p>
          <div className="flex items-center gap-3">
            <StarRating rating={newRating} onRate={setNewRating} size="lg" />
            <span className="text-xl font-bold text-amber-500">
              {newRating > 0 ? `${newRating}/5` : "–/5"}
            </span>
          </div>
        </div>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn..."
          className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none text-sm"
          rows={4}
          disabled={submitting}
        />

        <button
          onClick={handleAddComment}
          disabled={!newComment.trim() || newRating === 0 || submitting}
          className="w-full mt-3 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-4">Đang tải đánh giá...</div>;
  }

  return (
    <div className="w-full">
      {/* Header với điểm trung bình */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-gray-900">
              {avgRating.toFixed(1)}
            </span>
            <div>
              <StarRating rating={Math.round(avgRating)} readonly size="md" />
              <p className="text-gray-500 text-sm">{comments.length} đánh giá</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[300px]">
        {/* Danh sách đánh giá */}
        <div className="lg:col-span-3 flex flex-col">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Chưa có đánh giá nào</p>
          ) : (
            <>
              <div className="flex-1 space-y-4">
                {displayed.map((c) => (
                  <div
                    key={c.id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.user.avatar}
                          alt={c.user.name}
                          className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{c.user.name}</p>
                          <p className="text-xs text-gray-500">{c.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                        <StarRating rating={c.rating} readonly size="sm" />
                        <span className="text-amber-500 font-semibold text-sm">
                          {c.rating}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-4">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        page === p
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Form đánh giá */}
        <div className="lg:col-span-2">
          {renderReviewForm()}
        </div>
      </div>
    </div>
  );
};

export default ResortReview;
