const sqlite3 = require("sqlite3").verbose();
const file = "users-database";
const db = new sqlite3.Database(file);

const bcrypt = require("bcryptjs");

let errors = 0;

db.serialize(() => {
  db.run(
    `
	CREATE TABLE Users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
    userID TEXT NOT NULL,
    role TEXT NOT NULL,
		name TEXT NOT NULL,
		password TEXT NOT NULL
	)`,
    {},
    (error) => {
      errors++;
    }
  );
  db.run(
    `INSERT INTO Users (userID, role, name, password) VALUES ('id1', 'student', 'user1', '$2a$10$ZFhawM/K8p8PFS2z5CEjkuzi3hgIG4qAmuXSJgGV2TT9Ov1B3q0Zm');`,
    {},
    (error) => {
      errors++;
    }
  );
  db.run(
    `INSERT INTO Users (userID, role, name, password) VALUES ('id2', 'student', 'user2', '$2a$10$22tDDxFqUpQrA6m4UsrBZeAMtsWW6/6BBfFA2AZyq7sMwV89CPoiW'); `,
    {},
    (error) => {
      errors++;
    }
  );
  db.run(
    `INSERT INTO Users (userID, role, name, password) VALUES ('id3', 'teacher', 'user3', '$2a$10$BVKltErDl7GwieglFWKTN.NoKB6nYjjCjh5wzY2rBQnet94px.F9W'); `,
    {},
    (error) => {
      errors++;
    }
  );
  db.run(
    "INSERT INTO Users (userID, role, name, password) VALUES ('admin', 'admin', 'admin', '$2a$10$Kos7E9pYFLukRTYsQ/F7GeCGc6/80/lly5Vgl1cRra/.JWx6fBKKq'); ",
    {},
    (error) => {
      errors++;
    }
  );
});

console.log(`Number of errors: ` + errors);
