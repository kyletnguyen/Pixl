const express = require("express");
const app = express();
const path = require("path");
const port = 9000;

const csv = require("csv-parser");
const fs = require("fs");
const qev_csv = [];
const detA_csv = [];
const detB_csv = [];
const filename = path.normalize(__dirname + "/References/quantified_element_values.csv");

var model = {
  element: "",
  update: function (e) {
    this.element = e;
  },
};

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/mg", function (req, res) {});
app.get("/al", function (req, res) {});
app.get("/ca", function (req, res) {});
app.get("/ti", function (req, res) {});
app.get("/fe", function (req, res) {});
app.get("/si", function (req, res) {});

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
      detA_csv.push(qev_csv[i]);
    } else {
      detB_csv.push(qev_csv[i]);
    }
  }
}

app.listen(port, () => console.log(`Hosting web application on port ${port}`));
