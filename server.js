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
  elementName: "",
  update: function (e, eName) {
    this.element = e;
    this.elementName = eName;
    view.render();
  },
};

var view = {
  render: function () {
    response.render("element", { layout: false, element: model.element, elementName: model.elementName });
  },
};

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/About", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/data", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/analytical.html"));
});

app.get("/mg", function (req, res) {
  response = res;
  model.update("Mg", "Magnesium");
});

app.get("/al", function (req, res) {
  response = res;
  model.update("Al", "Aluminum");
  // res.send("GET request for Al");
});

app.get("/ca", function (req, res) {
  response = res;
  model.update("Ca", "Calcium");
});

app.get("/ti", function (req, res) {
  response = res;
  model.update("Ti", "Titanium");
});

app.get("/fe", function (req, res) {
  response = res;
  model.update("Fe", "Iron");
});

app.get("/si", function (req, res) {
  response = res;
  model.update("Si", "Silicon");
});

app.listen(port, () => console.log(`Hosting web application on port ${port}`));
