import { useSelector } from "react-redux"
import Card from "../../components/Card"
import AlertLayout from "../../layouts/Alert/Alert"
import styles from "./create.module.css"
const Create = () => {


  const {data} = useSelector(state=>state.user)


  return (
    <div className={styles.create_page}>
           {
      !data ? <AlertLayout type={"error"} text={"Login to use the service."} buttonText={"LOGIN"} url={"/login"}/> :""
      }
        <Card  type={"imagine"}/> 
    </div>
  )
}

export default Create