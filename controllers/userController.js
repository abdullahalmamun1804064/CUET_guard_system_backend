const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');



exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    console.log(req.user);
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
})

exports.getMemberProfile = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        user
    })
})



// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user._id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})