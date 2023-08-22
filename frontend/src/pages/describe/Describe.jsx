import { useSelector } from "react-redux"
import Card from "../../components/Card"
import AlertLayout from "../../layouts/Alert/Alert"

const Describe = () => {
  const {data} = useSelector(state=>state.user)
  return (
    
    <>
       {
      !data ? <AlertLayout type={"error"} text={"Login to use the service."} buttonText={"LOGIN"} url={"/login"}/> :""
      }
      <Card disable={ !Boolean(data)} type={"describe"}/> 
    </>
  )
}

export default Describe