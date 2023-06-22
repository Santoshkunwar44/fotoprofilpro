import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"
import styles from "./progress.module.css";
import {BsImageAlt} from "react-icons/bs"
import {useParams} from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import {format} from "timeago.js"
import { getMjResponseApi } from "../../utils/api";
import Buttons from "../../components/Buttons/Buttons";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const Progress = () => {
  const {messageId} = useParams()
  const dispatch = useDispatch()

  // const 
  const {activeImage} = useSelector(state=>state.image)
  const [progressPercent,setProcessPercent  ] = useState(0);
  const [imageArr,setImgArr] = useState( [
  { button: "U1" },
  { button: "U2" },
  { button: "U3" },
  { button: "U4" }
]
)
  const {addActiveImageAction}  = bindActionCreators(actionCreators,dispatch )

  const intervalRef =useRef()
  
  const {data,error,loading} =  useFetch(`/image/single/${messageId}`,"get");


  useEffect(()=>{
    return ()=>{
      addActiveImageAction(null)
      
    }
  },[])

  useEffect(()=>{
    if(!messageId || !activeImage)return;


    if(activeImage.completed)return;

    fetchProgressCount(messageId)
   intervalRef.current =   setInterval(()=>(
      fetchProgressCount(messageId)
    ),5000)

  },[messageId,activeImage])

  useEffect(()=>{
    if(data){
      addActiveImageAction(data)
    }
  },[data])


  useEffect(()=>{
    if(progressPercent===100){
      clearInterval(intervalRef.current)
    }
  },[progressPercent])


  useEffect(()=>{
    if(activeImage){

      imageArr.forEach(btn=>{
        activeImage.images.forEach(img=>{
          if(btn.button=== img.button){
            btn.image= img.image
          }
        })
      })

    }
  },[activeImage])


  const fetchProgressCount=async(messageId)=>{

    try {
    const  {data} =  await getMjResponseApi(messageId)
     setProcessPercent( data.progress)

    } catch (error) {
      
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
                <p>Message Id : {activeImage?.buttonId}</p>
                <p>Status : {activeImage?.completed ? "completed":"processing"}</p>
                <p>completed : 34%</p>

              </div>
        </div>
        <Buttons/>
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
              imageArr.map(img=>(

            <div className={styles.each_image}>
              {
                img.image ? <img src={img.image} alt="" />: 
                <BsImageAlt  className={styles.img_icon}/>
              }
            </div>
              ))
            }
           
          </div>

        </div>
        </div>
        {/* <Buttons/> */}
    </div>

  )
}

export default Progress