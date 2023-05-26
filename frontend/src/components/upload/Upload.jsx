import React, { useState } from "react";
import "./upload.css";

const Upload = ({setImgPrompt ,handleUpload}) => {
  const [ imageUrl ,setImgUrl ] =useState("")




  return (

      <div className="upload_input_box">
        <input  onChange={(e)=>setImgUrl(e.target.value)} className="image_url_upload_input" type="url" placeholder="https://www.imageurl.com/.." />
      
      </div>
  );
};

export default Upload;
