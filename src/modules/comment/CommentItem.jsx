import React from "react";
import UserAvatar from "../user/UserAvatar";
import Skeleton from "../../components/loading/Skeleton";
import useQuerySnapshot from "../../hooks/useQuerySnapshot";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import PopupCmt from "../modal/PopupCmt";
import useToggle from "../../hooks/useToggle";
import { useSelector } from "react-redux";
import { formatDateTime } from "../../utils";

const CommentItem = ({ data }) => {
  const { data: userData } = useQuerySnapshot("users", "userId", data?.userId);
  const { currentUser } = useSelector((state) => state.user);
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();
  const date = formatDateTime(data?.createdAt);

  if (!userData || !data) return;
  return (
    <>
      <li className="flex items-start w-full gap-3 p-3 hover:bg-PaleGray dark:hover:bg-white dark:hover:bg-opacity-5">
        <UserAvatar size="sm" avatar={userData?.photoURL} />
        <div>
          <div className="flex items-center gap-2">
            <Link
              to={`/${userData.slug}`}
              className="mb-1 font-semibold cursor-pointer hover:text-ElectricBlue text-BlueForst"
            >
              {userData?.username}
            </Link>
            <span className="text-sm text-MidnightSlate dark:text-slate-300">
              {date}
            </span>
          </div>

          <p className="w-full max-w-md text-sm font-normal break-all text-MidnightSlate dark:text-slate-200">
            {data?.comment}
          </p>

          {currentUser?.userId === data?.userId && (
            <div
              onClick={handleShowModal}
              className="mt-1 text-sm cursor-pointer text-MidnightSlate dark:text-white hover:text-BlueForst"
            >
              <BsThreeDots />
            </div>
          )}
        </div>
      </li>

      <PopupCmt cmtData={data} isOpen={showModal} onClose={handleShowModal} />
    </>
  );
};

export const CommentItemSkeleton = () => {
  return (
    <li className="flex items-start w-full gap-3 p-3">
      <Skeleton className="w-[40px] h-[40px] rounded-full flex-shrink-0"></Skeleton>
      <div className="w-full">
        <Skeleton className="h-[25px] w-full rounded-sm"></Skeleton>
        <Skeleton className="h-[18px] mt-1 w-[250px] rounded-sm"></Skeleton>
      </div>
    </li>
  );
};

export default CommentItem;
