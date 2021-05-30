var svg2 = d3.select("#spName")

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
        svg2.append('text')
            .text(function () { if (s_id != null) { return data[inx]["stock_id"] + data[inx]["stock_name"] } })
            .style('fill', 'black')
            .style('font-size', '25px')
            .style('padding-left', '10px')

    }
})


// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 900 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#spgraph")
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", `0 0 900 400`)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
// localStorage.getItem("priceCsv")
d3.csv(`dataset/Feature_LSTM_KERAS_csv_modify/Feature_Keras_LSTM_${localStorage.getItem("priceCsv")}.csv`, function (error, data) {
    if (error) {
        console.log('localstorage 還沒有Stock ID')
        document.getElementById("spgraph").style.visibility = "hidden";
    } else {
        // console.log(data)
        var lstData = [];

        for (i = 0; i < data.length; i++) {
            lstData.push({
                "date": d3.timeParse("%Y-%m-%d")(data[i]["End-date"]),
                "Prediction": parseFloat(data[i]["Prediction"]),
                "Answer": parseFloat(data[i]["Answer"]),

            })
        }
        console.log(d3.max(lstData, function (d) { return d.Answer; }))

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
            .domain(d3.extent(lstData, function (d) { return d.date; }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // Add Y axis
        var y = d3.scaleLinear()
            .domain([d3.min([d3.min(lstData, function (d) { return (d["Answer"] - 5); }), d3.min(lstData, function (d) { return (d["Prediction"] - 5); })]), d3.max([d3.max(lstData, function (d) { return (d["Answer"] + 5); }), d3.max(lstData, function (d) { return (d["Prediction"] + 5); })])])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));



        // Add the line

        svg.append("g")
            .selectAll("path.pre")
            .data([lstData])
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#BA5F4C")
            .attr("stroke-width", 2)
            .attr("class", "pre")
            .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.Prediction) })
            )


        // Add the points
        svg
            .append("g")
            .selectAll("dot.pre")
            .data(lstData)
            .enter()
            .append("circle")
            .attr("class", "pre")
            .attr("cx", function (d) { return x(d.date) })
            .attr("cy", function (d) { return y(d.Prediction) })
            .attr("r", 2)
            .attr("fill", "#BA5F4C")

        // Add the 2nd line
        svg.append("g")
            .selectAll("path.ans")
            .data([lstData])
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#888586 ")
            .attr("stroke-width", 2)
            .attr("class", "ans")
            .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.Answer) })
            )
        // Add the 2nd points
        svg
            .append("g")
            .selectAll("dot.ans")
            .data(lstData)
            .enter()
            .append("circle")
            .attr("class", "ans")
            .attr("cx", function (d) { return x(d.date) })
            .attr("cy", function (d) { return y(d.Answer) })
            .attr("r", 2)
            .attr("fill", "#888586 ")

        svg
            .append('line')
            .attr('x1', '10px')
            .attr('y1', '10px')
            .attr('x2', '30px')
            .attr('y2', '10px')
            .attr('stroke', '#BA5F4C')
            .style('stroke-width', '2px')

        svg.append('text')
            .text('Prediction')
            .attr('x', '32px')
            .attr('y', '13px')
            .style('fill', 'black')
            .style('font-size', '15px')
        svg
            .append('line')
            .attr('x1', '10px')
            .attr('y1', '25px')
            .attr('x2', '30px')
            .attr('y2', '25px')
            .attr('stroke', '#888586 ')
            .style('stroke-width', '2px')

        svg.append('text')
            .text('Answer')
            .attr('x', '32px')
            .attr('y', '28px')
            .style('fill', 'black')
            .style('font-size', '15px')

    }

})
