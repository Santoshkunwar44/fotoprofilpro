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
    collectionImg:{
        type:String,
        default:""
    },
    images:Array,
    buttons:Array,
    completed:{
        type:Boolean,
        default:false,

    },
    seen:{
        type:Boolean,
        default:false,
    },
    btnMessageIds:[],
    buttonId:String,
    imageUrls:[],
},{
    timestamps:true
})
module.exports = mongoose.model("Image",ImageSchema);
