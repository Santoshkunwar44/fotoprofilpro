import styles from "./describe.module.css"

const DescribeText = ({activeImage}) => {
  return (
        <ul className={styles.describe_box}>
            {
                activeImage?.description.map((text,_index)=><li key={_index}>{text}</li>)
            }
 
        </ul>
  )
}

export default DescribeText