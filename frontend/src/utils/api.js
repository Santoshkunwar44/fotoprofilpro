import axios  from "axios"



const MjAxiosInstance =   axios.create({
    headers:{
        "Authorization":`Bearer ${process.env.REACT_APP_THENEXTLEG_TOKEN}`
    }
})
const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL
})

export const mjImagineApi = (data)=> MjAxiosInstance.post(`https://api.thenextleg.io/v2/imagine`,data)

export const getMjResponseApi =(messagId) => MjAxiosInstance.get(`https://api.thenextleg.io/v2/message/${messagId}`);

export const MjUpscaleApi=(data)=>MjAxiosInstance.post(`https://api.thenextleg.io/v2/button`,data)



//add images in db 

export const AddImageInDb=(data)=>axiosInstance.post("/image/create",data);

export const GetImagesOfUser=(userId)=>axiosInstance.get(`/image/${userId}`)





