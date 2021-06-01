// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 1300 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg3 = d3.select("#rangebarW")
    .append("svg")
    .attr("viewBox", `0 0 1300 450`)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("dataset/price_range2.csv", function (error, data) {
    if (error) {
        console.log('localstorage 還沒有Stock ID')
        document.getElementById("MSEbar").style.visibility = "hidden";
    } else {
        var lstData = [];

        for (i = 0; i < data.length; i++) {
            lstData.push({
                "group": data[i]["Industry_category"],
                "range": parseFloat(data[i]["price_range"]),
            })
        }
        console.log()
        // X axis
        var x = d3.scaleBand()
            .range([0, width])
            .domain(d3.map(lstData, function (d) { return (d.group) }).keys())
            .padding(0.2);
        svg3.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .attr("font-size","11px")
            .style("text-anchor", "end");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(lstData,function(d){return d.range})])
            .range([height, 0]);
        svg3.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg3.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d,i) { return x(d["Industry_category"]); })
            .attr("y", function (d) { return y(d["price_range"]); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d["price_range"]); })
            .attr("fill", "#f4a582")
            
    }


})