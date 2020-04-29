$(function () {
  if ($("body").is(".element-page")) {
    console.log('inside body')
    graphDetector();
  }
  graphDetector();
console.log('inside site.js')
  function graphDetector() {
    var element = $("#elementId").val();
    console.log(element)
    var color = $("#colorId").val();

    var elementName;
    var elementPerRef;

    // var csvRef = $("input[name='detector-select']:checked").val() === "A" ? "References/detA.csv" : "References/detB.csv";
    var csvRef = "/References/quantified_element_values.csv";
    graphDetector();
  }

  function graphDetector() {
    var element = $("#elementId").val();
    var elementName;
    var elementPerRef;

    var csvRef = $("input[name='detector-select']:checked").val() === "A" ? "References/detA.csv" : "References/detB.csv";

    var detector = $("input[name='detector-select']:checked").val() === "A" ? "A" : "B";
    // set the dimensions and margins of the graph

    $("svg").remove();
    $("#legend").empty();


    var margin = { top: 140, right: 73, bottom: 50, left: 75 },
      width = 900 - margin.left - margin.right,
      height = 770 - margin.top - margin.bottom;

    var margin = { top: 140, right: 25, bottom: 50, left: 75 },
      width = 1700 - margin.left - margin.right,
      height = 850 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    var svg = d3
      .select("#detector")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(
        d3
          .zoom()
          .extent([
            [0, 0],
            [width, height],
          ])
          .scaleExtent([1, 8])
          .on("zoom", zoomed)
      )
      // .call(
      //   d3.zoom().on("zoom", function () {
      //     svg.attr("transform", d3.event.transform);
      //   })
      // )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    function zoomed() {
      svg.attr("transform", d3.event.transform);
    }

    svg.append("image").attr("xlink:href", "/References/pixl_original.jpg").attr("class", "pixl-img");

    //Read the data
    ///References/detector.csv
    d3.csv(csvRef, function (data) {
      var filterData = data.filter(function (e) {
        return e.Detector == detector;
      });


    //Read the data
    ///References/detector.csv
    d3.csv(csvRef, function (data) {
      //PMC,Mg,Al,Ca,Ti,Fe,Si,image_i,image_j
      var minX = Number.MAX_SAFE_INTEGER;
      var maxX = 0;
      var minY = Number.MAX_SAFE_INTEGER;
      var maxY = 0;
      var minPer = Number.MAX_SAFE_INTEGER;
      var maxPer = 0;

      for (var i = 0; i < filterData.length; i++) {
        switch (element) {
          case "Mg":
            elementPerRef = Number(filterData[i]["Mg_%"]);
            break;
          case "Al":
            elementPerRef = Number(filterData[i]["Al_%"]);
            break;
          case "Ca":
            elementPerRef = Number(filterData[i]["Ca_%"]);
            break;
          case "Ti":
            elementPerRef = Number(filterData[i]["Ti_%"]);
            break;
          case "Fe":
            elementPerRef = Number(filterData[i]["Fe_%"]);
            break;
          case "Si":
            elementPerRef = Number(filterData[i]["Si_%"]);
      for (var i = 0; i < data.length; i++) {
        switch (element) {
          case "Mg":
            elementPerRef = Number(data[i].Mg);
            break;
          case "Al":
            elementPerRef = Number(data[i].Al);
            break;
          case "Ca":
            elementPerRef = Number(data[i].Ca);
            break;
          case "Ti":
            elementPerRef = Number(data[i].Ti);
            break;
          case "Fe":
            elementPerRef = Number(data[i].Fe);
            break;
          case "Si":
            elementPerRef = Number(data[i].Si);
            break;
        }
        if (elementPerRef < minPer) {
          minPer = elementPerRef;
        }

        if (elementPerRef > maxPer) {
          maxPer = elementPerRef;
        }

        if (Number(filterData[i].image_i) < minX) {
          minX = Number(filterData[i].image_i);
        }

        if (Number(filterData[i].image_i) > maxX) {
          maxX = Number(filterData[i].image_i);
        }

        if (Number(filterData[i].image_j) < minY) {
          minY = Number(filterData[i].image_j);
        }
        if (filterData[i].image_j > maxY) {
          maxY = Number(filterData[i].image_j);
        }
      }

      // var myImage_i = new Array(Math.ceil(maxX));
      // var myImage_j = new Array(Math.ceil(maxY));

      var myImage_i = new Array(580);
      var myImage_j = new Array(752);
      minX = 0;
      minY = 0;

      for (var i = 0; i <= 580; i++) {
        myImage_i.push(i);
      }

      for (var j = 0; j <= 752; j++) {
        myImage_j.push(j);
        if (Number(data[i].image_i) < minX) {
          minX = Number(data[i].image_i);
        }

        if (Number(data[i].image_i) > maxX) {
          maxX = Number(data[i].image_i);
        }

        if (Number(data[i].image_j) < minY) {
          minY = Number(data[i].image_j);
        }
        if (data[i].image_j > maxY) {
          maxY = Number(data[i].image_j);
        }
      }

      var myImage_i = new Array(Math.ceil(maxX));
      var myImage_j = new Array(Math.ceil(maxY));

      for (var i = Math.floor(minX); i < myImage_i.length; i++) {
        myImage_i[i] = i;
      }

      for (var j = Math.floor(minY); j < myImage_j.length; j++) {
        myImage_j[j] = j;
      }

      // Build X scales and axis:
      var x = d3.scaleBand().range([0, width]).domain(myImage_i).padding(0.05);
      var xAxis = d3
        .axisBottom(x)
        .tickSize(5)
        .tickSizeOuter(0)
        .tickValues(
          x.domain().filter(function (d, i) {
            if (i === 581) {
              return i;
            } else {
              return !((i - 1) % 50);
            }
        .tickValues(
          x.domain().filter(function (d, i) {
            return !(i % 10);
          })
        );
      svg
        .append("g")
        .call(xAxis)
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .select(".domain");

      // text label for the x axis
      svg
        .append("text")
        .attr("transform", "translate(" + width / 2 + " ," + (height + 40) + ")")
        .style("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("image_i");

      // Build Y scales and axis:
      var y = d3.scaleBand().range([height, 0]).domain(myImage_j).padding(0.05);
      var yAxis = d3
        .axisLeft(y)
        .tickSize(5)
        .tickSizeOuter(0)
        .tickValues(
          y.domain().filter(function (d, i) {
            if (i === 753) {
              return i;
            } else {
              if (i != 751) return !((i - 1) % 50);
            }
        .tickValues(
          y.domain().filter(function (d, i) {
            return !(i % 15);
          })
        );

      svg.append("g").style("font-size", 15).call(yAxis).select(".domain");

      // text label for the y axis
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 25)
        .attr("x", 0 - height / 2)
        .attr("dy", ".25em")
        .style("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("image_j");

      var elementColor;
      switch (element) {
        case "Mg":
          elementColor = d3.interpolateReds;

          break;
        case "Al":
          elementColor = d3.interpolatePuBu;

          break;
        case "Ca":
          elementColor = d3.interpolatePuBuGn;

          break;
        case "Ti":
          elementColor = d3.interpolateYlGnBu;

          break;
        case "Fe":
          elementColor = d3.interpolateYlGn;

          break;
        case "Si":
          elementColor = d3.interpolateYlOrBr;
          break;
      }
      // Build color scale
      var myColor = d3.scaleSequential().interpolator(elementColor).domain([minPer, maxPer]);
      //[Math.round(minPer * 10) / 10, Math.round(maxPer * 10) / 10]
      // Build color scale
      var myColor = d3
        .scaleSequential()
        .interpolator(d3.interpolatePuBu)
        .domain([0, Math.round(maxPer * 10) / 10]);

      drawLegend("#legend", myColor);

      // create a tooltip
      var tooltip = d3
        .select("#detector")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function (d) {
        tooltip.style("opacity", 1);
        d3.select(this).style("stroke", "red").style("opacity", 1);
      };
      var mousemove = function (d) {
        switch (element) {
          case "Mg":
            elementRef = d["Mg_%"];

            break;
          case "Al":
            elementRef = d["Al_%"];

            break;
          case "Ca":
            elementRef = d["Ca_%"];

            break;
          case "Ti":
            elementRef = d["Ti_%"];

            break;
          case "Fe":
            elementRef = d["Fe_%"];

            break;
          case "Si":
            elementRef = d["Si_%"];
            elementRef = d.Mg;

            break;
          case "Al":
            elementRef = d.Al;

            break;
          case "Ca":
            elementRef = d.Ca;

            break;
          case "Ti":
            elementRef = d.Ti;

            break;
          case "Fe":
            elementRef = d.Fe;

            break;
          case "Si":
            elementRef = d.Si;
            break;
        }
        tooltip
          .html("<b>" + element + " %: </b>" + elementRef + " <br><b>Location: </b>" + d.image_i + " i : " + d.image_j + " j")
          .style("left", d3.mouse(this)[0] + (width - 650) + "px")
          .style("top", d3.mouse(this)[1] + (height - 475) + "px");
          .style("left", d3.mouse(this)[0] + (width - 1500) + "px")
          .style("top", d3.mouse(this)[1] + (height - 550) + "px");
      };
      var mouseleave = function (d) {
        tooltip.style("opacity", 0);
        d3.select(this).style("stroke", "none").style("opacity", 0.8);
      };

      // add the squares

      svg
        .selectAll()
        .data(filterData)
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(Math.floor(d.image_i));
        })
        .attr("y", function (d) {
          return y(Math.floor(d.image_j));
        })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() + 1)
        .attr("height", y.bandwidth() + 1)
        .style("fill", function (d) {
          switch (element) {
            case "Mg":
              elementRef = d["Mg_%"];

              break;
            case "Al":
              elementRef = d["Al_%"];

              break;
            case "Ca":
              elementRef = d["Ca_%"];

              break;
            case "Ti":
              elementRef = d["Ti_%"];

              break;
            case "Fe":
              elementRef = d["Fe_%"];

              break;
            case "Si":
              elementRef = d["Si_%"];
        .attr("width", x.bandwidth() + 1.5)
        .attr("height", y.bandwidth() + 3)
        .style("fill", function (d) {
          switch (element) {
            case "Mg":
              elementRef = d.Mg;

              break;
            case "Al":
              elementRef = d.Al;

              break;
            case "Ca":
              elementRef = d.Ca;

              break;
            case "Ti":
              elementRef = d.Ti;

              break;
            case "Fe":
              elementRef = d.Fe;

              break;
            case "Si":
              elementRef = d.Si;
              break;
          }
          return myColor(elementRef);
        })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
    });

    switch (element) {
      case "Mg":
        elementName = "Magnesium";
        break;
      case "Al":
        elementName = "Aluminum";
        break;
      case "Ca":
        elementName = "Calcium";
        break;
      case "Ti":
        elementName = "Titanium";
        break;
      case "Fe":
        elementName = "Iron";
        break;
      case "Si":
        elementName = "Silicon";
        break;
    }
    // Add title to graph
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -50)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .attr("font-weight", "bold")
      .text("Heatmap for " + elementName + " (Detector " + detector + ")");

    // Add subtitle to graph
    // svg.append("text").attr("x", 0).attr("y", -20).attr("text-anchor", "left").style("font-size", "14px").style("fill", "grey").style("max-width", 400).text("Subtitle");
  }

  // create continuous color legend
  function drawLegend(selector_id, colorscale) {
    var legendheight = 350,
    var legendheight = 500,
      legendwidth = 100,
      margin = { top: 10, right: 60, bottom: 10, left: 2 };

    var canvas = d3
      .select(selector_id)
      .style("height", legendheight + "px")
      .style("width", legendwidth + "px")
      .style("position", "relative")
      .append("canvas")
      .attr("height", legendheight - margin.top - margin.bottom)
      .attr("width", 1)
      .style("height", legendheight - margin.top - margin.bottom + "px")
      .style("width", legendwidth - margin.left - margin.right + "px")
      .style("border", "1px solid #000")
      .style("position", "absolute")
      .style("top", margin.top + "px")
      .style("left", margin.left + "px")
      .node();

    var ctx = canvas.getContext("2d");

    var legendscale = d3
      .scaleLinear()
      .range([1, legendheight - margin.top - margin.bottom])
      .domain(colorscale.domain());

    // image data hackery based on http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5
    var image = ctx.createImageData(1, legendheight);
    d3.range(legendheight).forEach(function (i) {
      var c = d3.rgb(colorscale(legendscale.invert(i)));
      image.data[4 * i] = c.r;
      image.data[4 * i + 1] = c.g;
      image.data[4 * i + 2] = c.b;
      image.data[4 * i + 3] = 255;
    });
    ctx.putImageData(image, 0, 0);

    // A simpler way to do the above, but possibly slower. keep in mind the legend width is stretched because the width attr of the canvas is 1
    // See http://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas
    /*
  d3.range(legendheight).forEach(function(i) {
    ctx.fillStyle = colorscale(legendscale.invert(i));
    ctx.fillRect(0,i,1,1);
  });
  */

    var legendaxis = d3.axisRight().scale(legendscale).tickSize(6).ticks(8);

    var svg = d3
      .select(selector_id)
      .append("svg")
      .attr("height", legendheight + "px")
      .attr("width", legendwidth + "px")
      .style("position", "absolute")
      .style("left", "0px")
      .style("top", "0px");

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + (legendwidth - margin.left - margin.right + 3) + "," + margin.top + ")")
      .call(legendaxis);
  }

  //Event handlers
  $(".detector-btns").on("click", function (e) {
    graphDetector();
  });
});
