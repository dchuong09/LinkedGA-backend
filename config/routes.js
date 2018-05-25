const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Routes
router.get('/api/users', userController.index);
router.post('/api/users', userController.create);
router.get('/api/users/:user_id', userController.show);
router.put('/api/users/:user_id', userController.update);
router.delete('/api/users/:user_id', userController.destroy);


module.exports = router;