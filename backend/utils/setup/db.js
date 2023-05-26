const mongooose = require("mongoose")







// defining a function and exporting so other file can use it 

module.exports =  async()=>{
   const conn =  await mongooose.connect(process.env.MONGO_URI);
   console.log(`connected to db ${conn.connection.host}`)
   
}