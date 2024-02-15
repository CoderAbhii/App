const { body } = require('express-validator');

exports.addTodoValidation = [
    body('title').trim().isLength({ min: 2 }).withMessage('Todo Title must be at least 5 characters long'),
    body('description').trim().isLength({ min: 2 }).withMessage('Description must be at least 10 characters long'),
]