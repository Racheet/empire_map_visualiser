var map_operations = void function() {
    "use strict";
    var mapNodes = d3.selectAll("#map svg polygon, #map svg path");
    var bottomBox = d3.select("#bottom_box")
    
    function updateBottomBox (title, data) {
        if (typeof title === "string" && typeof data === "string") {
            bottomBox.contents = d3.select("#bottom_box").selectAll("p, li, h2")
            bottomBox.contents.remove();
            
            bottomBox
                 .append("h2")
                 .html(title);
            bottomBox
                 .append("p")
                 .html(data);
        } else {
            throw new Error("Title or Data is not a string!")
            
    d3.json("data/provinces.json", function (err, data) {
       if(err) {throw err}
       else {
           window.provinceData = data;
    
           window.mapNodes.data(window.provinceData, function (datum, index) {
                return datum ? datum.name : this.getAttribute("id");
                
           });
       }
    });
    

    
} ()
