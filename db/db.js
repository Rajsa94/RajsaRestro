// getting-started.js
const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://Rathore:Ra9680879504%23@cluster0.1dhc6u9.mongodb.net/Pizza", {  useUnifiedTopology: true })
// .then(()=>{
//     console.log('connection is successful');
// }).catch(err => {
//     console.log('Connection failed...')
// });

mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});
  
  
