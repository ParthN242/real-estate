const express = require("express");
const {
  test,
  getUser,
  updateUser,
  deleteUser,
  getAllUserListings,
} = require("../Controllers/user.controller");
const verifyUser = require("../Utils/verifyUser");

const router = express.Router();

router.get("/test", test);
router
  .get("/me", verifyUser, getUser)
  .post("/update/:id", verifyUser, updateUser)
  .get("/delete/:id", verifyUser, deleteUser)
  .get("/listings", verifyUser, getAllUserListings);

module.exports = router;
