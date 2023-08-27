import { useDispatch } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import { setCurrentUser } from "./redux/features/userSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./utils/firebase";
/* ====================================================== */
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Home = lazy(() => import("./pages/Home"));
/* ====================================================== */

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          }
        });
      } else {
        navigate("/sign-up");
      }
    });
  }, [dispatch, navigate]);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <span className="loadingSpin"></span>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </Suspense>
  );
}

export default App;
