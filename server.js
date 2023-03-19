const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const staticPath = '/views'
const {getPass, insertUser, checkIfUserExists} = require("./database.js")

app.use( express.static(staticPath) )
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use( (req, res, next) => {
	console.log(`${req.method}  ${req.url}  `, req.body)
	next()
})


app.get('/', (req, res) => {
  res.redirect('/identify')
})

app.post('/identify', async(req, res) => {
  const id = req.body.id
  const role = req.body.role
  const username = req.body.username
  const password = req.body.password
  let userObj = { id: id, role: role, username: username, password: password }
  const userInfo = await getPass(username)
  console.log("database info", userInfo)
  if (!userInfo) {
    res.status(401).render('fail.ejs')
    return
  }
  const savedHash = userInfo.password
  if (!bcrypt.compareSync(password, savedHash)) {
    res.status(401).render('fail.ejs')
    return
  }

  const token = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET)
  currentKey = token            
  const cookieOptions = { 
    httpOnly: true, 
    maxAge: 86400000
  };
  
  res.cookie("jwt", token, cookieOptions); 
  res.redirect("/granted")
})

app.get('/identify', (req, res) => {
  res.render('identify.ejs')
})

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt
  if (!token) {
    res.redirect("/identify")
  } else if (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
    next()
  } else {
    res.status(403).redirect("/identify")
  }
}

app.get('/granted', authenticateToken, (req, res) => {
  res.render('start.ejs')
})

app.get("/REGISTER", async (req, res) => {
  res.render("register.ejs")
})

app.post("/REGISTER", async (req, res) => {
  try {
    const id = req.body.id
    const role = req.body.role
    const username = req.body.username
    const password = req.body.password

    if( await checkIfUserExists(username, id) ) {
      res.sendStatus(400)
      return
    }
    
    if( !isValidPassword(password) ) {
      console.log('Too easy password')
      res.sendStatus(400)
      return
    }
    
    /*if( !isWrongRole(role) ) {
      console.log('Bad role')
      res.sendStatus(400)
      return
    }*/

    const encryptedPass = await bcrypt.hash(password, 10)
    await insertUser(id, role, username, encryptedPass)
    res.status(200).redirect("/identify")
  } catch (e) {
    console.log("Error:", e)
    sendStatus(500)
  }
})

function rightRoleToAccess(roleObject) {
  return async (req, res, next) => {
    try {
      const roleCheck = req.body.role
      if (roleObject.includes(roleCheck)) {
        next()
      } else {
        res.sendStatus(401)
      }
    } catch (e) {
      console.log("Error:", e)
      sendStatus(500)
    }
  }
}

app.get('/admin', authenticateToken, rightRoleToAccess(['ADMIN']), async (req, res) => {
  const user = await getUserWithTheToken(req)
  res.render('admin.ejs', {user: user})
})

app.get('/student1', authenticateToken, rightRoleToAccess(['ADMIN', 'STUDENT1', 'TEACHER']), async (req, res) => {
  const user = await getUserWithTheToken(req)
  res.render('student1.ejs', {user: user})
})

app.get('/student2', authenticateToken, rightRoleToAccess(['ADMIN', 'STUDENT2', 'TEACHER']), async (req, res) => {
  const user = await getUserWithTheToken(req)
  res.render('student2.ejs', {user: user})
})

app.get('/teacher', authenticateToken, rightRoleToAccess(['ADMIN', 'TEACHER']), async (req, res) => {
  const user = await getUserWithTheToken(req)
  res.render('teacher.ejs', {user: user})
})

function getUserWithTheToken(req) {
  req.cookies.jwt
  const decryptedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = getPass(decryptedToken.username)
  return user
}

function isValidPassword(pw) {
	//minimum 8 characters
	if( !pw ) {
		return false
	}
	return pw.length >= 8
}

function isWrongRole(role) {
  if (role === "admin") {
    return false
  }
  return true
}

app.listen(8000)



