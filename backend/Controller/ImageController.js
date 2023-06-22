const ImageModel =  require("../Model/ImageModel")
class ImageController{
    async handleCreateImage(req,res){
        try {
                const savedImage = await ImageModel.create(req.body) 
                return res.status(200).json({message:savedImage,success:true})
            } catch (error) {
                return res.status(200).json({message:error.message,success:false})
        }
    }
    async getSingleImage(req,res){
        const {messageId} = req.params;
        try {

            const image = await ImageModel.findOne({
                messageId
            })

            return res.status(200).json({message:image,success:true})
            
        } catch (error) {
            return res.status(500).json({message:error.message,success:false})
        }
    }
    async getImagesOfUser(req,res){
        const {owner} = req.params;
        const {completed} = req.query;
        let images ;
 
        try {
            if(!owner){
                throw Error("Invalid request")
            }

            if(completed==="true"){

                images = await ImageModel.find({
                    owner ,
                    completed:true
                }).sort({updatedAt:-1})
            }else{
                    images = await ImageModel.find({
                    owner ,
                    completed:false
                }).sort({updatedAt:-1})
            }
            res.status(200).json({message:images,success:true})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({message:error.message,success:false})
        }
    }
    async getUnSeenImages(req,res){
        const {owner} = req.params;
        
        try {

            const imagesCount =await ImageModel.countDocuments({
                owner,
                seen:false,
                completed:true,
            })
            res.status(200).json({message:imagesCount,success:true})
        } catch (error) {
            console.log(error)

            res.status(500).json({message:error.message,success:false})
        }
    }

    async setUnseenImageToSeen(req,res){
        const {owner} =req.params;
        try {


            await ImageModel.updateMany({
                owner,
                seen:false,
            },
            {
                seen:true                
            });

            res.status(200).json({message:"successfuul",success:true})
            
        } catch (error) {
            res.status(500).json({message:error.message,success:false})
        }

    }

    async AddBtnMessageId(req,res){
        
        const {messageId} = req.params;
        const {btnId,button} = req.body;
  
            try {


           const updatedImage  = await ImageModel.findOneAndUpdate(
            {
                    messageId,
            },
            {
                $push:{btnMessageIds:{btnId,button}}               
            },
            {
                new:true,
                returnOriginal:false,
                returnDocument:true,

            });

            res.status(200).json({message:updatedImage,success:true})
            
        } catch (error) {
            res.status(500).json({message:error.message,success:false})
        }
    }
}

module.exports = new ImageController();