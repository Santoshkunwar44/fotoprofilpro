import React from 'react'
import { VariationImage } from '../VariationImage/VariationImage'
import styles from "./imageContainer.module.css"

export const ImageContainer = ({activeImage}) => {

  return (
    <div className={styles.image_container}>

        
        {
            activeImage.imageUrls.map((img,_index)=><VariationImage image={img} key={_index}/>)

        }



    </div>
  )
}
