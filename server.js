const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const staticPath = '/views'

app.use( express.static(staticPath) )
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use( (req, res, next) => {
	console.log(`${req.method}  ${req.url}  `, req.body)
	next()
} )

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
  if (currentKey == "") {
    res.redirect("/identify")
  } else if (jwt.verify(currentKey, process.env.ACCESS_TOKEN_SECRET)) {
    //if it's in db as an admin next
    //else send 401
    next()
  } else {
    res.status(401).redirect("/identify")
  }
}

app.get('/granted', authenticateToken, (req, res) => {
  res.render('start.ejs')
})

//
function authenticateAdminToken(req, res, next) {
  if (currentKey == "") {
    res.redirect("/identify")
  } else if (jwt.verify(currentKey, process.env.ACCESS_TOKEN_SECRET)) {
    //if it's in db as an admin next
    //else send 401
    next()
  } else {
    res.status(401).redirect("/identify")
  }
}
//
app.get('/admin', authenticateAdminToken, (req, res) => {
  res.render('admin.ejs')
})

function authenticateStud1Token(req, res, next) {
  if (currentKey == "") {
    res.redirect("/identify")
  } else if (jwt.verify(currentKey, process.env.ACCESS_TOKEN_SECRET)) {
    //if it's in db as an admin, teacher, student1 then do next
    //else send 401
    next()
  } else {
    res.status(401).redirect("/identify")
  }
}

app.get('/student1', authenticateStud1Token, (req, res) => {
  res.render('student1.ejs')
})

function authenticateStud2Token(req, res, next) {
  if (currentKey == "") {
    res.redirect("/identify")
  } else if (jwt.verify(currentKey, process.env.ACCESS_TOKEN_SECRET)) {
    //if it's in db as an admin, teacher, student2 then do next
    //else send 401
    next()
  } else {
    res.status(401).redirect("/identify")
  }
}

app.get('/student2', authenticateStud2Token, (req, res) => {
  res.render('student2.ejs')
})

function authenticateTeacherToken(req, res, next) {
  if (currentKey == "") {
    res.redirect("/identify")
  } else if (jwt.verify(currentKey, process.env.ACCESS_TOKEN_SECRET)) {
    //if it's in db as an admin, teacher then do next
    //else send 401
    next()
  } else {
    res.status(401).redirect("/identify")
  }
}

app.get('/teacher', authenticateTeacherToken, (req, res) => {
  res.render('teacher.ejs')
})

app.listen(8000)


//const {getPass, insertUser, checkIfUserExists} = require("./database.js")
