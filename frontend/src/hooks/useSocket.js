import {io} from "socket.io-client"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import useAlert from "./useAlert";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/store";


const useSocket=()=>{

  const socketRef =useRef()
  const {open}=useAlert()
  const dispatch =useDispatch()
  const {data:loggedInUser} = useSelector(state=>state.user);
  const {activeMessageId , unseenImagesCount}= useSelector(state=>state.image)

  const {addUnseenMessageCountAction}= bindActionCreators(actionCreators,dispatch )
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

  if(data.messageId === activeMessageId){

  }else{
    open({text:"Your variation image is ready to use !!",type:"success"})
    addUnseenMessageCountAction(unseenImagesCount+1);
    console.log(unseenImagesCount,"i got response",data);

  }

    


})
},[loggedInUser?.email])

}
export default useSocket;