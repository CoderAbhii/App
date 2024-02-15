const { validationResult } = require('express-validator');

/**
 * @DESC Add a todo controller
 */
exports.addTodoController = (connection) => async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }

        const { title, description } = req.body;
        const sql = 'INSERT INTO todos (title, description) VALUES (?, ?)';
        connection.query(sql, [title, description], (err, result) => {
            if (err) {
                console.error('Error adding user to database:', err);
                res.status(500).send('Error adding user to database');
                return;
            }
            res.status(201).json({
                success: true,
                message: "Todo added successfully"
            });
        });
    } catch (error) {
        res.json({
            status: 500,
            error: "Internal Server Error",
            errCause: error.message
        });
    }
};

/**
 * @DESC Update a todo controller
 */
exports.updateTodoController = (connection) => async (req, res) => {
    try {
        const { id, title, description } = req.body;

        const sql = 'UPDATE todos SET title = ?, description = ? WHERE id = ?';
        connection.query(sql, [title, description, id], (err, result) => {
            if (err) {
                console.error('Error updating todo in the database:', err);
                res.status(500).send('Error updating todo in the database');
                return;
            }
            console.log('Todo updated in the database:', result);
            res.status(200).send('Todo updated in the database');
        });
    } catch (error) {
        res.json({
            status: 500,
            error: "Internal Server Error",
            errCause: error.message
        });
    }
};

/**
 * @DESC Delete a todo controller
 */
exports.deleteTodoController = (connection) => async (req, res) => {
    try {
        const { id } = req.body;

        const sql = 'DELETE FROM todos WHERE id = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting todo from the database:', err);
                res.status(500).send('Error deleting todo from the database');
                return;
            }
            console.log('Todo deleted from the database:', result);
            res.status(200).send('Todo deleted from the database');
        });
    } catch (error) {
        res.json({
            status: 500,
            error: "Internal Server Error",
            errCause: error.message
        });
    }
};

/**
* @DESC Get all todo controller
*/
exports.getAllTodoController = (connection) => async (req, res) => {
    try {
        const { search } = req.query;
        let sql;

        if (search) {
            sql = 'SELECT * FROM todos WHERE title LIKE ? OR description LIKE ?';
            const searchTerm = `%${search}%`;
            connection.query(sql, [searchTerm, searchTerm], (err, results) => {
                if (err) {
                    console.error('Error searching todos in the database:', err);
                    res.status(500).send('Error searching todos in the database');
                    return;
                }
                console.log('Todos retrieved from database:', results);
                res.status(200).json(results);
            });
        } else {
            // If no search term is provided, fetch all todos
            sql = 'SELECT * FROM todos';
            connection.query(sql, (err, results) => {
                if (err) {
                    console.error('Error getting todos from database:', err);
                    res.status(500).send('Error getting todos from database');
                    return;
                }
                console.log('Todos retrieved from database:', results);
                res.status(200).json(results);
            });
        }
    } catch (error) {
        res.json({
            status: 500,
            error: "Internal Server Error",
            errCause: error.message
        });
    }
};


/**
 * @DESC Delete all todos controller
 */
exports.deleteAllTodoController = (connection) => async (req, res) => {
    try {
        const sql = 'DELETE FROM todos';
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error deleting all todos from the database:', err);
                res.status(500).send('Error deleting all todos from the database');
                return;
            }
            res.status(200).send('All todos deleted from the database');
        });
    } catch (error) {
        res.json({
            status: 500,
            error: "Internal Server Error",
            errCause: error.message
        });
    }
};