import { Link } from "react-router-dom"
import styles from "./navbar.module.css";
import {useSelector} from "react-redux"
import SignUpModal from "../../modal/Modal";
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

         loggedInUser ? <div className={styles.loggedInBox}>
            <img className={styles.logged_user_img} src="/images/boy1.png" alt="boy1" />
            <div>

            <h4 className={styles.loggedInusername}>Rajiv Shrestha</h4>
            <p>rajivNewar123@gmail.com</p>
            </div>
        </div> :<button className={styles.signInBtn}>

          <SignUpModal>
            Sign up
          </SignUpModal>

          </button>
          }

    </div>
  )
}

export default Navbar