const express = require("express")
const app = express();
const morgan = require("morgan")
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



require("./allRoutes")(app)
app.listen(8000,()=>console.log('server started'))
