import axios  from "axios"



const MjAxiosInstance =   axios.create({
    headers:{
        "Authorization":`Bearer ${process.env.REACT_APP_THENEXTLEG_TOKEN}`
    }
})
export const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL,
    withCredentials:true
})

export const mjImagineApi = (data)=> MjAxiosInstance.post(`https://api.thenextleg.io/v2/imagine`,data)

export const getMjResponseApi =(messagId) => MjAxiosInstance.get(`https://api.thenextleg.io/v2/message/${messagId}`);

export const MjUpscaleApi=(data)=>MjAxiosInstance.post(`https://api.thenextleg.io/v2/button`,data)

export const MjDescribeApi=(data)=>MjAxiosInstance.post(`https://api.thenextleg.io/v2/describe`,data);

//add images in db 

export const AddImageInDb=(data)=>axiosInstance.post("/image/create",data);

export const GetCompletedImagesOfUserApi=(userId)=>axiosInstance.get(`/image/${userId}?completed=true`)


export const GetProcessingImagesOfUserApi=(userId)=>axiosInstance.get(`/image/${userId}?completed=false`)

export const getCountUnseenImagesApi=(userId)=>axiosInstance.get(`/image/countUnseenImages/${userId}`)

export const setUnseenImageToSeenApi=(owner)=>axiosInstance.put(`/image/setUnseenToseen/${owner}`)

export const addButtonMessageIdApi=(messageId,data)=>axiosInstance.put(`/image/addBtnMessageId/${messageId}`,data)

export const setUnseenToSingleImageApi=(owner,imageId)=>axiosInstance.put(`/image/setUnseenToseen/${owner}?imageId=${imageId}`)


// user api

export const loginApi=(data)=>axiosInstance.post("/auth/login",data)

export const registerApi=(data)=>axiosInstance.post("/auth/register",data)

export const loggedInUserApi=()=>axiosInstance.get("/auth/loggedinUser")

export const logoutApi=()=>axiosInstance.post("/auth/logout")

// payment 

export const get_redirect_url_Api=(data)=>axiosInstance.post(`/payment/get_redirect_url`,data);