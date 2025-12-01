import React from "react";

interface UserInfoProps {
  name: string;
  avatar: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, avatar }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-sm"
      />
      <span className="font-semibold text-blue-900">{name}</span>
    </div>
  );
};

export default UserInfo;
