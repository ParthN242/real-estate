const errorHandler = require("./error");
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token || token == "")
    return next(errorHandler(401, "Please login to access this resourse"));

  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    if (!isValid) return next(errorHandler(401, "Invalid Credential22"));

    const user = await User.findById(isValid.id);

    req.user = user;

    next();
  } catch (error) {
    res.cookie("token", "");
    next(error);
  }
};

module.exports = verifyUser;
