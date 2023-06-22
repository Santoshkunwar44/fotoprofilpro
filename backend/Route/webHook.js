const ImageModel = require("../Model/ImageModel");
const EmailService = require("../utils/services/EmailService");
const { OnlineUsers } = require("../utils/services/SocketService")


const router =require("express").Router()

router.post("/response",async(req,res)=>{

//  console.log(socketIns)
    const response =  req.body;
    const {originatingMessageId,buttonMessageId,imageUrl,buttons} = response
    let updatedImage ;
    // console.log(response)


try {
    
    if(response.type==="imagine"){

        
        updatedImage =  await ImageModel.findOneAndUpdate({
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
   
   
   
   
   
   
}else if(response.type==="button"){
    
    const {originatingMessageId,imageUrl} = response;
    
    
    const image = await ImageModel.findOne({
        "btnMessageIds.btnId":originatingMessageId
    })
    
    const buttonName = image.btnMessageIds.find(btn=>btn.btnId === originatingMessageId)?.button
    
    updatedImage = await ImageModel.findByIdAndUpdate(image._id,{
        $push:{images:{image:imageUrl,button:buttonName}}
    },
    {
        new:true,
        returnDocument:true, 
        returnOriginal:false,
    }).populate("owner")
    
    
    
    
    
    
    
    
    
}


console.log(updatedImage)
const {email,username} = updatedImage.owner;
const {messageId} = updatedImage; 

const user = OnlineUsers.getUser(email)
const io = req.app.get("io")

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