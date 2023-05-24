import React from "react";
import "./file.css";
import { GoFile } from "react-icons/go";

const File = ({uploaded,file}) => {
  return (
    <div className="File">
      <div className="iconBox">
        <GoFile className="fileIcon" />
      </div>
      <div className="progressBox">
        <p className="fileName">{file?.name}</p>
        <div className="progressContainer">
          <div className="progressBar_proto">
            <div className="progressBar" style={{width:`${uploaded}%`}}></div>
          </div>
          <p className="progressCount">{uploaded}%</p>
        </div>
      </div>
    </div>
  );
};

export default File;
