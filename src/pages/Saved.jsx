import React, { useState } from "react";
import useFetchSubCollection from "../hooks/useFetchSubCollection";
import { useSelector } from "react-redux";
import PostPreviewItem, {
  PostPreviewItemSkeleton,
} from "../modules/post/PostPreviewItem";
import { v4 } from "uuid";
import useFetchCollection from "../hooks/useFetchCollection";
/* ====================================================== */

const Saved = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data: posts } = useFetchCollection("posts");
  const { data } = useFetchSubCollection("users", currentUser?.userId, "saves");

  const savePosts = posts.filter((post) =>
    data.some((item) => item.postId === post.postId)
  );

  return (
    <section>
      <ul className="grid grid-cols-3 gap-1">
        {savePosts.length > 0 &&
          savePosts.map((post) => <PostPreviewItem key={v4()} data={post} />)}
      </ul>
    </section>
  );
};

export default Saved;
