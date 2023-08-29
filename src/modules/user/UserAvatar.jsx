import React from "react";
import PropTypes from "prop-types";

const UserAvatar = ({ avatar, className = "", size = "" }) => {
  let avatarSize = "";
  switch (size) {
    case "xs":
      avatarSize = "w-[30px] h-[30px]";
      break;
    case "sm":
      avatarSize = "w-[37px] h-[37px]";
      break;
    case "md":
      avatarSize = "w-[44px] h-[44px]";
      break;
    case "lg":
      avatarSize = "w-[150px] h-[150px]";
      break;

    default:
      avatarSize = "w-[35px] h-[35px]";
      break;
  }

  return (
    <div className={`${className} ${avatarSize} flex-shrink-0`}>
      <img src={avatar} className="rounded-full img-cover" alt="user-avatar" />
    </div>
  );
};

UserAvatar.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
};

export default UserAvatar;
