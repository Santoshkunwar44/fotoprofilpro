const express = require("express")
const app = express();
const morgan = require("morgan")
const Emitter = require("events");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
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


require("dotenv").config()
const cors = require("cors")
app.use(express.json())
app.use(morgan("short"))
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))




// calling a function that is defined in another file
require("./utils/setup/db")()
require("./utils/socket").socket(io,EventEmiter)




app.set('io',io)


require("./allRoutes")(app)
server.listen(8000,()=>console.log('server started'))
