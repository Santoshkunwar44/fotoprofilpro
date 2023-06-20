import {io} from "socket.io-client"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import useAlert from "./useAlert";


const useSocket=()=>{

  const socketRef =useRef()
  const {open}=useAlert()
  const {data:loggedInUser} = useSelector(state=>state.user);

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
    console.log("i got response",data);
    open({text:"Your variation image is ready to use !!",type:"success"})
    


})
},[loggedInUser?.email])

}
export default useSocket;