require("../routes/routes")
const Pizza = require("../models/pizzaSchema")
const Register = require("../models/registerSchema")
const bcrypt = require("bcrypt")
const session = require('express-session')
const passport = require('passport')
const allOrder = require('../models/orderShema')


const admin = (req,res)=>{
    allOrder.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
        if(req.xhr) {
            return res.json(orders)
        } else {
         return res.render('orders')
        }

        
    })
}
const adminStatus = (req,res)=>{
    allOrder.updateOne({_id: req.body.orderId},{status:req.body.status},(err, data)=>{
        if(err){
          return  res.redirect("/admin")

        }else{
          return  res.redirect("/admin")
        }
        

    })
}


module.exports = {
    admin,
    adminStatus
}