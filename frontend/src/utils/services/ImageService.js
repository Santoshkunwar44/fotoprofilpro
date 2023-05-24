import axios from "axios"
import { MjUpscaleApi, getMjResponseApi, mjImagineApi } from "../api";
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
                const {data,status} = await mjImagineApi({
                    msg:`${this.imgPrompt} normal`
                });
                if(status===200){
                    const {messageId} = data;
                    await this.handleIntervalCall(messageId)       
                }

        } catch (error) {
            console.log(error)
        }
    }



    async getSinglePhotoMessage(messageArr){
        console.log("inside the main",messageArr)
        let i =0;
        let id =  setInterval(async() => {
          
            if(i===4){
                return clearInterval(id)
            }
            
             const {status,data:{response:{imageUrl}} } =await  getMjResponseApi(messageArr[i])
             console.log("adding to mg",imageUrl)
             this.AddMJImages(imageUrl)
             i++;

         }, 1500);
    }


    // returns message id
    async getSinglePhotoMessageId(buttons,buttonMessageId){

        let messageIdArr = []
        let i =0;
       let id =  setInterval(async() => {
           console.log(messageIdArr)
            let button= buttons[i];
            if(i=== 4){
                this.getSinglePhotoMessage(messageIdArr)
                console.log('all',messageIdArr)
                return clearInterval(id)
            }
            const {status,data:{messageId} } =await  MjUpscaleApi({
                button,
                buttonMessageId
            })
            i++;
            messageIdArr.push(messageId)
        }, 1000);
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
                this.getSinglePhotoMessageId(buttons,buttonMessageId)

                
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