import { useEffect, useState } from "react"
import styles from "./history.module.css" 

import { GetCompletedImagesOfUserApi, GetProcessingImagesOfUserApi, setUnseenImageToSeenApi } from "../../utils/api"
import { CompletedTab } from "../../components/Assets/Completed/CompletedTab"
import ProcessingTab from "../../components/Assets/Processing/ProcessingTab"
import { useDispatch, useSelector } from "react-redux"
import {BiMessageRounded} from "react-icons/bi"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../redux/store"
export const History = () => {

  const owner="6470ddf84817e411c86215b9";
  const [imagesData,setImagesData] = useState([])
  const [activeTab,setActiveTab] =useState("completed");
  const dispatch = useDispatch()

  const {data:user} =useSelector(state=>state.user)  
  const {addUnseenMessageCountAction ,setLoadingAction} = bindActionCreators(actionCreators,dispatch)

const [pendingRequest,setPendingRequest] =useState(null)
const [completedRequest,setCompletedRequest] =useState(null)
const [unseenRequest,setUnseenRequest] =useState(null)
const {unseenImagesCount}   = useSelector(state=>state.image)


useEffect(()=>{
  


  return()=>{
    handleSetUnseenToSeen()
  }
},[])


useEffect(()=>{
  if(!user)return;
  StartFetchingImages()
  
},[user?._id])


const StartFetchingImages=async()=>{

  try {
      setLoadingAction(true)
      await fetchCompletedRequest()
      await fetchPeningRequest()
      setLoadingAction(false)
  } catch (error) {
      setLoadingAction(false)
  }

}

const handleSetUnseenToSeen=async()=>{
  try {
    const {status} =await  setUnseenImageToSeenApi(user?._id)
    if(status===200){
      addUnseenMessageCountAction(0)
    }
    } catch (error) {
     console.log(error) 
    }

  }
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

  const fetchCompletedRequest=async()=>{
    try {
        const {data,status} =await GetCompletedImagesOfUserApi(user?._id);
        if(status===200){
          setCompletedRequest(data.message);
          setUnseenRequest(data.message.filter(img=>!img.seen).length);
        }
    } catch (error) {
      console.log(error) 
    }
  }

 

  return (
    <div className={styles.assets_page}>


      <div className={styles.assets_container}>

        <div className={styles.assets_header}>  


            <button onClick={()=>setActiveTab("completed")} className={`${activeTab==="completed" ? styles.active_tab_btn :""}`}>
            {
            
            unseenImagesCount ? <div className={styles.unseen_notify}> 
             <BiMessageRounded/>  NEW <p className={styles.unseen_count}>
               {unseenImagesCount}
              </p>
               </div>:""

            } 
           <img width="48" height="48" src="https://img.icons8.com/color/48/ok--v1.png" alt="ok--v1"/>  
           <p> 
            {completedRequest && completedRequest.length}
           &nbsp; Completed 
            </p> 

            </button>
            <button onClick={()=>setActiveTab("processing")} className={`${activeTab==="processing" ? styles.active_tab_btn :""}`}>
              <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/40C057/loading.png" alt="loading"/>
            <p>
              
                {pendingRequest && pendingRequest.length }

  &nbsp;                Processing
              </p>
            </button>


        </div>
      {

        activeTab==="completed" ? <CompletedTab completedRequest={completedRequest}/> : <ProcessingTab pendingRequest={pendingRequest}/>

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