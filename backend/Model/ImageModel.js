const  mongoose  = require("mongoose")


const ImageSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    content:String,
    messageId:String,
    promtImg:String,
    collectionImg:String,
    images:Array,
    buttons:Array,
},{
    timestamps:true
})
module.exports = mongoose.model("Image",ImageSchema);
