import React from 'react'
import styles from "../ImageContainer/imageContainer.module.css"
import FileSaver from "file-saver"
import {FiDownloadCloud} from "react-icons/fi"
export const VariationImage = ({image}) => {
  
    const handleUpload=()=>{

        FileSaver.saveAs(image,`variations_${Date.now()}.jpg`)

    }


  return (
    <div className={styles.image_variation_wrapper} onClick={handleUpload}>
        
            <FiDownloadCloud className={styles.image_bg_icon}/>
         <img src={image} alt={image} width={"100%"} height={"100%"}/>

    </div>
  )
}
