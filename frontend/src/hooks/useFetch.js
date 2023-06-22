import { useEffect, useState } from "react"
import { axiosInstance } from "../utils/api"

const useFetch=(endpoint,httpMethod)=>{

    const [data,setData] =useState(null)
    const [error,setError] =useState("")
    const [loading,setLoading] =useState(false)


    useEffect(()=>{
        fetchApi();
    },[])

    const fetchApi=async()=>{

        try {
            setLoading(true);
            const {status , data}   = await axiosInstance[httpMethod](endpoint);
            if(status===200){
                setData(data.message)
            }else{
                throw data.message;
            }
            setLoading(false)
        } catch (error) {
            setError(error?.message)   
            setLoading(false)
        }
    }


    const refetch=()=>{
        fetchApi()
    }



    return {error,loading,data ,refetch}


}

export default useFetch;