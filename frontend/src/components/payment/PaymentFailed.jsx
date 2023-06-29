import styles from "./payment.module.css"
const PaymentFailed = () => {
  return (
      <>
    {/* <div className={styles.payment_status_box}>

<img src="" alt="" />
<p>
  
      Payment failed 
  </p>  

    </div> */}
    <div className={styles.payment_box}>
<img width="100" height="100" src="https://img.icons8.com/ios-filled/100/FA5252/high-risk.png" alt="high-risk"/>
<h1 className={styles.payment_status_text}>Payment Failed</h1>

    </div>
    </>
  )
}

export default PaymentFailed