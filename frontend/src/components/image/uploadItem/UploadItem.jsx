import { useEffect, useState } from "react"
import styles from "./upload.module.css"
import { Box} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ImageService } from "../../../utils/services/ImageService"
const UploadItem = ({image}) => {

    const [uploadImage,setUploadImg] = useState({...image})


    useEffect(()=>{
        if(image && !image.collectionImg && image.messageId){
            getCollectionImageFunc(image)
        }
    },[image])

    const getCollectionImageFunc=async(image)=>{

        let {imageUrl,buttons ,buttonId} = await ImageService.getCollectionImage(image.messageId)
       buttons =  buttons.slice(0,4);
        setUploadImg({...uploadImage,collectionImg:imageUrl,buttons ,buttonId })
    }
    const AddImages=(newImage)=>{

        setUploadImg(prev=>({
            ...prev,images:[...prev.images,newImage]
        }))
    }
    const getUpscaleImage=async(button)=>{

        const {buttonId} =  uploadImage;
        try {
            await ImageService.getUpscaleImage(buttonId,button,AddImages);
        } catch (error) {
            console.log(error)
        }



    }

  return (
    <div  className={styles.accordian_item}> 
    <h2>
      
        <Box   className={styles.accordian_box}  flex='1' textAlign='left'>
        <div className={styles.history_main_info}>
        <img className={styles.my_upload_img} src={image.promtImg} alt="myupload" />
        <div className={styles.history_upload_item}>
  <div className={styles.history_upload_item_info}>
  
  <p>uploaded with</p>
  <p>image file</p>
  </div>
  <div className={styles.history_upload_item_info}>
  <p>Message Id</p>
  <p>{uploadImage?.messageId}</p>
  </div>
  
  <div className={styles.history_upload_item_info}>
    <p>Service type</p>
    <p>{uploadImage?.type==="describe"?"describe":"variations"}</p>
  </div>
    </div>            
            </div>
            <div className={styles.upload_item_right_box}>

         <p className={styles.createdAtTime}>{uploadImage?.createdAt}</p>
        <Link to={`/assets/${uploadImage?.messageId}`}>
        
         <button className={styles.view_more_btn}>VIEW MORE </button>
        </Link>
            </div>
        </Box>
        
    
    </h2>

  </div>
  
  )
}

export default UploadItem