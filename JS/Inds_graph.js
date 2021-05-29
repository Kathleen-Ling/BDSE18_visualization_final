// set the dimensions and margins of the graph
var width = 950
height = 950
margin = 150

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#indsD")
    .append("svg")
    .attr("viewBox", `0 0 950 950`)
    // .attr("width", width)
    // .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var listData=["金融保險業", "半導體業", "電腦及週邊設備業", "航運業", "通信網路業", "塑膠工業", "水泥工業", "汽車工業", "其他業", "其他電子業", "電子零組件業", "光電業", "油電燃氣業", "食品工業", "紡織纖維", "貿易百貨業", "橡膠工業", "鋼鐵工業"]
var data = { 金融保險業: 14, 半導體業: 8, 電腦及週邊設備業: 6, 航運業: 3, 通信網路業: 3, 塑膠工業: 3, 水泥工業: 2, 汽車工業: 2, 其他業: 2, 其他電子業: 2, 電子零組件業: 2, 光電業: 1, 油電燃氣業: 1, 食品工業: 1, 紡織纖維: 1, 貿易百貨業: 1, 橡膠工業: 1, 鋼鐵工業: 1 }

console.log(listData.reverse())
// set the color scale
var color = d3.scaleOrdinal()
    .domain(listData)
    .range(d3.schemeCategory20c);

// Compute the position of each group on the pie:
var pie = d3.pie()
    .sort(null) // Do not sort group by size
    .value(function (d) { return d.value; })
var data_ready = pie(d3.entries(data))

// The arc generator
var arc = d3.arc()
    .innerRadius(radius * 0.5)         // This is the size of the donut hole
    .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
    .selectAll('allSlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d) { return (color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

// Add the polylines between chart and labels:
svg
    .selectAll('allPolylines')
    .data(data_ready)
    .enter()
    .append('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function (d) {
        var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
    })

var deci = d3.format(".2f")
// Add the polylines between chart and labels:
svg
    .selectAll('allLabels')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function (d) { console.log(d.data.value); return deci(d.data.value / 54 * 100) + "%" })
    .attr('font-size', "15px")
    .attr('transform', function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    })
    .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })

//Legend
var legend = svg.selectAll(".legend")
    .data(listData)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + -i *20+ ")"; })
    .style("opacity", "1");

legend.append("rect")
    .attr("x", width -500)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d) { return color(d); });

legend.append("text")
    .attr("x", width - 505)
    .attr("y", 9)
    .attr("dy", ".35em")
    .attr("font-size","15px")
    .style("text-anchor", "end")
    .text(function (d) { return d; });
