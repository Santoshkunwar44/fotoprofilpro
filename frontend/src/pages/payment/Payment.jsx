import React from 'react'
import styles from './payment.module.css'
import { Outlet, useNavigate } from 'react-router-dom'

const Payment = () => {
  const navigate = useNavigate()
  
  return (
    <div className={styles.payment}>

    <div className={styles.payment_content}>


    <Outlet/>
    <button className={styles.get_back_button} onClick={()=>navigate(-1)}>
    {/* <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/FA5252/long-arrow-left.png" alt="long-arrow-left"/> */}
      <p>back</p>
    </button>


     </div> 

    </div>
  )
}

export default Payment