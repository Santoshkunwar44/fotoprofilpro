const Enums = require("./Enums");
const { OnlineUsers, AppUser } = require("./services/SocketService");



function socket(io ,EventEmiter){



io.on("connection", (socket) => {




    socket.on("join",(email)=>{

        if(OnlineUsers.getUser(email))return;
        socket.join(socket.id)
        const newUser =  new AppUser(email,socket.id)
        OnlineUsers.addUser(newUser);
        console.log(OnlineUsers.usersList);
    })


    socket.on("leave",email=>{
        
        OnlineUsers.removeUser(email);
        console.log("remaining ",OnlineUsers.usersList)
    })
    
    socket.on("disconnect",()=>{
        OnlineUsers.removeUserById(socket.id)
        console.log(OnlineUsers.usersList)
    })
    


})




}
module.exports =  {socket};