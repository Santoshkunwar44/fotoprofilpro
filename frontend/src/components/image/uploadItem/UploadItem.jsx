import { useEffect, useState } from "react"
import styles from "./upload.module.css"
import {AccordionButton,AccordionIcon,AccordionItem,AccordionPanel, Box} from "@chakra-ui/react"
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
    <AccordionItem className={styles.accordian_item}> 
    <h2>
      <AccordionButton>
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
    <p>Fetched variations</p>
    <p>{uploadImage?.images ?  uploadImage?.images.length :0  }/4</p>
  </div>
    </div>            
            </div>
         <p className={styles.createdAtTime}>{uploadImage?.createdAt}</p>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel className={styles.info_pannel} pb={4}>
        <div className={styles.image_wrapper}>
        <div className={styles.collectin_image_wrapper}>
  
        <img src={ uploadImage?.collectionImg} alt="collectionimg" />
        </div>
        <div className={styles.upscale_images}>
          {
            uploadImage?.images.map((img,index)=>(
              <img src={img.imageUrl} alt="collectionimg" key={index} />  
            ))
          }
        </div>
        </div>
        <div className={styles.button_container}>
            <h3 className={styles.press_button_text}>Press button to get image  you like  </h3>
            <div className={styles._button_box}>
                {
                    uploadImage?.buttons?.map((btn,_index)=>(
                        <button onClick={()=>getUpscaleImage(btn)}>  Image {_index+1}</button>
                    ))
                }

            </div>
        </div>
  
    </AccordionPanel>
  </AccordionItem>
  
  )
}

export default UploadItem