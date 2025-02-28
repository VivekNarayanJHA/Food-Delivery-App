const express = require('express');
const { addMenuItem, updateMenuItem, deleteMenuItem, getMenu } = require('../controllers/restaurantController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes (only accessible by restaurants)
router.post('/menu', authMiddleware, addMenuItem);
router.put('/menu/:id', authMiddleware, updateMenuItem);
router.delete('/menu/:id', authMiddleware, deleteMenuItem);
router.get('/menu', authMiddleware, getMenu);

module.exports = router;