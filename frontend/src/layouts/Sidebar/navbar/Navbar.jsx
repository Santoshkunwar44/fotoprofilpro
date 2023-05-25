import styles from "./navbar.module.css"
const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <div>

        <img  className={styles.logo_img} src="/images/logo.png" alt="logo" width={"100px"} />
        </div>
        <div className={styles.loggedInBox}>
            <img className={styles.logged_user_img} src="/images/boy1.png" alt="boy1" />
            <div>

            <h4 className={styles.loggedInusername}>Santosh6969</h4>
            <p>santehero69@gmail.com</p>
            </div>
        </div>

    </div>
  )
}

export default Navbar