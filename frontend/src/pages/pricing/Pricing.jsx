import React from 'react'
import styles from "./Pricing.module.css"


const Pricing = () => {
  return (
    <div className={styles.pricing}>

       
        <div className={styles.pricing_box }>
            <div className={styles.pricing_box_header}>

            <h1 className={styles.plan_name}>Premium</h1>
            <h1> 50 IDR  / 50 photos</h1>
            </div>
            <ul>

            <li>Get email when image generated</li>
            <li>Generate 45 images</li>
            </ul>
                          <button className={styles.buy_plan_button}>  BUY NOW</button>
            
        </div>

            <div className={styles.pricing_box }>
        <div className={styles.pricing_box_header}>
            <h1 className={styles.plan_name}>Advance    </h1>
            <h1>90 IDR/ 100 photos</h1>
        </div>
            <ul>

            <li>Get email when image generated</li>
            <li>Generate 90 images</li>
            </ul>
                <button className={styles.buy_plan_button}> BUY NOW</button>
            
        </div>
    </div>
  )
}

export default Pricing