import React from "react";
import UserAvatar from "../user/UserAvatar";
import Skeleton from "../../components/loading/Skeleton";

const CommentItem = () => {
  return (
    <li className="flex items-start gap-3">
      <UserAvatar size="sm" avatar={"https://source.unsplash.com/random"} />
      <div>
        <h1 className="mb-1 font-semibold hover:text-ElectricBlue text-BlueForst">
          Codebugs
        </h1>
        <span className="text-sm font-normal text-MidnightSlate dark:text-slate-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          necessitatibus inventore neque quaerat error perspiciatis, vero hic
          fugit laboriosam
        </span>
      </div>
    </li>
  );
};

export const CommentItemSkeleton = () => {
  return (
    <li className="flex items-start gap-3">
      <Skeleton className="w-[37px] h-[37px] rounded-full"></Skeleton>
      <div>
        <Skeleton className="h-[16px] w-[32px]"></Skeleton>
        <Skeleton className="w-full h-[55px]"></Skeleton>
      </div>
    </li>
  );
};

export default CommentItem;
