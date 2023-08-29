import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/features/userSlice";
import { auth, db } from "../utils/firebase";
/* ====================================================== */

const AuthContext = createContext();

function AuthProvider(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );

        const snapshot = await getDocs(userDocRef);
        snapshot.forEach((docRef) => {
          const data = docRef.data();
          if (data) {
            dispatch(setCurrentUser({ ...data }));
            setLoading(false);
          }
        });
      } else {
        navigate("/sign-up");
      }
    });
  }, [dispatch, navigate]);

  const value = { loading, setLoading };

  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { useAuth, AuthProvider };
