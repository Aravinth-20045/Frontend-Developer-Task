const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authenticate = require('../middleware/auth');
const { Task } = require('../models');

// Get all tasks for authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId }
    });

    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'Todo').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      completed: tasks.filter(t => t.status === 'Completed').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get single task
router.get('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Create task
router.post('/', authenticate, [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('status').optional().isIn(['Todo', 'In Progress', 'Completed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, status } = req.body;

    const task = await Task.create({
      title,
      status: status || 'Todo',
      userId: req.userId
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
router.put('/:id', authenticate, [
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('status').optional().isIn(['Todo', 'In Progress', 'Completed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { title, status } = req.body;

    if (title) task.title = title;
    if (status) task.status = status;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
