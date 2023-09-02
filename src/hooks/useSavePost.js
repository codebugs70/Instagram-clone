import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../utils/firebase";
/* ====================================================== */

const useSavePost = (postId) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      if (!currentUser?.userId || !postId) return;
      const saveDocRef = doc(db, "posts", postId, "saves", currentUser?.userId);
      const saveDocSnap = await getDoc(saveDocRef);
      setIsSaved(saveDocSnap.exists());
    }
    fetchStatus();
  }, [currentUser.userId, postId]);

  const handleSavePost = async () => {
    if (!currentUser || !postId) return;
    const saveDocRef = doc(db, "posts", postId, "saves", currentUser.userId);
    const userSaveDocRef = doc(
      db,
      "users",
      currentUser.userId,
      "saves",
      postId
    );

    const [saveDocSnap, userSaveDocSnap] = await Promise.all([
      getDoc(saveDocRef),
      getDoc(userSaveDocRef),
    ]);

    const batch = writeBatch(db);

    if (saveDocSnap.exists() && userSaveDocSnap.exists()) {
      batch.delete(saveDocRef);
      batch.delete(userSaveDocRef);
      setIsSaved(false);
    } else {
      const timestamp = serverTimestamp();
      batch.set(saveDocRef, {
        userId: currentUser.userId,
        createdAt: timestamp,
        isSaved: true,
      });
      batch.set(userSaveDocRef, {
        postId: postId,
        createdAt: timestamp,
        isSaved: true,
      });
      setIsSaved(true);
    }

    await batch.commit();
  };

  return { isSaved, handleSavePost };
};

export default useSavePost;
