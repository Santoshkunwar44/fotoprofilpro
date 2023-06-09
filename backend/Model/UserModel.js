const  mongoose  = require("mongoose")


const UserSchema = mongoose.Schema({

    username:{
        type:String,
 
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:String,
},{
    timestamps:true
})
module.exports = mongoose.model("User",UserSchema)
