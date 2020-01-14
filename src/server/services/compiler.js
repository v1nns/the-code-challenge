const HttpStatus = require("http-status-codes");
const fs = require("fs");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

/***************************** Private functions ******************************/

/**
 * Compile source code received as parameter
 */
async function compileCode(language, code) {
  /* Save source code to a file */
  let filename = "code-challenge";
  let completePath = `/tmp/${filename}.${language}`;
  fs.writeFileSync(completePath, code);

  /* Compile source code */
  const child = spawn("g++", [`${completePath}`, `-o/tmp/${filename}`]);

  /* Get error from compiler */
  let result = "";
  for await (const chunk of child.stderr) {
    result += chunk;
  }

  /* Check if executed with success */
  const errorCompile = await new Promise((resolve, reject) => {
    child.on("close", resolve);
  });

  return { errorCompile, result };
}

/**
 * Executed the program compiled before
 */
async function executeProgram() {
  let filename = "/tmp/code-challenge";

  /* Execute program */
  const { errorExecute, stdout, stderr } = await new Promise(
    (resolve, reject) => {
      exec(filename, (errorExecute, stdout, stderr) =>
        resolve({ errorExecute, stdout, stderr })
      );
    }
  );

  /* Delete the program file */
  fs.unlinkSync(filename);

  return { errorExecute, stdout, stderr };
}

/****************************** Public functions ******************************/

const compileAndExecuteProgram = async (req, res, next) => {
  try {
    const language = req.params.language;
    const sourceCode = req.body;

    /* Check if the language informed is supported */
    if (language !== "cpp") {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: {
          description: "Programming language not supported"
        }
      });
    }

    /* Save the source code to a file and compile it */
    const { errorCompile, result } = await compileCode(language, sourceCode);

    if (errorCompile) {
      /* return the error result */
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: {
          description: result
        }
      });
    } else {
      /* Execute the program and return the result */
      const { errorExecute, stdout, stderr } = await executeProgram();

      if (errorExecute) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: {
            description:
              "Error while trying to execute the compiled source code"
          }
        });
      } else {
        return res.status(HttpStatus.OK).json({
          data: {
            stdout: stdout,
            stderr: stderr
          }
        });
      }
    }
  } catch (err) {
    console.log("Unknown error:", err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      description: "Something went wrong, please try again"
    });
  }
};

module.exports = {
  compileAndExecuteProgram: compileAndExecuteProgram
};
