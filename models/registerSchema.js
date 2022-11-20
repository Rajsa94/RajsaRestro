const mongoose = require("mongoose")


const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role: { type: String, default: 'customer' },
    is_varified:{
        type:Number,
        default:0
    },
   
}, { timestamps: true })

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;