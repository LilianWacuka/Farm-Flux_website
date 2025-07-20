const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updatePassword } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update-password', updatePassword);

module.exports = router;