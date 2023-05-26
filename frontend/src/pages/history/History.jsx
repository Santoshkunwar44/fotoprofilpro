import styles from "./history.module.css" 
import {Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel, Box} from "@chakra-ui/react"
export const History = () => {
  return (
    <div className={styles.history_page}>
        <Accordion allowToggle>
  <AccordionItem className={styles.accordian_item}> 
    <h2>
      <AccordionButton>
        <Box   className={styles.accordian_box}  flex='1' textAlign='left'>
            <div className={styles.history_main_info}>

        <img className={styles.my_upload_img} src="/images/eye2.png" alt="myupload" />
        <div className={styles.history_upload_item}>
<div className={styles.history_upload_item_info}>

<p>uploaded with</p>
<p>image file</p>
</div>
<div className={styles.history_upload_item_info}>
<p>Message Id</p>
<p>42DGLA34flizxu#</p>
</div>
<div className={styles.history_upload_item_info}>
    <p>Fetched variations</p>
    <p>True</p>
</div>
    </div>            
            </div>
         <p className={styles.createdAtTime}>May 22, 2021</p>
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
        <img src="/images/man1.png" alt="collectionimg" />  
        <img src="/images/files.png" alt="collectionimg" />  
        <img src="/images/girl1.png" alt="collectionimg" />  
        <img src="/images/eye1.png" alt="collectionimg" />  
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

  <AccordionItem className={styles.accordian_item}> 
    <h2>
      <AccordionButton>
        <Box   className={styles.accordian_box}  flex='1' textAlign='left'>
            <div className={styles.history_main_info}>

        <img className={styles.my_upload_img} src="/images/ballons.png" alt="myupload" />
        <div className={styles.history_upload_item}>
<div className={styles.history_upload_item_info}>

<p>uploaded with</p>
<p>image file</p>
</div>
<div className={styles.history_upload_item_info}>
<p>Got response</p>
<p>True</p>
</div>
<div className={styles.history_upload_item_info}>
    <p>Fetched variations</p>
    <p>True</p>
</div>
    </div>            
            </div>
         <p className={styles.createdAtTime}>May 22, 2021</p>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
    </div>
  )
}
