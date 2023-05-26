import React, { useEffect, useRef } from 'react'
import Image from '../Image'
import styles from "./ImageContainer.module.css"
import {useSelector} from "react-redux"
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
const ImageContainer = () => {

  const {collection_image,imageArr ,MjProgress} = useSelector(state=>state.image);
  const imageContainerRef  = useRef();


  useEffect(()=>{
    imageContainerRef.current.scrollIntoView()
  },[imageArr,collection_image])

  return (
    <div className={styles.imageContainer} ref={imageContainerRef}>
    {
        MjProgress ===null ? <div className={styles.loadingBox}>
        <CircularProgress  className={styles.circular_progress} size={44} value={0} color='rgb(0 132 240 / 77%)'>
    <CircularProgressLabel   fontSize={"18px"} color={"#37e710"}>
      <img className={styles.waiting_img_} src="/images/load.png" alt="loadingIMg" />
    </CircularProgressLabel>
  </CircularProgress>
    <p>Waitingg for  you to upload ...</p>
  </div>  :
        
        MjProgress <100 &&  <div className={styles.loadingBox}>
      <CircularProgress className={styles.circular_progress} size={44} value={MjProgress} color='rgb(0 132 240 / 77%)'>
  <CircularProgressLabel fontSize={"18px"} color={"#37e710"}>{MjProgress}%</CircularProgressLabel>
</CircularProgress>
  <p>Midjourney Api can take upto 1 minute</p>
</div>
      }
       {
       collection_image &&  <Image collectionImg={true} url={collection_image}/>

       }
        {
          imageArr && imageArr.map((url,index)=>(
            <Image url={url} key={index}/>
          ))
        }
        
    </div>
  )
}

export default ImageContainer