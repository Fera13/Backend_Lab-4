# Backend_Lab-4

## What is it about and what does it intail?

This is a simple server that handles the authorization and authentication of the user when he tries to log in.
The user can also register if he is a new user and pick one of the two available roles (student, teacher)

Accessing the admin's route will render table of all the users' information.

a successful log-in will take you to your own appropiete window for your role.
Currently there are 4 roles: student1, student2 (based on the lab requierments), admin and the teacher role
You can only pick student which give the student2 role or a teacher when you register.

The specific dynamic routes can't be used by anyone but the owner but some roles like the teacher and admin have the access to the students' pages by using "/student1" and "/student2"
The admin has an extra privilage of accessing the teachers' page but no one can access the admin's page except the admin.

## How to launch the application?

1. The first step after cloning the github repository is to run the command "npm install" in the terminal. This will make sure that all the dependencies and libraries are properly installed.
2. There is already a database that comes with the cloning but if it doesn't or if it gets deleted for any reason, you can create a databse by using "node init-db.js" in the terminal
3. To run the server use "npm run runServer" and the server will run and start listening on port 8000
4. Open "http://localhost:8000/" on your browser and you're ready to go.
