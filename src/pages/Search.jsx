import React from "react";
import UserItem from "../modules/user/UserItem";

const Search = () => {
  return (
    <section>
      <div className="w-full">
        <input
          type="text"
          className="w-full p-4 bg-blue-500 rounded-md bg-opacity-10 dark:bg-SlateGray"
          placeholder="Search..."
        />
      </div>

      <ul className="flex flex-col gap-5 mt-5">
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <UserItem key={index} />
          ))}
      </ul>
    </section>
  );
};

export default Search;
