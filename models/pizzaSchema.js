const mongoose = require("mongoose")


const pizzaSSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    size:{
        type:String,
        require:true
    }
})

const pizzaMenu = mongoose.model('pizzaMenu', pizzaSSchema);

module.exports = pizzaMenu;