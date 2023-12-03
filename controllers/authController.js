const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../utils/errorHandler');

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {


    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

        var user = await User.create({
            name,
            email,
            password,
            id,
            batch,
            department,
            role: 'user'
        })
        const sub_plan = await new SubscriptionPlan({
            name: 'Free',
            price: 0,
            user: user._id,
            paymentStatus: 'Completed',
        })
        await sub_plan.save();
   

    sendToken(user, 200, res);

})


// Login user   => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)
})


// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})