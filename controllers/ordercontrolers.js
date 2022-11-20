require("../routes/routes")
const Pizza = require("../models/pizzaSchema")
const Register = require("../models/registerSchema")
const bcrypt = require("bcrypt")
const session = require('express-session')
const passport = require('passport')
const Order = require('../models/orderShema')

const order = async (req, res) => {
    const { phone, address } = req.body
    if (!phone || !address) {
        req.flash('error', 'All Field are Required')
        return res.redirect('/cart')
    }
    const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone:phone,
        address:address,
    })

    const ordercart = await order.save()
    req.flash('error', 'Your Order Is Placed')
    delete req.session.cart

    res.redirect('/custome')

}
const orderBill = async (req, res) => {
    const orders = await Order.find({customerId: req.user._id},null,
        {sort:{'createdAt': -1}})
    
    // console.log(orders)
    res.render('order', {orders:orders})
   

}
// const Show = async(req,res)=>{
//     // const order = await Order.findById(req.params._id)
//     // authorize user
//     // if(req.user._id.toString() === order.customerId.toString()){
//     //     res.render('customer/singlePage', {order:order})
//     // }
//     res.render('singlePage')
// }


module.exports = {
    order,
    orderBill,
    
}