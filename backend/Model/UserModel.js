const  mongoose  = require("mongoose")


const UserSchema = mongoose.Schema({

    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    stripeCustomerId:String,
    password:String,
},{
    timestamps:true
})
module.exports = mongoose.model("User",UserSchema);
