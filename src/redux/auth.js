import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { setCurrentUser } from "./features/userSlice";

export const initAuth = (dispatch) => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDocRef = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const snapshot = await getDocs(userDocRef);
      snapshot.forEach((docRef) => {
        const data = docRef.data();
        if (data) {
          dispatch(
            setCurrentUser({
              ...data,
            })
          );
        }
      });
    } else {
      console.log("no user");
    }
  });

  return unsubscribe;
};
