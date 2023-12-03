const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout
} = require('../controllers/authController');

const { updateProfile,
    getUserProfile,
    getMemberProfile, } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Logout the currently logged-in user
router.get('/logout', logout);
// Get the user profile of the currently logged-in user
router.get('/me', isAuthenticatedUser, getUserProfile);
// Get the user profile of the currently logged-in user
router.get('/user/:id', getMemberProfile);
// Update profile of the currently logged-in user
router.put('/me/update', isAuthenticatedUser, updateProfile);

module.exports = router;
