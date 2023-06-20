import React, { useState, useEffect } from 'react'
import "../assets.module.css"
import { GetCompletedImagesOfUserApi, GetImagesOfUser } from '../../../utils/api'
import { useSelector } from "react-redux"




import styles from "../assets.module.css"
import UploadItem from '../../image/uploadItem/UploadItem'
import { Accordion } from '@chakra-ui/react'








export const CompletedTab = () => {

  const { data: user } = useSelector(state => state.user)
  const [completedRequest, setCompletedRequest] = useState(null)

  useEffect(() => {
    if (!user) return;
    fetchCompletedRequest()
  }, [user])


  const fetchCompletedRequest = async () => {
    try {
      const { data, status } = await GetCompletedImagesOfUserApi(user?._id);
      if (status === 200) {
        setCompletedRequest(data.message)
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
        completedRequest && completedRequest.map(item=><UploadItem image={item} key={item?._id}/>)
      }

      </Accordion> 

    </div>
  )
}
