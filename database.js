const sqlite3 = require('sqlite3').verbose()

const file = 'users-database'
const db = new sqlite3.Database(file)



async function checkIfUserExists(name, id) {
	return new Promise((resolve, reject) => {
		db.all('SELECT * FROM Users WHERE username = ? AND WHERE userID = ?', name, id, (error, rows) => {
			if (error) {
				reject(error)
			}
			else {
				resolve(rows.length > 0)
			}
		})
	})
}


async function insertUser(id, role, name, pass) {
	return new Promise((resolve, reject) => {
		db.run('INSERT INTO Users (userID, role, name, password) VALUES (?, ?, ?, ?)', id, role, name, pass, (error) => {
      if (error) {
        reject(error)
      }
      else {
        resolve()
      }
		})
	})
}


async function getPass(name) {
	console.log(name)
  return new Promise((resolve, reject) => {
		db.all('SELECT * FROM Users WHERE username = ?', (name), (error, rows) => {
      if (error) {
        reject(error)
      }
			else {
        resolve(rows[0])
      }
		})
	})
}


module.exports = { getPass , insertUser, checkIfUserExists}
