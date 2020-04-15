const express = require("express");
const app = express();
const path = require("path");
const port = 9000;

app.use(express.static(__dirname));

// viewed at http://localhost:8080
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.listen(port, () => console.log(`Hosting web application on port ${port}`));
