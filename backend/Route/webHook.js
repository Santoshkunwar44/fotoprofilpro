const { OnlineUsers } = require("../utils/services/SocketService")


const router =require("express").Router()

router.post("/response",async(req,res)=>{

//  console.log(socketIns)
const {email,payload} = req.body;
const user = OnlineUsers.getUser(email)
const io = req.app.get("io")

if(user){
   await user.sendMjResponse(io,payload)
    res.status(200).json({message:"webhook call success",success:true})
}else{
   await user.sendImageReadyEmail();
    res.status(200).json({message:"user is not online",success:false})
}


})

module.exports = router;