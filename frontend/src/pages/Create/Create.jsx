import { useEffect, useRef } from "react"
import Card from "../../components/Card"
import ImageContainer from "../../components/image/ImageContainer/ImageContainer"
import styles from "./create.module.css"
import {io} from "socket.io-client"
import { useSelector } from "react-redux"
const Create = () => {

  const socketRef =useRef()
  const {data:loggedInUser} = useSelector(state=>state.user)


  useEffect(()=>{
    return()=>{
      
      console.log("unmounting")
      socketRef.current.emit("leave",loggedInUser?.email)
    }
  },[])
useEffect(()=>{

  if(!loggedInUser?.email)return;
  socketRef.current =  io("http://localhost:8000")
  socketRef.current.emit("join",loggedInUser?.email)
  socketRef.current.on("response",(data)=>{
    console.log("i got response",data)
    


})
},[loggedInUser?.email])

  return (
    <div className={styles.create_page}>

        <Card/> 
        <ImageContainer/>
    </div>
  )
}

export default Create