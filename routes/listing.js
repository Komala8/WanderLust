const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const {listingSchema} = require("../schema.js") ;
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
      .get(wrapAsync(listingController.index))
      .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));


router.route("/filter-mountain")
      .get(wrapAsync(listingController.mountain));

router.route("/search")
      .get(wrapAsync(listingController.search));
      
//NEW ROUTE
router.get("/new",isLoggedIn, listingController.renderNew);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateRoute))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));




//EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));



module.exports = router;

