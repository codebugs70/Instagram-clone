import React from "react";
import Button from "../../components/button/Button";
import UserAvatar from "./UserAvatar";

const UserItem = () => {
  return (
    <li className="flex items-center justify-between gap-3 transition-all rounded-md cursor-pointer ">
      <div className="flex items-center gap-3">
        <UserAvatar size="md" avatar={"https://source.unsplash.com/random"} />
        <span className="text-sm font-semibold">Codebugs</span>
      </div>
      <Button className="text-xs " size="small" variant="secondary">
        Follow
      </Button>
    </li>
  );
};

export default UserItem;
