

class OnlineUsers{
    static usersList=[];

   static addUser(user){

    this.usersList.push(user)        

    }

    static getUser(email){

      return  this.usersList.find(user=>user.email === email)

    }

    static removeUser(email){

        this.usersList =  this.usersList.filter(user=>user.email !== email)

    }
    static removeUserById(socketId){
                this.usersList =  this.usersList.filter(user=>user.socketId !== socketId)
    }
}

class AppUser{

    


    constructor(email,socketId){
        this.email = email;
        this.socketId= socketId;
    }

    async sendImageReadyEmail(){

        try {
            console.log("SENDING EMAIL")
        } catch (error) {
            
        }

    }




    async sendMjResponse(io,response){
       
       io.to(this.socketId).emit("response",response);
    }


}
module.exports = {AppUser,OnlineUsers}