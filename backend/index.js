const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express")
const app = express();
const morgan = require("morgan")
const Emitter = require("events");
const http = require("http");
const server = http.createServer(app);
const MongoStore = require("connect-mongo")
const session = require("express-session")
const { Server } = require("socket.io");
require("dotenv").config()
app.use(cors({
    origin:["*","http://localhost:3000"],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))

const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],    
    methods: ["GET", "POST","PUT"],
    credentials: true,
  },    
})    

const EventEmiter = new Emitter();
app.set("EventEmitter", EventEmiter);
app.use(cookieParser())



const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  collectionName: "session_user",  
  ttl: 31556952000,
  autoRemove: "native",
});  

app.use(
  session({
    name:"photoprofile.sid",
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store,
    cookie:{
      secure:false,
    
      httpOnly:true,
      maxAge:31556952000,
    }  

}))    

require("dotenv").config()
app.use(express.json())
app.use(morgan("short"))



// calling a function that is defined in another file
require("./utils/setup/db")()
require("./utils/socket").socket(io,EventEmiter)




app.set('io',io)


require("./allRoutes")(app)
server.listen(8000,()=>console.log('server started'))
