const express = require("express");
let router = express.Router();

/* Controllers */
const compilerController = require("../controllers/compiler");

/* Router */
router.use("/compiler", compilerController);

module.exports = router;
