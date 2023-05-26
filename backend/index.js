const express = require("express")
const app = express();
app.use(express.json())

app.post("/image",(req,res)=>{
    console.log('webhook message',req.body)

})

app.listen(8000,()=>console.log('server started'))
