const User = require("../Models/user.model");
const Listing = require("../Models/listing.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../Utils/error");

exports.test = (req, res) => {
  res.json("hello");
};

// Get User Detail
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(401, "No User Found"));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      if (req.body.password.length < 8)
        return next(errorHandler(400, "Password must have 8 charcters."));
      const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return next(errorHandler(404, "No User Found"));
    }

    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.params.id !== req.user.id)
      return next(errorHandler(401, "You can only update your own account!"));

    await User.findByIdAndDelete(req.params.id);

    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// Get All Listign Of User
exports.getAllUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.user._id });

    res.status(200).json({ success: true, listings });
  } catch (error) {
    next(error);
  }
};
