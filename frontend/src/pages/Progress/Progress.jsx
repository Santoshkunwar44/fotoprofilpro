import styles from "./progress.module.css";
import {BsImageAlt} from "react-icons/bs"
import {useParams} from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { getMjResponseApi, setUnseenToSingleImageApi } from "../../utils/api";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import PromptInfo from "../../components/upload/promtInfo/PromptInfo";
import CircularProgressBox from "../../components/upload/CircularProgress/CircularProgress";
import ImageBoxDemo from "../../components/upload/ImageBoxDemo/ImageBoxDemo";
import DescribeText from "../../components/upload/DescribeText/DescribeText";

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

    fetchProgressCount(messageId)
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


 activeImage?.completed===false &&     <CircularProgressBox progressPercent={progressPercent}/> }
        <div className={styles.image_info_section}>



          <PromptInfo progressPercent={progressPercent} activeImage={activeImage} messageId={messageId}/>
        {/* <Buttons/> */}
       {

       activeImage && activeImage.type !== "describe" ? <ImageBoxDemo activeImage={activeImage} /> :""
       }
        </div>
        <div className={styles.image_info_answer_container}>
        
        {

        activeImage && activeImage.type ==="describe" ? <DescribeText activeImage={activeImage}/>:""
        } 

        </div>
        {/* <Buttons/> */}
    </div>

  )
}

export default Progress