// import * as SP from 'JS/stockprice_graph.js';

d3.csv("dataset/stock_list_50.csv", function(data) {

    var lstData = [];

        for (i = 0; i < data.length; i++) {
            lstData.push({
                "stock_id": data[i]["stock_id"],
                "stock_name": data[i]["stock_name"],
            })
        }
    console.log(lstData)

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(lstData)
      .enter()
    	.append('option')
      .text(function (d) { return d.stock_id+d.stock_name; }) // text showed in the menu
      .attr("value", function (d) { return  d.stock_id; }) // corresponding value returned by the button
   
    // // When the button is changed, run the updateChart function
    // d3.select("#selectButton").on("change", function(d) {
    //     // recover the option that has been chosen
    //     var selectedOption = d3.select(this).property("value")
    //     // run the updateChart function with this selected option
    //     update(selectedOption)
    // })
    function stockValue(s_id) {
        // stockPrice(s_id);
        location.reload();
        return localStorage.setItem("priceCsv", s_id);
    }
        d3.select("#selectButton").on("change", function(d) {
        const s_id = d3.select(this).property("value")
        stockValue(s_id);
        })

})