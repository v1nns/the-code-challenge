const express = require("express");
let router = express.Router();

/* Services */
const compilerService = require("../services/compiler");

/* Router */
router.post("/:language", compilerService.compileAndExecuteProgram);

module.exports = router;
