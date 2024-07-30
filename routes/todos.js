const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const todosFilePath = path.join(__dirname, '../data/todos.json');

// Helper function to read todos from file
const readTodos = () => {
    if (fs.existsSync(todosFilePath)) {
        const data = fs.readFileSync(todosFilePath);
        return JSON.parse(data);
    }
    return [];
};

// Helper function to write todos to file
const writeTodos = (todos) => {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
};

// Fetch Todos
router.get('/', (req, res) => {
    const todos = readTodos();
    res.json(todos);
});

// Add Todo
router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    const todos = readTodos();
    const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
});

// Update Todo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    const todos = readTodos();
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.text = text;
    todo.updatedAt = new Date().toISOString();
    writeTodos(todos);
    res.json(todo);
});

// Delete Todo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let todos = readTodos();
    todos = todos.filter(todo => todo.id !== id);
    writeTodos(todos);
    res.status(204).end();
});

// Mark as Done
router.patch('/:id/done', (req, res) => {
    const { id } = req.params;
    const todos = readTodos();
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    writeTodos(todos);
    res.json(todo);
});

module.exports = router;
