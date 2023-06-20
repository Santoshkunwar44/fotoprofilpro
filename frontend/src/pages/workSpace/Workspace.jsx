import styles from "./workspace.module.css";
import {Link} from "react-router-dom"
import {motion} from "framer-motion"
const Workspace = () => {
  const variants = {
    open: {   
      x:"0",
      opacity:1,
      scale:[1, 1.03, 1],
    },
    close: { opacity: 0, x: "-100px" ,scale:0.6 },
  }
  
  return (
    <div className={styles.workSpace}>
        <div className={styles.workList}>
              <motion.div 
              initial={"close"}
              animate={"open"}
              variants={variants}
              transition={{
                type:"spring",
                duration:1,
                stiffness:400,
              }}
              
              className={styles.workItem}>
                            <img src="/images/history.png" alt="historyMachine" />
                <p className={styles.work_desc}>Get your  image variations of  your past uploads .</p>
               <Link to={'/assets'}><button>MY ASSETS</button>
</Link>             </motion.div>
            <motion.div 
                    initial={"close"}
                    animate={"open"}
                    variants={variants}
                    transition={{
                      duration:2,
                      type:"spring",
                      stiffness:400,
                      delay:0.2
                    }}
             className={styles.workItem}>

                <img src="/images/load.png" alt="uploadMachine" />
                <p  className={styles.work_desc}>Upload a  new image to get variations .</p>
                <Link to="/create">
                <button >UPLOAD</button>
                </Link>
            </motion.div>

        </div>
    </div>
  )
}

export default Workspace