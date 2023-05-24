import React from 'react'
import Image from '../Image'
import styles from "./ImageContainer.module.css"
import {useSelector} from "react-redux"
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
const ImageContainer = () => {

  const {collection_image,imageArr ,MjProgress} = useSelector(state=>state.image)
  console.log(collection_image,imageArr)
  return (
    <div className={styles.imageContainer}>
    {
        MjProgress !==null && MjProgress <100 &&  <div className={styles.loadingBox}>
      <CircularProgress size={44} value={MjProgress} color='#37e710'>
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