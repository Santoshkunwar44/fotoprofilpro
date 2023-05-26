import styles from "./workspace.module.css";
import {Link} from "react-router-dom"
const Workspace = () => {
  return (
    <div className={styles.workSpace}>
        <div className={styles.workList}>
            <div className={styles.workItem}>
                            <img src="/images/history.png" alt="historyMachine" />
                <p className={styles.work_desc}>Get your  image variations of  your past uploads .</p>
               <Link to={'/history'}><button>MY HISTORY</button>
</Link>             </div>
            <div className={styles.workItem}>

                <img src="/images/load.png" alt="uploadMachine" />
                <p  className={styles.work_desc}>Upload a  new image to get variations .</p>
                <Link to="/create">
                <button >UPLOAD</button>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default Workspace