import styles from "../../../pages/Progress/progress.module.css"
import {format} from "timeago.js"
const PromptInfo = ({activeImage,messageId,progressPercent}) => {
  return (
    <>
    <div className={styles.prompt_box}>

        <div className={styles.prompt_image_wrapper}>

              <img src={activeImage?.promtImg} className={styles.prompt_img} alt="" />
          </div>
              <div className={styles.prompt_info_list}>

                <p> Id : {messageId}</p>
                <p>uploaded {format(activeImage?.createdAt)}</p>
                <p>Service : {activeImage?.type}</p>
                <p>Status : {activeImage?.completed ? "completed":"processing"}</p>
            

              {activeImage?.completed === false ?  <p>completed : {progressPercent}%</p> :""}
              

              </div>
    </div>
    </>

  )
}

export default PromptInfo