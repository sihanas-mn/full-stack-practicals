const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//GET all items
router.get('/', async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
});

//POST a new item
router.post('/', async (req, res) => {
    const newTodo = new Todo({ title: req.body.title });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

//PUT updates to task status
router.put('/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true }
    );
    res.json(updatedTodo);
});

//DELETE a task
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
});

module.exports = router;