import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/store";
import { getCountUnseenImagesApi, loggedInUserApi } from "../utils/api";


const useSetup=()=>{

const dispatch = useDispatch()
  const {addUserAction ,addUnseenMessageCountAction} = bindActionCreators(actionCreators,dispatch );
  const {data:user} =useSelector(state=>state.user)

  useEffect(()=>{
    fetchLoggedInUser()
  },[])
  useEffect(()=>{
    if(!user)return;
    getCountUnseenImages()

  },[user])
 const getCountUnseenImages=async()=>{
  try {
      const {data,status}=  await getCountUnseenImagesApi(user?._id);
      if(status===200){
        addUnseenMessageCountAction(data.message)
      }
  } catch (error) {
      console.log(error)
  }
 }
  const fetchLoggedInUser=async()=>{
    try {
         const res = await loggedInUserApi();
         if(res.status===200){
          addUserAction(res.data.message)
         }

    } catch (error) {
        console.log(error)
    }
  }

}

export  default useSetup;