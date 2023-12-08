const Post = require("../models/post");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.create = catchAsyncErrors(async (req, res, next) => {
  try {
    const { title, description, postedBy } = req.body;

    const post = await Post.create({
      title,
      description,
      postedBy,
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to create Job Post", 500));
  }
});

exports.getAllPost = catchAsyncErrors(async (req, res, next) => {
  try {
    const jobPosts = await Post.find()
      .populate("postedBy", "name avatar")
      .sort({ date: -1 });
    res.status(200).json({
      success: true,
      jobPosts,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to retrieve Posts", 500));
  }
});

exports.getSinglePost = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate(
      "postedBy",
      "name",
    );
    if (!post) {
      return next(new ErrorHandler("Job post not found", 404));
    }
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to retrieve Job post", 500));
  }
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, description, isApprove, userId } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return next(new ErrorHandler("Job post not found", 404));
    }
    if (post.postedBy.toString() !== userId) {
      return next(
        new ErrorHandler("Unauthorized: You cannot Update this Job Post", 403),
      );
    }

    if (title) post.title = title;
    if (description) post.description = description;
    if (isApprove) post.isApprove = isApprove;

    await post.save();

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to update Job Post", 500));
  }
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return next(new ErrorHandler("Job post not found", 404));
    }

    if (post.postedBy.toString() !== userId) {
      return next(
        new ErrorHandler("Unauthorized: You cannot delete this Job Post", 403),
      );
    }

    await post.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Job post deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to delete Job Post", 500));
  }
});
