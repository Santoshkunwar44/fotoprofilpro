import axios from "axios"
import { AddImageInDb, mjImagineApi } from "../api";


const cloudName ="onlinecoder"
const presetKey="imgVariation"

class ImageService{
    constructor({   
         imgPrompt,
        uploadConfig,
        StopFetching,
        StartFetching,
        AddCollectionUrl,
        AddMJImages,
        setImgPrompt,
        setMjProgress,
        setUploadProgress,
        setMessageId,
        user
    }){
        this.uploadConfig=uploadConfig;
        this.AddCollectionUrl=AddCollectionUrl;
        this.setUploadProgress = setUploadProgress;
        this.AddMJImages = AddMJImages;
        this.StartFetching= StartFetching;
        this.imgPrompt= imgPrompt;
        this.StopFetching = StopFetching;
        this.setImgPrompt = setImgPrompt
        this.setMjProgress=setMjProgress;
        this.user = user;
        this.setMessageId = setMessageId
    };
   

 

    async uploadImageToCloudinary(file){
    const formData = new FormData()
    formData.append("file",file)
    formData.append("upload_preset",presetKey)
    try {
    const res = await  axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      onUploadProgress:e=>{
        this.setUploadProgress(Math.round((100*e.loaded)/e.total));
      }
    })
    this.setImgPrompt(res?.data?.secure_url)
  } catch (error) {
    console.log(error)
  }

    }


    async createImagine(){
      const textPrompt = `${this.imgPrompt} ultra realistic mixed `
        try {   
              

                const {data,status} = await mjImagineApi({
                    msg:textPrompt
                });
                if(status===200){
                    const {messageId} = data;
                    await AddImageInDb({
                        owner:this.user?._id,
                        content:textPrompt,
                        messageId ,
                        promtImg:this.imgPrompt
                    })
                    this.setMessageId(messageId)
                    this.setImgPrompt("")
              }
        } catch (error) {
            console.log(error)
        }
    }




   



 


}

export {ImageService}

// {
//   "content": "<https://s.mj.run/xJDmUZMPrq4> ultra realistic creative santosh@gmail.com",
//   "imageUrl": "https://cdn.discordapp.com/attachments/1103427856962433126/1120610570090053713/ScottiemPerry_ultra_realistic_creative_santoshgmail.com_6c19313a-d835-486e-8c49-b86c3659a470.png",
//   "buttons": [
//     "U1",
//     "U2",
//     "U3",
//     "U4",
//     "V1",
//     "V2",
//     "V3",
//     "V4"
//   ],
//   "createdAt": "2023-06-20T07:06:19.998Z",
//   "responseAt": "2023-06-20T07:06:23.403Z",
//   "description": "",
//   "type": "imagine",
//   "originatingMessageId": "IUv6ytQhK5ORnj3xVJsI",
//   "buttonMessageId": "9u93rQ0qJIL11iDDDT0n"
// }