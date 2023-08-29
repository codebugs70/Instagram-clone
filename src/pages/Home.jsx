import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostItem from "../modules/post/PostItem";
/* ====================================================== */

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  // const Signout = () => {
  //   signOut(auth);
  //   navigate("/sign-up");
  // };

  return (
    <main className="w-full max-w-[470px] mx-auto">
      <ul className="flex flex-col gap-5">
        {Array(5)
          .fill(0)
          .map((item, index) => (
            <PostItem key={index} />
          ))}
      </ul>
    </main>
  );
};

export default Home;
