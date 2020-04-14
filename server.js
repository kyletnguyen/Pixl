const express = require("express");
const app = express();
const path = require("path");
const port = 9000;

// viewed at http://localhost:8080
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
