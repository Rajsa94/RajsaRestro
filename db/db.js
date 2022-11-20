// getting-started.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Rathore:Ra9680879504%23@cluster0.1dhc6u9.mongodb.net/Pizza")
.then(()=>{
    console.log('connection is successful');
}).catch((e)=>{
    console.log("no connection")
})
  
  
