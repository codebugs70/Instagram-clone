import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase";
/* ====================================================== */

export default function useFetchCollection(collectionName) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, collectionName);
    const queryRef = query(colRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          ...doc.data(),
        });
      });
      setData(results);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { data, isLoading };
}
