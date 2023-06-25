import { BsImageAlt } from "react-icons/bs"
import styles from "../../../pages/Progress/progress.module.css"

const ImageBoxDemo = ({activeImage}) => {
  return (
    <div className={styles.additional_info}>

    <div className={styles.collection_img_box}> 
    {
      activeImage?.collectionImg ? <img className={styles.collection_img_small} src={activeImage?.collectionImg} alt={activeImage?.prompt}/> :
<BsImageAlt  className={styles.img_icon}/>
    }
    </div>
    <div className={styles.each_images_box_container}>
      {
   activeImage&&   activeImage?.imageUrls?.length >0 ?  activeImage.imageUrls?.map(img=>(

      <div className={styles.each_image}>
          <img src={img} alt="image variations" />
      </div>
        )) : [0,1,2,3 ].map(item=> <div className={styles.each_image}>
          <BsImageAlt className={styles.img_icon}/>
      </div>
      )
      }
     
    </div>

  </div>
  )
}

export default ImageBoxDemo