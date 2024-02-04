const Listing = require("../Models/listing.model");
const errorHandler = require("../Utils/error");

// Craete Listing
exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create({ ...req.body, userRef: req.user.id });
    res.status(201).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

// Get All Listings
exports.getAllListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      title: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({ success: true, listings });
  } catch (error) {
    next(error);
  }
};

// Get Listing Detail
exports.listingDetail = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("userRef");

    res.status(200).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

// Update Listing
exports.updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

// Delete Listing
exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) return next(errorHandler(404, "Invaild Listing"));

    res
      .status(200)
      .json({ success: true, message: "Listing Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
