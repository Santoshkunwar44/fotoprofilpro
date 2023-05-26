import { useEffect, useState } from "react"
import styles from "./history.module.css" 
import {Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel, Box} from "@chakra-ui/react"
import { GetImagesOfUser } from "../../utils/api"
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
<p>{image?.messageId}</p>
</div>
<div className={styles.history_upload_item_info}>
  <p>Fetched variations</p>
  <p>{image?.images ?  image.images.length :0  }/4</p>
</div>
  </div>            
          </div>
       <p className={styles.createdAtTime}>{image?.createdAt}</p>
      </Box>
      <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel className={styles.info_pannel} pb={4}>
      <div className={styles.image_wrapper}>
      <div className={styles.collectin_image_wrapper}>

      <img src="/images/transparentbox.png" alt="collectionimg" />
      </div>
      <div className={styles.upscale_images}>
        {
          image?.images.map((img,index)=>(
            <img src={img} alt="collectionimg" key={index} />  
          ))
        }
      </div>
      </div>
      <div className={styles.button_container}>
          <h3 className={styles.press_button_text}>Press button to get image  you like  </h3>
          <div className={styles._button_box}>
          <button> 1st Image</button>
          <button> 2nd Image</button>
          <button> 3rd Image</button>
          <button> 4th Image</button>
          </div>
      </div>

  </AccordionPanel>
</AccordionItem>

            ))
          }
     

</Accordion>
    </div>
  )
}
