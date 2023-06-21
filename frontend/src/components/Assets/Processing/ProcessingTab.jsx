import React, { useEffect, useState } from 'react'
import { GetProcessingImagesOfUserApi } from '../../../utils/api'
import styles from "../assets.module.css"
import { useSelector } from 'react-redux'
import { Accordion } from '@chakra-ui/react'
import UploadItem from '../../image/uploadItem/UploadItem'
const ProcessingTab = ({pendingRequest}) => {
















  return (
    <div className={styles.assets_tab}>
           <Accordion display={"flex"} flexDir={"column"} gap={"5px"}  allowToggle>
  
     


      {

        
        pendingRequest && pendingRequest.map(item=><UploadItem image={item} key={item?._id}/>)


      }

      </Accordion> 
    </div>
  )
}

export default ProcessingTab