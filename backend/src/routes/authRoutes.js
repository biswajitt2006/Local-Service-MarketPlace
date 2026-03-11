const router = require('express').Router();
const {
  register,
  login,
  getProfile,
  registerValidation,
  loginValidation,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected
router.get('/profile', protect, getProfile);

module.exports = router;
