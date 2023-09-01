import slugify from "slugify";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
/* ====================================================== */

const GoogleLogin = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  // Login with google
  const googleLogin = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const data = results.user;
      const userId = auth.currentUser.uid;

      if (data) {
        const userDocRef = doc(db, "users", userId);
        await setDoc(userDocRef, {
          userId: data.uid,
          username: data.displayName,
          slug: slugify(data.displayName, { lower: true }),
          email: data.email,
          photoURL: data.photoURL,
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Welcome to instagram !", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
        pauseOnHover: false,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={googleLogin}
      className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-SlateGray border-text_3"
    >
      <span className="text-2xl">
        <FcGoogle />
      </span>
      <p>Login with google</p>
    </div>
  );
};

export default GoogleLogin;
