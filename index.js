const express = require('express');
require('dotenv').config();
const db = require('./db');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

// USERS
app.post('/users', userController.createUser)
app.get('/users', userController.getAllUsers)
app.delete('/users/:id', userController.destroyUser)


//TASKS
app.post('/tasks', taskController.createTask);
app.get('/get-tasks-by-user', taskController.getTasksByUser)

// db().then(() => {
//     console.log('hola');
// })

// app.listen(PORT, () => {
//     console.log("Server runinng on port: " + PORT);
// })

db()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server is running: ' + PORT);
        });
    })
    .catch((error) => {
        console.log("Error Connecting to mongoDB", error);
    });