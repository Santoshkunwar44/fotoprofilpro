const UserModel = require("../model/UserModel");
const {UserService} = require("../utils/services/UserServices")
class AuthController{
    async handleRegister(req,res){
        const {password ,email} = req.body;
        try {
                const userExist=await UserService.ifEmailExist(email)
                if(!userExist){
                    req.body.password =  await UserService.hashPassword(password); 
                    const savedUser = await UserModel.create(req.body);
                    return res.status(200).json({message:savedUser,success:true})
                }else{
                    return res.status(400).json({message:"This email is already used", success:false})
                }
            } catch (error) {
                return res.status(500).json({message:error.message,success:false})
                
        }

    }
    async handleLogin(req,res){
        const {password,email} = req.body;
        try {
            const userExist= await UserService.ifEmailExist(email) 
            if(!userExist){
                throw Error("Invalid Email")
            }
            const isValid = await UserService.isPasswordCorrect(userExist._doc.password,password)
            if(isValid){
                const {password,...others} = userExist._doc
                return res.status(200).json({message:others,success:true})
            }else{
                throw Error("Invalid credentials");
            }
            } catch (error) {
                return res.status(500).json({message:error.message,success:false})
                
        }

    }
}
module.exports = new AuthController();