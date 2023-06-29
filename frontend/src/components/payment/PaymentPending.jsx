import styles from "./payment.module.css"


const PaymentPending = () => {
  return (
        <div className={styles.payment_box}>
<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/7950F2/spinner-frame-5.png" alt="spinner-frame-5"/>
<h1 className={styles.payment_status_text}>Payment pending</h1>

    </div> 
  )
}

export default PaymentPending