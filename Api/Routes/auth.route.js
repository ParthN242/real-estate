const express = require("express");
const verfiyUser = require("../Utils/verifyUser");
const {
  test2,
  signup,
  signin,
  signOut,
} = require("../Controllers/auth.controller");

const router = express.Router();

router.get("/test2", verfiyUser, test2);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signOut);

module.exports = router;
