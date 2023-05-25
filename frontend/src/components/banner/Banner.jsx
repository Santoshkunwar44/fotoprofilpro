import styles from "./banner.module.css"
const Banner = () => {
  return (
    <div className={styles.banner_container}>

      <div className={styles.banner_left}>
        <h1>Unleash the Power of Midjourney AI: Transform Your Photos into Mesmerizing Masterpieces</h1>
        <i className={styles.banner_sub_heading}>"Experience the Future of Image  Editing   with our Cutting-edge <br /> Web Application"</i>
        <button className={styles.try_now_button}>TRY NOW !!</button>
      </div>

      <div className={styles.banner_right}>


        <img className={styles.banner_img} src="/images/graphics.svg" alt="" />

      </div>

    </div>
  )
}

export default Banner