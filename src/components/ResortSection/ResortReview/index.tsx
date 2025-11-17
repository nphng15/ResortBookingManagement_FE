import React, { useState } from "react";

interface CommentData {
  id: number;
  user: { name: string; avatar: string };
  rating: number;
  text: string;
  date: string;
}

const ResortReview: React.FC = () => {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<CommentData[]>([
    {
      id: 1,
      user: { name: "Edward", avatar: "https://i.pravatar.cc/150?img=1" },
      rating: 9.5,
      text:
        "Tôi và gia đình có kỳ nghỉ tuyệt vời tại resort này. Không gian thoáng đãng, phòng ốc sạch sẽ, trang trí tinh tế. Nhân viên thân thiện, phục vụ cực kỳ chuyên nghiệp. Bữa sáng phong phú, đồ ăn ngon. View biển buổi sáng thì quá tuyệt – chỉ muốn ở lại thêm vài ngày nữa.",
      date: "05/11/2025",
    },
    {
      id: 2,
      user: { name: "Rachel", avatar: "https://i.pravatar.cc/150?img=2" },
      rating: 9.0,
      text:
        "Phòng sạch, tiện nghi hiện đại. Hồ bơi vô cực nhìn ra biển xanh rất chill. Dịch vụ đưa đón sân bay nhanh gọn. Mình đặc biệt thích khu spa, không gian yên tĩnh và dễ chịu. Sẽ giới thiệu bạn bè đến trải nghiệm.",
      date: "06/11/2025",
    },
    {
      id: 3,
      user: { name: "William", avatar: "https://i.pravatar.cc/150?img=3" },
      rating: 9.7,
      text:
        "Resort mang lại cảm giác yên bình, gần gũi với thiên nhiên. Bãi biển riêng cực kỳ sạch, buổi tối có thể nghe sóng biển và ngắm sao – thật sự thư giãn. Chỉ có điều menu đồ uống chưa phong phú lắm, hy vọng resort sẽ cải thiện thêm.",
      date: "07/11/2025",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const commentsPerPage = 3;
  const avgRating =
    comments.length > 0
      ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
      : 0;

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const displayed = comments.slice(
    (page - 1) * commentsPerPage,
    page * commentsPerPage
  );

  const handleAddComment = () => {
    if (newComment.trim() === "" || newRating === 0) return;
    const newReview: CommentData = {
      id: comments.length + 1,
      user: { name: "Bạn đọc", avatar: "https://i.pravatar.cc/150?u=new" },
      rating: newRating,
      text: newComment,
      date: new Date().toLocaleDateString("vi-VN"),
    };
    setComments([newReview, ...comments]);
    setNewComment("");
    setNewRating(0);
    setPage(1);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm" />

      <div className="relative z-10 w-[1200px] h-[700px] bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200 flex overflow-hidden">
        {/* Cột trái */}
        <div className="w-1/2 p-10 border-r border-blue-100 bg-gradient-to-br from-blue-50 to-white flex flex-col">
          {/* 1️⃣ Tiêu đề & mô tả */}
          <div>
            <h2 className="text-3xl font-extrabold text-blue-900 mb-3">
              🌴 Chia sẻ cảm nhận của bạn
            </h2>
            <p className="text-blue-700 text-sm">
              Hãy để lại đánh giá chân thật để chúng tôi có thể mang lại trải nghiệm tốt hơn nhé!
            </p>
          </div>
          {/* 3️⃣ Điểm trung bình */}
          <div className="text-center mt-6 mb-6 bg-white/70 rounded-2xl border border-blue-100 py-4 shadow-sm">
            <p className="text-sm text-blue-500 mb-1 font-medium">
              Điểm trung bình hiện tại
            </p>
            <p className="text-4xl font-extrabold text-blue-800">
              {avgRating.toFixed(1)} <span className="text-lg text-gray-500">/ 10</span>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              ({comments.length} lượt đánh giá)
            </p>
          </div>
          {/* 2️⃣ Form đánh giá */}
          <div className="flex flex-col gap-6">
            {/* Điểm đánh giá */}
            <div className="text-center bg-white/70 rounded-2xl border border-blue-100 p-5 shadow-sm pb-3">
            <p className="text-blue-800 font-semibold mb-3 text-sm uppercase tracking-wide">
              Điểm đánh giá của bạn
            </p>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={newRating}
              onChange={(e) => setNewRating(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(
                  to right,
                  ${newRating < 5 ? "#93c5fd" : newRating < 8 ? "#3b82f6" : "#1e3a8a"} ${((newRating - 1) / 9) * 100}%,
                  #e5e7eb ${((newRating - 1) / 9) * 100}%
                )`,
              }}
            />

            <div
              className="mt-3 text-5xl font-bold transition-all duration-300"
              style={{
              color:
              newRating >= 8
                ? "#1e3a8a"
                : newRating >= 5
                ? "#2563eb"
                : "#6b7280",
              }}
            >
              {newRating > 0 ? newRating.toFixed(1) : "–.–"}
              <span className="text-lg text-gray-500 font-medium"> / 10</span>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết cảm nhận của bạn tại đây..."
            className="w-full p-4 border border-blue-100 rounded-2xl bg-white/80 shadow-sm outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 resize-none transition"
            rows={5}
          />

          {/* Nút gửi */}
          <button
            onClick={handleAddComment}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            ✨ Gửi đánh giá
          </button>
        </div>
      </div>

        {/* Cột phải */}
        <div className="w-1/2 p-8 flex flex-col justify-between bg-white/80">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              💬 Đánh giá từ khách hàng
            </h3>
            <div className="space-y-4 h-[480px] flex flex-col justify-start">
              {displayed.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.user.avatar}
                        alt={c.user.name}
                        className="w-10 h-10 rounded-full border border-blue-200 object-cover"
                      />
                      <div>
                        <p className="font-semibold text-blue-900">
                          {c.user.name}
                        </p>
                        <p className="text-xs text-gray-500">{c.date}</p>
                      </div>
                    </div>
                    <div className="text-blue-700 font-semibold text-lg">
                      {c.rating.toFixed(1)} / 10
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-5 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-5 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 disabled:opacity-40 transition-all"
              >
                ← Trước
              </button>
              <div className="px-4 py-2 bg-white border border-blue-200 rounded-xl shadow-sm text-blue-800 font-medium">
                Trang {page} / {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-5 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 disabled:opacity-40 transition-all"
              >
                Sau →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResortReview;
