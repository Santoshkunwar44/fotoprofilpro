const ImageModel = require("../Model/ImageModel");
const EmailService = require("../utils/services/EmailService");
const { OnlineUsers } = require("../utils/services/SocketService")


const router =require("express").Router()

router.post("/response",async(req,res)=>{

//  console.log(socketIns)
    const response =  req.body;
    const {originatingMessageId, imageUrls,buttonMessageId,imageUrl,buttons,content} = response
    let updatedImage ;
    // console.log(response)

    if(content==="JOB_ACTION_RESTRICTED" ){
        return    res.status(500).json({message:"something went wrong."})
    }



try {
     if(response.type==="imagine"){

        
        updatedImage =  await ImageModel.findOneAndUpdate({
            messageId:originatingMessageId
        },{
            collectionImg:imageUrl,
            buttonId:buttonMessageId,
            imageUrls,
            buttons,
            completed:true
        },{
            new:true,
    returnOriginal:false,
    returnDocument:true,
   }).populate(["owner"])
   
   
   
   
   
   
}else if(response.type==="describe"){

        
        updatedImage =  await ImageModel.findOneAndUpdate({
            messageId:originatingMessageId
        },{
           completed:true,
           description:content,
        },{
            new:true,
            returnOriginal:false,
            returnDocument:true,
        }).populate(["owner"])
   
}

console.log(updatedImage,response)
const {email,username} = updatedImage.owner;
const {messageId} = updatedImage; 

const user = OnlineUsers.getUser(email)
const io = req.app.get("io")

updatedImage.type=response.type;
if(user){
    await user.sendMjResponse(io,updatedImage);
}



    
await EmailService.sendImageReadyEmail(email,username,messageId);
res.status(200).json({message:"email sent succesfully",success:true})


} catch (error) {


    res.status(500).json({message:error.message,success:false})

}



})

module.exports = router;