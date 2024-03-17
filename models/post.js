const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    isApprove: {
        type: String,
        default: "no"
    },
    date: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

// Additional fields, middleware, methods

module.exports = mongoose.model('post', postSchema);

