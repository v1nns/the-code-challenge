const express = require("express");
let router = express.Router();

/* Services */
const compilerService = require("../services/compiler");

/* Router */
router.post("/", compilerService.compileProgram);

module.exports = router;
