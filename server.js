const express = require("express");
const app = express();
const path = require("path");
const port = 9000;

const qev_csv = [];
const detA = [];
const detB = [];
const filename = path.normalize(__dirname + "/References/quantified_element_values.csv");

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
    var html = "";

    //response.sendFile(path.join(__dirname + "/views/element.html"));
    html += "<!DOCTYPE html>";

    html += '<html lang="en">';
    html += "  <head>";
    html += '    <meta charset="utf-8" />';

    html += "    <title>PIXL Heatmaps</title>";
    html += '    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />';
    html += '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />';
    html += '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.0/css/bootstrap.min.css" />';
    html += '    <link rel="stylesheet" href="./Styles/site.css" />';
    html += '    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>';
    html += '    <script src="https://d3js.org/d3.v5.min.js"></script>';
    html += '    <script src="https://d3js.org/d3.v4.js"></script>';
    html += '    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.0/js/bootstrap.bundle.min.js"></script>';

    html += '    <script src="./Js/site.js"></script>';
    html += "  </head>";

    html += '  <body class="element-page">';
    html += "    <!-- PMC,Mg,Al,Ca,Ti,Fe,Si,image_i,image_j -->";
    html += '    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">';
    html += '      <div class="container">';
    html += '        <a class="navbar-brand" href="/">PIXL Heatmaps</a>';
    html += "        <button";
    html += '          class="navbar-toggler"';
    html += '          type="button"';
    html += '          data-toggle="collapse"';
    html += '          data-target="#navbarResponsive"';
    html += '          aria-controls="navbarResponsive"';
    html += '          aria-expanded="false"';
    html += '          aria-label="Toggle navigation"';
    html += "        >";
    html += '          <span class="navbar-toggler-icon"></span>';
    html += "        </button>";
    html += '        <div class="collapse navbar-collapse" id="navbarResponsive">';
    html += '          <ul class="navbar-nav ml-auto">';
    html += '            <li class="nav-item active">';
    html += '              <a class="nav-link" href="/">Home</a>';
    html += "            </li>";
    html += '            <li class="nav-item dropdown">';
    html += '              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Select Elements</a>';
    html += '              <div class="dropdown-menu">';
    html += '                <a class="dropdown-item" href="/mg">Magnesium</a>';
    html += '                <a class="dropdown-item" href="/al">Aluminum</a>';
    html += '                <a class="dropdown-item" href="/ca">Calcium</a>';
    html += '                <a class="dropdown-item" href="/ti">Titanium</a>';
    html += '                <a class="dropdown-item" href="/fe">Iron</a>';
    html += '                <a class="dropdown-item" href="/si">Silicon</a>';
    html += "              </div>";
    html += "            </li>";
    html += "          </ul>";
    html += "        </div>";
    html += "      </div>";
    html += "    </nav>";
    html += "    <!-- Create a div where the graph will take place -->";
    html += ' <input type="hidden" id="elementId" name="elementId" value="' + model.element + '">';
    html += '    <div class="d-flex flex-row">';
    html += '      <div class="d-flex justify-content-start">';
    html += '        <div id="detector"></div>';
    html += "      </div>";

    html += '      <div id="legend"></div>';
    html += "    </div>";

    html += "    <br />";

    html += '    <div class="detector-group btn-group btn-group-toggle" data-toggle="buttons">';
    html += '      <label class="btn btn-light active">';
    html += '        <input type="radio" name="detector-select" id="detA-btn" class="detector-btns" autocomplete="off" value="A" checked="checked" /> Detector A';
    html += "      </label>";
    html +=
      '      <label class="btn btn-light"> <input type="radio" name="detector-select" id="detB-btn" class="detector-btns" autocomplete="off" value="B" /> Detector B </label>';
    html += "    </div>";

    html += '    <!-- <button type="button" class="prev-elem btn btn-secondary btn-sm"><i class="fas fa-chevron-left"></i></button>';
    html += '    <button type="button" class="next-elem btn btn-secondary btn-sm"><i class="fas fa-chevron-right"></i></button> -->';
    html += "  </body>";
    html += "</html>";

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html + "\n");
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
