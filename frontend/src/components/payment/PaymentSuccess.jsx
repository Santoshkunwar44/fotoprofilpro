import styles from "./payment.module.css"
import queryString from "querystring"
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import PaymentPending from "./PaymentPending";

const PaymentSuccess = () => {
   const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [isPending,setIsPending] = useState(null)


  useEffect(()=>{
     setIsPending(queryParams.transaction_status === "pending")

  
  },[queryParams])


  return (
    <>
    {
      isPending=== true ? <PaymentPending/> :    <div className={styles.payment_box}>
<img width="150" height="150" src="https://img.icons8.com/ios-filled/150/40C057/ok--v1.png" alt="ok--v1"/><h1 className={styles.payment_status_text}>Payment Success</h1>

    </div> 
    }

    </>
  )
}

export default PaymentSuccess