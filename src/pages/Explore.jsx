import React from "react";
import PostPreviewItem from "../modules/post/PostPreviewItem";

const Explore = () => {
  return (
    <section>
      <ul className="grid grid-cols-3 gap-1">
        {Array(6)
          .fill(0)
          .map((item, index) => (
            <PostPreviewItem key={index} />
          ))}
      </ul>
    </section>
  );
};

export default Explore;
