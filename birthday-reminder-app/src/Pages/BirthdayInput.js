import React, { useContext } from "react";
import ImgContext from "../context/ImgContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import CancelButton from "../Components/CancelButton";
import Logout from "../Components/Logout";
import BirthdayIcon from "../Components/BirthdayIcon";
import { useEffect } from "react";

function BirthdayInput() {
  const {
    file,
    setFile,
    inputData,
    setInputData,
    downloadPercentage,
    setDownloadPercentage,
  } = useContext(ImgContext);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setDownloadPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInputData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(inputData);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setInputData({ ...inputData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = uuidv4();
    try {
      await setDoc(doc(db, "users", id), {
        ...inputData,
        id,
        timeStamp: serverTimestamp(),
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }

    setFile(null);
    setInputData({ ...inputData, name: "", birthday: "" });
  };

  return (
    <>
      <CancelButton />
      <Logout />
      <BirthdayIcon />
      <form className="formData" onSubmit={handleSubmit}>
        <div className="btn"></div>
        <div className="inpfile">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={inputData.name}
            onChange={handleChange}
          />
        </div>
        <div className="inpfile">
          <label htmlFor="photo">Upload a photo</label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="inpfile">
          <label htmlFor="birthday">Select date</label>
          <input
            id="birthday"
            type="date"
            value={inputData.birthday}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={downloadPercentage !== null && downloadPercentage < 100}
          className="submitBtn"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default BirthdayInput;
