
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 1300 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#MSEbar")
  .append("svg")
  .attr("viewBox", `0 0 1300 400`)
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("dataset/MSE.csv", function (error, data) {
    if (error) {
        console.log('localstorage 還沒有Stock ID')
        document.getElementById("MSEbar").style.visibility = "hidden";
    } else {
        var lstData = [];

        for (i = 0; i < data.length; i++) {
            lstData.push({
                "group": data[i]["Industry_category"],
                "MSEg": data[i]["MSE>10"],
                "MSEl": data[i]["MSE<10"],
            })
        }
        console.log(data.columns.slice(1))

     
        //   List of subgroups = header of the csv files = soil condition here
          var subgroups = data.columns.slice(1)
            console.log(subgroups)
          // List of groups = species here = value of the first column called group -> I show them on the X axis
          var groups = d3.map(lstData, function(d){return(d.group)}).keys()

          // Add X axis
          var x = d3.scaleBand()
              .domain(groups)
              .range([0, width])
              .padding([0.2])
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0));

          // Add Y axis
          var y = d3.scaleLinear()
            .domain([0, 16])
            .range([ height, 0 ]);
          svg.append("g")
            .call(d3.axisLeft(y));

            // Another scale for subgroup position?
            var xSubgroup = d3.scaleBand()
              .domain(subgroups)
              .range([0, x.bandwidth()])
              .padding([0.05])

            // color palette = one color per subgroup
            var color = d3.scaleOrdinal()
              .domain(subgroups)
              .range(["#f4a582","#d5d5d5"])

            // Show the bars
            svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .enter()
            .append("g")
              .attr("transform", function(d,i) { return "translate(" + x(data[i]["Industry_category"]) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
              .attr("x", function(d) { return xSubgroup(d.key); })
              .attr("y", function(d) { return y(d.value); })
              .attr("width", xSubgroup.bandwidth())
              .attr("height", function(d) { return height - y(d.value); })
              .attr("fill", function(d) { return color(d.key); })
              
    }


})