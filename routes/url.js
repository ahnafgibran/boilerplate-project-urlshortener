var express = require("express");
const UrlController = require("../controllers/UrlController");

var router = express.Router();

router.post("/",UrlController.isValidUrl, UrlController.createUrl);
router.get("/:id", UrlController.redirectUrl);

module.exports = router;