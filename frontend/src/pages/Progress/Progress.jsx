import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"
import styles from "./progress.module.css";
import {BsImageAlt} from "react-icons/bs"
import {useParams} from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import {format} from "timeago.js"
import { getMjResponseApi, setUnseenImageToSeenApi, setUnseenToSingleImageApi } from "../../utils/api";
import Buttons from "../../components/Buttons/Buttons";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const Progress = () => {
  const {messageId} = useParams()
  const dispatch = useDispatch()

  // const 
  const {activeImage ,refresh } = useSelector(state=>state.image)
  const [progressPercent,setProcessPercent  ] = useState(0);



  const {addActiveImageAction ,addActiveMessageIdAction ,setLoadingAction}  = bindActionCreators(actionCreators,dispatch )

  const intervalRef =useRef()
  
  const {data,error,loading ,refetch} =  useFetch(`/image/single/${messageId}`,"get");

  useEffect(()=>{
    return ()=>{
      addActiveImageAction(null)
      addActiveMessageIdAction(null)
      
    }
  },[])



  useEffect(()=>{
    if(!messageId || !activeImage)return;
    if(activeImage.completed)return;


   intervalRef.current =   setInterval(()=>(
      fetchProgressCount(messageId)
    ),5000)

  },[messageId,activeImage])

  useEffect(()=>{
    if(data){
      addActiveImageAction(data);
      addActiveMessageIdAction(messageId)
    }
  },[data,messageId])


  useEffect(()=>{
    if(progressPercent===100 ){
      clearInterval(intervalRef.current)
    }
  },[progressPercent])


  useEffect(()=>{
    refetch()
    handleSetImageToSeen()
  },[refresh])

  useEffect(()=>{
    if(loading){
      setLoadingAction(true)
    }else{
      setLoadingAction(false)
    }
  },[loading])



  const handleSetImageToSeen=async()=>{
    if(!data || !activeImage)return;
    if(activeImage.seen)return;
    
        try {
        await setUnseenToSingleImageApi(data?._id,activeImage?._id)

    } catch (error) {
      console.log(error)
    }
  }
  const fetchProgressCount=async(messageId)=>{

    try {
    const  {data} =  await getMjResponseApi(messageId)
     setProcessPercent( data.progress)

    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className={styles.progress_page}>
      {


 activeImage?.completed===false &&        <div className={styles.progress_box}>
                  <CircularProgress  className={styles.circular_progress} size={44} value={progressPercent} color='rgb(0 132 240 / 77%)'>
    <CircularProgressLabel   fontSize={"18px"} fontWeight={"bold"} color={"#37e710"}>
      {progressPercent}%
    </CircularProgressLabel>
  </CircularProgress>
  <p className={styles.progress_text}> Wait its being donee. After image is generated  we will sent  you an email if you leave this website.  </p>
        </div>
        } 
        <div className={styles.image_info_section}>

        <div className={styles.prompt_section}>


        <div className={styles.prompt_box}>
          <div className={styles.prompt_image_wrapper}>

              <img src={activeImage?.promtImg} className={styles.prompt_img} alt="" />
          </div>
              <div className={styles.prompt_info_list}>

                <p>uploaded {format(activeImage?.createdAt)}</p>
                <p>Message Id : {messageId}</p>
                <p>Status : {activeImage?.completed ? "completed":"processing"}</p>
            

              {activeImage?.completed === false ?  <p>completed : {progressPercent}%</p> :""}
              

              </div>
        </div>
        {/* <Buttons/> */}
        </div>
        <div className={styles.additional_info}>

          <div className={styles.collection_img_box}> 
          {
            activeImage?.collectionImg ? <img className={styles.collection_img_small} src={activeImage?.collectionImg} alt={activeImage?.prompt}/> :
<BsImageAlt  className={styles.img_icon}/>
          }
          </div>
          <div className={styles.each_images_box_container}>
            {
         activeImage&&   activeImage?.imageUrls?.length >0 ?  activeImage.imageUrls?.map(img=>(

            <div className={styles.each_image}>
                <img src={img} alt="image variations" />
            </div>
              )) : [0,1,2,3 ].map(item=> <div className={styles.each_image}>
                <BsImageAlt  className={styles.img_icon}/>
            </div>
            )
            }
           
          </div>

        </div>
        </div>
        {/* <Buttons/> */}
    </div>

  )
}

export default Progress