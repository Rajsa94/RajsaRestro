// require("dotenv").config()
const express = require('express')
const app = express()
const   flash = require('express-flash')
const { connection } = require("mongoose")
const connectionDB = require("./db/db")
const PORT = process.env.PORT || 3300
const axios = require('axios')
const passport = require('passport')


const session = require('express-session')
const MongoDbStore = require('connect-mongo')

// connection all

app.use(express.static('public'))
app.use(flash());

// global middleware




// Session config
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoDbStore.create({
    mongoUrl: 'mongodb://localhost:27017/Session',
    dbName: 'Pizza'
  }),
  
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
  // cookie: { maxAge: 1000 * 15 } // 24 hours
}))
// passport config
const passportInit = require('./config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  
  next()
 
})

const router = require("./routes/routes.js")

// imp fill require
app.use(router)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})