const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let routes = require("./routes");

/* Express configurations */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static("dist"));

/* Dummy API to check if server is running OK */
app.get("/", (req, res) => res.send("App is working"));

/* Routes API */
app.use("/api", routes);

var server = app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

module.exports.closeServer = function() {
  server.close();
};
