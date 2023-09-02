import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetchSubCollection from "./useFetchSubCollection";
import { db } from "../utils/firebase";
/* ====================================================== */

const useLikePost = (postId) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const { data: likeCount } = useFetchSubCollection("posts", postId, "likes");

  useEffect(() => {
    async function fetchStatus() {
      if (!currentUser?.userId || !postId) return;
      const likeDocRef = doc(db, "posts", postId, "likes", currentUser?.userId);
      const likeDocSnap = await getDoc(likeDocRef);
      setIsLiked(likeDocSnap.exists());
    }
    fetchStatus();
  }, [currentUser.userId, postId]);

  const handleLikePost = async () => {
    if (!currentUser || !postId) return;
    const likeDocRef = doc(db, "posts", postId, "likes", currentUser.userId);
    const likeDocSnap = await getDoc(likeDocRef);

    if (likeDocSnap.exists()) {
      await deleteDoc(likeDocRef);
      setIsLiked(false);
    } else {
      await setDoc(likeDocRef, {
        userId: currentUser.userId,
        createdAt: serverTimestamp(),
        isLiked: true,
      });
      setIsLiked(true);
    }
  };

  return { isLiked, likeCount, handleLikePost };
};

export default useLikePost;
