const User = require("../Models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../Utils/error");

exports.test2 = (req, res) => {
  res.json("hello auth");
};

// Sign up
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const alUser = await User.findOne({ name });

    if (alUser) {
      return next(errorHandler(400, "Name is already used"));
    }

    if (password.length < 8)
      return next(errorHandler(400, "Password must have 8 charcters."));

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ success: true, email });
  } catch (error) {
    next(error);
  }
};

// Sing in

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(errorHandler(401, "Invalid email or password."));
    }

    const comparePassowrd = bcryptjs.compareSync(password, user.password);

    if (!comparePassowrd) {
      return next(errorHandler(401, "Invalid email or password."));
    }

    const { password: pass, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const options = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      shttpOnly: true,
      sameSite: "none",
      secure: "false",
    };
    res.cookie("token", token, options);
    res.status(200).json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};

// Sign Out
exports.signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User Sign Out Successfully." });
  } catch (error) {
    next(error);
  }
};
