import { useEffect, useRef } from "react"
import Card from "../../components/Card"
import ImageContainer from "../../components/image/ImageContainer/ImageContainer"
import styles from "./create.module.css"
import {io} from "socket.io-client"
const Create = () => {

  const socketRef =useRef()

useEffect(()=>{
 socketRef.current =  io("http://localhost:8000")
 socketRef.current.emit("join","santehero8@gmail.com")
socketRef.current.on("response",(data)=>{
  console.log("i got response",data)
})
},[])

  return (
    <div className={styles.create_page}>

        <Card/> 
        <ImageContainer/>
    </div>
  )
}

export default Create