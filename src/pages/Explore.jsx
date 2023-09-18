import React from "react";
import PostPreviewItem, {
  PostPreviewItemSkeleton,
} from "../modules/post/PostPreviewItem";
import useFetchCollection from "../hooks/useFetchCollection";
import { v4 } from "uuid";

const Explore = () => {
  const { data: posts, isLoading } = useFetchCollection("posts");

  return (
    <section>
      <ul className="grid grid-cols-2 gap-1 px-3 md:px-6 md:grid-cols-3 xl:px-0">
        {isLoading &&
          Array(9)
            .fill(0)
            .map(() => <PostPreviewItemSkeleton key={v4()} />)}

        {!isLoading &&
          posts.length > 0 &&
          posts.map((post) => <PostPreviewItem key={v4()} data={post} />)}
      </ul>
    </section>
  );
};

export default Explore;
