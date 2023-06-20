import React, { useEffect, useState } from 'react'
import { GetProcessingImagesOfUserApi } from '../../../utils/api'
import styles from "../assets.module.css"
import { useSelector } from 'react-redux'
import { Accordion } from '@chakra-ui/react'
import UploadItem from '../../image/uploadItem/UploadItem'
const ProcessingTab = () => {
  const { data: user } = useSelector(state => state.user)
  const [pendingRequest, setPendingRequest] = useState(null)

  useEffect(() => {
    if (!user) return;
    fetchPeningRequest()
  }, [user])


  const fetchPeningRequest = async () => {
    try {
      const { data, status } = await GetProcessingImagesOfUserApi(user?._id);
      if (status === 200) {
        setPendingRequest(data.message)
      } else {
        throw Error("something went wrong")
      }
    } catch (error) {
      console.log("something went wrong");
    }
  }




  return (
    <div className={styles.assets_tab}>
           <Accordion allowToggle>
  
     


      {

        
        pendingRequest && pendingRequest.map(item=><UploadItem image={item} key={item?._id}/>)


      }

      </Accordion> 
    </div>
  )
}

export default ProcessingTab