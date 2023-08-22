import {io} from "socket.io-client"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import useAlert from "./useAlert";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/store";


const useSocket=(activeMessageId,unseen)=>{

  const socketRef =useRef()
  const activeIdRef =useRef()
  const unseenMsgRef =useRef()

  const {open}=useAlert()
  const dispatch =useDispatch()
  const {data:loggedInUser} = useSelector(state=>state.user);

  const {addUnseenMessageCountAction ,setRefreshAction}= bindActionCreators(actionCreators,dispatch )
  useEffect(()=>{
    return()=>{
      socketRef.current.emit("leave",loggedInUser?.email)
    }
  },[])
useEffect(()=>{

  if(!loggedInUser?.email)return;
  socketRef.current =  io("http://fotoprofilpro.com/api");
  socketRef.current.emit("join",loggedInUser?.email)
  socketRef.current.on("response",handleSocketResponse)
  
},[loggedInUser?.email])

useEffect(()=>{
  activeIdRef.current = activeMessageId
  unseenMsgRef.current =unseen;
},[activeMessageId,unseen])

  const handleSocketResponse=(data)=>{
  console.log("incoming",data)

    
  
    
    if(activeIdRef.current===data.messageId){
       setRefreshAction()
    open({text:"Your variation image is ready to use !!",type:"success"}); 
    }else{
       open({text:"Your variation image is ready to use !!",type:"success"});
       addUnseenMessageCountAction(unseenMsgRef.current+1);
      }
    
  }

}
export default useSocket;