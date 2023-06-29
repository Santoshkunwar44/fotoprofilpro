import styles from "./payment.module.css"

const PaymentSuccess = () => {
  return (
    <div className={styles.payment_box}>
<img width="150" height="150" src="https://img.icons8.com/ios-filled/150/40C057/ok--v1.png" alt="ok--v1"/><h1 className={styles.payment_status_text}>Payment Success</h1>

    </div> 
  )
}

export default PaymentSuccess