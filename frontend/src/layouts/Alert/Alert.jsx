import { Link } from "react-router-dom"
import styles from "./alert.module.css"
import {BiErrorCircle} from "react-icons/bi"
import SignUpModal from "../modal/Modal"
const AlertLayout = ({text,type,url , buttonText}) => {

const iconsMapping={
  error:<BiErrorCircle/>
}

  return (
 <div className={styles.alertLayout}>
  <div className={styles.alert_info}>

{
  iconsMapping[type]
}
<p>{text}</p>
  </div>

{
  url === "/login"?    <SignUpModal >
    <button >

            {buttonText}
    </button>
          </SignUpModal>
:
  <Link className={styles.button_link} to={url}>
  <button>{buttonText}</button>
  </Link>
}

  </div> )
}

export default AlertLayout;