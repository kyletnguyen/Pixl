$(function () {
  window.onload = (event) => {
    graphDetA();
    graphDetB();
  };

  function graphDetA() {
    var pathArray = window.location.pathname.split("/");
    var element = pathArray[1].charAt(0).toUpperCase() + pathArray[1].slice(1);

    // set the dimensions and margins of the graph
    var margin = { top: 80, right: 25, bottom: 50, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#detA")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // .call(
      //   d3.zoom().on("zoom", function () {
      //     svg.attr("transform", d3.event.transform);
      //   })
      // )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    ///References/detA.csv
    d3.csv("References/detA.csv", function (data) {
      // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
      // var myImage_i = d3
      //   .map(data, function (d) {
      //     return d.group;
      //   })
      //   .keys();
      var minX = Number.MAX_SAFE_INTEGER;
      var maxX = 0;
      var minY = Number.MAX_SAFE_INTEGER;
      var maxY = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].image_i < minX) {
          minX = data[i].image_i;
        }
        if (data[i].image_i > maxX) {
          maxX = data[i].image_i;
        }

        if (data[i].image_j < minY) {
          minY = data[i].image_j;
        }
        if (data[i].image_j > maxY) {
          maxY = data[i].image_j;
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

      // var myImage_j = d3
      //   .map(data, function (d) {
      //     return d.variable;
      //   })
      //   .keys();

      // Build X scales and axis:
      var x = d3.scaleBand().range([0, width]).domain(myImage_i).padding(0.05);
      var xAxis = d3
        .axisBottom(x)
        .tickSize(0)
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
        .select(".domain")
        .remove();
      // svg
      //   .append("g")
      //   .style("font-size", 15)
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(d3.axisBottom(x).tickSize(0))
      //   .select(".domain")
      //   .remove();

      // text label for the x axis
      svg
        .append("text")
        .attr("transform", "translate(" + width / 2 + " ," + (height + 40) + ")")
        .style("text-anchor", "middle")
        .text("image_i");

      // Build Y scales and axis:
      var y = d3.scaleBand().range([height, 0]).domain(myImage_j).padding(0.05);
      var yAxis = d3
        .axisLeft(y)
        .tickSize(0)
        .tickValues(
          y.domain().filter(function (d, i) {
            return !(i % 10);
          })
        );

      svg.append("g").style("font-size", 15).call(yAxis).select(".domain").remove();

      // text label for the y axis
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 5)
        .attr("x", 0 - height / 2)
        .attr("dy", ".25em")
        .style("text-anchor", "middle")
        .text("image_j");

      // Build color scale
      var myColor = d3.scaleSequential().interpolator(d3.interpolatePuBu).domain([0, 1]);
      drawScale("detA_legend", d3.interpolatePuBu);

      // create a tooltip
      var tooltip = d3
        .select("#detA")
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
        d3.select(this).style("stroke", "black").style("opacity", 1);
      };
      var mousemove = function (d) {
        var elementRef;

        //PMC,Mg,Al,Ca,Ti,Fe,Si,image_i,image_j
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

        tooltip
          .html("The exact value of<br>this cell is: " + elementRef)
          .style("left", d3.mouse(this)[0] + (width - 25) + "px")
          .style("top", d3.mouse(this)[1] + (height - 410) + "px");
      };
      var mouseleave = function (d) {
        tooltip.style("opacity", 0);
        d3.select(this).style("stroke", "none").style("opacity", 0.8);
      };

      // add the squares

      svg
        .selectAll()
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
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) {
          var elementRef;

          //PMC,Mg,Al,Ca,Ti,Fe,Si,image_i,image_j
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

    // Add title to graph
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -50)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .text("Heatmap for " + element + " (Detector A)");

    // Add subtitle to graph
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -20)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("A short description of the take-away message of this chart.");
  }

  function graphDetB() {
    var pathArray = window.location.pathname.split("/");
    var element = pathArray[1].charAt(0).toUpperCase() + pathArray[1].slice(1);

    // set the dimensions and margins of the graph
    var margin = { top: 80, right: 25, bottom: 50, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#detB")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // .call(
      //   d3.zoom().on("zoom", function () {
      //     svg.attr("transform", d3.event.transform);
      //   })
      // )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    ///References/detA.csv
    d3.csv("References/detB.csv", function (data) {
      // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
      // var myImage_i = d3
      //   .map(data, function (d) {
      //     return d.group;
      //   })
      //   .keys();
      var minX = Number.MAX_SAFE_INTEGER;
      var maxX = 0;
      var minY = Number.MAX_SAFE_INTEGER;
      var maxY = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].image_i < minX) {
          minX = data[i].image_i;
        }
        if (data[i].image_i > maxX) {
          maxX = data[i].image_i;
        }

        if (data[i].image_j < minY) {
          minY = data[i].image_j;
        }
        if (data[i].image_j > maxY) {
          maxY = data[i].image_j;
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

      // var myImage_j = d3
      //   .map(data, function (d) {
      //     return d.variable;
      //   })
      //   .keys();

      // Build X scales and axis:
      var x = d3.scaleBand().range([0, width]).domain(myImage_i).padding(0.05);
      var xAxis = d3
        .axisBottom(x)
        .tickSize(0)
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
        .select(".domain")
        .remove();
      // svg
      //   .append("g")
      //   .style("font-size", 15)
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(d3.axisBottom(x).tickSize(0))
      //   .select(".domain")
      //   .remove();

      // text label for the x axis
      svg
        .append("text")
        .attr("transform", "translate(" + width / 2 + " ," + (height + 40) + ")")
        .style("text-anchor", "middle")
        .text("image_i");

      // Build Y scales and axis:
      var y = d3.scaleBand().range([height, 0]).domain(myImage_j).padding(0.05);
      var yAxis = d3
        .axisLeft(y)
        .tickSize(0)
        .tickValues(
          y.domain().filter(function (d, i) {
            return !(i % 10);
          })
        );

      svg.append("g").style("font-size", 15).call(yAxis).select(".domain").remove();

      // text label for the y axis
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 5)
        .attr("x", 0 - height / 2)
        .attr("dy", ".25em")
        .style("text-anchor", "middle")
        .text("image_j");

      // Build color scale
      var myColor = d3.scaleSequential().interpolator(d3.interpolatePuBu).domain([0, 1]);
      drawScale("detB_legend", d3.interpolatePuBu);

      // create a tooltip
      var tooltip = d3
        .select("#detB")
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
        d3.select(this).style("stroke", "black").style("opacity", 1);
      };
      var mousemove = function (d) {
        var elementRef;

        //PMC,Mg,Al,Ca,Ti,Fe,Si,image_i,image_j
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

        tooltip
          .html("The exact value of<br>this cell is: " + elementRef)
          .style("left", d3.mouse(this)[0] + (width - 25) + "px")
          .style("top", d3.mouse(this)[1] + (height + 325) + "px");
      };
      var mouseleave = function (d) {
        tooltip.style("opacity", 0);
        d3.select(this).style("stroke", "none").style("opacity", 0.8);
      };

      // add the squares

      svg
        .selectAll()
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
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) {
          var elementRef;

          //PMC,Mg,Al,Ca,Ti,Fe,Si,image_i,image_j
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

    // Add title to graph
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -50)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .text("Heatmap for " + element + " (Detector B)");

    // Add subtitle to graph
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -20)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("A short description of the take-away message of this chart.");
  }
  //Functions
  function drawScale(id, interpolator) {
    var data = Array.from(Array(100).keys());

    var cScale = d3.scaleSequential().interpolator(interpolator).domain([0, 99]);

    var xScale = d3.scaleLinear().domain([0, 99]).range([0, 580]);

    var u = d3
      .select("#" + id)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => Math.floor(xScale(d)))
      .attr("y", 0)
      .attr("height", 40)
      .attr("width", (d) => {
        if (d == 99) {
          return 6;
        }
        return Math.floor(xScale(d + 1)) - Math.floor(xScale(d)) + 1;
      })
      .attr("fill", (d) => cScale(d));
  }

  //Event handlers
  $(".prev-elem").on("click", function () {
    alert("PREV");
  });
  $(".next-elem").on("click", function () {
    alert("NEXT");
  });
});
