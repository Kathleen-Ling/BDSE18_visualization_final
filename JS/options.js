d3.csv("dataset/stock_list_50.csv", function(data) {

    var lstData = [{stock_id:"請選擇", stock_name:""}];

        for (i = 0; i < data.length; i++) {
            lstData.push({
                "stock_id": data[i]["stock_id"],
                "stock_name": data[i]["stock_name"],
            })
        }

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(lstData)
      .enter()
    	.append('option')
      .text(function (d) { return d.stock_id+d.stock_name; }) // text showed in the menu
      .attr("value", function (d) { return  d.stock_id; }) // corresponding value returned by the button
   
    // When the button is changed, run the stockValue function
    function stockValue(s_id) {
        location.reload();
        return localStorage.setItem("priceCsv", s_id);
    }
        d3.select("#selectButton").on("change", function(d) {
        const s_id = d3.select(this).property("value")
        stockValue(s_id);
        })

})