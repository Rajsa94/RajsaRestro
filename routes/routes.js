
const express = require('express')
const multer = require("multer")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const axios = require('axios')
const bcrypt = require('bcrypt');
const session = require('express-session')
const passport = require('passport')
const guest = require('../middleware/guest')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const expressLayout = require('express-ejs-layouts')



const router = express()
require("../db/db")
const pizzacontroler = require("../controllers/pizzacontrollers")
const ordercontroler = require("../controllers/ordercontrolers")
const admincontroler = require("../controllers/adnmincontroler")
router.use(express.static('uploads'))

router.use(bodyParser.json());
router.use(bodyParser.urlencoded(
  { extended: false }
))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  });
  
  // this code will handle file types like jpeg, jpg, and png
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // define limit 5mb max file upload size
    },
    fileFilter: fileFilter
  });


// imp fill require
router.set("view engine", "ejs")
router.use(express.static('public'))
router.use(expressLayout)
// app.set('views', path.join(__dirname, '/resources/views'))



router.get("/", pizzacontroler.home)
router.get("/cart", pizzacontroler.cart)
router.get("/register",guest, pizzacontroler.register)
router.post("/register", pizzacontroler.DBregister)

router.get("/login",guest, pizzacontroler.login)
router.post("/login", pizzacontroler.postlogin)
router.get("/add", pizzacontroler.add)
router.post("/add",upload.single('image'), pizzacontroler.addPizza)
// javascript files use axios
router.post("/update-cart", pizzacontroler.update)
router.get("/logout", pizzacontroler.logout)

// ordercontroler
router.post("/order",auth, ordercontroler.order)
router.get("/custome",auth, ordercontroler.orderBill)
// router.get("/:id", ordercontroler.Show)
 

// admin controler
router.get("/admin",admin, admincontroler.admin)
router.post("/status",admin, admincontroler.adminStatus)


module.exports = router;