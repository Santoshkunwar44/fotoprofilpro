import React, { useRef, useState } from "react";
import "./card.css";
import { Link, useToast } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
} from '@chakra-ui/react'
import Upload from "./upload/Upload";
import {BsFillCloudCheckFill} from "react-icons/bs"
import {useDispatch, useSelector } from "react-redux"
import {bindActionCreators} from "redux"
import File from "./file/File";
import { actionCreators } from "../redux/store";
import {useNavigate} from "react-router-dom"
import { ImageService as ImageServiceClass } from "../utils/services/ImageService";

const Card = () => {

  const [uploadProgress,setUploadProgress]  =useState(0);
  const fileRef = useRef()
  const dispatch = useDispatch()
  const [creatingImagine,setCreatingImagine]= useState(false)
  const [imgPrompt,setImgPrompt] =useState("")
  const {AddCollectionUrl,AddMJImages  ,StartFetching,StopFetching ,setMjProgress} = bindActionCreators( actionCreators,dispatch);
  const [file,setFile] =useState(null);
  const [messageId,setMessageId] =useState(null)
  const navigate =useNavigate()
  const {data:user} = useSelector(state=>state.user)
  const uploadConfig=useRef({
    messageId:null,
    buttonMessageId:null, 
    file:null,
    collectionImg:"",
    intervalId:null,
  })


  const ImageService =  new ImageServiceClass({
    imgPrompt,
    uploadConfig,
    setUploadProgress,
    StopFetching,
    setCreatingImagine,
    StartFetching,
    AddCollectionUrl,
    setImgPrompt,
    AddMJImages,
    AddCollectionUrl,
    setMjProgress,
    setMessageId,
    user
  });

const handleFileChange =async(event)=>{
  const file = event.target.files[0];
  setFile(file)
  await ImageService.uploadImageToCloudinary(file);
}



console.log(uploadConfig.current.messageId)



  return (
    <>
    <div className="card_container">

      <img className="bug_image" style={{zIndex:"-1"}} src="/images/bug.png" alt="hieap" />
      <div className="Card">
        <div className="draggable" onClick={()=>fileRef.current.click()}> 
        {
         file ? <>
         <BsFillCloudCheckFill size={"48"} /> 
         <p className="draggable_second_text">{`${file.name} ${Math.floor(file.size/1024)}MB`}</p>
         </>
          :   <>
        <img className={"heapfileImg"} src="/images/heap.png" alt="hieap" width={"130px"} />
         <h3 className="drag_here_text">Drag image file  here</h3>
         <p className="drag_here_text second_text">  click to browse (4 MB max)</p>
         </>
        }

        <input type="file" style={{display:"none"}}  ref={fileRef} onChange={handleFileChange}/>
        </div>
 
        <div class="notesHeader">
          <div className="hrline"></div>
          <p className="or_text">OR</p>
          <div className="hrline"></div>
        </div>
        <Accordion   borderRadius={"3px"} border={"1px solid rgba(128, 128, 128, 0.323)"}  _focusVisible={false} allowToggle={true} >
  <AccordionItem   border={"none"} pb={1}>
      <AccordionButton >
        <Box as="span" flex='1' textAlign='left' >
           <p className="upload_from_url_text"> 
           Upload image from Url 
           </p>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    <AccordionPanel pb={1}>
    <Upload imgPrompt={imgPrompt}  />
    </AccordionPanel>
  </AccordionItem>
    </Accordion>

     
        {
         (uploadProgress>0 && uploadProgress<100)   &&  <File file={file} uploaded={uploadProgress} />
        }

      {
   imgPrompt  &&  <button className="create_variation_button" onClick={()=>ImageService.createImagine()}> {creatingImagine ? "STARTING...": "GET IMAGE VARIATION"} </button>
      }
      </div>
      <div className="create_information_box">

      <p>After you upload  your image . It may take a bit time  . So we whenever the image variations are ready to use , we will sent  you an email . or you can track the progress through my assets page .</p>
     {
messageId &&       <button  onClick={()=>navigate(`/assets/${messageId}`)}>Track progress</button>
      }
      </div>

</div>
    </>
  );
};

export default Card;
