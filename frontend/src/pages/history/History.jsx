import { useEffect, useState } from "react"
import styles from "./history.module.css" 
import {Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel, Box} from "@chakra-ui/react"
import { GetImagesOfUser } from "../../utils/api"
import UploadItem from "../../components/image/uploadItem/UploadItem"
import { CompletedTab } from "../../components/Assets/Completed/CompletedTab"
import ProcessingTab from "../../components/Assets/Processing/ProcessingTab"
export const History = () => {

  const owner="6470ddf84817e411c86215b9";
  const [imagesData,setImagesData] = useState([])
  const [activeTab,setActiveTab] =useState("completed")


  return (
    <div className={styles.assets_page}>


      <div className={styles.assets_container}>

        <div className={styles.assets_header}>  


            <button onClick={()=>setActiveTab("completed")} className={`${activeTab==="completed" ? styles.active_tab_btn :""}`}>
           <img width="48" height="48" src="https://img.icons8.com/color/48/ok--v1.png" alt="ok--v1"/>  
           <p> 
            Completed 
            </p> 

            </button>
            <button onClick={()=>setActiveTab("processing")} className={`${activeTab==="processing" ? styles.active_tab_btn :""}`}>
              <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/40C057/loading.png" alt="loading"/>
            <p>
              
              
                Processing
              </p>
            </button>


        </div>
      {

        activeTab==="completed" ? <CompletedTab/> : <ProcessingTab/>

      }

      </div>

    </div>
  )
}

{/*       
        <Accordion allowToggle>
          {
            imagesData?.map(image=>(
                   
                  <UploadItem key={image?._id} image={image}/>
            ))
          }
     

</Accordion> */}