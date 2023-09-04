import React from "react";
import Button from "../../components/button/Button";
import UserItem, { UserItemSkeleton } from "../../modules/user/UserItem";
import useFetchCollection from "../../hooks/useFetchCollection";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
/* ====================================================== */

const RightSidebar = () => {
  const { data: users, isLoading } = useFetchCollection("users");

  return (
    <section className="w-[320px] bg-white h-fit dark:bg-black sticky top-10 py-4 px-2 shadow-md rounded-sm">
      <h1 className="text-lg font-semibold text-text_3">Suggested for you</h1>

      <ul className="flex flex-col gap-5 mt-5">
        {isLoading &&
          Array(6)
            .fill(0)
            .map(() => <UserItemSkeleton key={v4()} />)}

        {!isLoading && users.map((user) => <UserItem key={v4()} data={user} />)}
      </ul>

      <Link to="/search">
        <Button className="w-full mt-5" size="normal" variant="primary">
          See more
        </Button>
      </Link>

      <div className="mt-5 text-xs text-slate-500">
        <p className="leading-relaxed ">
          About. Help. Press API. Jobs. Privacy Terms. Locations. Language
          English. Meta Verified
        </p>
        <span className="inline-block mt-5">© 2023 INSTAGRAM FROM META</span>
      </div>
    </section>
  );
};

export default RightSidebar;
