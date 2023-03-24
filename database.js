const sqlite3 = require("sqlite3").verbose();

const file = "users-database";
const db = new sqlite3.Database(file);

async function checkIfUserExists(name, id) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM Users WHERE name = ? AND userID = ?",
      name,
      id,
      (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows.length > 0);
        }
      }
    );
  });
}

async function insertUser(id, role, name, pass) {
  console.log(id, role, name, pass);
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO Users (userID, role, name, password) VALUES (?, ?, ?, ?)",
      id,
      role,
      name,
      pass,
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

async function getPass(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Users WHERE userID = ?", id, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        console.log(rows);
        resolve(rows[0]);
      }
    });
  });
}

async function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Users", (error, rows) => {
      if (error) {
        reject(error);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
}

module.exports = { getPass, insertUser, checkIfUserExists, getAllUsers };
