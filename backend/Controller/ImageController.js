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
    async getImagesOfUser(req,res){
        const {owner} = req.params;
        const {completed} = req.query;
        let images ;
        console.log(completed)
        try {
            if(!owner){
                throw Error("Invalid request")
            }

            if(completed==="true"){

                images = await ImageModel.find({
                    owner ,
                    completed:true
                })
            }else{
                    images = await ImageModel.find({
                    owner ,
                    completed:false
                })
            }
            res.status(200).json({message:images,success:true})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({message:error.message,success:false})
        }
    }
}

module.exports = new ImageController();