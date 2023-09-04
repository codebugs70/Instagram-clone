import React from "react";
import UserItem, { UserItemSkeleton } from "../modules/user/UserItem";
import useFetchCollection from "../hooks/useFetchCollection";
import { v4 } from "uuid";
import useHandleChange from "../hooks/useHandleChange";
/* ====================================================== */

const Search = () => {
  const { data: users, isLoading } = useFetchCollection("users");
  const { value, onChangeVal } = useHandleChange();

  // Search user
  const filteredUser = users.filter((item) =>
    item.username.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <section>
      <div className="w-full">
        <input
          value={value}
          type="text"
          onChange={onChangeVal}
          className="w-full p-4 bg-blue-500 rounded-md bg-opacity-10 dark:bg-SlateGray"
          placeholder="Search..."
        />
      </div>

      <ul className="flex flex-col gap-5 mt-5">
        {isLoading &&
          Array(10)
            .fill(0)
            .map(() => <UserItemSkeleton key={v4()} />)}

        {!isLoading &&
          filteredUser.length > 0 &&
          filteredUser.map((user) => (
            <UserItem key={user.userId} data={user} />
          ))}
      </ul>
    </section>
  );
};

export default Search;
