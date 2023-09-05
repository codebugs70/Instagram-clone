import React from "react";
import Button from "./Button";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import useFetchSubCollection from "../../hooks/useFetchSubCollection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase";
/* ====================================================== */

const ButtonFollow = ({ uid }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const { data: followingList } = useFetchSubCollection(
    "users",
    currentUser?.userId,
    "following"
  );

  // Handle follow a user
  const followUser = async (uid, currentUID) => {
    const followingDocRef = doc(db, "users", currentUID, "following", uid);
    const followersDocRef = doc(db, "users", uid, "followers", currentUID);
    await Promise.all([
      setDoc(followingDocRef, {
        userId: uid,
        createdAt: serverTimestamp(),
      }),
      setDoc(followersDocRef, {
        userId: currentUID,
        createdAt: serverTimestamp(),
      }),
    ]);
  };

  // Handle unfollow a user
  const unfollowUser = async (uid, currentUID) => {
    const followingDocRef = doc(db, "users", currentUID, "following", uid);
    const followersDocRef = doc(db, "users", uid, "followers", currentUID);
    await Promise.all([deleteDoc(followingDocRef), deleteDoc(followersDocRef)]);
  };

  // Toggle follow a user
  const toggleFollow = async (uid) => {
    if (!currentUser.userId) {
      navigate("/sign-in");
    }

    try {
      const followingDocRef = doc(
        db,
        "users",
        currentUser?.userId,
        "following",
        uid
      );
      const followingDocSnap = await getDoc(followingDocRef);
      if (followingDocSnap.exists()) {
        await unfollowUser(uid, currentUser?.userId);
      } else {
        await followUser(uid, currentUser?.userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {followingList.some((item) => item.userId === uid) ? (
        <Button
          onClick={() => toggleFollow(uid)}
          className="text-xs "
          size="small"
          variant="bordered"
        >
          Following
        </Button>
      ) : (
        <Button
          onClick={() => toggleFollow(uid)}
          className="text-xs "
          size="small"
          variant="secondary"
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default ButtonFollow;
