import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
/* ====================================================== */

export default function useUploadImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = (file) => {
    setLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, "pictures/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("paused");
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        setImages([]);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImages((prev) => [...prev, downloadURL]);
          setLoading(false);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    fileArray.forEach((file) => handleUploadImage(file));
  };

  return {
    images,
    setImages,
    loading,
    handleSelectImage,
  };
}
