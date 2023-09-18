import React from "react";
import { useSelector } from "react-redux";
import PostItem, { PostItemSkeleton } from "../modules/post/PostItem";
import useFetchCollection from "../hooks/useFetchCollection";
import { v4 } from "uuid";
/* ====================================================== */

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data: posts, isLoading } = useFetchCollection("posts");
  // console.log(currentUser);

  return (
    <main className="w-full max-w-3xl lg:max-w-[470px] mx-auto pb-20 md:pb-0">
      <ul className="flex flex-col gap-5 px-2 md:px-5 lg:px-0">
        {isLoading &&
          Array(6)
            .fill(0)
            .map(() => <PostItemSkeleton key={v4()} />)}

        {!isLoading &&
          posts.length > 0 &&
          posts.map((post) => <PostItem key={v4()} data={post} />)}
      </ul>
    </main>
  );
};

export default Home;
