import { CircularProgressLabel,CircularProgress } from '@chakra-ui/react'
import styles from "../../../pages/Progress/progress.module.css"
import React from 'react'

const CircularProgressBox = ({progressPercent}) => {
  return (
    <div className={styles.progress_box}>
       <CircularProgress  className={styles.circular_progress} size={44} value={progressPercent} 
       color='rgb(0 132 240 / 77%)'>
    <CircularProgressLabel   fontSize={"18px"} fontWeight={"bold"} color={"#37e710"}>
      {progressPercent}%
    </CircularProgressLabel>
  </CircularProgress>
  <p className={styles.progress_text}> Wait its being donee. After image is generated  we will sent  you an email if you leave this website.  </p>
        </div>
  )
}

export default CircularProgressBox