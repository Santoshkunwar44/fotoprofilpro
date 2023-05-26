const  mongoose  = require("mongoose")


const ImageSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    messageId:String,
    collectionImg:String,
    images:Array,
    buttons:Array,
    content:String,
},{
    timestamps:true
})
module.exports = mongoose.model("Image",ImageSchema);
