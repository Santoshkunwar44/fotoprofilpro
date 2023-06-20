const ImageModel = require("../Model/ImageModel");
const EmailService = require("../utils/services/EmailService");
const { OnlineUsers } = require("../utils/services/SocketService")


const router =require("express").Router()

router.post("/response",async(req,res)=>{

//  console.log(socketIns)
const response =  req.body;
const {originatingMessageId,buttonMessageId,imageUrl,buttons} = response
if(response.type==="imagine"){


  const updatedImage =  await ImageModel.findOneAndUpdate({
    messageId:originatingMessageId
},{
    collectionImg:imageUrl,
    buttonId:buttonMessageId,
    buttons,
    completed:true
   },{
    new:true,
    returnOriginal:false,
    returnDocument:true,
   }).populate(["owner"])


   console.log("updated image",updatedImage);

   const user = OnlineUsers.getUser(updatedImage.owner?.email)
   const io = req.app.get("io")


   try {
       
       if(user){

       await user.sendMjResponse(io,updatedImage);
       res.status(200).json({message:"webhook call success",success:true})

    }else{
        
        
        const {email,username} = updatedImage.owner;
        await EmailService.sendImageReadyEmail(email,username,originatingMessageId);
        res.status(200).json({message:"email sent succesfully",success:false})
        
        
    }
    
   } catch (error) {
    console.log(error)
   }




}else if(response.type==="button"){




}


console.log(response)


})

module.exports = router;