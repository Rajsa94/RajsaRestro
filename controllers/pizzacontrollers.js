require("../routes/routes.js")
const Pizza = require("../models/pizzaSchema")
const Register = require("../models/registerSchema")
const bcrypt = require("bcrypt")
const session = require('express-session')
const passport = require('passport')

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)
        return passwordHash;
    } catch (error) {
        console.log(error.message)
    }
}



const home = async (req, res) => {

    try {
        const pizza = await Pizza.find({})

        res.render("index", { pizza })
    } catch (error) {
        console.log(error.message)
    }
}
const cart = (req, res) => {
    res.render("cart")
}
const login = (req, res) => {
    res.render("login")
}
const register = (req, res) => {
    res.render("register")
}
const add = (req, res) => {
    res.render("add")
}
const addPizza = async (req, res) => {

    try {

        const plizza = new Pizza({
            name: req.body.name,
            image: req.file.filename,
            size: req.body.size,
            price: req.body.price
        })
        const Pizzapai = await plizza.save()

        res.redirect("/")
    } catch (error) {
        console.log(error.message)
    }


}
const update = async (req, res) => {

    // let cart = {
    //     items: {
    //         pizzaId: { item: pizzaObject, qty:0 },
    //         pizzaId: { item: pizzaObject, qty:0 },
    //         pizzaId: { item: pizzaObject, qty:0 },
    //     },
    //     totalQty: 0,
    //     totalPrice: 0
    // }
    // for the first time creating cart and adding basic object structure
    if (!req.session.cart) {
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }
    let cart = req.session.cart

    // Check if item does not exist in cart 
    if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
            item: req.body,
            qty: 1
        }
        cart.totalQty = cart.totalQty + 1
        let a = cart.totalPrice;
        let b = req.body.price;
        
        cart.totalPrice = (a - 0) + (b - 0);
    } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
        cart.totalQty = cart.totalQty + 1
        let a = cart.totalPrice;
        let b = req.body.price;
        
        cart.totalPrice = (a - 0) + (b - 0);
       
        // cart.totalPrice = cart.totalPrice + req.body.price

    }
    return res.json({ totalQty: req.session.cart.totalQty })

}
const DBregister = async (req, res) => {


    const email = req.body.email
    const sPassword = await securePassword(req.body.pass)

    Register.exists({ email: email }, (err, result) => {

        if (result) {
            req.flash('error', 'Your Email  Already Exits')
            res.render("register")


        } else {

            console.log(sPassword)
            const Regis = new Register({
                name: req.body.name,

                email: req.body.email,
                password: sPassword
            })



            const register = Regis.save()
            res.redirect("/login")
        }


    })



}
const postlogin = (req, res, next) => {
    const { email, password } = req.body
    // Validate request 
    if (!email || !password) {
        req.flash('error', 'All fields are required')
        return res.redirect('/login')
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            req.flash('error', info.message)
            return next(err)
        }
        if (!user) {
            req.flash('error', info.message)
            return res.redirect('/login')
        }
        req.logIn(user, (err) => {
            if (err) {
                req.flash('error', info.message)
                return next(err)
            }

            return res.redirect('/')
        })
    })(req, res, next)
}
const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/login")
    } catch (error) {
        console.log(error.message)
    }
}







module.exports = {
    home,
    cart,
    register,
    login,
    add,
    addPizza,
    update,
    DBregister,
    postlogin,
    logout
}