const sqlite3 = require('sqlite3').verbose()

const file = 'users-database'
const db = new sqlite3.Database(file)

let errors = 0

db.serialize(() => {
	db.run(`
	CREATE TABLE Users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
    userID TEXT NOT NULL,
    role TEXT NOT NULL,
		name TEXT NOT NULL,
		password TEXT NOT NULL
	)`, {}, error => { errors++ })
  db.run(`INSERT INTO Users (userID, role, name, password) VALUES ('id1', 'student', 'user1', 'password'); `, {}, error => { errors++ })
  db.run(`INSERT INTO Users (userID, role, name, password) VALUES ('id2', 'student', 'user2', 'password2'); `, {}, error => { errors++ })
  db.run(`INSERT INTO Users (userID, role, name, password) VALUES ('id3', 'teacher', 'user3', 'password3'); `, {}, error => { errors++ })
  db.run(`INSERT INTO Users (userID, role, name, password) VALUES ('admin', 'admin', 'admin', 'admin'); `, {}, error => { errors++ })
})

console.log(`Number of errors: ` + errors)
