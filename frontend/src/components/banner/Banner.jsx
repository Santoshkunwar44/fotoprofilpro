import styles from "./banner.module.css"
import {Link} from "react-router-dom"
const Banner = () => {
  return (
    <div className={styles.banner_container}>

      <div className={styles.banner_left}>
        <h1>Unleash the Power of Midjourney AI: Transform Your Photos into Mesmerizing Masterpieces</h1>
        <i className={styles.banner_sub_heading}>"Experience the Future of Image  Editing   with our Cutting-edge <br /> Web Application"</i>
        <Link to="/services">
        <button className={styles.try_now_button}>TRY NOW !!</button>
        </Link> 
      </div>

      <div className={styles.banner_right}>
        <img className={styles.banner_img} src="/images/graphics.svg" alt="" />
      </div>

    </div>
  )
}

export default Banner