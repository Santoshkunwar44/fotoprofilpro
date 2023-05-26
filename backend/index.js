const express = require("express")
const app = express();
require("dotenv").config()

app.use(express.json())




// calling a function that is defined in another file
require("./utils/setup/db")()



require("./allRoutes")(app)
app.listen(8000,()=>console.log('server started'))
