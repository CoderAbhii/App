const express = require('express');
const { addTodoController, updateTodoController, deleteTodoController, getAllTodoController, deleteAllTodoController } = require('../controllers/todoController');
const connection = require('../db/connection');
const { addTodoValidation } = require('../validations/validator');
const router = express.Router();

router.post('/addTodo',addTodoValidation, addTodoController(connection));

router.put('/updateTodo', updateTodoController(connection));

router.delete('/deleteTodo', deleteTodoController(connection));

router.get('/getTodo', getAllTodoController(connection));

router.delete('/deleteAllTodo', deleteAllTodoController(connection));


module.exports = router