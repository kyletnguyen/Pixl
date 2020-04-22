const express = require("express");
const app = express();
const path = require("path");
const port = 9000;

const csv = require("csv-parser");
const fs = require("fs");
const qev_csv = [];
const detA = [];
const detB = [];
const filename = path.normalize(
  __dirname + "/References/quantified_element_values.csv"
);

var response;

var model = {
  element: "Mg",
  update: function (e) {
    this.element = e;
    view.render();
  },
};

var view = {
  render: function () {
    var html = "";
 
    response.sendFile(path.join(__dirname + "/views/index.html"));
    // html += "<!DOCTYPE html>";
    // html += "<html>";
    // html += "<head><title>An MVC Example</title></head>";
    // html += "<body>";
    // html += "<h1>Status " + model.element + "</h1>";
    // html += '<a href="/on">switch on</a><br />';
    // html += '<a href="/off">switch off</a>';
    // html += "</body>";
    // html += "</html>";


    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.end(html + "\n");
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

fs.createReadStream(filename)
  .on("error", () => {
    console.log("Error reading CSV file");
  })
  //PMC,Detector,Mg_%,Al_%,Ca_%,Ti_%,Fe_%,Si_%,Mg_int,Al_int,Ca_int,Ti_int,Fe_int,Si_int,image_i,image_j
  .pipe(csv())
  .on("data", (row) => {
    qev_csv.push(row);
  })
  .on("end", () => {
    console.log("Finished CSV file");
    separateDetectors(qev_csv);
  });

function separateDetectors() {
  for (var i = 0; i < qev_csv.length; i++) {
    if (qev_csv[i].Detector === "A") {
      detA.push(qev_csv[i]);
    } else {
      detB.push(qev_csv[i]);
    }
  }
}

app.listen(port, () => console.log(`Hosting web application on port ${port}`));
