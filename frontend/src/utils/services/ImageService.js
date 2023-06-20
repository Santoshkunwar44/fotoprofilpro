import axios from "axios"
import { AddImageInDb, MjUpscaleApi, getMjResponseApi, mjImagineApi } from "../api";
import { Enums } from "../Enums";

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
        setUploadProgress
    }){
        this.uploadConfig=uploadConfig;
        this.AddCollectionUrl=AddCollectionUrl;
        this.setUploadProgress = setUploadProgress;
        this.AddMJImages = AddMJImages;
        this.StartFetching= StartFetching;
        this.imgPrompt= imgPrompt;
        this.StopFetching = StopFetching;
        this.setImgPrompt = setImgPrompt
        this.setMjProgress=setMjProgress
    };
    static async getCollectionImage(messageId){
        try {
                const res = await getMjResponseApi(messageId)
                if(res.status===200){
                    const {data:{response:{imageUrl,buttons  ,buttonMessageId},progress}}  = res;
                    if(progress===100){
                        return {imageUrl ,buttons ,buttonId:buttonMessageId}
                    }else{
                        return {}
                    }
                }else{
                    throw Error("something went wrong")
                }
        } catch (error) {
                console.log("something went wrong")
        }
    }

    static async getUpscaleImage(buttonId,button ,cb){
        try {
                const {data,status} = await MjUpscaleApi({
                    buttonMessageId:buttonId,
                    button
                })
                if(status===200){
                    const {messageId} = data;
                   let intervalId =  setInterval(async()=>{
                        const {imageUrl}= await this.getCollectionImage(messageId)
                        if(imageUrl){
                            console.log("the image",imageUrl)
                            cb({
                                imageUrl,
                                button
                            })
                            clearInterval(intervalId)
                        }
                    },1000)
                }
        } catch (error) {
            console.log(error)
        }
    }

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


    // returns meessage id
    async createImagine(){
        try {   
                this.StartFetching()
                const {data,status} = await mjImagineApi({
                    msg:`${this.imgPrompt} ultra realistic creative `
                });
                if(status===200){
                    const {messageId} = data;
                    await AddImageInDb({
                        owner:"6470ddf84817e411c86215b9",
                        content:`${this.imgPrompt} ultra realistic creative `,
                        messageId ,
                        promtImg:this.imgPrompt
                    })
                    this.setImgPrompt("")
                    await this.handleIntervalCall(messageId)       
                }
        } catch (error) {
            console.log(error)
        }
    }



    async getSinglePhotoMessage(messageArr){
        let i =0;
        let id =  setInterval(async() => {
          
            if(i===4){
                this.StopFetching()
                return clearInterval(id)
            }
            
             const {status,data:{response:{imageUrl}} } =await  getMjResponseApi(messageArr[i])
             console.log("adding to mg",imageUrl)
             this.AddMJImages(imageUrl)
             i++;

         }, 2000);
    }


    // returns message id
    async getSinglePhotoMessageId(buttons,buttonMessageId){

        let messageIdArr = []
        let i =0;
       let id =  setInterval(async() => {
           console.log(messageIdArr,i)
            let button= buttons[i];
            if(i=== 4){
                console.log('all',messageIdArr)
                return clearInterval(id)
            }
            try {
                const {status,data:{messageId} } =await  MjUpscaleApi({
                    button,
                    buttonMessageId
                })
                i++;
                messageIdArr.push(messageId)
            } catch (error) {
                console.log(error)
            }
        }, 3000);
    }


   



    // return content or progress;

    async getImageData(messageId){
        try {
           const {status,data} = await getMjResponseApi(messageId)     
           if(status===200){
            const {progress,response:{imageUrl,buttons,buttonMessageId}}= data;
            if(progress===100){
                this.setMjProgress(100);
                clearInterval(this.uploadConfig.current.intervalId);
                this.AddCollectionUrl(imageUrl)
                // this.getSinglePhotoMessageId(buttons,buttonMessageId)

                
            }else{
                console.log(progress)
                this.setMjProgress(progress || 10)
            }
           }
        } catch (error) {
            
        }
    }

    async handleIntervalCall(messagId,type){
            this.uploadConfig.current.intervalId=setInterval(()=>{
                this.getImageData(messagId)
            }, 1000);
    }

    


}

export {ImageService}