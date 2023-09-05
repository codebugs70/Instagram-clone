import UserAvatar from "./UserAvatar";
import Skeleton from "../../components/loading/Skeleton";
import React from "react";
import ButtonFollow from "../../components/button/ButtonFollow";
import { Link } from "react-router-dom";
/* ====================================================== */

const UserItem = ({ data }) => {
  return (
    <li className="flex items-center justify-between gap-3 transition-all rounded-md cursor-pointer ">
      <div className="flex items-center gap-3">
        <UserAvatar size="md" avatar={data?.photoURL} />
        <Link to={`/${data?.slug}`} className="text-sm font-semibold">
          {data?.username}
        </Link>
      </div>
      <ButtonFollow uid={data?.userId} />
    </li>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center justify-between gap-3 transition-all rounded-md cursor-pointer ">
      <div className="flex items-center gap-3">
        <Skeleton className="w-[44px] h-[44px] rounded-full"></Skeleton>
        <Skeleton className="w-[90px] h-[30px] rounded-md"></Skeleton>
      </div>
      <Skeleton className="w-[70px] h-[32px] rounded-lg"></Skeleton>
    </li>
  );
};

export default UserItem;
