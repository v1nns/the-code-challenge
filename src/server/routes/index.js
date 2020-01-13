const express = require("express");
let router = express.Router();

/* Api Controller version 1.0 */
const v1ApiController = require("./v1");

/* Router */
router.use("/v1", v1ApiController);

module.exports = router;
