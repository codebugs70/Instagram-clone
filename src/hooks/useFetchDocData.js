import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function useFetchDocData(collectionName, docId) {
  const [docData, setDocData] = useState({});

  useEffect(() => {
    async function fetchUser() {
      if (!docId) return;

      try {
        const docRef = doc(db, collectionName, docId);
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data();
        if (data) {
          setDocData({ ...data });
        }
      } catch (error) {
        console.error("Error fetching doc data:", error);
      }
    }
    fetchUser();
  }, [collectionName, docId]);

  return { docData };
}
