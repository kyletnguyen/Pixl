const express = require("express");
const app = express();
const path = require("path");
const port = 9000;

const handlebars = require("express-handlebars");
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layouts: `${__dirname}/views/Layouts`,
    extname: "hbs",
  })
);

var response;

var model = {
  element: "",
  update: function (e) {
    this.element = e;
    view.render();
  },
};

var view = {
  render: function () {
    response.render("element", { layout: false, element: model.element });
  },
};

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/mg", function (req, res) {
  response = res;
  model.update("Mg");
});

app.get("/al", function (req, res) {
  response = res;
  model.update("Al");
  // res.send("GET request for Al");
});

app.get("/ca", function (req, res) {
  response = res;
  model.update("Ca");
});

app.get("/ti", function (req, res) {
  response = res;
  model.update("Ti");
});

app.get("/fe", function (req, res) {
  response = res;
  model.update("Fe");
});

app.get("/si", function (req, res) {
  response = res;
  model.update("Si");
});

app.listen(port, () => console.log(`Hosting web application on port ${port}`));
