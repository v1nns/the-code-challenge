const HttpStatus = require("http-status-codes");
var spawn = require("child_process").spawn;

const compileProgram = async (req, res, next) => {
  try {
    const { language, sourceCode } = req.body;

    if (language !== "cpp") {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: "BAD_REQUEST_ERROR",
        description: "Programming language not supported"
      });
    }

    return res.status(HttpStatus.NOT_IMPLEMENTED).json({
      message: "Service not implemented",
      data: "result null"
    });

    // TODO: implementation
    // return res.status(HttpStatus.OK).json({
    //   message: "Program compiled with success",
    //   data: "result null"
    // });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: "SERVER_ERROR",
      description: "something went wrong, please try again"
    });
  }
};

module.exports = {
  compileProgram: compileProgram
};
