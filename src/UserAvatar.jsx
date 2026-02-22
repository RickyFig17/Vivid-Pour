import React from "react";
import "./UserAvatar.scss";

const UserAvatar = ({ name, size = "40px" }) => {
  const getInitials = (userName) => {
    if (!userName) return "U";
    const names = userName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <div
      className="vivid-avatar"
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        fontSize: `calc(${size} * 0.4)`,
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;
