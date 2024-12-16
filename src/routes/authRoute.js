const express = require('express');
const { login, registrar } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/register', registrar);

module.exports = router;
