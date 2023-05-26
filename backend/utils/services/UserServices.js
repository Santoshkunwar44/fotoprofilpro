const bcrypt = require("bcryptjs");
const UserModel = require("../../model/UserModel");



class UserService{
   static  async hashPassword(password ){

        try {
                const  salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(password,salt)
                return hashed;
        } catch (error) {
            console.log(error)
            return error            
        }
    }
    static async ifEmailExist(email){
        try {
                const user = await UserModel.findOne({
                    email
                })
                console.log("the email",user)
                return user
        } catch (error) {
            console.log(error)
            return error.messsage
        }
    }

    static async isPasswordCorrect(correctPassword,userPassword){
        try {
        return   await bcrypt.compare(userPassword,correctPassword)
        } catch (error) {
            console.log(error)
            return error.messsage
        }
    }
    }
module.exports =  {UserService}