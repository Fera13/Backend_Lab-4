const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var currentKey = ""
var currentPassword = ""

app.get('/', (req, res) => {
  res.redirect('/identify')
})

app.post('/identify', (req, res) => {
  const username = req.body.currentPassword
  const token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
  currentKey = token
  currentPassword = username
  res.redirect("/granted")
})

app.get('/identify', (req, res) => {
  res.render('identify.ejs')
})

function authenticateToken(req, res, next) {
  console.log("we are in the authentication controll function")
  next()
}

app.get('/granted', authenticateToken, (req, res) => {
  res.render('start.ejs')
})

app.listen(8000)

const bcrypt = require('bcryptjs')
const {getPass, insertUser, checkIfUserExists} = require("./database.js")
const staticPath = '/views'
const port = 5000

app.use( (req, res, next) => {
	console.log(`${req.method}  ${req.url}  `, req.body)
	next()
} )
app.use( express.static(staticPath) )