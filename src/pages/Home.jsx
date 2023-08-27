import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const Signout = () => {
    signOut(auth);
    navigate("/sign-up");
  };

  return (
    <div className="p-5">
      <h1>{currentUser.username}</h1>
      <div className="w-[40px] h-[40px]">
        <img src={currentUser.photoURL} alt="" className="img-cover" />
      </div>

      <Button onClick={Signout} className="mt-5">
        Sign out
      </Button>
    </div>
  );
};

export default Home;
