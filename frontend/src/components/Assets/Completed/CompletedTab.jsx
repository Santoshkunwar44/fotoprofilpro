import React, { useState, useEffect } from 'react'
import "../assets.module.css"
import { GetCompletedImagesOfUserApi, GetImagesOfUser } from '../../../utils/api'
import { useSelector } from "react-redux"




import styles from "../assets.module.css"
import UploadItem from '../../image/uploadItem/UploadItem'
import { Accordion } from '@chakra-ui/react'








export const CompletedTab = ({completedRequest}) => {
  





  return (
    <div className={styles.assets_tab}>

  
        <div className={styles.item_container}>
  
     


      {
        completedRequest && completedRequest.map(item=><UploadItem
           image={item}
            key={item?._id}/>)
      }

      </div> 

    </div>
  )
}
