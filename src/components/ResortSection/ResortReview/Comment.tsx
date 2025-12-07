import React from "react";
import UserInfo from "./UserInfo";

export interface CommentData {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  text: string;
  date: string;
}

interface CommentProps {
  comment: CommentData;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <UserInfo name={comment.user.name} avatar={comment.user.avatar} />
        <span className="text-yellow-500 font-semibold">
          {"⭐".repeat(comment.rating)}
        </span>
      </div>
      <p className="text-gray-700 mt-2 leading-relaxed">{comment.text}</p>
      <p className="text-sm text-gray-400 mt-2">{comment.date}</p>
    </div>
  );
};

export default Comment;
