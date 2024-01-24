const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../utils/errorHandler');
const Guard = require('../models/guard');

// Register a guard   => /api/v1/register-guard
exports.registerGuard = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password, confirmPassword, shift } = req.body;

    if (password !== confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    const guard = await Guard.create({
        name,
        email,
        password,
        shift,
        role: 'guard'
    });

    await guard.save();

    sendToken(guard, 200, res);

});

// Login guard   => /api/v1/login-guard
exports.loginGuard = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding guard in database
    const guard = await Guard.findOne({ email }).select('+password')

    if (!guard) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await guard.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(guard, 200, res)
});

// Logout guard   =>   /api/v1/logout-guard
exports.logoutGuard = catchAsyncErrors(async (req, res, next) => {
    console.log("logout-guard------");
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Guard logged out'
    });
});
