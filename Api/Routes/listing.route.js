const express = require("express");
const {
  createListing,
  getAllListings,
  deleteListing,
  listingDetail,
  updateListing,
} = require("../Controllers/listing.controller");
const verifyUser = require("../Utils/verifyUser");

const router = express.Router();

router
  .post("/create", verifyUser, createListing)
  .get("/get", verifyUser, getAllListings)
  .get("/:id", verifyUser, listingDetail)
  .patch("/:id", verifyUser, updateListing)
  .delete("/:id", verifyUser, deleteListing);

module.exports = router;
