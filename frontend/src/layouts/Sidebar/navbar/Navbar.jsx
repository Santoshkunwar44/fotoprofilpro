import { Link } from "react-router-dom"
import styles from "./navbar.module.css";
import {useSelector} from "react-redux"
import SignUpModal from "../../modal/Modal";
import LogoutPopover from "../../popover/LogoutPopover";
const Navbar = () => {

  const {data:loggedInUser}  = useSelector(state=>state.user )
 



  return (
    <div className={styles.navbar}>
        <div>

<Link to={"/"}>
      <img  className={styles.logo_img} src="/images/logo.png" alt="logo" width={"100px"} />
</Link>  
        </div>
        {

         loggedInUser ? <LogoutPopover>



         <div className={styles.loggedInBox}>
            <img className={styles.logged_user_img} src="/images/boy1.png" alt="boy1" />
            <div>

            <h4 className={styles.loggedInusername}>{loggedInUser?.username}</h4>
            <p>{loggedInUser?.email}</p>
            </div>
        </div>
         </LogoutPopover> 
         :<button className={styles.signInBtn}>

          <SignUpModal>
            Sign up
          </SignUpModal>

          </button>
          }

    </div>
  )
}

export default Navbar