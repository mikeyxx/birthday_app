import React, { useState } from "react";
import ImgContext from "./ImgContext";

function BirthdayState({ children }) {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    birthday: "",
  });
  const [downloadPercentage, setDownloadPercentage] = useState(null);
  const [flag, setFlag] = useState(false);

  return (
    <ImgContext.Provider
      value={{
        data,
        setData,
        inputData,
        setInputData,
        file,
        setFile,
        flag,
        setFlag,
        downloadPercentage,
        setDownloadPercentage,
      }}
    >
      {children}
    </ImgContext.Provider>
  );
}

export default BirthdayState;
