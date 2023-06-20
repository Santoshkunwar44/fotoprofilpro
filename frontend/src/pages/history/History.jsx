import { useEffect, useState } from "react"
import styles from "./history.module.css" 
import {Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel, Box} from "@chakra-ui/react"
import { GetImagesOfUser } from "../../utils/api"
import UploadItem from "../../components/image/uploadItem/UploadItem"
export const History = () => {

  const owner="6470ddf84817e411c86215b9";
  const [imagesData,setImagesData] = useState([])

  useEffect(()=>{
    fetchImagesOfUser()
  },[owner])


  const fetchImagesOfUser=async()=>{
    try {
       const {data,status} =    await GetImagesOfUser(owner);
       if(status===200){
        setImagesData(data.message)
       }else{
        throw Error("something went wrong")
       }
    } catch (error) {
      console.log("something went wrong");
    }
  }

  return (
    <div className={styles.history_page}>
        <Accordion allowToggle>
          {
            imagesData?.map(image=>(
                   
                  <UploadItem key={image?._id} image={image}/>
            ))
          }
     

</Accordion>
    </div>
  )
}
