import axios  from "axios"



const axiosInstance =   axios.create({
    headers:{
        "Authorization":`Bearer ${process.env.REACT_APP_THENEXTLEG_TOKEN}`
    }
})

export const mjImagineApi = (data)=> axiosInstance.post(`https://api.thenextleg.io/v2/imagine`,data)

export const getMjResponseApi =(messagId) => axiosInstance.get(`https://api.thenextleg.io/v2/message/${messagId}`);

export const MjUpscaleApi=(data)=>axiosInstance.post(`https://api.thenextleg.io/v2/button`,data)
