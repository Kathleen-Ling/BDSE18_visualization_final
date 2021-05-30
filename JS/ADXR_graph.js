var svg4 = d3.select("#adxrName")

d3.csv("dataset/stock_list_50.csv", function (error, data) {
    if (error) {
        console.log('沒抓到stocklist csv ')
    } else {
        var lstStk = [];

        for (i = 0; i < data.length; i++) {
            lstStk.push({
                "ID": data[i]["stock_id"],
                "COM": data[i]["stock_name"],

            })
        }
        var s_id = localStorage.getItem("priceCsv")
        var inx = lstStk.map(x => x.ID).indexOf(`${s_id}`)
        svg4.append('text')
            .text(function () { if (s_id != null) { return data[inx]["stock_id"] + data[inx]["stock_name"] } })
            .style('fill', 'black')
            .style('font-size', '25px')
            .style('padding-left','10px')

    }
})


// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 900 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg3 = d3.select("#sAdxrGraph")
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", `0 0 900 400`)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv(`dataset/ADXR/${localStorage.getItem("priceCsv")}.csv`, function (error, data) {
    if (error) {
        console.log('localstorage 還沒有Stock ID')
        document.getElementById("sAdxrGraph").style.display = "none";
    } else {
        // console.log(data)
        var AXDRdata = [];

        for (i = 0; i < data.length; i++) {
            AXDRdata.push({
                "date": d3.timeParse("%Y-%m-%d")(data[i]["date"]),
                "Adxr": parseFloat(data[i]["ADXR"]),
            })
        }
        // console.log(d3.max(AXDRdata, function (d) {return d["Adx"] ;}))

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
            .domain(d3.extent(AXDRdata, function (d) { return d.date; }))
            .range([0, width]);
        svg3.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(AXDRdata, function(d){return (d.Adxr);})])
            .range([height, 0]);
        svg3.append("g")
            .call(d3.axisLeft(y));



        // Add the line

        svg3.append("g")
            .selectAll("path.adxr")
            .data([AXDRdata])
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#BA5F4C ")
            .attr("stroke-width", 2)
            .attr("class", "adxr")
            .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.Adxr) })
            )


        // Add the points
        svg3
            .append("g")
            .selectAll("dot.adxr")
            .data(AXDRdata)
            .enter()
            .append("circle")
            .attr("class", "adxr")
            .attr("cx", function (d) { return x(d.date) })
            .attr("cy", function (d) { return y(d.Adxr) })
            .attr("r", 2)
            .attr("fill", "#BA5F4C")
    }

})
